// Badge para exibir o status ativo/inativo do cliente

import { Badge } from '@chakra-ui/react'

interface ActiveStatusBadgeProps {
    isActive: boolean
}

export function ActiveStatusBadge({ isActive }: ActiveStatusBadgeProps) {

    const text = isActive ? 'Ativo' : 'Inativo'
    const colorPalette = isActive ? 'green' : 'red'

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


