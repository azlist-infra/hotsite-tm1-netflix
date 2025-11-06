'use client'

import { Button } from '@chakra-ui/react'
import { ComponentPropsWithoutRef } from 'react'

interface HighlightButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  isLoading?: boolean
  children?: React.ReactNode
}

export const HighlightButton = ({
  isLoading = false,
  children,
  ...rest
}: HighlightButtonProps) => {
  return (
    <Button
      type="button"
      width="full"
      size="xl"
      colorPalette="primary"
      loading={isLoading}
      disabled={isLoading}
      fontSize="lg"
      fontWeight="bold"
      py={7}
      {...rest}
    >
      {children}
    </Button>
  )
}
