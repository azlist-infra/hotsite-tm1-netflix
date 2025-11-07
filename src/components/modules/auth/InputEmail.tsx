'use client'

import { Field, InputProps } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface InputEmailProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  label?: string
  placeholder?: string
  error?: string
  isInvalid?: boolean
  variant?: InputProps['variant']
}

export const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  ({ error, isInvalid, label, placeholder, variant, ...rest }, ref) => {
    return (
      <Field.Root invalid={isInvalid}>
        {label && <Field.Label>{label}</Field.Label>}
        <Input
          ref={ref}
          type="email"
          placeholder={placeholder}
          variant={variant}
          autoComplete="email"
          size="md"
          {...rest}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputEmail.displayName = 'InputEmail'
