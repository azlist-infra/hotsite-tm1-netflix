'use server'

// Sistema de verificação de permissões para Server Components
// Uso: const { user } = await checkPermission({ requireAdmin: true })

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/api/auth'
import type { User } from '@/app/api/auth/auth.types'

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
    // 1. Verifica autenticação
    const user = await getCurrentUser()
    
    if (!user) {
        redirect('/auth/login')
    }
    
    // 2. Sem config = todos autenticados podem acessar
    if (!config) {
        return { user, hasPermission: true }
    }
    
    // 3. Verifica se é admin (se requerido)
    if (config.requireAdmin && !user.isAdmin) {
        redirect('/app')
    }
    
    // 4. Verifica roles
    if (config.roles && config.roles.length > 0) {
        if (!config.roles.includes(user.role)) {
            redirect('/app')
        }
    }
    
    // 5. Custom check
    if (config.customCheck) {
        const hasPermission = await config.customCheck(user, params)
        if (!hasPermission) {
            redirect('/app')
        }
    }
    
    // Se passou por todas as verificações, tem permissão
    return { user, hasPermission: true }
}

