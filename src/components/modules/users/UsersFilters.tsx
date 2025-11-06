'use client'

// Componente de filtros para lista de usuários

import { useState, ChangeEvent } from 'react'
import {
    Box,
    Input,
    Button,
    Flex,
    Field,
} from '@chakra-ui/react'
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'

export function UsersFilters() {
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const handleClear = () => {
        setSearch('')
        setRoleFilter('')
        setStatusFilter('')
        // TODO: Implementar lógica de filtro real quando integrar com TanStack Query
    }

    const handleApply = () => {
        // TODO: Implementar lógica de filtro real quando integrar com TanStack Query
        console.log('Filtros:', { search, roleFilter, statusFilter })
    }

    return (
        <Box bg="white" p={4} borderRadius="md" shadow="sm" borderWidth={1}>
            <Flex gap={4} align="end">
                {/* Busca por nome/email */}
                <Field.Root flex={2}>
                    <Field.Label fontSize="sm">Buscar</Field.Label>
                    <Input
                        placeholder="Nome ou email..."
                        value={search}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        size="md"
                    />
                </Field.Root>

                {/* Filtro por Role */}
                <Field.Root flex={1}>
                    <Field.Label fontSize="sm">Role</Field.Label>
                    <NativeSelectRoot>
                        <NativeSelectField
                            placeholder="Todos"
                            value={roleFilter}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRoleFilter(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="company">Empresa</option>
                            <option value="user">Usuário</option>
                        </NativeSelectField>
                    </NativeSelectRoot>
                </Field.Root>

                {/* Filtro por Status */}
                <Field.Root flex={1}>
                    <Field.Label fontSize="sm">Status</Field.Label>
                    <NativeSelectRoot>
                        <NativeSelectField
                            placeholder="Todos"
                            value={statusFilter}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                        </NativeSelectField>
                    </NativeSelectRoot>
                </Field.Root>

                {/* Botões */}
                <Flex gap={2}>
                    <Button
                        colorPalette="blue"
                        onClick={handleApply}
                        size="md"
                    >
                        Filtrar
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleClear}
                        size="md"
                    >
                        Limpar
                    </Button>
                </Flex>
            </Flex>
        </Box>
    )
}
