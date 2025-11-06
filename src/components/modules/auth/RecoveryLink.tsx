'use client'

import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

interface RecoveryLinkProps {
  email?: string
}

export const RecoveryLink = ({ email }: RecoveryLinkProps) => {
  const href = email
    ? `/auth/recovery?email=${encodeURIComponent(email)}`
    : '/auth/recovery'

  return (
    <Link
      asChild
      color="primary.500"
      fontSize="sm"
      textAlign="right"
      _hover={{ textDecoration: 'underline' }}
    >
      <NextLink href={href}>
        Esqueceu sua senha?
      </NextLink>
    </Link>
  )
}
