'use client'

// Hooks TanStack Query para usuários
// Use quando precisar de cache, invalidação automática, etc no CLIENT-SIDE

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersService } from './users.service'
import type {
    CreateUserDto,
    UpdateUserDto,
    ChangePasswordDto,
    UpdatePrivilegesDto,
    UserFilters,
} from './users.types'

// ==========================================
// QUERY KEYS
// ==========================================

export const usersKeys = {
    all: ['users'] as const,
    lists: () => [...usersKeys.all, 'list'] as const,
    list: (filters?: UserFilters) => [...usersKeys.lists(), filters] as const,
    details: () => [...usersKeys.all, 'detail'] as const,
    detail: (id: string) => [...usersKeys.details(), id] as const,
}

// ==========================================
// QUERIES (GET)
// ==========================================

/**
 * Hook para listar todos os usuários
 * Admin: vê todos
 * Manager: vê apenas do próprio cliente
 */
export function useUsers() {
    return useQuery({
        queryKey: usersKeys.lists(),
        queryFn: () => usersService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

/**
 * Hook para buscar um usuário específico por ID
 */
export function useUser(id: string, enabled: boolean = true) {
    return useQuery({
        queryKey: usersKeys.detail(id),
        queryFn: () => usersService.getById(id),
        enabled: !!id && enabled,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}

// ==========================================
// MUTATIONS (POST, PUT, PATCH)
// ==========================================

/**
 * Hook para criar um novo usuário
 */
export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserDto) => usersService.create(data),
        onSuccess: () => {
            // Invalida a lista para refetch
            queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
        },
    });
}

/**
 * Hook para atualizar um usuário
 */
export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
            usersService.update(id, data),
        onSuccess: (updatedUser) => {
            // Atualiza o cache do usuário específico
            queryClient.setQueryData(usersKeys.detail(updatedUser._id), updatedUser);

            // Invalida a lista
            queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
        },
    });
}

/**
 * Hook para alterar senha de um usuário
 */
export function useChangePassword() {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: ChangePasswordDto }) =>
            usersService.changePassword(id, data),
    });
}

/**
 * Hook para atualizar privilégios de um usuário
 * APENAS para administradores
 */
export function useUpdatePrivileges() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePrivilegesDto }) =>
            usersService.updatePrivileges(id, data),
        onSuccess: (updatedUser) => {
            // Atualiza o cache do usuário específico
            queryClient.setQueryData(usersKeys.detail(updatedUser._id), updatedUser);

            // Invalida a lista
            queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
        },
    });
}

// ==========================================
// HOOKS AUXILIARES
// ==========================================

/**
 * Hook para verificar se pode editar um usuário
 * Admin: pode editar qualquer um
 * User: pode editar apenas a si próprio
 */
export function useCanEditUser(userId: string, currentUserId: string, isAdmin: boolean) {
    return isAdmin || userId === currentUserId;
}

/**
 * Hook para verificar se pode alterar senha
 * Admin: pode alterar qualquer senha
 * User: pode alterar apenas própria senha
 */
export function useCanChangePassword(userId: string, currentUserId: string, isAdmin: boolean) {
    return isAdmin || userId === currentUserId;
}