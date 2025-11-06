// Tipos para o módulo de usuários

import type { 
    ApiResponse,
    ActionResponse
} from '@/app/api/_shared'

// Re-exporta tipos compartilhados
export type { ActionResponse, ApiError, ApiErrorResponse } from '@/app/api/_shared'

// ==========================================
// ENUMS E CONSTANTES
// ==========================================

export const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    COMPANY: 'company',
    USER: 'user',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// ==========================================
// INTERFACES PRINCIPAIS
// ==========================================

/**
 * Interface completa do usuário
 * Baseada na resposta da API
 */
export interface User {
    _id: string;
    clientId: string | null; // null para super admins
    name: string;
    email: string;
    role: UserRole;
    isAdmin: boolean;
    isActive: boolean;
    lastLogin?: string; // ISO date
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
    __v: number;
}

/**
 * Dados para criar um novo usuário
 * POST /users
 */
export interface CreateUserDto {
    clientId: string;
    name: string;
    email: string;
    password: string;
    role: 'company' | 'user'; // Apenas roles permitidos na criação
}

/**
 * Dados para atualizar um usuário
 * PUT /users/:id
 */
export interface UpdateUserDto {
    name?: string;
    email?: string;
    role?: UserRole;
    isAdmin?: boolean;
    isActive?: boolean;
}

/**
 * Dados para alterar senha
 * PATCH /users/:id/password
 */
export interface ChangePasswordDto {
    currentPassword?: string; // Opcional quando admin altera de outro
    newPassword: string;
    confirmPassword: string;
}

/**
 * Dados para atualizar privilégios
 * PATCH /users/:id/privileges
 */
export interface UpdatePrivilegesDto {
    role?: UserRole;
    isAdmin?: boolean;
}

// ==========================================
// RESPOSTAS DA API
// ==========================================

/**
 * Tipos ApiError, ApiErrorResponse e ApiResponse
 * são importados de _shared
 */

/**
 * Resposta da listagem de usuários
 * GET /users
 */
export type ListUsersResponse = ApiResponse<User[]>;

/**
 * Resposta de buscar usuário por ID
 * GET /users/:id
 */
export type GetUserResponse = ApiResponse<User>;

/**
 * Resposta de criar usuário
 * POST /users
 */
export type CreateUserResponse = ApiResponse<User>;

/**
 * Resposta de atualizar usuário
 * PUT /users/:id
 */
export type UpdateUserResponse = ApiResponse<User>;

/**
 * Resposta de alterar senha
 * PATCH /users/:id/password
 */
export type ChangePasswordResponse = ApiResponse<{
    userId: string
    passwordChangedAt: string
}>

/**
 * Resposta de atualizar privilégios
 * PATCH /users/:id/privileges
 */
export type UpdatePrivilegesResponse = ApiResponse<User>;

// ==========================================
// TYPES AUXILIARES
// ==========================================

/**
 * Filtros para listar usuários
 */
export interface UserFilters {
    search?: string; // Busca por nome ou email
    role?: UserRole;
    isActive?: boolean;
    clientId?: string;
}

/**
 * Response padrão das Server Actions de usuários
 * Usa o ActionResponse compartilhado
 */
export type UserActionResponse<T = unknown> = ActionResponse<T>

/**
 * Permissões do usuário
 */
export interface UserPermissions {
    canViewAllUsers: boolean;
    canCreateUsers: boolean;
    canEditUser: (userId: string) => boolean;
    canDeleteUser: (userId: string) => boolean;
    canChangePassword: (userId: string) => boolean;
    canUpdatePrivileges: boolean;
}