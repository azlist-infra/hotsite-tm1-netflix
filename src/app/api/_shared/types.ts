// Tipos comuns compartilhados entre todos os módulos de API

/**
 * Resposta padrão da API
 */
export interface ApiResponse<T = unknown> {
    success: boolean
    message?: string
    data: T
}

/**
 * Resposta paginada da API
 */
export interface PaginatedResponse<T> {
    success: boolean
    message?: string
    data: T[]
    pagination?: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

/**
 * Resposta de Server Actions
 * Usado para actions que rodam no servidor
 */
export interface ActionResponse<T = void> {
    success: boolean
    error?: string
    data?: T
}

/**
 * Estrutura de um erro individual da API
 */
export interface ApiError {
    code: string
    description: string
    field?: string
}

/**
 * Estrutura de erro da API (usado no catch de erros)
 */
export interface ApiErrorData {
    message?: string
    errors?: ApiError[]
}

/**
 * Resposta de erro da API (RFC 7807)
 */
export interface ApiErrorResponse {
    errors: ApiError[]
}

/**
 * Filtros comuns para listagens
 */
export interface BaseFilters {
    search?: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

