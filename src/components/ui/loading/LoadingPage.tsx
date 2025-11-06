// Componente de loading para páginas inteiras

import { Container, Spinner, Text, VStack } from '@chakra-ui/react'

interface LoadingPageProps {
    text?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function LoadingPage({ 
    text = 'Carregando...', 
    size = 'md' 
}: LoadingPageProps) {
    return (
        <Container maxW="container.md" py={8}>
            <VStack gap={4}>
                <Spinner size={size} colorPalette="blue" />
                <Text color="gray.600" fontSize="sm">
                    {text}
                </Text>
            </VStack>
        </Container>
    )
}

