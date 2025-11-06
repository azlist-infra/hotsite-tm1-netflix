// Página de criação de novo usuário

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Heading, Text, Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { getCurrentUser } from '@/app/api/auth';
import { UserCreateForm } from '@/components/modules/users/UserCreateForm';
import { ErrorBox } from '@/components/ui';

export default function NewUserPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        async function checkPermission() {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                router.push('/auth/login');
                return;
            }

            // Verifica permissão (por enquanto qualquer usuário autenticado pode criar)
            setHasPermission(true);
            setIsLoading(false);
        }

        checkPermission();
    }, [router]);

    if (isLoading) {
        return (
            <Container maxW="container.md" py={8}>
                <Box textAlign="center">
                    <Text>Carregando...</Text>
                </Box>
            </Container>
        );
    }

    if (!hasPermission) {
        return (
            <Container maxW="container.md" py={8}>
                <ErrorBox title="Acesso Negado">
                    Você não tem permissão para criar usuários.
                </ErrorBox>
            </Container>
        );
    }

    return (
        <Container maxW="container.md" py={8}>
            {/* Header */}
            <Box mb={6}>
                <Heading size="xl" mb={2}>
                    Criar Novo Usuário
                </Heading>
                <Text color="gray.600">
                    Preencha os dados abaixo para criar um novo usuário
                </Text>
            </Box>

            {/* Formulário */}
            <Box bg="white" p={6} borderRadius="md" shadow="md" borderWidth={1}>
                <UserCreateForm />
            </Box>

            {/* Voltar */}
            <Box mt={4} textAlign="center">
                <Button
                    asChild
                    variant="ghost"
                    colorPalette="gray"
                >
                    <Link href="/app/users">
                        ← Voltar para lista
                    </Link>
                </Button>
            </Box>
        </Container>
    )
}