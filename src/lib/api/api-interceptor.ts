// Interceptor para renovar automaticamente o access token quando expirar
// Use este arquivo quando fizer chamadas de API no CLIENT-SIDE com TanStack Query

import { ApiError } from './api-client';
import API_CONFIG from './api-config';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Adiciona um subscriber que será notificado quando o token for renovado
 */
function subscribeTokenRefresh(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

/**
 * Notifica todos os subscribers com o novo token
 */
function onTokenRefreshed(token: string) {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
}

/**
 * Renova o access token usando o refresh token
 */
async function refreshAccessToken(): Promise<string> {
    const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1];

    if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include',
    });

    if (!response.ok) {
        // Se o refresh token expirou, redireciona para login
        window.location.href = '/auth/login?expired=true';
        throw new Error('Refresh token expirado');
    }

    const data = await response.json();
    return data.data.accessToken;
}

/**
 * Wrapper para requisições que adiciona renovação automática de token
 * Use este wrapper em suas requisições TanStack Query
 */
export async function fetchWithTokenRefresh<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include', // Importante para enviar cookies
        });

        // Se não foi 401, retorna normalmente
        if (response.status !== 401) {
            if (!response.ok) {
                const error = await response.json();
                throw new ApiError(
                    error.message || 'Erro na requisição',
                    response.status,
                    error
                );
            }
            return response.json();
        }

        // Se foi 401, tenta renovar o token
        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                isRefreshing = false;
                onTokenRefreshed(newToken);

                // Refaz a requisição original com o novo token
                const retryResponse = await fetch(url, {
                    ...options,
                    credentials: 'include',
                });

                if (!retryResponse.ok) {
                    const error = await retryResponse.json();
                    throw new ApiError(
                        error.message || 'Erro na requisição',
                        retryResponse.status,
                        error
                    );
                }

                return retryResponse.json();
            } catch (error) {
                isRefreshing = false;
                refreshSubscribers = [];
                throw error;
            }
        }

        // Se já está renovando, aguarda a renovação
        return new Promise((resolve, reject) => {
            subscribeTokenRefresh(async () => {
                try {
                    const retryResponse = await fetch(url, {
                        ...options,
                        credentials: 'include',
                    });

                    if (!retryResponse.ok) {
                        const error = await retryResponse.json();
                        throw new ApiError(
                            error.message || 'Erro na requisição',
                            retryResponse.status,
                            error
                        );
                    }

                    const data = await retryResponse.json();
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Exemplo de uso com TanStack Query:
 * 
 * const { data } = useQuery({
 *   queryKey: ['users'],
 *   queryFn: () => fetchWithTokenRefresh('/api/users', {
 *     method: 'GET'
 *   })
 * });
 */