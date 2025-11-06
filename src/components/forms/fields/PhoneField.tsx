'use client'

import { forwardRef } from 'react'
import { TextField } from './TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'

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
}

type PhoneFieldProps<T extends FieldValues> = 
    | RHFPhoneFieldProps<T> 
    | StandardPhoneFieldProps

/**
 * Campo de Telefone
 * 
 * Wrapper de TextField com configurações específicas para telefone
 * Futuramente pode incluir máscara
 * 
 * @example
 * // Com RHF
 * <PhoneField
 *   name="phone"
 *   control={control}
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
    const defaultLabel = props.label ?? 'Telefone'
    const defaultPlaceholder = props.placeholder ?? '+55 11 99999-9999'

    // Determina se está usando RHF ou modo padrão
    const hasControl = 'control' in props && props.control
    
    if (hasControl) {
        // Modo RHF
        const rhfProps = props as RHFPhoneFieldProps<T>
        return (
            <TextField
                name={rhfProps.name}
                control={rhfProps.control}
                label={defaultLabel}
                placeholder={defaultPlaceholder}
                helperText={rhfProps.helperText}
                required={rhfProps.required}
                size={rhfProps.size}
                disabled={rhfProps.disabled}
                flex={rhfProps.flex}
                type="tel"
                autoComplete="tel"
                ref={ref}
            />
        )
    }

    // Modo padrão
    const standardProps = props as StandardPhoneFieldProps
    return (
        <TextField
            value={standardProps.value}
            onChange={standardProps.onChange}
            label={defaultLabel}
            placeholder={defaultPlaceholder}
            helperText={standardProps.helperText}
            required={standardProps.required}
            size={standardProps.size}
            disabled={standardProps.disabled}
            invalid={standardProps.invalid}
            errorMessage={standardProps.errorMessage}
            flex={standardProps.flex}
            onEnter={standardProps.onEnter}
            type="tel"
            autoComplete="tel"
            ref={ref}
        />
    )
}) as <T extends FieldValues>(
    props: PhoneFieldProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement
