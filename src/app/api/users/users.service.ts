// Service para chamadas de API de usuários no CLIENT-SIDE
// Use com TanStack Query quando precisar de cache e controle avançado

import { apiClient } from '@/lib/api/api-client';
import API_CONFIG from '@/lib/api/api-config';
import type {
    User,
    CreateUserDto,
    UpdateUserDto,
    ChangePasswordDto,
    UpdatePrivilegesDto,
    ListUsersResponse,
    GetUserResponse,
    CreateUserResponse,
    UpdateUserResponse,
    ChangePasswordResponse,
    UpdatePrivilegesResponse,
} from './users.types';

export const usersService = {
    /**
     * GET /users
     * Lista todos os usuários (filtrado por permissões no backend)
     */
    getAll: async (): Promise<User[]> => {
        const response = await apiClient.get<ListUsersResponse>(
            API_CONFIG.ENDPOINTS.USERS.BASE
        );
        return response.data;
    },

    /**
     * GET /users/:id
     * Busca um usuário específico por ID
     */
    getById: async (id: string): Promise<User> => {
        const response = await apiClient.get<GetUserResponse>(
            API_CONFIG.ENDPOINTS.USERS.BY_ID(id)
        );
        return response.data;
    },

    /**
     * POST /users
     * Cria um novo usuário
     * NOTA: Apenas roles 'company' e 'user' são permitidos
     */
    create: async (data: CreateUserDto): Promise<User> => {
        const response = await apiClient.post<CreateUserResponse>(
            API_CONFIG.ENDPOINTS.USERS.BASE,
            { body: data }
        );
        return response.data;
    },

    /**
     * PUT /users/:id
     * Atualiza dados de um usuário
     */
    update: async (id: string, data: UpdateUserDto): Promise<User> => {
        const response = await apiClient.put<UpdateUserResponse>(
            API_CONFIG.ENDPOINTS.USERS.BY_ID(id),
            { body: data }
        );
        return response.data;
    },

    /**
     * PATCH /users/:id/password
     * Altera a senha de um usuário
     */
    changePassword: async (
        id: string,
        data: ChangePasswordDto
    ): Promise<{ userId: string; passwordChangedAt: string }> => {
        const response = await apiClient.patch<ChangePasswordResponse>(
            API_CONFIG.ENDPOINTS.USERS.PASSWORD(id),
            { body: data }
        );
        return response.data;
    },

    /**
     * PATCH /users/:id/privileges
     * Atualiza privilégios de um usuário (apenas admins)
     */
    updatePrivileges: async (
        id: string,
        data: UpdatePrivilegesDto
    ): Promise<User> => {
        const response = await apiClient.patch<UpdatePrivilegesResponse>(
            API_CONFIG.ENDPOINTS.USERS.PRIVILEGES(id),
            { body: data }
        );
        return response.data;
    },
};