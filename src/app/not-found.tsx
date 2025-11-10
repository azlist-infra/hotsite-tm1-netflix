'use client'

import React from 'react'
import { Box, Text, Button, VStack, Flex, AbsoluteCenter } from '@chakra-ui/react'
import Link from 'next/link'

// Layouts
import { LayoutHotsite } from '@/layouts/layout'
import { Wrapper } from '@/layouts/wrapper'
import { CardOutline } from '@/layouts/box/CardOutline'

// Components
import { NetflixLogo } from '@/components/modules/netflix'

export default function NotFound() {
    return (
        <>
            <LayoutHotsite fullWidth>
                <Wrapper.Center>
                    <CardOutline >
                       
                            {/* Logo Netflix */}
                            <Box p={0} mt={{ base: 8, md: 12 }}>
                                <NetflixLogo width={120} height={32} />
                            </Box>

                            {/* Título */}
                            <Box
                                w="100%"
                                maxW={{ base: "100%", md: "550px" }}
                                px={{ base: 2, md: 0 }}
                                mt={{ base: 6, md: 12 }}
                            >
                                <Text
                                    textStyle="brand.text.xlbold"
                                    textAlign="center"
                                    color="primary"
                                    fontSize={{ base: "24px", md: "32px" }}
                                    mb={{ base: 4, md: 6 }}
                                >
                                    Página não encontrada
                                </Text>

                                <Text
                                    textStyle="brand.text.default"
                                    textAlign="center"
                                    color="white"
                                >
                                    Retorne para a página inicial do hotsite do evento
                                </Text>
                            </Box>

                            {/* Botão */}
                            <Box
                                w="100%"
                                maxW={{ base: "100%", md: "510px" }}
                                px={{ base: 0, md: 0 }}
                                mt={{ base: 4, md: 6 }}
                            >
                                <VStack gap={{ base: 3, md: 4 }} width="100%">
                                    <Link href="/" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            variant="custom"
                                            w={{ base: "100%", md: "auto" }}
                                            mt={{ base: 2, md: 4 }}
                                            px={{ base: 8, md: 16 }}
                                        >
                                            Página Inicial
                                        </Button>
                                    </Link>
                                </VStack>
                            </Box>

                            <Box mb={{ base: 4, md: 8 }} />
                         
                     
                    </CardOutline>
                </Wrapper.Center>
            </LayoutHotsite>
        </>
    )
}
