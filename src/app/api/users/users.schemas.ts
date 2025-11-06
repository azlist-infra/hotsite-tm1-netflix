// Schemas de validação Zod para usuários

import { z } from 'zod'

/**
 * Schema para criação de usuário
 */
export const createUserSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    email: z.string()
        .email('Email inválido')
        .max(100, 'Email deve ter no máximo 100 caracteres'),
    password: z.string()
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres'),
    role: z.enum(['admin', 'user'], {
        message: 'Role deve ser admin ou user',
    }),
    clientId: z.string()
        .min(1, 'Cliente é obrigatório')
        .optional(),
})

/**
 * Schema para atualização de usuário
 */
export const updateUserSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .optional(),
    email: z.string()
        .email('Email inválido')
        .max(100, 'Email deve ter no máximo 100 caracteres')
        .optional(),
    role: z.enum(['admin', 'user'], {
        message: 'Role deve ser admin ou user',
    }).optional(),
    clientId: z.string().optional(),
    isActive: z.boolean().optional(),
})

/**
 * Schema para alteração de senha
 */
export const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Senha atual é obrigatória'),
    newPassword: z.string()
        .min(8, 'Nova senha deve ter no mínimo 8 caracteres')
        .max(50, 'Nova senha deve ter no máximo 50 caracteres'),
})

/**
 * Schema para atualização de privilégios
 */
export const updatePrivilegesSchema = z.object({
    isAdmin: z.boolean(),
})

/**
 * Schema para filtros de usuário
 */
export const userFiltersSchema = z.object({
    search: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
    isActive: z.boolean().optional(),
    clientId: z.string().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().max(100).optional(),
})

// Tipos inferidos dos schemas
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type UpdatePrivilegesInput = z.infer<typeof updatePrivilegesSchema>
export type UserFiltersInput = z.infer<typeof userFiltersSchema>

