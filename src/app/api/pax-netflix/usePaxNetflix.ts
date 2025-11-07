'use client'

// Hooks TanStack Query para Pax Netflix
// Use quando precisar de cache, invalidação automática, etc no CLIENT-SIDE

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { paxNetflixService } from './pax-netflix.service'
import type { CreatePaxNetflixDto } from './pax-netflix.types'

// ==========================================
// QUERY KEYS
// ==========================================

export const paxNetflixKeys = {
    all: ['pax-netflix'] as const,
    details: () => [...paxNetflixKeys.all, 'detail'] as const,
    detail: (email: string) => [...paxNetflixKeys.details(), email] as const,
}

// ==========================================
// QUERIES (GET)
// ==========================================

/**
 * Hook para buscar um Pax Netflix por email
 * @param email - Email do participante
 * @param enabled - Se a query deve ser executada automaticamente
 */
export function usePaxNetflix(email: string, enabled: boolean = true) {
    return useQuery({
        queryKey: paxNetflixKeys.detail(email),
        queryFn: () => paxNetflixService.getByEmail(email),
        enabled: !!email && enabled,
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: 1, // Tenta apenas 1 vez em caso de erro
    })
}

// ==========================================
// MUTATIONS (POST)
// ==========================================

/**
 * Hook para criar um novo Pax Netflix
 */
export function useCreatePaxNetflix() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreatePaxNetflixDto) => paxNetflixService.create(data),
        onSuccess: (newPax) => {
            // Atualiza o cache do Pax específico por email
            queryClient.setQueryData(
                paxNetflixKeys.detail(newPax.Email),
                newPax
            )

            // Invalida todas as queries de pax netflix
            queryClient.invalidateQueries({ 
                queryKey: paxNetflixKeys.all 
            })
        },
    })
}

