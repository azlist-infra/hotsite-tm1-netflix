'use client'

import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { debug } from "../debug"

type LayoutAppEventProps = {
  children: ReactNode
  header?: ReactNode
  sidebar?: ReactNode
  sidebarWidth?: string | number
}

export function LayoutAppEvent({ children, sidebar }: LayoutAppEventProps) {



  return (
    <>
      {/* Wrapper */}

      <Flex gap={6} align="stretch">
        <Box w={"320px"} bg={debug.sidebar} borderRight="1px solid" borderColor="gray.200" p={4}>
          {sidebar ?? <Box>Sidebar (menus do evento)</Box>}
        </Box>
        <Box flex="1">{children}</Box>
      </Flex>

    </ >
  )

}


