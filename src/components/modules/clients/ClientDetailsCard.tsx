// Card de detalhes do cliente

import {
    Box,
    Heading,
    SimpleGrid,
    Flex,
} from '@chakra-ui/react'
import { Client } from '@/app/api/clients'
import { ActiveStatusBadge } from '@/components/ui/badge'
import { DetailField } from '@/components/ui'
import { formatDateTime } from '@/lib/utils/date'

interface ClientDetailsCardProps {
    client: Client
}

export function ClientDetailsCard({ client }: ClientDetailsCardProps) {
    return (
        <Box bg="white" borderRadius="md" shadow="sm" borderWidth={1} overflow="hidden">
            {/* Header */}
            <Box bg="gray.50" px={6} py={4} borderBottomWidth={1}>
                <Flex justify="space-between" align="center">
                    <Heading size="md">Informações do Cliente</Heading>
                    <ActiveStatusBadge isActive={client.isActive} />
                </Flex>
            </Box>

            {/* Conteúdo */}
            <Box p={6}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <DetailField 
                        label="Nome da Empresa" 
                        value={client.name} 
                    />
                    
                    <DetailField 
                        label="Email" 
                        value={client.email}
                        copyable 
                    />
                    
                    <DetailField 
                        label="Telefone" 
                        value={client.phone}
                    />
                    
                    <Box>
                        <DetailField 
                            label="Status" 
                            value=""
                        />
                        <Box mt={2}>
                            <ActiveStatusBadge isActive={client.isActive} />
                        </Box>
                    </Box>
                    
                    <DetailField 
                        label="Criado em" 
                        value={formatDateTime(client.createdAt)} 
                    />
                    
                    <DetailField 
                        label="Última Atualização" 
                        value={formatDateTime(client.updatedAt)} 
                    />
                </SimpleGrid>
            </Box>
        </Box>
    )
}

