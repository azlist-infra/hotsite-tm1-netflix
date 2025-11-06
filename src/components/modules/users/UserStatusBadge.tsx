// Badge para exibir o status ativo/inativo do usuário

import { Badge } from '@chakra-ui/react'

interface UserStatusBadgeProps {
    isActive: boolean
}

export function UserStatusBadge({ isActive }: UserStatusBadgeProps) {

    const text = isActive ? 'Ativo' : 'Inativo'
    const colorPalette = isActive ? 'green' : 'gray'

    return (
        <Badge
            colorPalette={colorPalette}
            variant="surface"
            size="sm"
            paddingX={1.5}
            letterSpacing="wide"
            fontWeight="light"
            fontSize="xs"
        >
            {text}
        </Badge>
    )

}