'use client'

import { useState } from 'react'
import { Text, Link as ChakraLink } from '@chakra-ui/react'
import { NetflixModal, NetflixModalCloseButton } from './NetflixModal'

interface ContactLinkProps {
  children: React.ReactNode
  color?: string
  textDecoration?: string
  fontSize?: string | Record<string, string>
}

/**
 * Link de contato que abre modal com informações
 */
export const ContactLink = ({ 
  children, 
  color = 'white',
  textDecoration = 'underline',
  fontSize
}: ContactLinkProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChakraLink
        onClick={() => setIsOpen(true)}
        color={color}
        textDecoration={textDecoration}
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
        fontSize={fontSize}
      >
        {children}
      </ChakraLink>

      <NetflixModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Entre em contato"
        size="md"
      >
        <Text textStyle="brand.modal.text" textAlign="center" color="white">
          Para dúvidas ou suporte, entre em contato pelo e-mail:
        </Text>
        
        <ChakraLink
          href="mailto:contato@netflixfeitoaqui.com.br"
          textStyle="brand.modal.text"
          textAlign="center"
          color="#E50914"
          textDecoration="underline"
          _hover={{ opacity: 0.8 }}
        >
          contato@netflixfeitoaqui.com.br
        </ChakraLink>

        <NetflixModalCloseButton onClose={() => setIsOpen(false)} />
      </NetflixModal>
    </>
  )
}

