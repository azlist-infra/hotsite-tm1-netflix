'use client'

import { forwardRef } from 'react'
import { Input, Field } from '@chakra-ui/react'
import type { InputProps } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

// Props base do componente (customizações específicas)
interface BaseTextFieldProps {
    /** Label do campo */
    label?: string
    /** Helper text */
    helperText?: string
    /** Se o campo é obrigatório */
    required?: boolean
}

// Type helper para aceitar variantes customizadas + props do Chakra
type InputPropsWithCustomVariant = Omit<InputProps, 'variant'> & {
    variant?: InputProps['variant'] | 'default' | (string & Record<never, never>)
}

// Props quando usado COM React Hook Form
interface RHFTextFieldProps<T extends FieldValues> extends Omit<InputPropsWithCustomVariant, 'value' | 'onChange' | 'defaultValue'>, BaseTextFieldProps {
    /** Nome do campo (RHF) */
    name: Path<T>
    /** Control do RHF */
    control: Control<T>
}

// Props quando usado SEM React Hook Form
interface StandardTextFieldProps extends Omit<InputPropsWithCustomVariant, 'onChange'>, BaseTextFieldProps {
    /** Valor controlado */
    value: string
    /** Callback de mudança */
    onChange: (value: string) => void
    /** Se é inválido */
    invalid?: boolean
    /** Mensagem de erro */
    errorMessage?: string
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
 * Aceita todas as props do Input do Chakra UI
 * 
 * @example
 * // Com RHF
 * <TextField
 *   name="email"
 *   control={control}
 *   label="Email"
 *   type="email"
 *   required
 *   variant="default"
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
    // ✅ Modo React Hook Form
    if (isRHFMode(props)) {
        const { name, control, label, helperText, required = false, variant, ...inputProps } = props

        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Field.Root
                        invalid={!!error}
                        required={required}
                    >
                        {label && <Field.Label textStyle="brand.text.small" color="input.label">{label}</Field.Label>}
                        <Input
                            {...field}
                            {...inputProps}
                            variant={variant as InputProps['variant']}
                            ref={ref}
                        />
                        {helperText && (
                            <Field.HelperText textStyle="brand.text.small" color="input.helperText">{helperText}</Field.HelperText>
                        )}
                        {error && (
                            <Field.ErrorText textStyle="brand.text.small" color="input.error">{error.message}</Field.ErrorText>
                        )}


                    </Field.Root>
                )}
            />
        )
    }

    // ✅ Modo Standard (sem RHF)
    const { value, onChange, invalid, errorMessage, onEnter, label, helperText, required = false, variant, ...inputProps } = props

    return (
        <Field.Root
            invalid={invalid}
            required={required}
        >
            {label && <Field.Label textStyle="brand.text.small" color="input.label">{label}</Field.Label>}
            <Input
                {...inputProps}
                variant={variant as InputProps['variant']}
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onEnter) {
                        e.preventDefault()
                        onEnter()
                    }
                }}
            />
            {helperText && (
                <Field.HelperText textStyle="brand.text.small" color="input.helperText">{helperText}</Field.HelperText>
            )}
            {invalid && errorMessage && (
                <Field.ErrorText textStyle="brand.text.small" color="input.error">{errorMessage}</Field.ErrorText>
            )}

        </Field.Root>
    )
}) as <T extends FieldValues>(
    props: TextFieldProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement
