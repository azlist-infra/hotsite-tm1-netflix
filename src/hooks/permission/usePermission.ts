'use client'

// Hook de verificação de permissões para Client Components
// Uso: const { user, loading } = usePermission({ requireAdmin: true })
// 
// NOTA: Hotsite público - sem autenticação

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
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
    // Hotsite público - sem autenticação
    // const router = useRouter()
    // const [state, setState] = useState<UsePermissionResult>({
    //     user: null,
    //     loading: true,
    //     hasPermission: false,
    // })

    // Hotsite público - retorna sem permissão
    return {
        user: null,
        loading: false,
        hasPermission: false
    }
}

