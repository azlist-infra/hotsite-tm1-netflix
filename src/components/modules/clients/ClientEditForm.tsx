'use client'

// Formulário de edição de cliente

import { Stack, Button } from '@chakra-ui/react'
import { TextField, EmailField, PhoneField, CheckboxField } from '@/components/forms/fields'
import { useClientEditForm } from './hooks'
import type { Client } from '@/app/api/clients'
import { SubmitButton } from '@/components/ui'

interface ClientEditFormProps {
    client: Client
}

export function ClientEditForm({ client }: ClientEditFormProps) {
    const { form, onSubmit, isLoading } = useClientEditForm(client)

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

                {/* Status Ativo */}
                <CheckboxField
                    name="isActive"
                    control={form.control}
                    label="Cliente Ativo"
                    helperText="Desmarque para desativar o cliente no sistema"
                    colorPalette="green"
                    disabled={isLoading}
                />

                {/* Botão Submit */}
                <SubmitButton isLoading={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </SubmitButton>
            </Stack>
        </form>
    )
}

