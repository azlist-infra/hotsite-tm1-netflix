'use client'

import { Box, Flex, Link } from "@chakra-ui/react"
import { NetflixLogo } from "@/app/inscricao/components/NetflixLogo"
import { ContactLink } from "@/components/modules/netflix/ContactLink"

export function FooterHotsite() {
  return (
    <Box 
      bg="#222222" 
      color="white"
      h={{ base: '165px', md: '95px' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Wrapper principal */}
      <Flex
        w={{ base: '90%', md: '1055px' }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'center' }}
        justify={{ base: 'center', md: 'space-between' }}
        gap={{ base: 4, md: 0 }}
      >
        {/* Logo Netflix - alinhado à esquerda no desktop */}
        <Box>
          <NetflixLogo 
            width={132} 
            height={35} 
            fillColor="#FFFFFF" 
          />
        </Box>

        {/* Wrapper secundário dos textos - 560px no desktop */}
        <Flex
          w={{ base: '100%', md: '560px' }}
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={{ base: 3, md: 0 }}
          mt={{ base: 2, md: 0 }}
        >
          {/* Contato para suporte - alinhado à esquerda */}
          <ContactLink 
            fontSize="18px"
            color="white"
            textDecoration="underline"
          >
            Contato para suporte
          </ContactLink>

          {/* Política de privacidade - alinhado à direita */}
          <Link
            href="#"
            fontFamily="Roboto"
            fontWeight={400}
            fontSize="18px"
            lineHeight="100%"
            letterSpacing="0%"
            color="white"
            _hover={{
              opacity: 0.8,
              textDecoration: 'underline'
            }}
          >
            Política de privacidade
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}


