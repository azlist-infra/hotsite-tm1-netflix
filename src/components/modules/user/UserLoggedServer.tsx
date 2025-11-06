import { getCurrentUser } from '@/app/api/auth'
import { UserLogged } from './UserLogged'

export async function UserLoggedServer() {
    const user = await getCurrentUser()
    
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

