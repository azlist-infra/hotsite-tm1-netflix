'use client'

// Formulário de atualização de privilégios (APENAS ADMIN)

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Stack,
    Field,
    Button,
    Alert,
    Text,
    Box,
    Checkbox,
} from '@chakra-ui/react'
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'
import { updatePrivilegesAction } from '@/app/api/users'
import type { User } from '@/app/api/users'

// Schema de validação
const privilegesSchema = z.object({
    role: z.enum(['admin', 'manager', 'company', 'user']),
    isAdmin: z.boolean(),
})

type PrivilegesFormData = z.infer<typeof privilegesSchema>

interface UserPrivilegesFormProps {
    user: User
}

export function UserPrivilegesForm({ user }: UserPrivilegesFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<PrivilegesFormData>({
        resolver: zodResolver(privilegesSchema),
        defaultValues: {
            role: user.role as 'admin' | 'manager' | 'company' | 'user',
            isAdmin: user.isAdmin,
        },
    })

    const watchedIsAdmin = watch('isAdmin')

    const onSubmit = async (data: PrivilegesFormData) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            try {
                const result = await updatePrivilegesAction(user._id, {
                    role: data.role as typeof user.role,
                    isAdmin: data.isAdmin,
                })

                if (result.success) {
                    setSuccess('Privilégios atualizados com sucesso!')

                    // Aguarda 2 segundos e redireciona
                    setTimeout(() => {
                        router.push(`/app/users/${user._id}`)
                        router.refresh()
                    }, 2000)
                } else {
                    setError(result.error || 'Erro ao atualizar privilégios')
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

                {/* Role */}
                <Field.Root invalid={!!errors.role} required>
                    <Field.Label>Função (Role)</Field.Label>
                    <NativeSelectRoot>
                        <NativeSelectField
                            {...register('role')}
                            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                        >
                            <option value="admin">Admin - Acesso total ao sistema</option>
                            <option value="manager">Manager - Acesso automático a eventos do cliente</option>
                            <option value="company">Company - Representa uma empresa</option>
                            <option value="user">User - Requer acesso específico a eventos</option>
                        </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.role && (
                        <Field.ErrorText>{errors.role.message}</Field.ErrorText>
                    )}
                    <Field.HelperText>
                        Define as permissões base do usuário no sistema
                    </Field.HelperText>
                </Field.Root>

                {/* isAdmin */}
                <Field.Root>
                    <Checkbox.Root
                        {...register('isAdmin')}
                        colorPalette="yellow"
                        disabled={isLoading}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                            <Text fontWeight="medium">Super Administrador</Text>
                        </Checkbox.Label>
                    </Checkbox.Root>
                    <Field.HelperText>
                        Concede privilégios especiais como gerenciar múltiplos clientes,
                        criar outros administradores e acessar relatórios globais
                    </Field.HelperText>
                </Field.Root>

                {/* Alertas Informativos */}
                {watchedIsAdmin && (
                    <Alert.Root status="warning">
                        <Alert.Indicator />
                        <Box>
                            <Alert.Description fontSize="sm">
                                <strong>⚠️ Atenção:</strong> Ao marcar como Super Admin, o usuário terá
                                acesso irrestrito a todas as funcionalidades do sistema, incluindo
                                gerenciamento de outros usuários e clientes.
                            </Alert.Description>
                        </Box>
                    </Alert.Root>
                )}

                <Alert.Root status="info">
                    <Alert.Indicator />
                    <Box>
                        <Alert.Description fontSize="sm">
                            <strong>💡 Dica:</strong> Role e isAdmin são independentes. Um usuário pode
                            ter role &quot;user&quot; mas ser isAdmin=true, concedendo privilégios administrativos
                            mesmo com role básico.
                        </Alert.Description>
                    </Box>
                </Alert.Root>

                {/* Botão Submit */}
                <Button
                    type="submit"
                    colorPalette="purple"
                    size="lg"
                    loading={isLoading}
                    loadingText="Atualizando..."
                >
                    Atualizar Privilégios
                </Button>
            </Stack>
        </form>
    )
}
