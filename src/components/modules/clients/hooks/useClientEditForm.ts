// Custom hook para formulário de edição de cliente
// Centraliza toda a lógica de submit, validação e navegação

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateClientAction } from '@/app/api/clients'
import { toast } from '@/components/ui'
import { updateClientFormSchema } from '@/lib/validations/clients'
import type { Client, UpdateClientDto } from '@/app/api/clients'
import type { UpdateClientFormInput } from '@/lib/validations/clients'

export function useClientEditForm(client: Client) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const form = useForm<UpdateClientFormInput>({
        resolver: zodResolver(updateClientFormSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
        defaultValues: {
            name: client.name,
            email: client.email,
            phone: client.phone || '',
            isActive: client.isActive,
        },
    })

    const onSubmit = async (data: UpdateClientFormInput) => {
        startTransition(async () => {
            try {
                // Transforma dados do formulário em DTO da API
                const updateData: UpdateClientDto = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone || undefined,
                    isActive: data.isActive,
                }

                const result = await updateClientAction(client._id, updateData)

                if (result.success) {
                    toast.success('Cliente atualizado com sucesso!')
                    router.push(`/app/admin/clients/${client._id}`)
                    router.refresh()
                } else {
                    toast.error('Erro ao atualizar cliente', result.error)
                }
            } catch {
                toast.error('Erro inesperado', 'Tente novamente.')
            }
        })
    }

    const isLoading = isPending || form.formState.isSubmitting

    return {
        form,
        onSubmit,
        isLoading,
    }
}

