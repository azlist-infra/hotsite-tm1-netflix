'use client'

import { Field } from '@chakra-ui/react'
import { Input, InputGroup } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface InputPasswordConfirmProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  error?: string
  isInvalid?: boolean
}

export const InputPasswordConfirm = forwardRef<HTMLInputElement, InputPasswordConfirmProps>(
  ({ error, isInvalid, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => setShowPassword(!showPassword)

    return (
      <Field.Root invalid={isInvalid}>
        <Field.Label>Confirmar senha</Field.Label>
        <InputGroup width="full" endElement={
          <IconButton
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            variant="ghost"
            size="sm"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </IconButton>
        }>
          <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            autoComplete="new-password"
            {...rest}
          />
        </InputGroup>
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputPasswordConfirm.displayName = 'InputPasswordConfirm'
