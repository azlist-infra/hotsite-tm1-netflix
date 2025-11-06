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
    /** Label do checkbox */
    label: string
    /** Helper text */
    helperText?: string
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
    /** Label do checkbox */
    label: string
    /** Helper text */
    helperText?: string
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
        helperText,
        size = 'md',
        disabled = false,
        colorPalette = 'blue',
        variant = 'solid',
    } = props

    // ✅ Modo React Hook Form
    if (isRHFMode(props)) {
        const { name, control } = props

        return (
            <Field.Root>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Checkbox.Root
                            checked={field.value}
                            onCheckedChange={(e) => field.onChange(e.checked)}
                            size={size}
                            disabled={disabled}
                            colorPalette={colorPalette}
                            variant={variant}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>{label}</Checkbox.Label>
                        </Checkbox.Root>
                    )}
                />
                {helperText && (
                    <Field.HelperText>{helperText}</Field.HelperText>
                )}
            </Field.Root>
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
                <Checkbox.Label>{label}</Checkbox.Label>
            </Checkbox.Root>
            {helperText && (
                <Field.HelperText>{helperText}</Field.HelperText>
            )}
        </Field.Root>
    )
}

