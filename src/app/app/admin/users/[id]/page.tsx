// Página de detalhes do usuário

import { redirect } from 'next/navigation'
import { Container, Heading, Text, Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { getCurrentUser } from '@/app/api/auth/auth.action'
import { getUserByIdAction } from '@/app/api/users/users.action'
import { UserDetailsCard } from '@/components/modules/users/UserDetailsCard'
import { UserActionsMenu } from '@/components/modules/users/UserActionsMenu'
import { ErrorBox } from '@/components/ui'

interface UserDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
    const { id } = await params

    // Verifica autenticação
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/auth/login');
    }

    // Busca usuário
    const result = await getUserByIdAction(id);

    if (!result.success || !result.data) {
        return (
            <Container maxW="container.lg" py={8}>
                <ErrorBox title="Usuário Não Encontrado">
                    {result.error}
                </ErrorBox>
                <Button
                    asChild
                    colorPalette="red"
                    variant="outline"
                    mt={4}
                >
                    <Link href="/app/users">
                        Voltar para lista
                    </Link>
                </Button>
            </Container>
        );
    }

    const user = result.data;

    // Verifica permissão de visualização
    const canView =
        currentUser.isAdmin ||
        (currentUser.role === 'gestor' && user.clientId === currentUser.clientId) ||
        currentUser.id === user._id;

    if (!canView) {
        return (
            <Container maxW="container.lg" py={8}>
                <ErrorBox title="Acesso Negado">
                    Você não tem permissão para visualizar este usuário.
                </ErrorBox>
                <Button
                    asChild
                    colorPalette="red"
                    variant="outline"
                    mt={4}
                >
                    <Link href="/app/users">
                        Voltar para lista
                    </Link>
                </Button>
            </Container>
        )
    }

    const canEdit = currentUser.isAdmin || currentUser.id === user._id;

    return (
        <Container maxW="container.lg" py={8}>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Heading size="xl" mb={2}>
                        Detalhes do Usuário
                    </Heading>
                    <Text color="gray.600">Visualize as informações completas</Text>
                </Box>

                <UserActionsMenu
                    userId={user._id}
                    canEdit={canEdit}
                    isAdmin={currentUser.isAdmin}
                />
            </Flex>

            {/* Card de Detalhes */}
            <UserDetailsCard user={user} />

            {/* Voltar */}
            <Box mt={6}>
                <Button asChild variant="ghost" colorPalette="gray">
                    <Link href="/app/users">
                        ← Voltar para lista
                    </Link>
                </Button>
            </Box>
        </Container>
    )
}