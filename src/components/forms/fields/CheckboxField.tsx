'use client'

import { Checkbox, Field } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

// Props quando usado COM React Hook Form
interface RHFCheckboxFieldProps<T extends FieldValues> {
    /** Nome do campo (RHF) */
    name: Path<T>
    /** Control do RHF */
    control: Control<T>
    /** Label do checkbox (string simples) */
    label?: string
    /** Children do checkbox (para HTML customizado) - priorizado sobre label */
    children?: React.ReactNode
    /** Helper text */
    helperText?: string | React.ReactNode
    /** Tamanho */
    size?: 'xs' | 'sm' | 'md' | 'lg'
    /** Se está desabilitado */
    disabled?: boolean
    /** Color palette */
    colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
    /** Variant */
    variant?: 'outline' | 'solid' | 'subtle'
}

// Props quando usado SEM React Hook Form
interface StandardCheckboxFieldProps {
    /** Valor controlado */
    checked: boolean
    /** Callback de mudança */
    onChange: (checked: boolean) => void
    /** Label do checkbox (string simples) */
    label?: string
    /** Children do checkbox (para HTML customizado) - priorizado sobre label */
    children?: React.ReactNode
    /** Helper text */
    helperText?: string | React.ReactNode
    /** Tamanho */
    size?: 'xs' | 'sm' | 'md' | 'lg'
    /** Se está desabilitado */
    disabled?: boolean
    /** Color palette */
    colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
    /** Variant */
    variant?: 'outline' | 'solid' | 'subtle'
}

type CheckboxFieldProps<T extends FieldValues> = 
    | RHFCheckboxFieldProps<T> 
    | StandardCheckboxFieldProps

// Type guard
function isRHFMode<T extends FieldValues>(
    props: CheckboxFieldProps<T>
): props is RHFCheckboxFieldProps<T> {
    return 'control' in props && 'name' in props
}

/**
 * Campo de Checkbox genérico
 * 
 * Funciona COM ou SEM React Hook Form
 * 
 * @example
 * // Com RHF
 * <CheckboxField
 *   name="isActive"
 *   control={control}
 *   label="Cliente Ativo"
 *   helperText="Marque para ativar"
 *   colorPalette="green"
 * />
 * 
 * @example
 * // Sem RHF
 * <CheckboxField
 *   checked={isActive}
 *   onChange={setIsActive}
 *   label="Cliente Ativo"
 * />
 */
export function CheckboxField<T extends FieldValues>(
    props: CheckboxFieldProps<T>
) {
    const {
        label,
        children,
        helperText,
        size = 'md',
        disabled = false,
        colorPalette = 'blue',
        variant = 'solid',
    } = props
    
    // Prioriza children sobre label
    const displayLabel = children || label

    // ✅ Modo React Hook Form
    if (isRHFMode(props)) {
        const { name, control } = props

        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Field.Root invalid={!!error}>
                        <Checkbox.Root 
                            //bg="green.600"
                            alignItems="center"
                            gap={4}
                            
                            checked={field.value}
                            onCheckedChange={(e) => field.onChange(e.checked)}
                            size={size}
                            disabled={disabled}
                            colorPalette={colorPalette}
                            variant={variant}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label textStyle="brand.text.small" color="white">{displayLabel}</Checkbox.Label>
                        </Checkbox.Root>
                        {error && (
                            <Field.ErrorText textStyle="brand.text.small" mt={2}>
                                {error.message}
                            </Field.ErrorText>
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
    const { checked, onChange } = props

    return (
        <Field.Root>
            <Checkbox.Root
                checked={checked}
                onCheckedChange={(e) => onChange(!!e.checked)}
                size={size}
                disabled={disabled}
                colorPalette={colorPalette}
                variant={variant}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{displayLabel}</Checkbox.Label>
            </Checkbox.Root>
            {helperText && (
                <Field.HelperText>{helperText}</Field.HelperText>
            )}
        </Field.Root>
    )
}

