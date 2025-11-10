'use client'

import { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from './TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'

/**
 * Formata string para o padrão de telefone brasileiro (NN) NNNNN-NNNN
 */
const formatPhoneNumber = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11)
    
    // Aplica a máscara
    if (limited.length <= 2) {
        return limited
    } else if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
    } else {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
    }
}

/**
 * Remove a formatação e retorna apenas números (limitado a 11 dígitos)
 */
const unformatPhoneNumber = (value: string): string => {
    // Remove tudo que não é número e limita a 11 dígitos
    return value.replace(/\D/g, '').slice(0, 11)
}

// Props quando usado COM React Hook Form
interface RHFPhoneFieldProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    helperText?: string
    required?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    flex?: number | string
    variant?: string
}

// Props quando usado SEM React Hook Form
interface StandardPhoneFieldProps {
    value: string
    onChange: (value: string) => void
    label?: string
    placeholder?: string
    helperText?: string
    required?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    invalid?: boolean
    errorMessage?: string
    flex?: number | string
    onEnter?: () => void
    variant?: string
}

type PhoneFieldProps<T extends FieldValues> = 
    | RHFPhoneFieldProps<T> 
    | StandardPhoneFieldProps

/**
 * Campo de Telefone com máscara (NN) NNNNN-NNNN
 * 
 * Usa TextField internamente com formatação automática para telefone brasileiro
 * 
 * @example
 * // Com RHF
 * <PhoneField
 *   name="telefone"
 *   control={control}
 *   placeholder="Telefone"
 *   helperText="Formato: (11) 99999-9999"
 * />
 * 
 * @example
 * // Sem RHF
 * <PhoneField
 *   value={phone}
 *   onChange={setPhone}
 * />
 */
// eslint-disable-next-line react/display-name
export const PhoneField = forwardRef(<T extends FieldValues>(
    props: PhoneFieldProps<T>,
    ref: React.Ref<HTMLInputElement>
) => {
    const defaultPlaceholder = props.placeholder ?? 'Telefone'

    // Determina se está usando RHF ou modo padrão
    const hasControl = 'control' in props && props.control
    
    if (hasControl) {
        // Modo RHF com Controller para aplicar máscara
        const rhfProps = props as RHFPhoneFieldProps<T>
        
        return (
            <Controller
                name={rhfProps.name}
                control={rhfProps.control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        value={formatPhoneNumber(field.value || '')}
                        onChange={(formatted) => {
                            const unformatted = unformatPhoneNumber(formatted)
                            field.onChange(unformatted)
                        }}
                        onBlur={field.onBlur}
                        label={rhfProps.label}
                        placeholder={defaultPlaceholder}
                        helperText={rhfProps.helperText}
                        required={rhfProps.required}
                        size={rhfProps.size}
                        disabled={rhfProps.disabled}
                        flex={rhfProps.flex}
                        variant={rhfProps.variant}
                        type="tel"
                        autoComplete="tel"
                        invalid={!!error}
                        errorMessage={error?.message}
                        ref={ref}
                    />
                )}
            />
        )
    }

    // Modo padrão
    const standardProps = props as StandardPhoneFieldProps
    
    return (
        <TextField
            value={formatPhoneNumber(standardProps.value || '')}
            onChange={(formatted) => {
                const unformatted = unformatPhoneNumber(formatted)
                standardProps.onChange(unformatted)
            }}
            label={standardProps.label}
            placeholder={defaultPlaceholder}
            helperText={standardProps.helperText}
            required={standardProps.required}
            size={standardProps.size}
            disabled={standardProps.disabled}
            invalid={standardProps.invalid}
            errorMessage={standardProps.errorMessage}
            flex={standardProps.flex}
            onEnter={standardProps.onEnter}
            variant={standardProps.variant}
            type="tel"
            autoComplete="tel"
            ref={ref}
        />
    )
}) as <T extends FieldValues>(
    props: PhoneFieldProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement
