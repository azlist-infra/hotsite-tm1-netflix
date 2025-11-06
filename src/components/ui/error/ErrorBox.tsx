// Componente padrão para exibir erros

import { Center, Flex, Heading, Text } from '@chakra-ui/react'

interface ErrorBoxProps {
    title?: string
    message?: string
    children?: React.ReactNode
}

export function ErrorBox({
    title = 'Erro ao Carregar Dados',
    message,
    children
}: ErrorBoxProps) {
    return (
        <Center>
            <Flex
                bg="red.50"
                borderRadius="md"
                p={6}
                borderWidth={1}
                borderColor="red.200"
                maxW="breakpoint-md"
                direction="column"
                align="center"
                justify="center"
                mt={6}
                minH="150px"
                minW="30%"
            >
                <Heading size="lg" color="red.600" mb={2}>
                    {title}
                </Heading>

                <Text color="black.700">
                    {children || message}
                </Text>
            </Flex>
        </Center>
    )
}

