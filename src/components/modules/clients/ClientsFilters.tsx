'use client'

// Componente de filtros para lista de clientes

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Flex } from '@chakra-ui/react'
import { GenericSearchFilterInput, ActiveStatusFilterSelect } from '@/components/forms/filters'
import { SearchButton, CleanSearchButton } from '@/components/ui/button'

export function ClientsFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '')

    const handleClear = () => {
        setSearch('')
        setStatusFilter('')
        router.push('/app/admin/clients')
    }

    const handleApply = () => {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (statusFilter) params.set('status', statusFilter)
        
        const queryString = params.toString()
        router.push(`/app/admin/clients${queryString ? `?${queryString}` : ''}`)
    }

    return (
        <Box bg="white" p={4} borderRadius="md" shadow="sm" borderWidth={1}>
            <Flex gap={4} align="end">
                {/* Busca por nome/email */}
                <GenericSearchFilterInput
                    value={search}
                    onChange={setSearch}
                    onEnter={handleApply}
                    label="Buscar"
                    placeholder="Nome ou email..."
                    flex={2}
                    helperText="Pressione Enter para buscar"
                />

                {/* Filtro por Status */}
                <ActiveStatusFilterSelect
                    value={statusFilter}
                    onChange={setStatusFilter}
                    label="Status"
                    placeholder="Todos"
                    flex={1}
                />

                {/* Botões */}
                <Flex gap={2}>
                    <SearchButton onClick={handleApply} />
                    <CleanSearchButton onClick={handleClear} />
                </Flex>
            </Flex>
        </Box>
    )
}

