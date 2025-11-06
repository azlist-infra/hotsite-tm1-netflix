'use client'

import { Wrapper } from '@/layouts/wrapper'
import { Stack, Heading, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/components/modules/auth/schemas/auth'
import { InputPassword, InputPasswordConfirm, BackToLogin } from '@/components/modules/auth'
import { SubmitButton } from '@/components/ui/button'
import { AuthCard } from '@/layouts/box/AuthCard'
import { usePasswordReset } from '@/components/modules/auth/hooks/usePasswordReset'
import { Alert } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ResetPasswordFormProps {
  token: string
  userName: string
}

export function ResetPasswordForm({ token, userName }: ResetPasswordFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const { resetPassword, isLoading, error, success } = usePasswordReset()

  useEffect(() => {
    if (success) {
      // Redireciona para login após 3 segundos
      const timeout = setTimeout(() => {
        router.push('/auth/login')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [success, router])

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPassword(token, data.password)
  }

  return (
    <Wrapper.Center justify="center">
      <AuthCard>
        <Stack gap={6}>
          <Stack gap={2}>
            <Heading as="h1" size="2xl" textAlign="center">
              Olá, {userName}!
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="sm" _dark={{ color: 'gray.400' }}>
              Digite sua nova senha abaixo
            </Text>
          </Stack>

          {success ? (
            <Stack gap={4}>
              <Alert.Root status="success" colorPalette="green">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Senha redefinida com sucesso!</Alert.Title>
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
                  Redefinir senha
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
