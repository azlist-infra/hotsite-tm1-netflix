'use client'

import { LayoutHotsite } from '@/layouts/layout'
import { Box, Flex, Text, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { createPaxNetflixAction, type GetPaxNetflixResponse } from '@/app/api/pax-netflix'

const inscriptionSchema = z.object({
  nome: z.string().min(1, 'Nome completo é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  empresa: z.string().min(1, 'Empresa é obrigatória'),
  telefone: z.string().min(1, 'Telefone é obrigatório').min(8, 'Telefone deve ter no mínimo 8 dígitos'),
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
  const router = useRouter()
  const [paxData, setPaxData] = useState<GetPaxNetflixResponse | null>(null)
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

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

  // Carrega dados do participante do sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem('paxData')
    
    if (!storedData) {
      // Se não há dados, redireciona para home
      router.push('/')
      return
    }

    try {
      const parsed = JSON.parse(storedData) as GetPaxNetflixResponse
      console.log('📦 Dados carregados do sessionStorage:', parsed)
      console.log('📧 Email encontrado em:', {
        'paxData.Email': parsed.Email,
        'paxData.paxData?.Email': parsed.paxData?.Email
      })
      setPaxData(parsed)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
      router.push('/')
    }
  }, [router])

  const onSubmit = async (data: InscriptionFormData) => {
    // Busca o email em múltiplos lugares possíveis da resposta
    const email = paxData?.Email || paxData?.paxData?.Email
    
    if (!email) {
      setError('Email não encontrado. Por favor, volte e tente novamente.')
      console.error('Dados disponíveis:', paxData)
      return
    }

    try {
      setError('')
      setSuccessMessage('')

      const result = await createPaxNetflixAction({
        Name: data.nome,
        Email: email,
        Phone: data.telefone,
        CompanyName: data.empresa,
        SearchKey: email,
      })

      if (result.success) {
        setSuccessMessage('Inscrição realizada com sucesso! Você receberá um e-mail de confirmação.')
        
        // Atualiza os dados no sessionStorage
        const updatedPaxData = { ...paxData, event: 'confirmed' as const }
        sessionStorage.setItem('paxData', JSON.stringify(updatedPaxData))
        setPaxData(updatedPaxData)
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(result.error || 'Erro ao realizar inscrição')
      }
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro ao processar inscrição. Tente novamente.')
    }
  }

  // Loading enquanto carrega dados
  if (!paxData) {
    return (
      <LayoutHotsite fullWidth>
        <Wrapper.Center>
          <Flex minH="100vh" align="center" justify="center">
            <Text color="white" fontSize="18px">Carregando...</Text>
          </Flex>
        </Wrapper.Center>
      </LayoutHotsite>
    )
  }

  // Verifica se já está confirmado
  const isAlreadyConfirmed = paxData.event === 'confirmed'

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
                <TitleBase title={isAlreadyConfirmed ? "Inscrição Confirmada" : "Confirme sua presença"} />
                
                <Box
                  bg="gray.900"
                  p={6}
                  borderRadius="8px"
                  border="1px solid"
                  borderColor="gray.700"
                >
                  {/* Mostra Email */}
                  <Box mb={4} p={4} bg="gray.800" borderRadius="8px">
                    <Text fontSize="14px" color="gray.400" mb={1}>
                      E-mail do convite:
                    </Text>
                    <Text fontSize="16px" color="white" fontWeight="bold">
                      {paxData.Email || paxData.paxData?.Email || 'Email não disponível'}
                    </Text>
                  </Box>

                  {/* Mensagens de Sucesso/Erro */}
                  {successMessage && (
                    <Box mb={4} p={4} bg="green.900" borderRadius="8px" border="1px solid" borderColor="green.600">
                      <Text color="green.200" fontSize="16px">
                        ✓ {successMessage}
                      </Text>
                    </Box>
                  )}

                  {error && (
                    <Box mb={4} p={4} bg="red.900" borderRadius="8px" border="1px solid" borderColor="red.600">
                      <Text color="red.200" fontSize="16px">
                        ✕ {error}
                      </Text>
                    </Box>
                  )}

                  {/* Cenário 1: Já está inscrito (event === "confirmed") */}
                  {isAlreadyConfirmed ? (
                    <Flex direction="column" gap={4}>
                      <Box p={4} bg="green.900" borderRadius="8px" border="1px solid" borderColor="green.600">
                        <Text fontSize="18px" color="green.200" fontWeight="bold" mb={3}>
                          ✓ Sua presença já está confirmada!
                        </Text>
                        <Text fontSize="16px" color="white" mb={2}>
                          Obrigado por confirmar sua participação no evento Netflix Feito Aqui.
                        </Text>
                        <Text fontSize="16px" color="gray.300">
                          Você receberá mais informações por e-mail nos próximos dias.
                        </Text>
                      </Box>

                      {/* Dados Cadastrais */}
                      <Box>
                        <Text fontSize="16px" color="white" fontWeight="bold" mb={3}>
                          Seus dados cadastrais:
                        </Text>
                        <Flex direction="column" gap={3}>
                          <Box>
                            <Text fontSize="14px" color="gray.400">Nome:</Text>
                            <Text fontSize="16px" color="white">
                              {paxData.Name || paxData.paxData?.Name || '-'}
                            </Text>
                          </Box>
                          
                          <Box>
                            <Text fontSize="14px" color="gray.400">E-mail:</Text>
                            <Text fontSize="16px" color="white">
                              {paxData.Email || paxData.paxData?.Email || '-'}
                            </Text>
                          </Box>
                          
                          <Box>
                            <Text fontSize="14px" color="gray.400">Empresa:</Text>
                            <Text fontSize="16px" color="white">
                              {paxData.CompanyName || paxData.paxData?.CompanyName || '-'}
                            </Text>
                          </Box>
                          
                          <Box>
                            <Text fontSize="14px" color="gray.400">Telefone:</Text>
                            <Text fontSize="16px" color="white">
                              {paxData.Phone || paxData.paxData?.Phone || '-'}
                            </Text>
                          </Box>
                          
                          <Box>
                            <Text fontSize="14px" color="gray.400">SearchKey:</Text>
                            <Text fontSize="16px" color="white">
                              {paxData.SearchKey || paxData.paxData?.SearchKey || '-'}
                            </Text>
                          </Box>
                          
                          <Box>
                            <Text fontSize="14px" color="gray.400">Tipo de ingresso:</Text>
                            <Text fontSize="16px" color="white">
                              {paxData.eventTicket?.ticket?.Name || paxData.paxData?.eventTicket?.ticket?.Name || '-'}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  ) : (
                    /* Cenário 2: Não está inscrito (event === "base") - Mostra formulário */
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
                          {isLoading ? 'Enviando...' : 'Confirmar Presença'}
                        </CustomSubmitButton>
                      </Flex>
                    </form>
                  )}
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

