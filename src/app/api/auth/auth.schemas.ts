// Schemas de validação Zod para autenticação

import { z } from 'zod'

/**
 * Schema para login
 */
export const loginSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .min(1, 'Email é obrigatório'),
    password: z.string()
        .min(1, 'Senha é obrigatória'),
})

/**
 * Schema para recuperação de senha
 */
export const recoverySchema = z.object({
    email: z.string()
        .email('Email inválido')
        .min(1, 'Email é obrigatório'),
})

/**
 * Schema para redefinir senha
 */
export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token é obrigatório'),
    password: z.string()
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres'),
    confirmPassword: z.string()
        .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
})

/**
 * Schema para aceitar convite
 */
export const acceptInviteSchema = z.object({
    token: z.string().min(1, 'Token é obrigatório'),
    name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    password: z.string()
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres'),
    confirmPassword: z.string()
        .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
})

// Tipos inferidos dos schemas
export type LoginInput = z.infer<typeof loginSchema>
export type RecoveryInput = z.infer<typeof recoverySchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type AcceptInviteInput = z.infer<typeof acceptInviteSchema>

