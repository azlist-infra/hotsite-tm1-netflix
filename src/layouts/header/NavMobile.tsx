'use client'

import { BackButton } from "@/components/ui/button/BackButton";
import { Box, Flex } from "@chakra-ui/react";


export function NavMobile() {
    return (
        <Flex display={{ base: "flex", md: "none" }}>
            <Box>
                <BackButton onBack={() => { }} />
            </Box>
        </Flex>
    )
}