'use client'

import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export const BackToLogin = () => {
  return (
    <Link
      asChild
      color="gray.500"
      fontSize="sm"
      textAlign="center"
      _hover={{ textDecoration: 'underline', color: 'gray.700' }}
      _dark={{
        color: 'gray.400',
        _hover: { color: 'gray.200' }
      }}
    >
      <NextLink href="/auth/login">
        Voltar para o login
      </NextLink>
    </Link>
  )
}
