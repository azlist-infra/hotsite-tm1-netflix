'use client'

import { Box, VStack, Text } from "@chakra-ui/react"

export function SidebarEvent() {
  return (
    <Box>
      <VStack align="stretch" gap={3}>
        <Text fontWeight="bold">Sidebar Evento</Text>
        <Box bg="white" p={3} border="1px solid" borderColor="gray.200">Item 1</Box>
        <Box bg="white" p={3} border="1px solid" borderColor="gray.200">Item 2</Box>
        <Box bg="white" p={3} border="1px solid" borderColor="gray.200">Item 3</Box>
      </VStack>
    </Box>
  )
}


