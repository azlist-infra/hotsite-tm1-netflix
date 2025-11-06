import React, { JSX } from 'react'
import { Button } from '@chakra-ui/react'

interface CustomSubmitButtonProps {
  children: React.ReactNode
  isLoading: boolean
}

export const CustomSubmitButton = ({ children, isLoading }: CustomSubmitButtonProps): JSX.Element => {
  return (
    <Button
      type="submit"
      w="185px"
      h="50px"
      flexShrink={0}
      borderRadius="10px"
      bg="#E50914"
      color="white"
      fontWeight="normal"
      fontSize="16px"
      _hover={{
        bg: '#F40612',
        transform: 'scale(1.02)',
        transition: 'all 0.2s ease-in-out'
      }}
      _active={{
        bg: '#B20710',
        transform: 'scale(0.98)'
      }}
      loading={isLoading}
      loadingText="Carregando..."
      disabled={isLoading}
    >
      {children}
    </Button>
  )
}

