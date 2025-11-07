'use client'

import { Box, Container, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { FooterHotsite } from "../footer/FooterHotsite"

type LayoutHotsitetProps = {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  fullWidth?: boolean
}

export function LayoutHotsite({ children, footer, fullWidth }: LayoutHotsitetProps) {
  return (
    <Flex direction="column" minH="100vh" bgColor="transparent">
      
      <Flex as="main" flex="1" align="stretch" justify="center">
        {fullWidth ? (
          <>{children}</>
        ) : (
          <Container maxW="6xl" bgColor="green">{children}</Container>
        )}
      </Flex>


      <Box as="footer">
        {footer ?? <FooterHotsite />}
      </Box>
    </Flex>
  )
}


