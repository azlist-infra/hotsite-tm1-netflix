'use client'

import React, { JSX } from 'react'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'

export const LocationSection = (): JSX.Element => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={4} w="100%">
      {/* Bloco Esquerda - Texto */}
      <Box flex={1} bg="gray.900" p={6} borderRadius="8px" border="1px solid" borderColor="gray.700">
        <Flex direction="column" gap={4}>
          <Box>
            <Heading
              fontSize="16px"
              fontWeight="bold"
              color="#E50914"
              mb={2}
            >
              Villaggio JK
            </Heading>
            <Text color="gray.300" fontSize="14px" mb={4}>
              R. Funchal, 500 – Vila Olímpia
              <br />
              São Paulo (SP)
            </Text>
          </Box>
          
          <Box>
            <Text fontWeight="bold" color="white" fontSize="14px" mb={2}>
              Acesso:
            </Text>
            <Flex direction="column" gap={2}>
              <Text fontSize="14px" color="gray.300">
                <Text as="strong">Carro de aplicativo:</Text> o desembarque pode ser feito em frente à entrada principal do Villaggio JK.
              </Text>
              <Text fontSize="14px" color="gray.300">
                <Text as="strong">Carro particular:</Text> há serviço de valet disponível no local.
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Bloco Direita - Google Maps */}
      <Box flex={1} bg="gray.900" p={0} borderRadius="8px" border="1px solid" borderColor="gray.700" overflow="hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1234567890!2d-46.6871234!3d-23.5923456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57a6b8c8b8b9%3A0x8b8b8b8b8b8b8b8b!2sVillaggio%20JK!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do Villaggio JK - R. Funchal, 500, Vila Olímpia, São Paulo"
        />
      </Box>
    </Flex>
  )
}

