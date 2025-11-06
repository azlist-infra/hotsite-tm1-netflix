// Página de edição de cliente

import { checkPermission } from '@/hooks/permission'
import { getClientByIdAction } from '@/app/api/clients'
import { ErrorBox } from '@/components/ui'
import { ClientEditForm } from '@/components/modules/clients/ClientEditForm'
import { Wrapper } from '@/layouts/wrapper'
import { PageTitle } from '@/components/ui/text/PageTitle'
import { Card } from '@/layouts/box'

interface ClientEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClientEditPage({ params }: ClientEditPageProps) {
  // ✅ Verifica permissão no servidor (apenas admin)
  await checkPermission({ requireAdmin: true })

  // Obtém o ID do cliente
  const { id } = await params

  // Busca o cliente na API pelo ID
  const result = await getClientByIdAction(id)
  
  // Tratamento de erro
  if (!result.success || !result.data) {
    return <ErrorBox title="Cliente Não Encontrado" message={result.error} />
  }

  // Dados do cliente
  const client = result.data

  return (
    <Wrapper.Center>
      <PageTitle title="Editar Cliente" description={`${client.name}`} align="center" />

      <Card w="full" mt={6}>
        <ClientEditForm client={client} />
      </Card>
    </Wrapper.Center>
  )
}

