'use client'

import { forwardRef } from 'react'
import { TextField } from './TextField'
import type { Control, FieldValues, Path } from 'react-hook-form'

// Props quando usado COM React Hook Form
interface RHFEmailFieldProps<T extends FieldValues> {
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
interface StandardEmailFieldProps {
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

type EmailFieldProps<T extends FieldValues> = 
    | RHFEmailFieldProps<T> 
    | StandardEmailFieldProps

/**
 * Campo de Email
 * 
 * Wrapper de TextField com configurações específicas para email
 * 
 * @example
 * // Com RHF
 * <EmailField
 *   name="email"
 *   control={control}
 *   required
 * />
 * 
 * @example
 * // Sem RHF
 * <EmailField
 *   value={email}
 *   onChange={setEmail}
 * />
 */
// eslint-disable-next-line react/display-name
export const EmailField = forwardRef(<T extends FieldValues>(
    props: EmailFieldProps<T>,
    ref: React.Ref<HTMLInputElement>
) => {
    const defaultLabel = props.label ?? 'Email'
    const defaultPlaceholder = props.placeholder ?? 'email@exemplo.com'

    // Determina se está usando RHF ou modo padrão
    const hasControl = 'control' in props && props.control
    
    if (hasControl) {
        // Modo RHF
        const rhfProps = props as RHFEmailFieldProps<T>
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
                type="email"
                autoComplete="email"
                ref={ref}
            />
        )
    }

    // Modo padrão
    const standardProps = props as StandardEmailFieldProps
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
            type="email"
            autoComplete="email"
            ref={ref}
        />
    )
}) as <T extends FieldValues>(
    props: EmailFieldProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement
