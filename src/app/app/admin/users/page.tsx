// Página de listagem de usuários
// Admin: vê todos / Manager: vê só do cliente

import { redirect } from 'next/navigation';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { getCurrentUser } from '@/app/api/auth';
import { getUsersAction } from '@/app/api/users';
import { UsersTable } from '@/components/modules/users/UsersTable';
import { UsersFilters } from '@/components/modules/users/UsersFilters';
import { ErrorBox } from '@/components/ui';
import { Wrapper } from '@/layouts/wrapper';

export default async function UsersPage() {
    // Verifica autenticação
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/auth/login');
    }

    // Verifica se é admin ou manager (role que pode ver usuários)
    const canViewUsers = currentUser.isAdmin || currentUser.role === 'gestor';

    if (!canViewUsers) {
        return (
            <Flex minH="100vh" align="center" justify="center" maxW="container.xl" py={8}>
                <Box>
                    <ErrorBox title="Acesso Negado">
                        Você não tem permissão para acessar esta página.
                    </ErrorBox>
                    <Button
                        asChild
                        colorPalette="red"
                        variant="outline"
                        mt={4}
                    >
                        <Link href="/app/dashboard">
                            Voltar ao Dashboard
                        </Link>
                    </Button>
                </Box>
            </Flex>
        );
    }

    // Busca usuários
    const result = await getUsersAction();

    if (!result.success || !result.data) {
        return (
        <Flex minH="100vh" align="center" justifyContent="center" w="100%" py={8} bg={"green.200"} >
                <ErrorBox title="Erro ao Carregar Usuários">
                    {result.error}
                </ErrorBox>
            </Flex>
        );
    }

    const users = result.data;

    return (
        <Wrapper.Full>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Heading size="xl" mb={2}>
                        Gerenciamento de Usuários
                    </Heading>
                    <Text color="gray.600">
                        {currentUser.isAdmin
                            ? 'Gerencie todos os usuários do sistema'
                            : 'Gerencie os usuários da sua empresa'}
                    </Text>
                </Box>  

                <Button
                    asChild
                    colorPalette="blue"
                    size="lg"
                >
                    <Link href="/app/users/new">
                        + Novo Usuário
                    </Link>
                </Button>
            </Flex>

            {/* Filtros */}
            <Box mb={6}>
                <UsersFilters />
            </Box>

            {/* Tabela */}
            <UsersTable users={users} currentUser={currentUser} />
        
        </Wrapper.Full>
    );
}