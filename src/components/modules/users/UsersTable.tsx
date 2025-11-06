'use client'

// Tabela de usuários com ações

import {
    Table,
    Button,
    Box,
    Text,
    Group,
} from '@chakra-ui/react'
import Link from 'next/link'
import { User } from '@/app/api/users';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { AdminBadge } from './AdminBadge';

interface UsersTableProps {
    users: User[];
    currentUser: {
        id: string;
        isAdmin: boolean;
        role: string;
        clientId: string | null;
    };
}

export function UsersTable({ users, currentUser }: UsersTableProps) {
    if (users.length === 0) {
        return (
            <Box
                bg="gray.50"
                borderRadius="md"
                p={8}
                textAlign="center"
                borderWidth={1}
                borderColor="gray.200"
            >
                <Text color="gray.600" fontSize="lg">
                    Nenhum usuário encontrado
                </Text>
                <Button
                    asChild
                    colorPalette="blue"
                    mt={4}
                >
                    <Link href="/app/users/new">
                        Criar Primeiro Usuário
                    </Link>
                </Button>
            </Box>
        );
    }

    return (
        <Box bg="white" borderRadius="md" shadow="sm" borderWidth={1} overflow="hidden">
            <Table.Root variant="outline" size="sm">
                <Table.Header bg="gray.50">
                    <Table.Row>
                        <Table.ColumnHeader>Nome</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                        <Table.ColumnHeader>Role</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="right">Ações</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                        {users.map((user) => (
                            <Table.Row key={user._id} _hover={{ bg: 'gray.50' }}>
                                {/* Nome */}
                                <Table.Cell>
                                    <Box>
                                        <Text fontWeight="semibold">{user.name}</Text>
                                        {user.isAdmin && (
                                            <Box mt={1}>
                                                <AdminBadge />
                                            </Box>
                                        )}
                                    </Box>
                                </Table.Cell>

                                {/* Email */}
                                <Table.Cell>
                                    <Text color="gray.600">{user.email}</Text>
                                </Table.Cell>

                                {/* Role */}
                                <Table.Cell>
                                    <UserRoleBadge role={user.role} />
                                </Table.Cell>

                                {/* Status */}
                                <Table.Cell>
                                    <UserStatusBadge isActive={user.isActive} />
                                </Table.Cell>

                                {/* Ações */}
                                <Table.Cell textAlign="right">
                                    <Group gap={2}>
                                        {/* Ver */}
                                        <Button
                                            asChild
                                            colorPalette="blue"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link href={`/app/users/${user._id}`}>
                                                Ver
                                            </Link>
                                        </Button>

                                        {/* Editar - só se for admin ou próprio usuário */}
                                        {(currentUser.isAdmin || currentUser.id === user._id) && (
                                            <Button
                                                asChild
                                                colorPalette="green"
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link href={`/app/users/${user._id}/edit`}>
                                                    Editar
                                                </Link>
                                            </Button>
                                        )}

                                        {/* Privilégios - só admin */}
                                        {currentUser.isAdmin && (
                                            <Button
                                                asChild
                                                colorPalette="purple"
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link href={`/app/users/${user._id}/privileges`}>
                                                    Privilégios
                                                </Link>
                                            </Button>
                                        )}
                                    </Group>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table.Root>

            {/* Footer com contagem */}
            <Box p={4} bg="gray.50" borderTopWidth={1}>
                <Text color="gray.600" fontSize="sm">
                    Total: <strong>{users.length}</strong> usuário(s)
                </Text>
            </Box>
        </Box>
    );
}