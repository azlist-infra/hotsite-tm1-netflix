'use server'

// Sistema de verificação de permissões para Server Components
// Uso: const { user } = await checkPermission({ requireAdmin: true })
// 
// NOTA: Hotsite público - sem autenticação

// import { redirect } from 'next/navigation'
// import { getCurrentUser } from '@/app/api/auth'
// import type { User } from '@/app/api/auth/auth.types'

// Tipo simplificado para hotsite sem auth
type User = null

type UserRole = 'admin' | 'operador' | 'gestor' | 'assistente'

interface PermissionConfig {
    /** Requer que o usuário seja admin */
    requireAdmin?: boolean
    /** Lista de roles permitidas */
    roles?: UserRole[]
    /** Verificação customizada (recebe user e params opcionais) */
    customCheck?: (user: User, params?: Record<string, string>) => boolean | Promise<boolean>
}

interface CheckPermissionResult {
    user: User
    hasPermission: true
}

/**
 * Verifica permissões de acesso à página
 * 
 * @param config - Configuração de permissão (opcional - sem config = todos autenticados podem)
 * @param params - Parâmetros da rota (para custom checks)
 * @returns { user } - Usuário autenticado (ou redireciona para /app se não tiver permissão)
 * 
 * @example
 * // Apenas admin
 * const { user } = await checkPermission({ requireAdmin: true })
 * 
 * @example
 * // Admin ou Gestor
 * const { user } = await checkPermission({ roles: ['admin', 'gestor'] })
 * 
 * @example
 * // Custom check
 * const { user } = await checkPermission({
 *   customCheck: (user) => user.isAdmin || user.clientId === '123'
 * })
 * 
 * @example
 * // Sem restrição (apenas autenticado)
 * const { user } = await checkPermission()
 */
export async function checkPermission(
    config?: PermissionConfig,
    params?: Record<string, string>
): Promise<CheckPermissionResult> {
    // Hotsite público - sem autenticação
    // Não deve ser usado em hotsite público
    throw new Error('checkPermission não deve ser usado em hotsite público sem autenticação')
}

