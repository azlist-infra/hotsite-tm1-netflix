'use client'

import { deleteClientAction } from "@/app/api/clients";
import { ActionDeleteButton, toast } from "@/components/ui";


interface DeleteClientProps {
    clientId: string
    name: string
}

export function DeleteClient({ clientId, name }: DeleteClientProps) {

    const handleDeleteClient = async () => {
        const result = await deleteClientAction(clientId)

        if (result.success) {
            toast.success('Cliente removido com sucesso!')
        }
    }

    return (
        <>

            <ActionDeleteButton
                onDelete={handleDeleteClient}
                buttonText="Excluir Cliente"
                size="md"
                confirmMessage={
                    <>
                        Tem certeza que deseja excluir o cliente {name}?
                    </>
                }
                confirmMessageSecondary="Esta ação irá desativar o cliente no sistema (soft delete). Clientes com usuários ou eventos ativos não podem ser removidos."
            />

        </>
    )
}

