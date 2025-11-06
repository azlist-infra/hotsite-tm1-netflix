'use client'

// Hook de verificação de permissões para Client Components
// Uso: const { user, loading } = usePermission({ requireAdmin: true })

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/app/api/auth'
import type { User } from '@/app/api/auth/auth.types'

type UserRole = 'admin' | 'operador' | 'gestor' | 'assistente'

interface PermissionConfig {
    /** Requer que o usuário seja admin */
    requireAdmin?: boolean
    /** Lista de roles permitidas */
    roles?: UserRole[]
    /** Verificação customizada */
    customCheck?: (user: User, params?: Record<string, string>) => boolean
}

interface UsePermissionResult {
    user: User | null
    loading: boolean
    hasPermission: boolean
}

/**
 * Hook para verificar permissões em Client Components
 * 
 * @param config - Configuração de permissão (opcional - sem config = todos autenticados podem)
 * @param params - Parâmetros da rota (para custom checks)
 * 
 * @example
 * // Apenas admin
 * const { user, loading } = usePermission({ requireAdmin: true })
 * if (loading) return <LoadingPage />
 * if (!user) return null  // Já foi redirecionado
 * 
 * @example
 * // Admin ou Gestor
 * const { user, loading } = usePermission({ roles: ['admin', 'gestor'] })
 * 
 * @example
 * // Custom check
 * const { user, loading } = usePermission({
 *   customCheck: (user) => user.isAdmin || user.clientId === '123'
 * })
 * 
 * @example
 * // Sem restrição (apenas autenticado)
 * const { user, loading } = usePermission()
 */
export function usePermission(
    config?: PermissionConfig,
    params?: Record<string, string>
): UsePermissionResult {
    const router = useRouter()
    const [state, setState] = useState<UsePermissionResult>({
        user: null,
        loading: true,
        hasPermission: false,
    })

    // Extrai valores primitivos para dependências do useEffect
    const requireAdmin = config?.requireAdmin
    const rolesKey = config?.roles?.join(',') || ''
    const customCheckKey = config?.customCheck?.toString() || ''
    const paramsKey = JSON.stringify(params || {})

    useEffect(() => {
        async function check() {
            try {
                // 1. Verifica autenticação
                const user = await getCurrentUser()

                if (!user) {
                    router.push('/auth/login')
                    return
                }

                // 2. Sem config = todos autenticados podem acessar
                if (!config) {
                    setState({ user, loading: false, hasPermission: true })
                    return
                }

                // 3. Verifica se é admin (se requerido)
                if (config.requireAdmin && !user.isAdmin) {
                    router.push('/app')
                    return
                }

                // 4. Verifica roles
                if (config.roles && config.roles.length > 0) {
                    if (!config.roles.includes(user.role)) {
                        router.push('/app')
                        return
                    }
                }

                // 5. Custom check
                if (config.customCheck) {
                    const hasPermission = config.customCheck(user, params)
                    if (!hasPermission) {
                        router.push('/app')
                        return
                    }
                }

                // Se passou por todas as verificações, tem permissão
                setState({ user, loading: false, hasPermission: true })
            } catch (error) {
                console.error('Error checking permission:', error)
                router.push('/app')
            }
        }

        check()
    }, [requireAdmin, rolesKey, customCheckKey, paramsKey, router, config, params])

    return state
}

