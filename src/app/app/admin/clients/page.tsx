// Página de listagem de clientes
// Apenas administradores podem acessar

import { Box, Flex } from '@chakra-ui/react'
import { LuInbox } from 'react-icons/lu'
import { getClientsAction } from '@/app/api/clients'
import { ClientsTable } from '@/components/modules/clients/ClientsTable'
import { ClientsFilters } from '@/components/modules/clients/ClientsFilters'
import { ErrorBox, EmptyState, AddButton } from '@/components/ui'
import { Wrapper } from '@/layouts/wrapper'
import { PageTitle } from '@/components/ui/text/PageTitle'
import { checkPermission } from '@/hooks/permission'
import { applyFilters, createBasicFilterConfig } from '@/lib/utils/filters'

interface ClientsPageProps {
    searchParams: Promise<{
        search?: string
        status?: string
    }>
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
    // ✅ Verifica permissão (apenas admin) - redireciona para /app se não tiver
    await checkPermission({ requireAdmin: true })

    // Busca clientes
    const result = await getClientsAction()
    const params = await searchParams
    
    // ✅ Aplica filtros de forma declarativa (1 linha!)
    const clients = applyFilters(
        result.data || [],
        params,
        createBasicFilterConfig(['name', 'email'], 'isActive')
    )


    if (!result.success) {
        return (
            <Wrapper.Full bg="green.200" p={4}>
                <ErrorBox title="Erro ao Carregar Clientes">
                    {result.error}
                </ErrorBox>
            </Wrapper.Full>
        )
    }

    return (
        <Wrapper.MaxWidth bg="transparent" p={4}>
            {/* Header */}
            <Flex justify="space-between" align="center" h="80px">
                <PageTitle title="Gerenciamento de Clientes"  />

                <AddButton href="/app/admin/clients/new" text="Novo Cliente" />
            </Flex>

            {/* Filtros */}


            {/* Tabela ou Empty State */}
            <EmptyState
                len={result.data?.length}
                icon={<LuInbox />}
                title="Nenhum cliente encontrado"
                description="Comece criando seu primeiro cliente para gerenciar empresas no sistema"
                action={<AddButton href="/app/admin/clients/new" text="Criar Primeiro Cliente" />}
            />

            {/* If there are clients, show the table */}
            {result.data && (
                <>
                    <Box mb={6}>
                        <ClientsFilters />
                    </Box>

                    <ClientsTable clients={clients} />
                </>
            )}


        </Wrapper.MaxWidth>
    )
}

