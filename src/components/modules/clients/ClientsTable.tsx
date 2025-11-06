// Tabela de clientes com ações
'use client'


// Chakra UI
import { Table, Box, Text, Group } from '@chakra-ui/react'

// Components - UI
import { ActiveStatusBadge } from '@/components/ui/badge'
import { ActionButton, ActionDeleteButton, TableText, TableLink } from '@/components/ui'
import { toast } from '@/components/ui/toast'

// API  
import { deleteClientAction, Client } from '@/app/api/clients'

// Next
import { useRouter } from 'next/navigation'


interface ClientsTableProps {
    clients: Client[]
}

export function ClientsTable({ clients }: ClientsTableProps) {
    const router = useRouter()

    const handleDeleteClient = async (clientId: string) => {
        const result = await deleteClientAction(clientId)

        if (result.success) {
            toast.success('Cliente removido com sucesso!')
            router.refresh()
        } else {
            toast.error('Erro ao remover cliente', result.error)
        }
    }


    return (
        <Box bg="white" borderRadius="md" borderWidth={1} overflow="hidden" shadow="sm">

            <Table.Root size="lg" variant="line">
                <Table.Header bg="gray.50">
                    <Table.Row borderBottomWidth={1} borderColor="gray.200" bg="gray.100">
                        <Table.ColumnHeader>Nome</Table.ColumnHeader>
                        <Table.ColumnHeader hideBelow="md">Email</Table.ColumnHeader>
                        <Table.ColumnHeader hideBelow="lg">Telefone</Table.ColumnHeader>
                        <Table.ColumnHeader hideBelow="sm">Status</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="right">Ações</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body >
                    {clients.map((client) => (
                        <Table.Row key={client._id} _hover={{ bg: 'gray.50' }}>
                            {/* Nome */}
                            <Table.Cell>
                                <TableLink href={`/app/admin/clients/${client._id}`}>
                                    {client.name}
                                </TableLink>
                                {/* Email visível em mobile */}
                                <TableText hideFrom="md" fontSize="sm" color="gray.600">
                                    {client.email}
                                </TableText>
                            </Table.Cell>

                            {/* Email */}
                            <Table.Cell hideBelow="md">
                                <TableText weight="light">{client.email}</TableText>
                            </Table.Cell>

                            {/* Telefone */}
                            <Table.Cell hideBelow="lg">
                                <TableText weight="bold">{client.phone}</TableText>
                            </Table.Cell>

                            {/* Status */}
                            <Table.Cell hideBelow="sm">
                                <ActiveStatusBadge isActive={client.isActive} />
                            </Table.Cell>

                            {/* Ações */}
                            <Table.Cell textAlign="right">
                                <Group gap={2}>
                                    {/* Ver */}
                                    <ActionButton
                                        action="view"
                                        href={`/app/admin/clients/${client._id}`}
                                    />

                                    {/* Editar */}
                                    <ActionButton
                                        action="edit"
                                        href={`/app/admin/clients/${client._id}/edit`}
                                    />

                                    {/* Excluir */}
                                    <ActionDeleteButton
                                        onDelete={() => handleDeleteClient(client._id)}
                                        confirmMessage={
                                            <>
                                                Tem certeza que deseja excluir o cliente
                                                <Text rounded="md" as="span" color="red" fontWeight="bold"> {client.name}</Text>?
                                            </>
                                        }
                                    //confirmDescription="Esta ação irá desativar o cliente no sistema (soft delete)."
                                    />
                                </Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {/* Footer com contagem */}
            <Box p={4} bg="gray.50" borderTopWidth={1}>
                <Text color="gray.600" fontSize="sm">
                    Total: <strong>{clients.length}</strong> cliente(s)
                </Text>
            </Box>
        </Box>
    )
}

