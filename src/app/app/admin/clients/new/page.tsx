// Página de criação de novo cliente

import { ClientCreateForm } from '@/components/modules/clients/ClientCreateForm'
import { FormPageLayout } from '@/components/ui'
import { Wrapper } from '@/layouts/wrapper'
import { checkPermission } from '@/hooks/permission'

export default async function NewClientPage() {
    // ✅ Verifica permissão no servidor (apenas admin)
    await checkPermission({ requireAdmin: true })

    return (
        <Wrapper.Center maxW="11/12" p={4}>
            <FormPageLayout
                title="Criar Novo Cliente"
                description="Preencha os dados abaixo para criar uma nova empresa cliente"
                backHref="/app/admin/clients"
                backLabel="← Voltar para lista"
            >
                <ClientCreateForm />
            </FormPageLayout>
        </Wrapper.Center>
    )
}

