'use client'

import { Box, VStack, Text, Link } from "@chakra-ui/react"

const SidebarDocsItems = [

    {
        label: "Text",
        href: "/docs/text"
    },
    {
        label: "Fonts",
        href: "/docs/fonts"
    },
    {
        label: "Colors",
        href: "/docs/colors"
    },
    {
        label: "Logo",
        href: "/docs/logo"
    },
    {
        label: "Images",
        href: "/docs/images"
    },
    {
        label: "Icons",
        href: "/docs/icons"
    },
    {
        label: "Button",
        href: "/docs/button"
    },
    {
        label: "Input",
        href: "/docs/input"
    },

]

const SidebarDocsItem = ({ label, href }: { label: string, href: string }) => {
    return (
        <Link href={href}>
            <Text>{label}</Text>
        </Link>
    )
}


export function SidebarDocs() {
    return (
        <Box 
            bg="white" 
            p={3} 
            border="1px solid" 
            borderColor="gray.200" 
        >
            <VStack align="stretch" gap={3} >
                <Text fontWeight="bold">Documentação</Text>
                {SidebarDocsItems.map((item) => (
                    <SidebarDocsItem key={item.href} label={item.label} href={item.href} />
                ))}
            </VStack>
        </Box>
    )
}


