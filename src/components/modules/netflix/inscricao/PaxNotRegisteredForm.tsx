'use client'

import React from 'react'
import { Box, Flex, Text, Link, Button } from '@chakra-ui/react'
import { TextField, CheckboxField, PhoneField } from '@/components/forms/fields'
import type { Control, UseFormHandleSubmit } from 'react-hook-form'
import { Wrapper } from '@/layouts/wrapper'

interface FormData {
  nome: string
  empresa: string
  telefone: string
  privacidade: boolean
}

interface PaxNotRegisteredFormProps {
  control: Control<FormData>
  handleSubmit: UseFormHandleSubmit<FormData>
  onSubmit: (data: FormData) => Promise<void>
  isLoading: boolean
  paxEmail: string
}

/**
 * Formulário de inscrição para participantes não cadastrados
 * 
 * Exibe o email do participante e um formulário para completar o cadastro
 */
export const PaxNotRegisteredForm = ({
  control,
  handleSubmit,
  onSubmit,
  isLoading,
  paxEmail
}: PaxNotRegisteredFormProps) => {
  return (
    <Wrapper.Center padding={0}>
      <Box
        //bg="gray.900"
        //px={{ base: 4, sm: 6, md: 6 }}
        //bg="gray.900"

        borderRadius="8px"
        border="0px solid"
        borderColor="gray.700"
        w={{ base: "100%", sm: "100%", md: "650px" }} // 594
        maxW='650px'
      >
        {/* Mostra Email */}
        <Box
          mb={{ base: 4, md: 8 }}
          p={{ base: 3, md: 4 }}
          bg="gray.800"
          borderRadius="8px"
        >
          <Text
            fontSize={{ base: "12px", md: "14px" }}
            color="gray.400"
            mb={1}
          >
            E-mail do convite:
          </Text>
          <Text
            textStyle="brand.text.default"
            color="white"
            fontWeight="bold"
          >
            {paxEmail}
          </Text>
        </Box>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Flex direction="column" gap={{ base: 4, md: 8 }}>
            <TextField
              name="nome"
              control={control}
              //label="Nome completo Label"
              placeholder="Nome Completo"
              required
              disabled={isLoading}
              variant="default"
            />


            <TextField
              //label="Empresa"
              name="empresa"
              control={control}
              //label="Empresa"
              placeholder="Empresa"
              required
              disabled={isLoading}
              variant="default"
            />

            <PhoneField
              name="telefone"
              control={control}
              placeholder="Telefone"
              helperText="Formato: (11) 99999-9999"
              required
              disabled={isLoading}
              variant="default"
            />

            <CheckboxField
              name="privacidade"
              control={control}
              disabled={isLoading}
              colorPalette="red"
            >
              <Text textStyle="brand.text.normal" color="white">
                Autorizo o tratamento dos meus dados pessoais conforme a{' '}
                <Link
                  textStyle="brand.text.normal"
                  color="white"
                  textDecoration="underline"
                  href="/politica-de-privacidade-feito-aqui.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                  _hover={{ opacity: 0.8 }}
                  _focus={{ outline: "none" }}
                  _active={{ outline: "none" }}
                >
                  Política de Privacidade
                </Link>
                .
              </Text>
            </CheckboxField>

            <Box w={{ base: "100%", md: "100%" }} display="flex" justifyContent="center">
              <Button
                variant="custom"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                w={{ base: "100%", md: "50%" }}
                mt={{ base: 2, md: 4 }}
                px={{ base: 8, md: 16 }}
              >
                {isLoading ? 'Enviando...' : 'Confirmar Presença'}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Wrapper.Center>
  )
}

