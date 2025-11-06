// HTTP Client para usar no FRONT-END com TanStack Query
// Este arquivo roda no CLIENTE (browser)

import API_CONFIG from './api-config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig {
    params?: Record<string, string | number>
    query?: Record<string, string | number | boolean>
    body?: unknown
    headers?: HeadersInit
    cache?: RequestCache
    revalidate?: number
}

class ApiClient {
    private baseURL: string;
    private defaultHeaders: HeadersInit;

    constructor(baseURL: string, defaultHeaders?: HeadersInit) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            ...API_CONFIG.HEADERS,
            ...defaultHeaders,
        };
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

    private async request<T>(
        method: HttpMethod,
        endpoint: string,
        config?: RequestConfig
    ): Promise<T> {
        const url = this.buildURL(endpoint, config?.params, config?.query);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    ...this.defaultHeaders,
                    ...config?.headers,
                },
                body: config?.body ? JSON.stringify(config.body) : undefined,
                cache: config?.cache,
                credentials: 'include', // Importante para cookies
                next: config?.revalidate ? { revalidate: config.revalidate } : undefined,
            });

            // Trata resposta vazia (204 No Content)
            if (response.status === 204) {
                return {} as T;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new ApiError(
                    data.message || 'Erro na requisição',
                    response.status,
                    data
                );
            }

            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            // Erros de rede ou parse
            throw new ApiError(
                'Erro de conexão com o servidor',
                0,
                error
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

// Classe de erro customizada
export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public data?: unknown
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

// Instância global para TanStack Query (client-side)
export const apiClient = new ApiClient(API_CONFIG.BASE_URL || '');