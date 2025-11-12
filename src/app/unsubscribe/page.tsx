'use client'

import React from 'react'
import { Box, Text, Button, VStack } from '@chakra-ui/react'

// Layouts
import { LayoutHotsite } from '@/layouts/layout'
import { Wrapper } from '@/layouts/wrapper'
import { CardOutline } from '@/layouts/box/CardOutline'

// Components
import { InputEmail } from '@/components/modules/auth/InputEmail'
import { NetflixLogo } from '@/components/modules/netflix'
import { useUnsubscribeForm } from '@/components/modules/netflix/unsubscribe'

export default function UnsubscribePage() {
  const {
    register,
    handleSubmit,
    onSubmit,
    isLoading,
    fieldError,
    hasError,
  } = useUnsubscribeForm()

  return (
    <>
      <LayoutHotsite fullWidth>
        <Wrapper.Center>
          <CardOutline>
            {/* Logo Netflix */}
            <Box p={0} mt={{ base: 4, md: 12 }}>
              <NetflixLogo width={120} height={32} />
            </Box>

            {/* Título */}
            <Box 
              w="100%"
              maxW={{ base: "100%", md: "550px" }}
              px={{ base: 2, md: 0 }}
              mt={{ base: 6, md: 12 }}
            >
              <Text 
                textStyle="brand.text.xlbold" 
                textAlign="center" 
                color="primary"
                fontSize={{ base: "24px", md: "32px" }}
                mb={{ base: 4, md: 6 }}
              >
                Cancelar envios de e-mails
              </Text>
              
              <Text 
                textStyle="brand.text.default" 
                textAlign="center" 
                color="white"
              >
                Informe seu e-mail para deixar de receber nossas mensagens.
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
                    error={fieldError}
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
                    mt={{ base: 2, md: 4 }}
                    px={{ base: 8, md: 16 }}
                  >
                    {isLoading ? 'Processando...' : 'Cancelar'}
                  </Button>
                </VStack>
              </form>
            </Box>

            {/* Espaçamento final */}
            <Box mt={{ base: 4, md: 8 }} />
          </CardOutline>
        </Wrapper.Center>
      </LayoutHotsite>
    </>
  )
}