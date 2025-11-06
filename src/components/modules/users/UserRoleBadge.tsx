// Badge para exibir o role do usuário com cores

import { Badge } from '@chakra-ui/react'
import { UserRole, USER_ROLES } from '@/app/api/users'

interface UserRoleBadgeProps {
    role: UserRole
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
    const roleConfig: Record<UserRole, { label: string; colorPalette: 'purple' | 'blue' | 'green' | 'gray' | 'orange' | 'red' }> = {
        [USER_ROLES.ADMIN]: { label: 'Admin', colorPalette: 'orange' },
        [USER_ROLES.MANAGER]: { label: 'Manager', colorPalette: 'blue' },
        [USER_ROLES.COMPANY]: { label: 'Empresa', colorPalette: 'green' },
        [USER_ROLES.USER]: { label: 'Usuário', colorPalette: 'gray' },
    }

    const config = roleConfig[role] || roleConfig[USER_ROLES.USER]

    return (
        <Badge  
            colorPalette={config.colorPalette}
            variant="surface"
            size="sm"
            paddingX={1.5}
            //textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="light"
            fontSize="xs"
        >
            {config.label}
        </Badge>
    )
}