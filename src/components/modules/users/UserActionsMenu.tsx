'use client'

// Menu de ações para a página de detalhes do usuário

import { Button, Menu } from '@chakra-ui/react'
import Link from 'next/link'

interface UserActionsMenuProps {
    userId: string
    canEdit: boolean
    isAdmin: boolean
}

export function UserActionsMenu({ userId, canEdit, isAdmin }: UserActionsMenuProps) {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    colorPalette="blue"
                    size="md"
                >
                    Ações ▼
                </Button>
            </Menu.Trigger>
            <Menu.Content>
                {/* Editar */}
                {canEdit && (
                    <Menu.Item asChild value="edit">
                        <Link href={`/app/users/${userId}/edit`}>
                            ✏️ Editar Usuário
                        </Link>
                    </Menu.Item>
                )}

                {/* Alterar Senha - só admin ou próprio usuário */}
                {canEdit && (
                    <Menu.Item asChild value="password">
                        <Link href={`/app/users/${userId}/password`}>
                            🔒 Alterar Senha
                        </Link>
                    </Menu.Item>
                )}

                {/* Privilégios - só admin */}
                {isAdmin && (
                    <Menu.Item asChild value="privileges">
                        <Link href={`/app/users/${userId}/privileges`}>
                            👑 Gerenciar Privilégios
                        </Link>
                    </Menu.Item>
                )}
            </Menu.Content>
        </Menu.Root>
    )
}
