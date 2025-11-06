'use client'

import { Box, BoxProps } from '@chakra-ui/react'

interface AuthCardProps extends BoxProps {
  children: React.ReactNode
}

export const AuthCard = ({ children, ...rest }: AuthCardProps) => {
  return (
    <Box
      maxW="400px"
      w="full"
      p={8}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      {...rest}
    >
      {children}
    </Box>
  )
}
