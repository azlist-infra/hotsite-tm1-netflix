// Custom hook para formulário de criação de cliente
// Centraliza toda a lógica de submit, validação e navegação

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientAction } from '@/app/api/clients'
import { toast } from '@/components/ui'
import { createClientFormSchema } from '@/lib/validations/clients'
import type { CreateClientDto } from '@/app/api/clients'
import type { CreateClientFormInput } from '@/lib/validations/clients'

export function useClientCreateForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const form = useForm<CreateClientFormInput>({
        resolver: zodResolver(createClientFormSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
        },
    })

    const onSubmit = async (data: CreateClientFormInput) => {
        startTransition(async () => {
            try {
                // Transforma dados do formulário em DTO da API
                const clientData: CreateClientDto = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone || undefined,
                }

                const result = await createClientAction(clientData)

                if (result.success) {
                    toast.success('Cliente criado com sucesso!')
                    router.push('/app/admin/clients')
                    router.refresh()
                } else {
                    toast.error('Erro ao criar cliente', result.error)
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

