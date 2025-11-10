'use client'

import React from 'react'
import { Box, Flex, Text, Button, Link, Icon } from '@chakra-ui/react'

import type { GetPaxNetflixResponse } from '@/app/api/pax-netflix'
import { QRCodeNetflix } from '@/components/advanced/qrcode'
import { Icons } from '@/components/ui/icon'

interface PaxAlreadyRegisteredProps {
  paxData: GetPaxNetflixResponse
  paxEmail: string
}

/**
 * Exibe informações do participante já cadastrado
 * 
 * Mostra mensagem de confirmação, QR Code e botão WhatsApp
 */
export const PaxAlreadyRegistered = ({
  paxData,
  paxEmail
}: PaxAlreadyRegisteredProps) => {
  // Configurações do WhatsApp
  const whatsappNumber = '5511912525683'
  const whatsappMessage = 'Desejo receber o QR Code pelo WhatsApp'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Valor para o QR Code (usando SearchKey ou Email)
  const qrCodeValue = paxData.SearchKey || paxData.paxData?.SearchKey || paxEmail

  return (
    <Flex 
      direction="column" 
      gap={{ base: 6, md: 8 }} 
      align="center"
      w="100%"
      maxW={{ base: "100%", md: "90%" }}
      mx="auto"
    >
      {/* 1. TEXTOS */}
      <Flex direction="column" gap={{ base: 2, md: 2 }} align="center" justifyContent="flex-start" textAlign="center">
        <Text
          textStyle="brand.text.xlbold"
          color="primary"
          fontSize={{ base: "24px", md: "32px" }}
        >
          Inscrição confirmada!
        </Text>
        
        <Text
          textStyle="brand.text.default"
          color="white"
          maxW={{ base: "100%", md: "100%" }}
          mt={{ base: 4, md: 6 }}
        >
          A Netflix espera por você no <Text as="span" fontStyle="italic">Feito Aqui</Text> - nasce no Brasil, viaja pelo mundo.
        </Text>

        <Text
          textStyle="brand.text.default"
          color="gray.300"
          maxW={{ base: "100%", md: "100%" }}
        >
          O QR Code do convite ficará disponível logo abaixo, com a opção de baixar o arquivo caso deseje.
        </Text>
      </Flex>

      {/* 2. QR CODE */}
      <Box
        bg="white"
        p={{ base: 8, md: 14 }}
        borderRadius="12px"
        w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
        maxW="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <QRCodeNetflix
          value={qrCodeValue}
          encrypt
          hasDownloadButton
        />
      </Box>

      {/* 3. BOTÃO WHATSAPP */}
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
        maxW="500px"
        _hover={{ textDecoration: 'none' }}
      >
        <Button
          variant="custom"
          size="lg"
          w="100%"
          gap={2}
          fontSize={{ base: "16px", md: "18px" }}
        >
          <Icon as={Icons.Message} boxSize={6} color="white" />
          Receber QR Code pelo WhatsApp
        </Button>
      </Link>
    </Flex>
  )
}

