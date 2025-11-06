// Card de detalhes do usuário

import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Flex,
} from '@chakra-ui/react'
import { User } from '@/app/api/users';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { AdminBadge } from './AdminBadge';

interface UserDetailsCardProps {
    user: User;
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Box bg="white" borderRadius="md" shadow="sm" borderWidth={1} overflow="hidden">
            {/* Header */}
            <Box bg="gray.50" px={6} py={4} borderBottomWidth={1}>
                <Flex justify="space-between" align="center">
                    <Heading size="md">Informações do Usuário</Heading>
                    <Flex gap={2}>
                        <UserRoleBadge role={user.role} />
                        {user.isAdmin && <AdminBadge />}
                        <UserStatusBadge isActive={user.isActive} />
                    </Flex>
                </Flex>
            </Box>

            {/* Conteúdo */}
            <Box p={6}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {/* Nome */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Nome Completo
                        </Text>
                        <Text fontSize="md" fontWeight="semibold">
                            {user.name}
                        </Text>
                    </Stack>

                    {/* Email */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Email
                        </Text>
                        <Text fontSize="md">{user.email}</Text>
                    </Stack>

                    {/* Role */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Função
                        </Text>
                        <Box>
                            <UserRoleBadge role={user.role} />
                        </Box>
                    </Stack>

                    {/* Status */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Status da Conta
                        </Text>
                        <Box>
                            <UserStatusBadge isActive={user.isActive} />
                        </Box>
                    </Stack>

                    {/* Admin Status */}
                    {user.isAdmin && (
                        <Stack gap={1}>
                            <Text fontSize="sm" fontWeight="medium" color="gray.500">
                                Privilégios
                            </Text>
                            <Box>
                                <AdminBadge />
                            </Box>
                        </Stack>
                    )}

                    {/* Último Login */}
                    {user.lastLogin && (
                        <Stack gap={1}>
                            <Text fontSize="sm" fontWeight="medium" color="gray.500">
                                Último Acesso
                            </Text>
                            <Text fontSize="sm">{formatDate(user.lastLogin)}</Text>
                        </Stack>
                    )}

                    {/* Criado em */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Membro desde
                        </Text>
                        <Text fontSize="sm">{formatDate(user.createdAt)}</Text>
                    </Stack>

                    {/* Atualizado em */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Última Atualização
                        </Text>
                        <Text fontSize="sm">{formatDate(user.updatedAt)}</Text>
                    </Stack>
                </SimpleGrid>
            </Box>
        </Box>
    );
}