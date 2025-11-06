'use client'

import { Wrapper } from '@/layouts/wrapper'
import { Stack, Heading, Text } from '@chakra-ui/react'
import { HighlightButton, BackToLogin } from '@/components/modules/auth'
import { AuthCard } from '@/layouts/box/AuthCard'
import { useRouter } from 'next/navigation'

interface InviteAcceptanceProps {
  token: string
  eventName: string
  organizerName: string
}

export function InviteAcceptance({ token, eventName, organizerName }: InviteAcceptanceProps) {
  const router = useRouter()

  const handleAccept = () => {
    router.push(`/auth/invite/${token}/create-password`)
  }

  return (
    <Wrapper.Center justify="center">
      <AuthCard maxW="500px">
        <Stack gap={8}>
          <Stack gap={4} textAlign="center">
            <Heading as="h1" size="3xl" color="primary.600">
              Você foi convidado!
            </Heading>

            <Stack gap={2}>
              <Text fontSize="xl" fontWeight="semibold">
                Evento: <Text as="span" color="primary.600">{eventName}</Text>
              </Text>
              <Text fontSize="md" color="gray.600" _dark={{ color: 'gray.400' }}>
                Organizador: {organizerName}
              </Text>
            </Stack>

            <Text color="gray.600" mt={4} _dark={{ color: 'gray.400' }}>
              Clique no botão abaixo para aceitar o convite e criar sua conta na plataforma.
            </Text>
          </Stack>

          <Stack gap={4}>
            <HighlightButton onClick={handleAccept}>
              Aceitar Convite
            </HighlightButton>

            <BackToLogin />
          </Stack>
        </Stack>
      </AuthCard>
    </Wrapper.Center>
  )
}
