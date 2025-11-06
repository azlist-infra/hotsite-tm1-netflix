'use client'

import { Field } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface InputNameProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  error?: string
  isInvalid?: boolean
}

export const InputName = forwardRef<HTMLInputElement, InputNameProps>(
  ({ error, isInvalid, ...rest }, ref) => {
    return (
      <Field.Root invalid={isInvalid}>
        <Field.Label>Nome completo</Field.Label>
        <Input
          ref={ref}
          type="text"
          placeholder="Digite seu nome completo"
          autoComplete="name"
          {...rest}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputName.displayName = 'InputName'
