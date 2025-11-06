'use client'

import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { debug } from "../debug"

type LayoutHotsitetProps = {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  fullWidth?: boolean
}

export function LayoutHotsite({ children, header, footer, fullWidth }: LayoutHotsitetProps) {
  return (
    <Flex direction="column" minH="100vh">
      <Text>Hotsite</Text>
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={10}
        bg={debug.header}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        {fullWidth ? (
          <Box py={3}>{header ?? <Box>Navbar</Box>}</Box>
        ) : (
          <Container maxW="6xl" py={3}>
            {header ?? <Box>Navbar</Box>}
          </Container>
        )}
      </Box>

      <Box as="main" flex="1" bg={debug.content} py={6}>
        {fullWidth ? (
          <Box>{children}</Box>
        ) : (
          <Container maxW="6xl">{children}</Container>
        )}
      </Box>

      <Box as="footer" bg={debug.footer} borderTop="1px solid" borderColor="gray.200">
        {fullWidth ? (
          <Box py={3}>{footer ?? <Box>Footer</Box>}</Box>
        ) : (
          <Container maxW="6xl" py={3}>
            {footer ?? <Box>Footer</Box>}
          </Container>
        )}
      </Box>
    </Flex>
  )
}


