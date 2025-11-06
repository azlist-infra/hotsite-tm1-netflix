'use client'

import { Wrapper } from '@/layouts/wrapper'
import { Stack, Heading, Text, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { recoverySchema, type RecoveryFormData } from '@/components/modules/auth/schemas/auth'
import { InputEmail, BackToLogin } from '@/components/modules/auth'
import { SubmitButton } from '@/components/ui/button'
import { AuthCard } from '@/layouts/box/AuthCard'
import { useAuthRecovery } from '@/components/modules/auth/hooks/useAuthRecovery'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { Alert } from '@chakra-ui/react'

function RecoveryForm() {
  const searchParams = useSearchParams()
  const emailFromParams = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: emailFromParams || ''
    }
  })

  const { sendRecovery, isLoading, error, success } = useAuthRecovery()

  useEffect(() => {
    if (emailFromParams) {
      setValue('email', emailFromParams)
    }
  }, [emailFromParams, setValue])

  const onSubmit = async (data: RecoveryFormData) => {
    await sendRecovery(data.email)
  }

  const handleResend = handleSubmit(onSubmit)

  return (
    <>
      <Wrapper.Center justify="center">
        <AuthCard>
          <Stack gap={6}>
            <Stack gap={2}>
              <Heading as="h1" size="2xl" textAlign="center">
                Recuperar senha
              </Heading>
              <Text color="gray.600" textAlign="center" fontSize="sm" _dark={{ color: 'gray.400' }}>
                Digite seu e-mail para receber as instruções de recuperação
              </Text>
            </Stack>

            {success ? (
              <Stack gap={4}>
                <Alert.Root status="success" colorPalette="green">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>E-mail enviado com sucesso!</Alert.Title>
                    <Alert.Description>
                      Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root>

                <Button
                  variant="outline"
                  onClick={handleResend}
                  loading={isLoading}
                  disabled={isLoading}
                  width="full"
                >
                  Reenviar e-mail
                </Button>

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

                  <InputEmail
                    {...register('email')}
                    error={errors.email?.message}
                    isInvalid={!!errors.email}
                  />

                  <SubmitButton isLoading={isLoading}>
                    Enviar e-mail de recuperação
                  </SubmitButton>

                  <BackToLogin />
                </Stack>
              </form>
            )}
          </Stack>
        </AuthCard>
      </Wrapper.Center>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <Wrapper.Center justify="center">
        <AuthCard>
          <Stack gap={6}>
            <Heading as="h1" size="2xl" textAlign="center">
              Recuperar senha
            </Heading>
          </Stack>
        </AuthCard>
      </Wrapper.Center>
    }>
      <RecoveryForm />
    </Suspense>
  )
}
