'use client'

import { Wrapper } from '@/layouts/wrapper'
import { Box, Stack, Heading } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/components/modules/auth/schemas/auth'
import { InputEmail, InputPassword, RecoveryLink } from '@/components/modules/auth'
import { SubmitButton } from '@/components/ui/button'
import { AuthCard } from '@/layouts/box/AuthCard'
import { loginAction } from '@/app/api/auth'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from '@/components/ui'

export default function Page() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const emailValue = watch('email')

  const onSubmit = async (data: LoginFormData) => {
    setError('') // Limpa erros anteriores

    startTransition(async () => {
      try {
        const result = await loginAction({
          email: data.email,
          password: data.password,
        })

        if (result.success) {
          // Login bem-sucedido!
          // ✅ Sucesso
          //alert('Login realizado!')
          toast.success('Login realizado!', `Bem-vindo, ${result.data?.user.name}`)

          // Redireciona para o dashboard
          router.push('/app')
          router.refresh() // Atualiza os Server Components
        } else {
          // Login falhou
          //alert('Erro no login')
          setError(result.error || 'Erro ao fazer login')

          // Opcional: Toast de erro
          toast.error('Erro no login', result.error || 'Verifique suas credenciais')

        }
      } catch (err) {
        console.error('Erro inesperado:', err)
        setError('Erro inesperado. Tente novamente.')
      }
    })
  }

  const isLoading = isPending || isSubmitting

  return (
    <>
      <Wrapper.Center justify="center">
        <AuthCard>
          <Stack gap={6}>
            <Heading as="h1" size="2xl" textAlign="center">
              Login
            </Heading>

            {/* Mensagem de erro global */}
            {error && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                border="1px solid"
                borderColor="red.200"
              >
                <Box color="red.800" fontSize="sm">
                  {error}
                </Box>
              </Box>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={4}>
                <InputEmail
                  {...register('email')}
                  error={errors.email?.message}
                  isInvalid={!!errors.email}
                  disabled={isLoading}
                />

                <InputPassword
                  {...register('password')}
                  error={errors.password?.message}
                  isInvalid={!!errors.password}
                  disabled={isLoading}
                />

                <RecoveryLink email={emailValue} />

                <SubmitButton isLoading={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </SubmitButton>
              </Stack>
            </form>
          </Stack>
        </AuthCard>
      </Wrapper.Center>
    </>
  )
}


/*

admin (superadmin)
admin@azlist.com.br
azlist@24

Manager ( gestor de conta)
manager@empresa.com
azlist@24

User (user comum)
user@empresa.com
azlist@24

User Company (user vinculado a uma empresa)
company@empresa.com
azlist@24

*/