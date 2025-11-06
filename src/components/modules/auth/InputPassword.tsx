'use client'

import { Field } from '@chakra-ui/react'
import { Input, InputGroup } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface InputPasswordProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  error?: string
  isInvalid?: boolean
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ error, isInvalid, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => setShowPassword(!showPassword)

    return (
      <Field.Root invalid={isInvalid}>
        <Field.Label>Senha</Field.Label>
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
            placeholder="Digite sua senha"
            autoComplete="current-password"
            {...rest}
          />
        </InputGroup>
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    )
  }
)

InputPassword.displayName = 'InputPassword'
