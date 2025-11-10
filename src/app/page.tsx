'use client'

// Main
import React from 'react'
import { Box, Flex, Text, Button, VStack } from '@chakra-ui/react'

// Layouts
import { LayoutHotsite } from '@/layouts/layout'
import { Wrapper } from '@/layouts/wrapper'
import { CardOutline } from '@/layouts/box/CardOutline'

// Components
import { InputEmail } from '@/components/modules/auth/InputEmail'
import { 
  NetflixLogo, 
  CustomImage, 
  ContactLink,
  useHomeForm 
} from '@/components/modules/netflix'



export default function Home() {
  const {
    register,
    handleSubmit,
    onSubmit,
    isLoading,
    error,
    fieldError,
    hasError,
  } = useHomeForm()

  return (
    <>
      <LayoutHotsite fullWidth>
        <Wrapper.Center >
          <CardOutline>

            {/* Logo Netflix */}
            <Box p={0} mt={{ base: 4, md: 8 }}>
              <NetflixLogo width={120} height={32} />
            </Box>

            {/* Imagem Home */}
            <Box 
              mt={{ base: 0, md: 2 }}
              w="100%"
              maxW="394px"
              display="flex"
              justifyContent="center"
            >
            <CustomImage
              src="/img/netflix/feito-aqui-home.png"
              width={394}
              height={132}
              alt="Feito Aqui - Nasce no Brasil - Viaja pelo Mundo"
              mobileWidth="95%"
            />
            </Box>

            {/* Texto Intro */}
            <Box 
              w="100%"
              maxW={{ base: "100%", md: "550px" }}
              px={{ base: 2, md: 0 }}
              mt={{ base: 6, md: 12 }}
            >
              <Text 
                textStyle="brand.text.default" 
                textAlign="center" 
                color="white"
                //fontSize={{ base: "14px", md: "16px" }}
              >
                Para acessar a página e confirmar sua presença, insira o mesmo e-mail em que você recebeu o seu convite:
              </Text>
            </Box>

            {/* Formulário com input de e-mail e botão de submit */}
            <Box 
              w="100%"
              maxW={{ base: "100%", md: "510px" }}
              px={{ base: 0, md: 0 }}
              mt={{ base: 4, md: 6 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <VStack gap={{ base: 3, md: 4 }} width="100%">
                  <InputEmail
                    variant="default"
                    placeholder="E-mail"
                    {...register('email')}
                    error={fieldError || error}
                    isInvalid={hasError}
                    disabled={isLoading}
                    width="100%"
                  />

                  <Button
                    variant="custom"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    w={{ base: "100%", md: "auto" }}
                    mt={{ base: 2, md: 2 }}
                    px={{ base: 8, md: 16 }}
                  >
                    {isLoading ? 'Buscando...' : 'Entrar'}
                  </Button>

                </VStack>
              </form>
            </Box>

            {/* Help Text */}
            <Flex 
              bgColor="transparent" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center" 
              gap={0}
              mt={{ base: 4, md: 6 }}
              mb={{ base: 2, md: 6 }}
              
              w="100%"

              id="help-text"
                transition="all 0.3s ease-in-out"
            >
              <Text 
                textStyle="brand.text.large" 
                textAlign="center" 
                color="white"
              >
                Problemas com seu acesso?
              </Text>

              <Text 
                textStyle="brand.text.default" 
                textAlign="center" 
                color="white"
              >
                Entre em <ContactLink>contato aqui</ContactLink>
              </Text>
            </Flex>


          </CardOutline>
        </Wrapper.Center>
      </LayoutHotsite>
    </>
  )
}
