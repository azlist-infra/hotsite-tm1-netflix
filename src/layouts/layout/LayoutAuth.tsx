'use client'

import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { HeaderAuth } from "@/layouts/header"




type LayoutAuthProps = {
    children: ReactNode
    onBack?: () => void
    backSlot?: ReactNode
    logoSlot?: ReactNode
    logoHref?: string | null
}


export function LayoutAuth({ children }: LayoutAuthProps) {
    return (
        <>

            {/* Wrapper */}
            <Flex
                direction="column"
                minH="100vh"
                bg="gray.100"
                //bg={debug.main}
            >

                {/* Header */}
                <HeaderAuth />

                {/* Main */}
                <Flex
                    as="main"
                    flex="1"
                    align="center"
                    justify="center"
                    py={8}
                    px={{ base: 2, md: 8 }}
                    //bg={debug.color.gray}
                >
                    {/* Content */}
                    <Box>{children}</Box>

                </Flex>
            </Flex>
        </>
    )
}