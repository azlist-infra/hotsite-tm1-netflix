'use client'

import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { Logo } from "@/components/ui"

export function FooterHotsite() {
  return (
    <Box bg="black" color="white">
      <Container maxW="6xl" py={8}>
        <Flex direction="column" align="center" gap={4}>
          <Logo.Main size="md" />
          <Text>Contato: contato@netflixfeitoaqui.com.br</Text>
        </Flex>
      </Container>
    </Box>
  )
}


