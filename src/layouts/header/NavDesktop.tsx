'use client'


import { BackButton } from "@/components/ui/button/BackButton";
import { Box } from "@chakra-ui/react";


export function NavDesktop() {
    return (
        <Box
            position="absolute"
            left="20%"
            top="50%"
            transform="translateY(-50%)"
            display={{ base: "none", md: "block" }}
        >
            <BackButton onBack={() => { }} />
        </Box>
    )
}

