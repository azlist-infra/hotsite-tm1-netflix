// Página de perfil do usuário logado
// Server Component - busca dados no servidor

import { redirect } from 'next/navigation'
import { Box, Container, Heading, Text, Flex } from '@chakra-ui/react'
import { getCurrentUser } from '@/app/api/auth'
import { getUserByIdAction } from '@/app/api/users'
import { ProfileCard } from '@/components/modules/profile/ProfileCard'
import { ProfileActions } from '@/components/modules/profile/ProfileActions'

export default async function ProfilePage() {
    // Busca usuário logado
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        redirect('/auth/login')
    }

    // Busca dados completos do usuário
    const result = await getUserByIdAction(currentUser.id)

    if (!result.success || !result.data) {
        return (
            <Flex minH="100vh" align="center" justify="center">
                <Box textAlign="center">
                    <Heading size="2xl" color="red.600">
                        Erro ao carregar perfil
                    </Heading>
                    <Text color="gray.600" mt={2}>
                        {result.error}
                    </Text>
                </Box>
            </Flex>
        )
    }

    const user = result.data

    return (
        <Box minH="100vh" bg="gray.50" py={8}>
            <Container maxW="4xl">
                {/* Header */}
                <Box mb={8}>
                    <Heading size="3xl" mb={2}>
                        Meu Perfil
                    </Heading>
                    <Text color="gray.600">
                        Visualize e gerencie suas informações pessoais
                    </Text>
                </Box>

                {/* Ações Rápidas */}
                <ProfileActions />

                {/* Card de Informações */}
                <ProfileCard user={user} />
            </Container>
        </Box>
    )
}