// Tipos de autenticação baseados na sua API

import type { ApiError } from '@/app/api/_shared'

// Re-exporta tipos do _shared
export type { ActionResponse, ApiError } from '@/app/api/_shared'

export interface LoginCredentials {
    email: string
    password: string
}

// Estrutura exata da resposta da API /auth/login
export interface LoginResponse {
    success: boolean
    data: {
        user: User
        accessToken: string
        refreshToken: string
    }
    message: string
    errors?: ApiError[]
}

// Estrutura do usuário retornado pela API
export interface User {
    id: string // ObjectId
    name: string
    email: string
    clientId: string | null // null para admins do sistema
    role: 'admin' | 'operador' | 'gestor' | 'assistente'
    isAdmin: boolean
    isActive: boolean
}

// Estrutura de erro da API (RFC 7807)
export interface ApiErrorResponse {
    errors: ApiError[]
}

// Estrutura da resposta do refresh token
export interface RefreshTokenResponse {
    success: boolean
    data: {
        accessToken: string
    }
    message: string
    errors?: ApiError[]
}

// Estado de autenticação
export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}