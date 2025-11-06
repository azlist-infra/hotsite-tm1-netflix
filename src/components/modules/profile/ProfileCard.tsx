// Componente para exibir informações do perfil

import { Box, Heading, Flex, Grid, Text, Stack } from '@chakra-ui/react'
import { User } from '@/app/api/users'
import { UserRoleBadge } from '@/components/modules/users/UserRoleBadge'
import { UserStatusBadge } from '@/components/modules/users/UserStatusBadge'
import { AdminBadge } from '@/components/modules/users/AdminBadge'

interface ProfileCardProps {
    user: User
}

export function ProfileCard({ user }: ProfileCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <Box bg="white" shadow="md" borderRadius="lg">
            {/* Header do Card */}
            <Box px={6} py={5} borderBottomWidth="1px" borderColor="gray.200">
                <Flex align="center" justify="space-between">
                    <Heading size="lg">
                        Informações Pessoais
                    </Heading>
                    <Flex gap={2}>
                        <UserRoleBadge role={user.role} />
                        {user.isAdmin && <AdminBadge />}
                        <UserStatusBadge isActive={user.isActive} />
                    </Flex>
                </Flex>
            </Box>

            {/* Conteúdo */}
            <Box px={6} py={5}>
                <Grid
                    templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
                    gap={6}
                >
                    {/* Nome */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Nome Completo
                        </Text>
                        <Text fontSize="sm" color="gray.900">
                            {user.name}
                        </Text>
                    </Stack>

                    {/* Email */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Email
                        </Text>
                        <Text fontSize="sm" color="gray.900">
                            {user.email}
                        </Text>
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
                            <Text fontSize="sm" color="gray.900">
                                {formatDate(user.lastLogin)}
                            </Text>
                        </Stack>
                    )}

                    {/* Criado em */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Membro desde
                        </Text>
                        <Text fontSize="sm" color="gray.900">
                            {formatDate(user.createdAt)}
                        </Text>
                    </Stack>

                    {/* Atualizado em */}
                    <Stack gap={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.500">
                            Última Atualização
                        </Text>
                        <Text fontSize="sm" color="gray.900">
                            {formatDate(user.updatedAt)}
                        </Text>
                    </Stack>
                </Grid>
            </Box>
        </Box>
    )
}