'use client'

import { LayoutHotsite } from '@/layouts/layout'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {
  TitleBase,
  LocationSection,
  FAQAccordion,
  CustomImage,
  useInscricaoForm,
  faqData,
  PaxNotRegisteredForm,
  PaxAlreadyRegistered
} from '@/components/modules/netflix'
import { Wrapper } from '@/layouts/wrapper'

export default function InscricaoPage() {
  const {
    paxData,
    error,
    successMessage,
    isLoading,
    isAlreadyConfirmed,
    control,
    handleSubmit,
    onSubmit,
  } = useInscricaoForm()

  // Loading enquanto carrega dados
  if (!paxData) {
    return (
      <LayoutHotsite fullWidth>
        <Wrapper.Center>
          <Flex minH="100vh" align="center" justify="center">
            <Text
              color="white"
              textStyle="brand.text.default"
            >
              Carregando...
            </Text>
          </Flex>
        </Wrapper.Center>
      </LayoutHotsite>
    )
  }

  return (
    <>
      <LayoutHotsite fullWidth>
        <Wrapper.Center>
          <Flex
            gap={{ base: 6, md: 8 }}
            align="center"
            justify="center"
            //bgColor="yellow"
            flexDirection="column"
            py={{ base: 8, md: 12 }}
            mx={2}
            //w={{ base: "90%", sm: "90%", md: "1060px", lg: "1060px" }}
            maxW={'1060px'}
            w={{ base: '100%', xl: '1060px' }}
          //bg={{ base: "red.300", sm: "blue.600", md: "green.600", lg: "yellow.600", xl: "purple.600" }}
          //maxW="100%"
          >
            {/* Header com Imagem */}
            <Box
              w="100%"
              display="flex"
              justifyContent="center"
            >
              <CustomImage
                src="/img/netflix/inscricao_imagem_01.png"
                alt="Feito Aqui"
                width={523}
                height={160}
                mobileWidth="100%"
              />
            </Box>

            {/* Texto Intro */}
            <Box w="100%" maxW="100%">
              <Flex direction="column" gap={{ base: 3, md: 4 }} mt={{ base: 6, md: 12 }}>
                <Text textStyle="brand.text.xlbold" color="white" textAlign="left">
                  O <Text as="span" fontStyle="italic">Feito Aqui</Text> é um encontro criado para celebrar o talento, a criatividade e o impacto do audiovisual brasileiro.
                </Text>
                <Text textStyle="brand.text.xl" color="white" textAlign="left" mt={{ base: 2, md: 3 }}>
                  Um momento para reunir parceiros, profissionais e criadores que fazem parte dessa trajetória, compartilhando conquistas, novas histórias e o que vem pela frente.
                  <br />
                  Mais do que um evento, é uma experiência que reconhece o poder das narrativas feitas no Brasil e seu alcance global.
                </Text>
              </Flex>
            </Box>

            {/* Seção de Inscrição */}
            <Box w="100%" maxW="100%" >
              <Flex direction="column" gap={{ base: 4, md: 6 }} mb={{ base: 6, md: 8 }} justify="center" align="stretch">
                <TitleBase title={isAlreadyConfirmed ? "Presença Confirmada" : "Confirme sua presença"} />

                {/* Mensagens de Sucesso/Erro */}
                {successMessage && (
                  <Box
                    display="none"
                    mb={{ base: 3, md: 4 }}
                    p={{ base: 3, md: 4 }}
                    bg="green.900"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="green.600"
                  >
                    <Text
                      color="green.200"
                      textStyle="brand.text.default"
                    >
                      ✓ {successMessage}
                    </Text>
                  </Box>
                )}

                {error && (
                  <Box
                    display="none"
                    mb={{ base: 3, md: 4 }}
                    p={{ base: 3, md: 4 }}
                    bg="red.900"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="red.600"
                  >
                    <Text
                      color="red.200"
                      textStyle="brand.text.default"
                    >
                      ✕ {error}
                    </Text>
                  </Box>
                )}

                {/* Componentes de Inscrição */}
                {isAlreadyConfirmed ? (
                  <PaxAlreadyRegistered
                    paxData={paxData}
                    paxEmail={paxData.Email || paxData.paxData?.Email || 'Email não disponível'}
                  />
                ) : (
                  <PaxNotRegisteredForm
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    paxEmail={paxData.Email || paxData.paxData?.Email || 'Email não disponível'}
                  />
                )}
              </Flex>
            </Box>

            {/* Seção Local */}
            <Box w="100%" maxW="100%">
              <Flex direction="column" gap={{ base: 4, md: 6 }} mb={{ base: 6, md: 8 }}>
                <TitleBase title="Local" />
                <LocationSection />
              </Flex>
            </Box>

            {/* Perguntas Frequentes */}
            <Box w="100%" maxW="100%">
              <Flex direction="column" gap={{ base: 4, md: 6 }} mb={{ base: 6, md: 8 }}>
                <TitleBase title="Perguntas Frequentes" />
                <FAQAccordion items={faqData} />
              </Flex>
            </Box>
          </Flex>
        </Wrapper.Center>
      </LayoutHotsite>
    </>
  )
}

