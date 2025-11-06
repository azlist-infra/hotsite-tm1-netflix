'use client'

import { HStack, Menu, Text, Box, Stack } from '@chakra-ui/react'
import { Icons } from '@/components/ui/icon'
import Link from 'next/link'
import { useLogout } from '@/hooks/auth'

interface menuItensProps {
    text: string
    value: string
    icon: React.ReactNode
    href?: string | null
    onClick?: (() => void) | null
    isLoading?: boolean
}

const getMenuItems = (handleLogout: () => void): menuItensProps[] => [
    {
        text: 'Meu Perfil',
        value: 'profile',
        icon: <Icons.User size={18} />,
        href: '/app/profile',
        onClick: null
    },
    {
        text: 'Editar Perfil',
        value: 'edit-profile',
        icon: <Icons.User size={18} />,
        href: '/app/profile/edit',
        onClick: null
    },
    {
        text: 'Alterar Senha',
        value: 'password',
        icon: <Icons.Help size={18} />,
        href: '/app/profile/password',
        onClick: null
    },
    {
        text: 'Logout',
        value: 'logout',
        icon: <Icons.Logout size={18} />,
        href: null,
        onClick: handleLogout
    },
]

const MenuItem = ({ text, value, icon, href, onClick, isLoading }: menuItensProps) => {
    const hrefFinal = href ? href : null
    const onClickFinal = onClick ? onClick : null

    return (
        <Menu.Item
            value={value}
            key={value}
            asChild
            disabled={isLoading}
        >
            <Link
                href={hrefFinal || ''}
                onClick={onClickFinal || undefined}
            >
                <HStack
                    gap={2}
                    py={2}
                    px={4}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                    _focus={{ bg: 'red.100', cursor: 'pointer' }}
                    _active={{ bg: 'green.100', cursor: 'pointer' }}
                    onClick={onClickFinal || undefined}
                    focusRing="none"
                    opacity={isLoading ? 0.5 : 1}
                    cursor={isLoading ? 'not-allowed' : 'pointer'}
                >
                    {icon}
                    <Text>{isLoading ? 'Saindo...' : text}</Text>
                </HStack>
            </Link>
        </Menu.Item>
    )
}

interface MenuUserProps {
    userName?: string
    userEmail?: string
}

export function MenuUser({ userName, userEmail }: MenuUserProps) {
    const { logout, isPending } = useLogout()
    const menuItems = getMenuItems(logout)

    return (
        <>
            <Menu.Positioner>
                <Menu.Content>
                    {/* Cabeçalho com informações do usuário */}
                    {(userName || userEmail) && (
                        <Box
                            px={4}
                            py={3}
                            borderBottom="1px solid"
                            borderColor="gray.200"
                            bg="gray.50"
                        >
                            <Stack gap={0.5}>
                                {userName && (
                                    <Text fontWeight="medium" fontSize="sm">
                                        {userName}
                                    </Text>
                                )}
                                {userEmail && (
                                    <Text fontSize="xs" color="gray.600">
                                        {userEmail}
                                    </Text>
                                )}
                            </Stack>
                        </Box>
                    )}
                    
                    {/* Itens do menu */}
                    {menuItems.map((item) => (
                        <MenuItem 
                            key={item.value} 
                            text={item.text} 
                            value={item.value} 
                            icon={item.icon} 
                            href={item.href} 
                            onClick={item.onClick}
                            isLoading={item.value === 'logout' && isPending}
                        />
                    ))}
                </Menu.Content>
            </Menu.Positioner>
        </>
    )
}


