// Service para chamadas de API de clientes no CLIENT-SIDE
// Use com TanStack Query quando precisar de cache e controle avançado

import { apiClient } from '@/lib/api/api-client'
import API_CONFIG from '@/lib/api/api-config'
import type {
    Client,
    CreateClientDto,
    UpdateClientDto,
    ListClientsResponse,
    GetClientResponse,
    CreateClientResponse,
    UpdateClientResponse,
} from './clients.types'

export const clientsService = {
    /**
     * GET /clients
     * Lista todos os clientes (apenas admins)
     */
    getAll: async (): Promise<Client[]> => {
        const response = await apiClient.get<ListClientsResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BASE
        )
        return response.data
    },

    /**
     * GET /clients/:id
     * Busca um cliente específico por ID
     */
    getById: async (id: string): Promise<Client> => {
        const response = await apiClient.get<GetClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BY_ID(id)
        )
        return response.data
    },

    /**
     * POST /clients
     * Cria um novo cliente
     */
    create: async (data: CreateClientDto): Promise<Client> => {
        const response = await apiClient.post<CreateClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BASE,
            { body: data }
        )
        return response.data
    },

    /**
     * PUT /clients/:id
     * Atualiza dados de um cliente
     */
    update: async (id: string, data: UpdateClientDto): Promise<Client> => {
        const response = await apiClient.put<UpdateClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BY_ID(id),
            { body: data }
        )
        return response.data
    },

    /**
     * DELETE /clients/:id
     * Remove cliente (soft delete)
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(
            API_CONFIG.ENDPOINTS.CLIENTS.BY_ID(id)
        )
    },
}

