'use client'

import { ChangeEvent, KeyboardEvent } from 'react'
import { Input, Field } from '@chakra-ui/react'

interface GenericSearchFilterInputProps {
    /** Valor atual do input */
    value: string
    /** Callback quando o valor muda */
    onChange: (value: string) => void
    /** Callback quando Enter é pressionado (opcional) */
    onEnter?: () => void
    /** Label do campo */
    label?: string
    /** Placeholder do input */
    placeholder?: string
    /** Tamanho do campo */
    size?: 'sm' | 'md' | 'lg'
    /** Se o campo está desabilitado */
    disabled?: boolean
    /** Flex grow/basis para layout */
    flex?: number | string
    /** Texto de ajuda abaixo do input */
    helperText?: string
}

/**
 * Input genérico de busca para filtros
 * 
 * Recursos:
 * - Suporta Enter para buscar
 * - Label e placeholder customizáveis
 * - Diferentes tamanhos
 * - Estados de disabled
 * - Helper text
 * 
 * @example
 * <GenericSearchFilterInput
 *   value={search}
 *   onChange={setSearch}
 *   onEnter={handleSearch}
 *   label="Buscar"
 *   placeholder="Nome, email..."
 *   flex={2}
 * />
 */
export function GenericSearchFilterInput({
    value,
    onChange,
    onEnter,
    label = 'Buscar',
    placeholder = 'Digite para buscar...',
    size = 'md',
    disabled = false,
    flex,
    helperText,
}: GenericSearchFilterInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnter) {
            e.preventDefault()
            onEnter()
        }
    }

    return (
        <Field.Root flex={flex}>
            {label && <Field.Label fontSize="sm">{label}</Field.Label>}
            <Input
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                size={size}
                disabled={disabled}
            />
            {helperText && (
                <Field.HelperText fontSize="xs">{helperText}</Field.HelperText>
            )}
        </Field.Root>
    )
}

