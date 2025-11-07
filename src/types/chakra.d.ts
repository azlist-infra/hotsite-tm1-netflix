// Extensão dos tipos do Chakra UI para aceitar variantes customizadas
import '@chakra-ui/react'

declare module '@chakra-ui/react' {
  export interface ButtonVariantMap {
    custom: true
  }

  export interface InputVariantMap {
    default: true
  }
}

