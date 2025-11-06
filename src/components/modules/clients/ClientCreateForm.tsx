'use client'

// Formulário de criação de cliente

import { Stack, Button } from '@chakra-ui/react'
import { TextField, EmailField, PhoneField } from '@/components/forms/fields'
import { useClientCreateForm } from './hooks'

export function ClientCreateForm() {
    const { form, onSubmit, isLoading } = useClientCreateForm()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <Stack gap={4} align="stretch">
                {/* Nome */}
                <TextField
                    name="name"
                    control={form.control}
                    label="Nome da Empresa"
                    placeholder="Digite o nome da empresa"
                    disabled={isLoading}
                    required
                />

                {/* Email */}
                <EmailField
                    name="email"
                    control={form.control}
                    placeholder="contato@empresa.com"
                    disabled={isLoading}
                    required
                />

                {/* Telefone */}
                <PhoneField
                    name="phone"
                    control={form.control}
                    disabled={isLoading}
                    helperText="Opcional"
                />

                {/* Botão Submit */}
                <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    loading={isLoading}
                    loadingText="Criando..."
                >
                    Criar Cliente
                </Button>
            </Stack>
        </form>
    )
}

