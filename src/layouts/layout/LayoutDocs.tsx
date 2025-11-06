'use client'

import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { debug } from "../debug"
import { SidebarDocs } from "@/layouts/sidebar"

type LayoutDocsProps = {
    children: ReactNode
    header?: ReactNode
    sidebar?: ReactNode
    sidebarWidth?: string | number
}

export function LayoutDocs({ children, header, sidebarWidth = 320 }: LayoutDocsProps) {
    return (
        <Flex direction="column" minH="100vh">
            <Text>App Event</Text>
            <Box as="header" bg={debug.header} borderBottom="1px solid" borderColor="gray.200">
                <Container maxW="7xl" py={3}>{header ?? <Box>Header (Evento)</Box>}</Container>
            </Box>

            <Box as="main" flex="1" bg={debug.content} py={6} bgColor={debug.color.pink}>
                    <Flex
                        gap={6}
                        align="stretch"
                        bgColor={debug.color.cyan}
                    >
                        <Box w={sidebarWidth} bg={debug.sidebar} borderRight="2px solid red" p={4}>
                            <SidebarDocs />
                        </Box>
                        <Box flex="1">{children}</Box>
                    </Flex>
                
            </Box>
        </Flex>
    )
}


