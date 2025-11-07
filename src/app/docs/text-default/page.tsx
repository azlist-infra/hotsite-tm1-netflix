'use client'

import { LayoutHotsite } from '@/layouts/layout'
import { Box, Heading, Text, VStack, Container, Flex } from '@chakra-ui/react'

export default function Home() {
    return (
        <>
            <LayoutHotsite>
                <Container maxW="100vw" py={10} minH="100vh" bgColor={'brand.200'}>
                    <Flex
                        gap={8}
                        align="center"
                        justify="center"
                        bgColor={'red.200'}
                        flexDirection={'column'}
                        py={30}

                    >
                        <Box bgColor={'yellow.200'}>
                            <Heading size="2xl" color="primary" >
                                HEADING - default (dancingScript handmade)
                            </Heading>
                        </Box>
                        <Heading size="2xl" color="primary" fontFamily="custom">
                            HEADING - hadcoded custom - deve sobrepor com Barriecito (funny)
                        </Heading>

                        <Text fontSize="lg" textAlign="center" maxW="2xl">
                            TEXT - default (inter ou inter tight)
                        </Text>

                        <Text fontSize="lg" textAlign="center" maxW="2xl" fontFamily="custom">
                            Text Font Custom
                        </Text>

                        <Box

                            p={6}
                            bg="gray.200"
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="gray.200"

                        >
                            <VStack gap={4} align="start">
                                <Text fontWeight="semibold">✅ Configurações realizadas:</Text>
                                <Text color="secondary">• Next.js 15 com App Router</Text>
                                <Text color="azlist">• Cor AZ Staff</Text>
                                <Text color="brand.200">• TypeScript configurado</Text>
                                <Text color="azstaff">• Path mapping configurado</Text>
                                <Text color="primary">• Provider do Chakra funcionando</Text>
                            </VStack>
                        </Box>

                        <Text fontSize="sm" color="gray.500">
                            Edite <code>src/app/page.tsx</code> para começar a desenvolver
                        </Text>
                    </Flex>
                </Container>
            </LayoutHotsite>
        </>
    )
}