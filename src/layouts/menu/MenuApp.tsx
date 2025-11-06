// ========================================
// Menu Component - Funciona em Server Components!
// ========================================
// Chakra UI v3 suporta uso direto em Server Components
// Apenas hooks/render props precisam de 'use client'

import { Box, HStack, Link, Text } from "@chakra-ui/react"
import { getVisibleMenuItems, type MenuItem as MenuItemType } from "@/config/menu.config"
import { MenuItemDropdown } from "./MenuItemDropdown"
import type { User } from "@/app/api/auth/auth.types"

interface MenuAppProps {
    user: User | null
}

interface MenuItemProps {
    item: MenuItemType
}

const MenuItem = ({ item }: MenuItemProps) => {
    // Se tem children, renderiza dropdown (Client Component)
    if (item.children && item.children.length > 0) {
        return <MenuItemDropdown item={item} />
    }

    // Se não tem children, renderiza link normal
    return (
        <Box pl={2}>
            <Link
                href={item.href || '#'}
                color="gray.800"
                fontSize="md"
                fontWeight="bold"
                _hover={{
                    color: "blue.500",
                    textDecoration: "underline"
                }}
                _active={{
                    color: "blue.500",
                    textDecoration: "underline"
                }}
                _focus={{
                    color: "blue.500",
                    textDecoration: "underline"
                }}
            >
                <Text>{item.label}</Text>
            </Link>
        </Box>
    )
}

/**
 * Menu Component - Recebe user como prop
 * SEM 'use client' = funciona em Server Components (Chakra v3)
 * Não tem loading state = não pisca!
 */
export function MenuApp({ user }: MenuAppProps) {
    // Filtra itens do menu baseado nas permissões do usuário
    const visibleMenuItems = getVisibleMenuItems(user)

    // Se não tem itens visíveis, não exibe nada
    if (visibleMenuItems.length === 0) {
        return null
    }

    return (
        <HStack>
            {visibleMenuItems.map((item) => (
                <MenuItem key={item.label} item={item} />
            ))}
        </HStack>
    )
}

