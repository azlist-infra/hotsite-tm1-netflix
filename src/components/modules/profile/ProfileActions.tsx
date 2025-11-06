// Componente com botões de ação do perfil

'use client'

import { Box, Heading, Grid } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export function ProfileActions() {
    return (
        <Box
            bg="white"
            shadow="md"
            borderRadius="lg"
            p={6}
            mb={6}
        >
            <Heading size="md" mb={4}>
                Ações Rápidas
            </Heading>

            <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
                gap={4}
            >
                {/* Editar Perfil */}
                <Button
                    asChild
                    variant="outline"
                    size="lg"
                >
                    <Link href="/app/profile/edit">
                        Editar Perfil
                    </Link>
                </Button>

                {/* Alterar Senha */}
                <Button
                    asChild
                    variant="outline"
                    size="lg"
                >
                    <Link href="/app/profile/password">
                        Alterar Senha
                    </Link>
                </Button>
            </Grid>
        </Box>
    )
}