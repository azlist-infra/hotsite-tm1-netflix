'use client'

import { Box, HStack, Link, Text } from "@chakra-ui/react"
import { MenuRoot, MenuTrigger, MenuContent, MenuItem as ChakraMenuItem } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"
import type { MenuItem } from "@/config/menu.config"

// ========================================
// CLIENT COMPONENT - Dropdown Interativo
// ========================================

interface MenuItemDropdownProps {
    item: MenuItem
}

/**
 * Componente CLIENT para renderizar dropdown com interação
 * Separado do MenuApp para manter o pai como Server Component
 */
export function MenuItemDropdown({ item }: MenuItemDropdownProps) {
    return (
        <Box pl={2}>
            <MenuRoot>
                <MenuTrigger asChild>
                    <HStack
                        as="button"
                        color="gray.800"
                        fontSize="md"
                        fontWeight="bold"
                        cursor="pointer"
                        _hover={{
                            color: "blue.500",
                        }}
                    >
                        <Text>{item.label}</Text>
                        <LuChevronDown size={16} />
                    </HStack>
                </MenuTrigger>
                <MenuContent>
                    {item.children?.map((child) => (
                        <ChakraMenuItem key={child.label} value={child.label} asChild>
                            <Link
                                href={child.href || '#'}
                                color="gray.800"
                                textDecoration="none"
                                _hover={{
                                    color: "blue.500",
                                    bg: "gray.50",
                                }}
                            >
                                {child.label}
                            </Link>
                        </ChakraMenuItem>
                    ))}
                </MenuContent>
            </MenuRoot>
        </Box>
    )
}

