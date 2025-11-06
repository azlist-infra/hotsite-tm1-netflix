'use client'

// Formulário de alteração de senha

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Stack, Box, Field, Text, List } from '@chakra-ui/react'
import { InputPassword } from '@/components/modules/auth'
import { SubmitButton } from '@/components/ui/button'
import { changePasswordAction } from '@/app/api/users'

// Schema de validação
const passwordChangeSchema = z.object({
    currentPassword: z.string().min(6, 'Senha atual deve ter no mínimo 6 caracteres'),
    newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmação deve ter no mínimo 6 caracteres'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Nova senha e confirmação devem ser iguais',
    path: ['confirmPassword'],
})

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>

interface PasswordChangeFormProps {
    userId: string
}

export function PasswordChangeForm({ userId }: PasswordChangeFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PasswordChangeFormData>({
        resolver: zodResolver(passwordChangeSchema),
    })

    const onSubmit = async (data: PasswordChangeFormData) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            try {
                const result = await changePasswordAction(userId, {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                })

                if (result.success) {
                    setSuccess('Senha alterada com sucesso!')
                    reset()

                    // Aguarda 2 segundos e redireciona
                    setTimeout(() => {
                        router.push('/app/profile')
                    }, 2000)
                } else {
                    setError(result.error || 'Erro ao alterar senha')
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

                {/* Senha Atual */}
                <Field.Root invalid={!!errors.currentPassword}>
                    <Field.Label>Senha Atual</Field.Label>
                    <InputPassword
                        id="currentPassword"
                        {...register('currentPassword')}
                        error={errors.currentPassword?.message}
                        isInvalid={!!errors.currentPassword}
                        disabled={isLoading}
                        placeholder="Digite sua senha atual"
                    />
                </Field.Root>

                {/* Nova Senha */}
                <Field.Root invalid={!!errors.newPassword}>
                    <Field.Label>Nova Senha</Field.Label>
                    <InputPassword
                        id="newPassword"
                        {...register('newPassword')}
                        error={errors.newPassword?.message}
                        isInvalid={!!errors.newPassword}
                        disabled={isLoading}
                        placeholder="Digite sua nova senha"
                    />
                </Field.Root>

                {/* Confirmar Nova Senha */}
                <Field.Root invalid={!!errors.confirmPassword}>
                    <Field.Label>Confirmar Nova Senha</Field.Label>
                    <InputPassword
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                        isInvalid={!!errors.confirmPassword}
                        disabled={isLoading}
                        placeholder="Confirme sua nova senha"
                    />
                </Field.Root>

                {/* Dicas de Segurança */}
                <Box
                    p={3}
                    bg="blue.50"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="blue.200"
                >
                    <Text fontSize="sm" color="blue.800" fontWeight="semibold" mb={2}>
                        💡 Dicas para uma senha segura:
                    </Text>
                    <List.Root as="ul" fontSize="sm" color="blue.700" gap={1} ml={4}>
                        <List.Item>Use no mínimo 8 caracteres (6 é o mínimo)</List.Item>
                        <List.Item>Combine letras maiúsculas e minúsculas</List.Item>
                        <List.Item>Inclua números e símbolos especiais</List.Item>
                        <List.Item>Evite informações pessoais óbvias</List.Item>
                        <List.Item>Não reutilize senhas de outros sites</List.Item>
                    </List.Root>
                </Box>

                {/* Botão de Submeter */}
                <SubmitButton isLoading={isLoading}>
                    {isLoading ? 'Alterando...' : 'Alterar Senha'}
                </SubmitButton>
            </Stack>
        </form>
    )
}