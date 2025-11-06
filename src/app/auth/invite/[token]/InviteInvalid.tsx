'use client'

import { Wrapper } from '@/layouts/wrapper'
import { Stack, Heading } from '@chakra-ui/react'
import { BackToLogin } from '@/components/modules/auth'
import { AuthCard } from '@/layouts/box/AuthCard'
import { Alert } from '@chakra-ui/react'

export function InviteInvalid() {
  return (
    <Wrapper.Center justify="center">
      <AuthCard maxW="500px">
        <Stack gap={6}>
          <Stack gap={4} textAlign="center">
            <Heading as="h1" size="2xl">
              Convite Inválido
            </Heading>
          </Stack>

          <Alert.Root status="error" colorPalette="red">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Token inválido ou expirado</Alert.Title>
              <Alert.Description>
                O link de convite que você está tentando acessar não é válido ou já expirou.
                Entre em contato com o organizador do evento para receber um novo convite.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <BackToLogin />
        </Stack>
      </AuthCard>
    </Wrapper.Center>
  )
}
