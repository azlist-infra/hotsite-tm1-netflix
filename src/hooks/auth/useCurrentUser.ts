'use client'

import { useState, useEffect } from 'react'
import type { User } from '@/app/api/auth/auth.types'

/**
 * Hook para obter dados do usuário logado no lado do cliente
 * Lê o cookie user_data que é configurado como httpOnly: false
 */
export function useCurrentUser() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            // Busca o cookie user_data
            const cookies = document.cookie.split(';')
            const userDataCookie = cookies.find(cookie => 
                cookie.trim().startsWith('user_data=')
            )

            if (userDataCookie) {
                const cookieValue = userDataCookie.split('=')[1]
                const decodedValue = decodeURIComponent(cookieValue)
                const userData: User = JSON.parse(decodedValue)
                setUser(userData)
            }
        } catch (error) {
            console.error('Error reading user data:', error)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { user, isLoading }
}

