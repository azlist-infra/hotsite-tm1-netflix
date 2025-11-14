'use client'

import React, { JSX } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

export const LocationSection = (): JSX.Element => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, sm: 6, md: 12 }} w="100%">
      {/* Bloco Esquerda - Texto */}
      <Box flex={1}>
        <Flex direction="column" gap={{ base: 4, sm: 6, md: 8 }}>
          <Box>
            <Text
              textStyle="brand.location.title"
              color="primary"
            >
              Villaggio JK
            </Text>
            <Text
              textStyle="brand.location.normal"
              color="gray.300"
              mt={3}
            >
              R. Funchal, 500 - Vila Olímpia
              <br />
              São Paulo, SP
            </Text>
          </Box>

          <Box>
            <Text
              textStyle="brand.location.bold"
              color="white"
              mt={6}
            >
              Acesso:
            </Text>
            <Flex direction="column" gap={8} mt={6}>
              <Text
                textStyle="brand.location.normal"
                color="white"
              >
                <Text as="span" textStyle="brand.location.bold">Carro de aplicativo:</Text> o desembarque pode ser feito em frente à entrada principal do Villaggio JK.
              </Text>
              <Text
                textStyle="brand.location.normal"
                color="white"
              >
                <Text as="span" textStyle="brand.location.bold">Carro particular:</Text> há serviço de valet disponível no local.
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Bloco Direita - Google Maps */}
      <Box flex={1} p={0} border="1px solid" borderColor="gray.700" overflow="hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3656.2586352869107!2d-46.6932021!3d-23.5950556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5738720e6e1b%3A0x9609f4df28755c3a!2sVillaggio%20JK%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1762723438212!5m2!1spt-BR!2sbr"
          width="100%"
          height={'450px'}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Flex>
  )
}

