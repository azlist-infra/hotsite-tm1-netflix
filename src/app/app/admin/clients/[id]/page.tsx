// Página de detalhes do cliente

import { checkPermission } from '@/hooks/permission'
import { Wrapper } from '@/layouts/wrapper'
import { ActionButton, BackButton, ErrorBox } from '@/components/ui'
import { getClientByIdAction } from '@/app/api/clients'
import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import { ClientDetailsCard } from '@/components/modules/clients'
import { DeleteClient } from './DeleteClient'

interface ClientDetailPageProps {
    params: Promise<{
        id: string
    }>
}



export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
    // ✅ Verifica permissão no servidor (apenas admin)
    await checkPermission({ requireAdmin: true })

    const { id } = await params



    const result = await getClientByIdAction(id)

    if (!result.success) {
        return <ErrorBox title="Cliente Não Encontrado" message={result.error} />
    }

    const client = result.data

    if (!client) {
        return <ErrorBox title="Cliente Não Encontrado" message="Cliente não encontrado" />
    }




    return (
        <Wrapper.Full bg="green.200" p={4}>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Heading size="xl" mb={2}>
                        Detalhes do Cliente
                    </Heading>
                    <Text color="gray.600">Visualize as informações completas</Text>
                </Box>

                <Flex gap={2}>
                    <ActionButton
                        action="edit"
                        href={`/app/admin/clients/${client._id}/edit`}
                        size="md"
                    />

                    <DeleteClient clientId={client._id} name={client.name} />
                </Flex>
            </Flex>

            {/* Card de Detalhes */}
            <ClientDetailsCard client={client} />

            {/* Voltar */}
            <Box mt={6}>
                <BackButton href="/app/admin/clients" label="← Voltar para lista" />
            </Box>
        </Wrapper.Full>
    )
}

