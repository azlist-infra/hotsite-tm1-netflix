// HTTP Client para usar em Server Actions e Server Components
// Este arquivo roda APENAS no servidor

import { cookies } from 'next/headers';
import API_CONFIG from './api-config';
import type { ApiErrorData } from '@/app/api/_shared';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig {
    params?: Record<string, string | number>
    query?: Record<string, string | number | boolean>
    body?: unknown
    headers?: HeadersInit
    requireAuth?: boolean // Se precisa do token de autenticação
}

class ServerApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private buildURL(
        endpoint: string,
        params?: Record<string, string | number>,
        query?: Record<string, string | number | boolean>
    ): string {
        let url = endpoint;

        // Substitui params na URL: /users/:id -> /users/123
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url = url.replace(`:${key}`, String(value));
            });
        }

        // Adiciona query strings
        if (query) {
            const queryString = new URLSearchParams(
                Object.entries(query).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {} as Record<string, string>)
            ).toString();
            url += `?${queryString}`;
        }

        return `${this.baseURL}${url}`;
    }

    private async getAuthToken(): Promise<string | null> {
        // Pega o token do cookie (será setado no login)
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value; // CORRIGIDO: access_token
        return token || null;
    }

    private async request<T>(
        method: HttpMethod,
        endpoint: string,
        config?: RequestConfig
    ): Promise<T> {
        const url = this.buildURL(endpoint, config?.params, config?.query);

        const headers: HeadersInit = {
            ...API_CONFIG.HEADERS,
            ...config?.headers,
        };

        // Adiciona token de autenticação se necessário
        if (config?.requireAuth) {
            const token = await this.getAuthToken()
            if (token) {
                (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
            }
        }

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: config?.body ? JSON.stringify(config.body) : undefined,
                cache: 'no-store', // Server Actions não devem fazer cache
            });

            // Trata resposta vazia (204 No Content)
            if (response.status === 204) {
                return {} as T;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new ServerApiError(
                    data.message || 'Erro na requisição',
                    response.status,
                    data
                );
            }

            return data;
        } catch (error) {
            if (error instanceof ServerApiError) {
                throw error;
            }

            // Erros de rede ou parse
            throw new ServerApiError(
                'Erro de conexão com o servidor',
                0,
                undefined
            );
        }
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>('GET', endpoint, config);
    }

    async post<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>('POST', endpoint, config);
    }

    async put<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>('PUT', endpoint, config);
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>('DELETE', endpoint, config);
    }

    async patch<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>('PATCH', endpoint, config);
    }
}

// Classe de erro customizada para Server API
export class ServerApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public data?: ApiErrorData
    ) {
        super(message)
        this.name = 'ServerApiError'
    }
}

// Instância global para Server Actions
export const serverApi = new ServerApiClient(API_CONFIG.BASE_URL || '');