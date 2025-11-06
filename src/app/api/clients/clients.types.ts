// Tipos para o módulo de clientes

import type { 
    ApiResponse,
    ActionResponse
} from '@/app/api/_shared'

// Re-exporta tipos compartilhados
export type { ActionResponse, ApiError } from '@/app/api/_shared'

// ==========================================
// INTERFACES PRINCIPAIS
// ==========================================

/**
 * Interface completa do cliente
 * Baseada na resposta da API
 */
export interface Client {
    _id: string
    name: string
    email: string
    phone?: string
    isActive: boolean
    createdAt: string // ISO date
    updatedAt: string // ISO date
    __v?: number
}

/**
 * Dados para criar um novo cliente
 * POST /clients
 */
export interface CreateClientDto {
    name: string
    email: string
    phone?: string
}

/**
 * Dados para atualizar um cliente
 * PUT /clients/:id
 */
export interface UpdateClientDto {
    name?: string
    email?: string
    phone?: string
    isActive?: boolean
}

// ==========================================
// RESPOSTAS DA API
// ==========================================

/**
 * Tipos ApiError e ApiResponse são importados de _shared
 */

/**
 * Resposta da listagem de clientes
 * GET /clients
 */
export type ListClientsResponse = ApiResponse<Client[]>

/**
 * Resposta de buscar cliente por ID
 * GET /clients/:id
 */
export type GetClientResponse = ApiResponse<Client>

/**
 * Resposta de criar cliente
 * POST /clients
 */
export type CreateClientResponse = ApiResponse<Client>

/**
 * Resposta de atualizar cliente
 * PUT /clients/:id
 */
export type UpdateClientResponse = ApiResponse<Client>

/**
 * Resposta de deletar cliente
 * DELETE /clients/:id
 */
export type DeleteClientResponse = ApiResponse<Client>

// ==========================================
// RESPONSE DAS SERVER ACTIONS
// ==========================================

/**
 * Response padrão das Server Actions de clientes
 * Usa o ActionResponse compartilhado
 */
export type ClientActionResponse<T = unknown> = ActionResponse<T>

// ==========================================
// TYPES AUXILIARES
// ==========================================

/**
 * Filtros para listar clientes
 */
export interface ClientFilters {
    search?: string // Busca por nome ou email
    isActive?: boolean
}

/**
 * Cliente simplificado para Select
 */
export interface ClientOption {
    _id: string
    name: string
}

