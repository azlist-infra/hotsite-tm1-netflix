'use client'

import { ChangeEvent } from 'react'
import { Field, NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'

interface ActiveStatusFilterSelectProps {
    /** Valor atual do select */
    value: string
    /** Callback quando o valor muda */
    onChange: (value: string) => void
    /** Label do campo */
    label?: string
    /** Placeholder (texto para "Todos") */
    placeholder?: string
    /** Tamanho do campo */
    size?: 'sm' | 'md' | 'lg'
    /** Se o campo está desabilitado */
    disabled?: boolean
    /** Flex grow/basis para layout */
    flex?: number | string
    /** Texto para opção "Ativo" */
    activeLabel?: string
    /** Texto para opção "Inativo" */
    inactiveLabel?: string
}

/**
 * Select específico para filtro de status Ativo/Inativo
 * 
 * Comum em vários módulos (clientes, usuários, etc)
 * 
 * Valores:
 * - '' = Todos (padrão)
 * - 'true' = Ativo
 * - 'false' = Inativo
 * 
 * @example
 * <ActiveStatusFilterSelect
 *   value={statusFilter}
 *   onChange={setStatusFilter}
 *   label="Status"
 *   placeholder="Todos os status"
 *   flex={1}
 * />
 */
export function ActiveStatusFilterSelect({
    value,
    onChange,
    label = 'Status',
    placeholder = 'Todos',
    size = 'md',
    disabled = false,
    flex,
    activeLabel = 'Ativo',
    inactiveLabel = 'Inativo',
}: ActiveStatusFilterSelectProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }

    return (
        <Field.Root flex={flex}>
            {label && <Field.Label fontSize="sm">{label}</Field.Label>}
            <NativeSelectRoot size={size} disabled={disabled}>
                <NativeSelectField
                    value={value}
                    onChange={handleChange}
                    
                    placeholder={placeholder}
                >
                    <option value="true">{activeLabel}</option>
                    <option value="false">{inactiveLabel}</option>
                </NativeSelectField>
            </NativeSelectRoot>
        </Field.Root>
    )
}

