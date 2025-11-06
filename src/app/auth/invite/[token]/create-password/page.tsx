'use client'

import { Wrapper } from '@/layouts/wrapper'
import { Stack, Heading, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inviteCreateAccountSchema, type InviteCreateAccountFormData } from '@/components/modules/auth/schemas/auth'
import { InputName, InputPassword, InputPasswordConfirm, BackToLogin } from '@/components/modules/auth'
import { SubmitButton } from '@/components/ui/button'
import { AuthCard } from '@/layouts/box/AuthCard'
import { useInviteAccept } from '@/components/modules/auth/hooks/useInviteAccept'
import { Alert } from '@chakra-ui/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InviteCreateAccountFormData>({
    resolver: zodResolver(inviteCreateAccountSchema)
  })

  const { acceptInvite, isLoading, error, success } = useInviteAccept()

  useEffect(() => {
    if (success) {
      // Redireciona para login após 3 segundos
      const timeout = setTimeout(() => {
        router.push('/auth/login')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [success, router])

  const onSubmit = async (data: InviteCreateAccountFormData) => {
    await acceptInvite(token, data.name, data.password)
  }

  return (
    <Wrapper.Center justify="center">
      <AuthCard>
        <Stack gap={6}>
          <Stack gap={2}>
            <Heading as="h1" size="2xl" textAlign="center">
              Complete seu cadastro
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="sm" _dark={{ color: 'gray.400' }}>
              Preencha seus dados para criar sua conta
            </Text>
          </Stack>

          {success ? (
            <Stack gap={4}>
              <Alert.Root status="success" colorPalette="green">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Conta criada com sucesso!</Alert.Title>
                  <Alert.Description>
                    Você será redirecionado para a página de login em instantes...
                  </Alert.Description>
                </Alert.Content>
              </Alert.Root>

              <BackToLogin />
            </Stack>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={4}>
                {error && (
                  <Alert.Root status="error" colorPalette="red">
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Description>{error}</Alert.Description>
                    </Alert.Content>
                  </Alert.Root>
                )}

                <InputName
                  {...register('name')}
                  error={errors.name?.message}
                  isInvalid={!!errors.name}
                />

                <InputPassword
                  {...register('password')}
                  error={errors.password?.message}
                  isInvalid={!!errors.password}
                />

                <InputPasswordConfirm
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword}
                />

                <SubmitButton isLoading={isLoading}>
                  Cadastrar
                </SubmitButton>

                <BackToLogin />
              </Stack>
            </form>
          )}
        </Stack>
      </AuthCard>
    </Wrapper.Center>
  )
}
