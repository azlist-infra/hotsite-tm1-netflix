'use client'

// Formulário de edição de usuário

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Stack,
    Field,
    Input,
    Button,
    Alert,
    Box,
} from '@chakra-ui/react'
import { updateUserAction } from '@/app/api/users'
import type { User } from '@/app/api/users'

// Schema de validação
const updateUserSchema = z.object({
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
    email: z.string().email('Email inválido'),
})

type UpdateUserFormData = z.infer<typeof updateUserSchema>

interface UserEditFormProps {
    user: User
}

export function UserEditForm({ user }: UserEditFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    const onSubmit = async (data: UpdateUserFormData) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            try {
                const result = await updateUserAction(user._id, {
                    name: data.name,
                    email: data.email,
                })

                if (result.success) {
                    setSuccess('Usuário atualizado com sucesso!')

                    // Aguarda 2 segundos e redireciona
                    setTimeout(() => {
                        router.push(`/app/users/${user._id}`)
                        router.refresh()
                    }, 2000)
                } else {
                    setError(result.error || 'Erro ao atualizar usuário')
                }
            } catch {
                setError('Erro inesperado. Tente novamente.')
            }
        })
    }

    const isLoading = isPending || isSubmitting

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4} align="stretch">
                {/* Mensagem de erro */}
                {error && (
                    <Alert.Root status="error">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Description>{error}</Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                )}

                {/* Mensagem de sucesso */}
                {success && (
                    <Alert.Root status="success">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Description>{success}</Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                )}

                {/* Nome */}
                <Field.Root invalid={!!errors.name} required>
                    <Field.Label>Nome Completo</Field.Label>
                    <Input
                        {...register('name')}
                        placeholder="Digite o nome completo"
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                </Field.Root>

                {/* Email */}
                <Field.Root invalid={!!errors.email} required>
                    <Field.Label>Email</Field.Label>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="usuario@exemplo.com"
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                    )}
                </Field.Root>

                {/* Alerta sobre campos bloqueados */}
                <Alert.Root status="info">
                    <Alert.Indicator />
                    <Box>
                        <Alert.Description fontSize="sm">
                            <strong>ℹ️ Nota:</strong> Você não pode alterar o role ou status de administrador nesta tela.
                            Use a opção &quot;Gerenciar Privilégios&quot; se for um administrador do sistema.
                        </Alert.Description>
                    </Box>
                </Alert.Root>

                {/* Botão Submit */}
                <Button
                    type="submit"
                    colorPalette="green"
                    size="lg"
                    loading={isLoading}
                    loadingText="Salvando..."
                >
                    Salvar Alterações
                </Button>
            </Stack>
        </form>
    )
}
