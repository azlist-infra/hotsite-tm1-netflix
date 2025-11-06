'use client'

// Hooks TanStack Query para clientes
// Use quando precisar de cache, invalidação automática, etc no CLIENT-SIDE

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clientsService } from './clients.service'
import type {
    CreateClientDto,
    UpdateClientDto,
    ClientFilters,
} from './clients.types'

// ==========================================
// QUERY KEYS
// ==========================================

export const clientsKeys = {
    all: ['clients'] as const,
    lists: () => [...clientsKeys.all, 'list'] as const,
    list: (filters?: ClientFilters) => [...clientsKeys.lists(), filters] as const,
    details: () => [...clientsKeys.all, 'detail'] as const,
    detail: (id: string) => [...clientsKeys.details(), id] as const,
}

// ==========================================
// QUERIES (GET)
// ==========================================

/**
 * Hook para listar todos os clientes
 * Apenas admins
 */
export function useClients() {
    return useQuery({
        queryKey: clientsKeys.lists(),
        queryFn: () => clientsService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

/**
 * Hook para buscar um cliente específico por ID
 */
export function useClient(id: string, enabled: boolean = true) {
    return useQuery({
        queryKey: clientsKeys.detail(id),
        queryFn: () => clientsService.getById(id),
        enabled: !!id && enabled,
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

// ==========================================
// MUTATIONS (POST, PUT, DELETE)
// ==========================================

/**
 * Hook para criar um novo cliente
 */
export function useCreateClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateClientDto) => clientsService.create(data),
        onSuccess: () => {
            // Invalida a lista para refetch
            queryClient.invalidateQueries({ queryKey: clientsKeys.lists() })
        },
    })
}

/**
 * Hook para atualizar um cliente
 */
export function useUpdateClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateClientDto }) =>
            clientsService.update(id, data),
        onSuccess: (updatedClient) => {
            // Atualiza o cache do cliente específico
            queryClient.setQueryData(clientsKeys.detail(updatedClient._id), updatedClient)

            // Invalida a lista
            queryClient.invalidateQueries({ queryKey: clientsKeys.lists() })
        },
    })
}

/**
 * Hook para deletar um cliente (soft delete)
 */
export function useDeleteClient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => clientsService.delete(id),
        onSuccess: (_, deletedId) => {
            // Remove do cache
            queryClient.removeQueries({ queryKey: clientsKeys.detail(deletedId) })

            // Invalida a lista
            queryClient.invalidateQueries({ queryKey: clientsKeys.lists() })
        },
    })
}

