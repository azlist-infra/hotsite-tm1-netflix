'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/api/auth'
import { toast } from '@/components/ui'

interface UseLogoutReturn {
    logout: () => void
    isPending: boolean
}

/**
 * Hook para fazer logout do usuário
 * Limpa os cookies e redireciona para login
 */
export function useLogout(): UseLogoutReturn {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const logout = () => {
        startTransition(async () => {
            try {
                const result = await logoutAction()

                if (result.success) {
                    // Toast de sucesso
                    toast.success('Logout realizado', 'Até logo!')

                    // Redireciona para login
                    router.push('/auth/login')
                    router.refresh()
                } else {
                    // Toast de erro
                    toast.error('Erro ao fazer logout', result.error || 'Tente novamente')
                }
            } catch (error) {
                console.error('Erro ao fazer logout:', error)
                toast.error('Erro inesperado', 'Não foi possível fazer logout')
            }
        })
    }

    return {
        logout,
        isPending
    }
}

