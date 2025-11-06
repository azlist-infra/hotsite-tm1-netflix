'use client'

// Formulário de edição de perfil

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Stack, Box, Field, Input, Text } from '@chakra-ui/react'
import { InputEmail } from '@/components/modules/auth'
import { SubmitButton } from '@/components/ui/button'
import { updateUserAction } from '@/app/api/users'
import type { User } from '@/app/api/users'

// Schema de validação
const profileEditSchema = z.object({
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100, 'Nome muito longo'),
    email: z.string().email('Email inválido'),
})

type ProfileEditFormData = z.infer<typeof profileEditSchema>

interface ProfileEditFormProps {
    user: User
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileEditFormData>({
        resolver: zodResolver(profileEditSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    const onSubmit = async (data: ProfileEditFormData) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            try {
                const result = await updateUserAction(user._id, {
                    name: data.name,
                    email: data.email,
                })

                if (result.success) {
                    setSuccess('Perfil atualizado com sucesso!')

                    // Aguarda 2 segundos e redireciona
                    setTimeout(() => {
                        router.push('/app/profile')
                        router.refresh()
                    }, 2000)
                } else {
                    setError(result.error || 'Erro ao atualizar perfil')
                }
            } catch (err) {
                console.error('Erro inesperado:', err)
                setError('Erro inesperado. Tente novamente.')
            }
        })
    }

    const isLoading = isPending || isSubmitting

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
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

                {/* Mensagem de sucesso */}
                {success && (
                    <Box
                        p={4}
                        bg="green.50"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="green.200"
                    >
                        <Box color="green.800" fontSize="sm">
                            {success}
                        </Box>
                    </Box>
                )}

                {/* Campo Nome */}
                <Field.Root invalid={!!errors.name}>
                    <Field.Label>Nome Completo</Field.Label>
                    <Input
                        id="name"
                        type="text"
                        {...register('name')}
                        disabled={isLoading}
                        placeholder="Seu nome completo"
                    />
                    {errors.name && (
                        <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                </Field.Root>

                {/* Campo Email */}
                <InputEmail
                    {...register('email')}
                    error={errors.email?.message}
                    isInvalid={!!errors.email}
                    disabled={isLoading}
                />

                {/* Informação sobre campos bloqueados */}
                <Box
                    p={3}
                    bg="blue.50"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="blue.200"
                >
                    <Text fontSize="sm" color="blue.800">
                        <Text as="strong">ℹ️ Nota:</Text> Você não pode alterar seu role ou status de administrador.
                        Entre em contato com um administrador se precisar dessas alterações.
                    </Text>
                </Box>

                {/* Botão de Submeter */}
                <SubmitButton isLoading={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </SubmitButton>
            </Stack>
        </form>
    )
}