'use client'

import { LayoutHotsite } from '@/layouts/layout'
import { Box, Container, Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { Image } from '@/components/ui/image/Image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField, CheckboxField } from '@/components/forms/fields'
import { TitleBase } from './components/TitleBase'
import { CustomSubmitButton } from './components/CustomSubmitButton'
import { LocationSection } from './components/LocationSection'
import { FAQAccordion } from './components/FAQAccordion'
import { Wrapper } from '@/layouts/wrapper'

const inscriptionSchema = z.object({
  nome: z.string().min(1, 'Nome completo é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  empresa: z.string().min(1, 'Empresa é obrigatória'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  privacidade: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar a política de privacidade'
  })
})

type InscriptionFormData = z.infer<typeof inscriptionSchema>

const faqData = [
  {
    question: 'O Netflix Feito Aqui é aberto ao público?',
    answer: 'Não. O evento é restrito a convidados previamente selecionados pela Netflix.'
  },
  {
    question: 'O evento será presencial ou digital?',
    answer: 'O evento será 100% presencial no Villaggio JK, em São Paulo.'
  },
  {
    question: 'O evento é acessível?',
    answer: 'Sim, o local possui total acessibilidade para pessoas com deficiência.'
  },
  {
    question: 'Como confirmar minha presença no evento?',
    answer: 'Preencha o formulário acima com seus dados completos.'
  },
  {
    question: 'Posso indicar outra pessoa para participar do evento?',
    answer: 'Não. O evento é restrito a convidados previamente selecionados pela Netflix.'
  },
  {
    question: 'Fiz minha inscrição, mas não poderei comparecer. O que devo fazer?',
    answer: 'Entre em contato através do suporte para informar sua ausência.'
  },
  {
    question: 'O transporte até o local será oferecido pela Netflix?',
    answer: 'O transporte não será oferecido pela Netflix. Consulte a seção Local para informações sobre acesso.'
  },
  {
    question: 'Haverá estacionamento no local?',
    answer: 'Sim, há serviço de valet disponível no local para carros particulares.'
  },
  {
    question: 'O evento oferece comidas e bebidas?',
    answer: 'Sim, o evento oferece comidas e bebidas durante toda a programação.'
  },
  {
    question: 'Como garantir meu acesso ao evento?',
    answer: 'Preencha o formulário de inscrição e aguarde a confirmação por e-mail.'
  }
]

export default function InscricaoPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<InscriptionFormData>({
    resolver: zodResolver(inscriptionSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange'
  })

  const isLoading = isSubmitting

  const onSubmit = async (data: InscriptionFormData) => {
    console.log('Dados do formulário:', data)
    // Aqui você pode adicionar a lógica de submit
  }

  return (
    <>
      <LayoutHotsite fullWidth>
      <Wrapper.Center >
          <Flex
            gap={8}
            align="center"
            justify="center"
            bgColor="black"
            flexDirection="column"
            py={30}
            w={{base: "100%", md: "800px"}}
          >
            {/* Header com Imagem */}
            <Box w="800" maxW="1200px">
              <Image
                src="/img/netflix/inscricao_imagem_01.png"
                alt="Netflix Feito Aqui - Header"
                width={1056}
                height={276}
              />
            </Box>

            {/* Texto Intro */}
            <Box maxW="800px" px={4}>
              <Flex direction="column" gap={4}>
                <Text fontSize="16px" lineHeight="1.6" color="white">
                  <Text as="strong">O Netflix Feito Aqui é um encontro criado para celebrar o talento, a criatividade e o impacto do audiovisual brasileiro.</Text>
                </Text>
                <Text fontSize="16px" lineHeight="1.6" color="white">
                  Um momento para reunir parceiros, profissionais e criadores que fazem parte dessa trajetória, compartilhando conquistas, novas histórias e o que vem pela frente.
                </Text>
                <Text fontSize="16px" lineHeight="1.6" color="white">
                  Mais do que um evento, é uma experiência que reconhece o poder das narrativas feitas no Brasil e seu alcance global.
                </Text>
              </Flex>
            </Box>

            {/* Seção de Inscrição */}
            <Box maxW="800px" w="100%" px={4}>
              <Flex direction="column" gap={4} mb={8}>
                <TitleBase title="Confirme sua presença" />
                
                <Box
                  bg="gray.900"
                  p={6}
                  borderRadius="8px"
                  border="1px solid"
                  borderColor="gray.700"
                >
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Flex direction="column" gap={4}>
                      <TextField
                        name="nome"
                        control={control}
                        label="Nome completo"
                        placeholder="Digite seu nome completo"
                        required
                        disabled={isLoading}
                        variant="default"
                      />

                      <TextField
                        name="empresa"
                        control={control}
                        label="Empresa"
                        placeholder="Digite o nome da sua empresa"
                        required
                        disabled={isLoading}
                        variant="default"
                      />

                      <TextField
                        name="telefone"
                        control={control}
                        label="Telefone"
                        placeholder="(11) 99999-9999"
                        type="tel"
                        required
                        disabled={isLoading}
                        variant="default"
                      />

                      <Box>
                        <CheckboxField
                          name="privacidade"
                          control={control}
                          label="Autorizo o tratamento dos meus dados pessoais conforme a Política de Privacidade."
                          disabled={isLoading}
                          colorPalette="red"
                        />
                        <Text fontSize="12px" color="gray.400" mt={1}>
                          Ao marcar esta opção, você concorda com nossa{' '}
                          <Link color="#E50914" textDecoration="underline" href="#">
                            Política de Privacidade
                          </Link>
                          .
                        </Text>
                      </Box>

                      <CustomSubmitButton isLoading={isLoading}>
                        {isLoading ? 'Enviando...' : 'Enviar'}
                      </CustomSubmitButton>
                    </Flex>
                  </form>
                </Box>
              </Flex>
            </Box>

            {/* Seção Local */}
            <Box maxW="1200px" w="100%" px={4}>
              <Flex direction="column" gap={4} mb={8}>
                <TitleBase title="Local" />
                <LocationSection />
              </Flex>
            </Box>

            {/* Perguntas Frequentes */}
            <Box maxW="800px" w="100%" px={4}>
              <Flex direction="column" gap={4} mb={8}>
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

