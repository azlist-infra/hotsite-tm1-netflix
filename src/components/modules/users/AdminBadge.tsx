// Badge para indicar super administrador

import { Badge } from '@chakra-ui/react'
import { HiStar } from "react-icons/hi"

export function AdminBadge() {
    return (
        <Badge
            colorPalette="yellow"
            variant="surface"
            size="sm"
            paddingX={2}
            textTransform="uppercase"
            letterSpacing="wide"
        >
            <HiStar />
            Super Admin
        </Badge>
    )
}