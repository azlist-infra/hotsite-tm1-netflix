// Página de edição de perfil do usuário logado
// Client Component - precisa de interatividade

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wrapper } from '@/layouts/wrapper';
import { Stack, Heading, Box, Link as ChakraLink } from '@chakra-ui/react';
import { AuthCard } from '@/layouts/box/AuthCard';
import { ProfileEditForm } from '@/components/modules/profile/ProfileEditForm';
import { getUserByIdAction } from '@/app/api/users';
import { getCurrentUser } from '@/app/api/auth';
import { useState } from 'react';
import type { User } from '@/app/api/users';

export default function ProfileEditPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function loadUser() {
            try {
                // Busca usuário logado
                const currentUser = await getCurrentUser();

                if (!currentUser) {
                    router.push('/auth/login');
                    return;
                }

                // Busca dados completos
                const result = await getUserByIdAction(currentUser.id);

                if (!result.success || !result.data) {
                    setError(result.error || 'Erro ao carregar perfil');
                    return;
                }

                setUser(result.data);
            } catch {
                setError('Erro inesperado ao carregar perfil');
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, [router]);

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

    if (error || !user) {
        return (
            <Wrapper.Center justify="center">
                <AuthCard>
                    <Box textAlign="center" py={8}>
                        <Heading size="xl" color="red.600">Erro</Heading>
                        <Box color="gray.600" mt={2}>{error}</Box>
                        <ChakraLink
                            href="/app/profile"
                            color="blue.600"
                            _hover={{ textDecoration: 'underline' }}
                            mt={4}
                            display="inline-block"
                        >
                            Voltar ao perfil
                        </ChakraLink>
                    </Box>
                </AuthCard>
            </Wrapper.Center>
        )
    }

    return (
        <Wrapper.Center justify="center">
            <AuthCard>
                <Stack gap={6}>
                    <Heading as="h1" size="2xl" textAlign="center">
                        Editar Perfil
                    </Heading>

                    <ProfileEditForm user={user} />

                    <Box textAlign="center">
                        <ChakraLink
                            href="/app/profile"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            ← Voltar ao perfil
                        </ChakraLink>
                    </Box>
                </Stack>
            </AuthCard>
        </Wrapper.Center>
    );
}