'use client'

import { Button } from '@chakra-ui/react'

interface SubmitButtonProps {
  isLoading?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

export const SubmitButton = ({
  isLoading = false,
  disabled = false,
  children = 'Entrar'
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      width="full"
      colorPalette="primary"
      loading={isLoading}
      disabled={disabled || isLoading}
    >
      {children}
    </Button>
  )
}
