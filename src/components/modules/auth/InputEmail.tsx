'use client'

import { Field } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface InputEmailProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  error?: string
  isInvalid?: boolean
}

export const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  ({ error, isInvalid, ...rest }, ref) => {
    return (
      <Field.Root invalid={isInvalid}>
        <Field.Label>E-mail</Field.Label>
        <Input
          ref={ref}
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          {...rest}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputEmail.displayName = 'InputEmail'
