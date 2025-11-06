'use client'

import { forwardRef } from 'react'
import { Input, Field } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

// Props quando usado COM React Hook Form
interface RHFTextFieldProps<T extends FieldValues> {
    /** Nome do campo (RHF) */
    name: Path<T>
    /** Control do RHF */
    control: Control<T>
    /** Label do campo */
    label?: string
    /** Placeholder */
    placeholder?: string
    /** Helper text */
    helperText?: string
    /** Se o campo é obrigatório */
    required?: boolean
    /** Type do input */
    type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number'
    /** Tamanho */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Se está desabilitado */
    disabled?: boolean
    /** Flex para layout */
    flex?: number | string
    /** Autocomplete */
    autoComplete?: string
}

// Props quando usado SEM React Hook Form
interface StandardTextFieldProps {
    /** Valor controlado */
    value: string
    /** Callback de mudança */
    onChange: (value: string) => void
    /** Label do campo */
    label?: string
    /** Placeholder */
    placeholder?: string
    /** Helper text */
    helperText?: string
    /** Se o campo é obrigatório */
    required?: boolean
    /** Type do input */
    type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number'
    /** Tamanho */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Se está desabilitado */
    disabled?: boolean
    /** Se é inválido */
    invalid?: boolean
    /** Mensagem de erro */
    errorMessage?: string
    /** Flex para layout */
    flex?: number | string
    /** Autocomplete */
    autoComplete?: string
    /** Callback Enter */
    onEnter?: () => void
}

type TextFieldProps<T extends FieldValues> = 
    | RHFTextFieldProps<T> 
    | StandardTextFieldProps

// Type guard para verificar se é RHF
function isRHFMode<T extends FieldValues>(
    props: TextFieldProps<T>
): props is RHFTextFieldProps<T> {
    return 'control' in props && 'name' in props
}

/**
 * Campo de texto genérico
 * 
 * Funciona COM ou SEM React Hook Form
 * 
 * @example
 * // Com RHF
 * <TextField
 *   name="email"
 *   control={control}
 *   label="Email"
 *   type="email"
 *   required
 * />
 * 
 * @example
 * // Sem RHF (controlado manualmente)
 * <TextField
 *   value={email}
 *   onChange={setEmail}
 *   label="Email"
 *   type="email"
 * />
 */
// eslint-disable-next-line react/display-name
export const TextField = forwardRef(<T extends FieldValues>(
    props: TextFieldProps<T>,
    ref: React.Ref<HTMLInputElement>
) => {
    const {
        label,
        placeholder,
        helperText,
        required = false,
        type = 'text',
        size = 'md',
        disabled = false,
        flex,
        autoComplete,
    } = props

    // ✅ Modo React Hook Form
    if (isRHFMode(props)) {
        const { name, control } = props

        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Field.Root 
                        invalid={!!error} 
                        required={required}
                        flex={flex}
                    >
                        {label && <Field.Label>{label}</Field.Label>}
                        <Input
                            {...field}
                            ref={ref}
                            type={type}
                            placeholder={placeholder}
                            size={size}
                            disabled={disabled}
                            autoComplete={autoComplete}
                        />
                        {error && (
                            <Field.ErrorText>{error.message}</Field.ErrorText>
                        )}
                        {helperText && !error && (
                            <Field.HelperText>{helperText}</Field.HelperText>
                        )}
                    </Field.Root>
                )}
            />
        )
    }

    // ✅ Modo Standard (sem RHF)
    const { value, onChange, invalid, errorMessage, onEnter } = props

    return (
        <Field.Root 
            invalid={invalid} 
            required={required}
            flex={flex}
        >
            {label && <Field.Label>{label}</Field.Label>}
            <Input
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onEnter) {
                        e.preventDefault()
                        onEnter()
                    }
                }}
                type={type}
                placeholder={placeholder}
                size={size}
                disabled={disabled}
                autoComplete={autoComplete}
            />
            {invalid && errorMessage && (
                <Field.ErrorText>{errorMessage}</Field.ErrorText>
            )}
            {helperText && !invalid && (
                <Field.HelperText>{helperText}</Field.HelperText>
            )}
        </Field.Root>
    )
}) as <T extends FieldValues>(
    props: TextFieldProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement
