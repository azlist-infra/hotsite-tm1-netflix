'use client'

// Hook removido - hotsite não tem autenticação
// import { useTransition } from 'react'
// import { useRouter } from 'next/navigation'
// import { logoutAction } from '@/app/api/auth'
// import { toast } from '@/components/ui'

interface UseLogoutReturn {
    logout: () => void
    isPending: boolean
}

/**
 * Hook para fazer logout do usuário
 * Limpa os cookies e redireciona para login
 * 
 * NOTA: Hotsite público - sem autenticação
 */
export function useLogout(): UseLogoutReturn {
    // Hotsite público - sem autenticação
    return {
        logout: () => {},
        isPending: false
    }
}

