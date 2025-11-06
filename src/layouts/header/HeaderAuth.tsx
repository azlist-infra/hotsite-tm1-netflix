'use client'

import { Flex } from "@chakra-ui/react"
import { debug } from "@/layouts/debug"
import { NavMobile } from "@/layouts/header"
import { Logo } from "@/components/ui"
import { NavDesktop } from "@/layouts/header"

export function HeaderAuth() {
    return (
        <>
            <NavMobile />
            <Flex
                as="header"
                align="center"
                justify="center"
                //bg={debug.header}
                borderBottom="0px solid"
            >
                <Flex
                    align="center"
                    justify="center"
                    position="relative"
                    minW={{ base: "100%", md: "100%" }}
                    minH={{ base: "100px", md: "80px" }}
                    py={4}
                    bgColor={debug.color.green}
                >
                    <NavDesktop />
                    <Logo.Main href="/" size="xl" />
                </Flex>
            </Flex>
        </>
    )
}


