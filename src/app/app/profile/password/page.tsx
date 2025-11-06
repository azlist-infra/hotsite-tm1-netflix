// Página de alteração de senha do usuário logado
// Client Component

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wrapper } from '@/layouts/wrapper'
import { Stack, Heading, Box, Link as ChakraLink } from '@chakra-ui/react'
import { AuthCard } from '@/layouts/box/AuthCard'
import { PasswordChangeForm } from '@/components/modules/users/PasswordChangeForm'
import { getCurrentUser } from '@/app/api/auth'

export default function ProfilePasswordPage() {
    const router = useRouter()
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function checkAuth() {
            const currentUser = await getCurrentUser()

            if (!currentUser) {
                router.push('/auth/login')
                return
            }

            setUserId(currentUser.id)
            setIsLoading(false)
        }

        checkAuth()
    }, [router])

    if (isLoading) {
        return (
            <Wrapper.Center justify="center">
                <AuthCard>
                    <Box textAlign="center" py={8}>
                        <Box color="gray.600">Carregando...</Box>
                    </Box>
                </AuthCard>
            </Wrapper.Center>
        )
    }

    if (!userId) {
        return null
    }

    return (
        <Wrapper.Center justify="center">
            <AuthCard>
                <Stack gap={6}>
                    <Heading as="h1" size="2xl" textAlign="center">
                        Alterar Senha
                    </Heading>

                    <PasswordChangeForm userId={userId} />

                    <Box textAlign="center">
                        <ChakraLink
                            href="/app/profile"
                            fontSize="sm"
                            color="gray.600"
                            _hover={{ color: 'gray.900' }}
                        >
                            ← Voltar ao perfil
                        </ChakraLink>
                    </Box>
                </Stack>
            </AuthCard>
        </Wrapper.Center>
    )
}