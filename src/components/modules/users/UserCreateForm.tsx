'use client'

// Formulário de criação de usuário

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
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'
import { createUserAction } from '@/app/api/users'
import type { CreateUserDto } from '@/app/api/users'
import { ClientSelect } from '@/components/modules/clients'

// Schema de validação
const createUserSchema = z.object({
    clientId: z.string().min(1, 'Cliente é obrigatório'),
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    role: z.enum(['company', 'user']),
})

type CreateUserFormData = z.infer<typeof createUserSchema>

export function UserCreateForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
    })

    const onSubmit = async (data: CreateUserFormData) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            try {
                const result = await createUserAction(data as CreateUserDto)

                if (result.success) {
                    setSuccess('Usuário criado com sucesso!')

                    // Aguarda 2 segundos e redireciona
                    setTimeout(() => {
                        router.push('/app/users')
                        router.refresh()
                    }, 2000)
                } else {
                    setError(result.error || 'Erro ao criar usuário')
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

                {/* Senha */}
                <Field.Root invalid={!!errors.password} required>
                    <Field.Label>Senha</Field.Label>
                    <Input
                        {...register('password')}
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                    )}
                </Field.Root>

                {/* Cliente */}
                <ClientSelect
                    {...register('clientId')}
                    error={errors.clientId?.message}
                    isInvalid={!!errors.clientId}
                    disabled={isLoading}
                    required
                />

                {/* Role */}
                <Field.Root invalid={!!errors.role} required>
                    <Field.Label>Função (Role)</Field.Label>
                    <NativeSelectRoot>
                        <NativeSelectField
                            {...register('role')}
                            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                        >
                            <option value="">Selecione a função</option>
                            <option value="company">Empresa (Company)</option>
                            <option value="user">Usuário (User)</option>
                        </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.role && (
                        <Field.ErrorText>{errors.role.message}</Field.ErrorText>
                    )}
                    <Field.HelperText>
                        ⚠️ Apenas roles &quot;company&quot; e &quot;user&quot; são permitidos na criação.
                        Para roles admin/manager, use a opção de privilégios após criar.
                    </Field.HelperText>
                </Field.Root>

                {/* Alerta Informativo */}
                <Alert.Root status="info">
                    <Alert.Indicator />
                    <Box>
                        <Alert.Description fontSize="sm">
                            <strong>📝 Nota:</strong> Para promover um usuário a Admin ou Manager,
                            primeiro crie-o como User ou Company, depois use a opção &quot;Gerenciar Privilégios&quot;.
                        </Alert.Description>
                    </Box>
                </Alert.Root>

                {/* Botão Submit */}
                <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    loading={isLoading}
                    loadingText="Criando..."
                >
                    Criar Usuário
                </Button>
            </Stack>
        </form>
    )
}
