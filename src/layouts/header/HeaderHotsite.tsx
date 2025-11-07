'use client'

import { Box, Container, Flex } from "@chakra-ui/react"
import { Logo } from "@/components/ui"
import { MenuHotsite } from "@/layouts/menu/MenuHotsite"

export function HeaderHotsite() {
  return (
    <Box>
      <Container maxW="6xl">
        <Flex align="center" justify="space-between" gap={4} py={2}>
          <Box>
            <Logo.Main size="md" href="/" />
          </Box>
          <Box flex="1">
            <MenuHotsite />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}


