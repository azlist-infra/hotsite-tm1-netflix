'use client'

import { Field } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface InputEmailProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  label?: string
  placeholder?: string
  error?: string
  isInvalid?: boolean
}

export const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  ({ error, isInvalid, label, placeholder, ...rest }, ref) => {
    return (
      <Field.Root invalid={isInvalid}>
        {label && <Field.Label>{label}</Field.Label>}
        <Input
          ref={ref}
          type="email"
          placeholder={placeholder}
          autoComplete="email"
          {...rest}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputEmail.displayName = 'InputEmail'
