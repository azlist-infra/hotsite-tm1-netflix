'use client'

import { UserLogged } from './UserLogged'
import { useCurrentUser } from '@/hooks/auth'

/**
 * Versão client-side do UserLogged que busca dados do usuário automaticamente
 * Útil para componentes client-side como HeaderApp
 */
export function UserLoggedClient() {
    const { user } = useCurrentUser()
    
    if (!user) {
        return null
    }
    
    return (
        <UserLogged 
            userName={user.name}
            userEmail={user.email}
        />
    )
}

