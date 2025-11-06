'use server';

// Server Actions para autenticação
// Executa no servidor, mais seguro para credenciais

import { cookies } from 'next/headers';
import { serverApi, ServerApiError } from '@/lib/api/server-api';
import API_CONFIG from '@/lib/api/api-config';
import type {
    LoginCredentials,
    LoginResponse,
    RefreshTokenResponse,
    ActionResponse,
    User
} from './auth.types';

/**
 * Login do usuário
 * Chamado pelo formulário de login
 */
export async function loginAction(
    credentials: LoginCredentials
): Promise<ActionResponse<LoginResponse['data']>> {
    try {
        // Validação básica
        if (!credentials.email || !credentials.password) {
            return {
                success: false,
                error: 'Email e senha são obrigatórios',
            };
        }

        // Chama a API de login
        const response = await serverApi.post<LoginResponse>(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            {
                body: {
                    email: credentials.email,
                    password: credentials.password,
                },
            }
        );

        // Verifica se a resposta foi bem-sucedida
        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao fazer login',
            };
        }

        const { user, accessToken, refreshToken } = response.data;

        // Salva os tokens nos cookies (httpOnly para segurança)
        const cookieStore = await cookies();

        // AccessToken - expira em 1 hora (3600 segundos)
        cookieStore.set('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hora
            path: '/',
        });

        // RefreshToken - expira em 7 dias (604800 segundos)
        cookieStore.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/',
        });

        // Salva dados básicos do usuário (opcional, para acesso rápido)
        cookieStore.set('user_data', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
        }), {
            httpOnly: false, // Pode ser lido no cliente
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/',
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Login error:', error);

        if (error instanceof ServerApiError) {
            // Trata erros específicos da API
            const apiError = error.data;

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0];

                // Mapeia códigos de erro para mensagens amigáveis
                const errorMessages: Record<string, string> = {
                    'invalid_credentials': 'Email ou senha incorretos',
                    'invalid_inactive_user': 'Sua conta está desativada',
                    'credentials_required': 'Email e senha são obrigatórios',
                    'invalid_email_format': 'Formato de email inválido',
                };

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao fazer login',
                };
            }

            return {
                success: false,
                error: error.message || 'Erro ao fazer login',
            };
        }

        return {
            success: false,
            error: 'Erro ao conectar com o servidor. Tente novamente.',
        };
    }
}

/**
 * Logout do usuário
 */
export async function logoutAction(): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();

        // Remove os cookies
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        cookieStore.delete('user_data');

        return {
            success: true,
        };
    } catch (error) {
        console.error('Logout error:', error);
        return {
            success: false,
            error: 'Erro ao fazer logout',
        };
    }
}

/**
 * Busca dados do usuário logado do cookie
 * Útil para Server Components
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const userData = cookieStore.get('user_data')?.value;

        if (!userData) {
            return null;
        }

        const user = JSON.parse(userData);
        return user;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

/**
 * Verifica se o usuário está autenticado
 * Útil para middleware e proteção de rotas
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    return !!token;
}

/**
 * Refresh do token (Server Action)
 * Renova o accessToken usando o refreshToken
 */
export async function refreshTokenAction(): Promise<ActionResponse<{ accessToken: string }>> {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
            return {
                success: false,
                error: 'Refresh token não encontrado',
            };
        }

        const response = await serverApi.post<RefreshTokenResponse>(
            API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
            {
                body: { refreshToken },
            }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao renovar token',
            };
        }

        // Atualiza o access token
        cookieStore.set('access_token', response.data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hora
            path: '/',
        });

        return {
            success: true,
            data: { accessToken: response.data.accessToken },
        };
    } catch (error) {
        console.error('Refresh token error:', error);

        if (error instanceof ServerApiError) {
            const apiError = error.data;

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0];

                // Se o refresh token expirou, faz logout
                if (['invalid_refresh_token', 'user_not_found', 'user_inactive'].includes(firstError.code)) {
                    await logoutAction();

                    return {
                        success: false,
                        error: 'Sessão expirada. Faça login novamente.',
                    };
                }
            }
        }

        return {
            success: false,
            error: 'Erro ao renovar token',
        };
    }
}

/**
 * Pega o access token atual
 * Útil para fazer requisições autenticadas em Server Components
 */
export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || null;
}