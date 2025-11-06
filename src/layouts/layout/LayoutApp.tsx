

import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { debug } from "../debug"

import { HeaderApp } from "@/layouts/header"


type LayoutAppProps = {
  children: ReactNode
  header?: ReactNode
}



export function LayoutApp({ children, header }: LayoutAppProps) {

  // Default Header (if not provided a custom header from props)
  const HeaderDefault = () => header ?? <HeaderApp />


  return (
    <>
      {/* Wrapper */}
      <Flex direction="column" minH="100vh" bg={debug.color.transparent}>

        {/* Header */}
        < HeaderDefault />

        {/* Main */}
        <Flex
          as="main"
          flex="1"
          align="stretch"
          justify="stretch"
          w="100%"
          py={2}
          px={{ base: 2, md: 2 }}
          bg={debug.color.transparent}
        >
          {/* Content */}
          <Box w="100%" bg="gray.50">
            {children}
          </Box>
        </Flex>
      </Flex >
    </ >
  )
}


