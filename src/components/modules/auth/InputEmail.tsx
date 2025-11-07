'use client'

import { Field } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import type { InputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

// Type helper para aceitar variantes customizadas
type InputPropsWithCustomVariant = Omit<InputProps, 'type' | 'variant'> & {
  variant?: InputProps['variant'] | 'default' | (string & Record<never, never>)
}

interface InputEmailProps extends InputPropsWithCustomVariant {
  label?: string
  error?: string
  isInvalid?: boolean
}

export const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  ({ error, isInvalid, label, variant, ...inputProps }, ref) => {
    return (
      <Field.Root invalid={isInvalid}>
        {label && <Field.Label>{label}</Field.Label>}
        <Input
          ref={ref}
          type="email"
          autoComplete="email"
          variant={variant as InputProps['variant']}
          {...inputProps}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputEmail.displayName = 'InputEmail'
