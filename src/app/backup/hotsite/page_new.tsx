"use client"

import {
    Box,
    Container,
    Flex,
    VStack,
    HStack,
    Heading,
    Text,
    Input,
    Button,
    Checkbox,
    Link,
} from "@chakra-ui/react"
import { useState } from "react"
import Image from "next/image"

// Componente SVG para substituir os retângulos vermelhos dos títulos
const NetflixTitleIcon = () => {
    return (
        <Box
            as="span"
            display="inline-block"
            flexShrink={0}
            verticalAlign="middle"
            mr="10px"
            lineHeight={0}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31.213"
                height="20.435"
                viewBox="0 0 32 21"
                fill="none"
            >
                <path
                    d="M0 0.000881195V20.4355H6.73733V18.1902H12.1267V15.9449H18.1893V13.4742H24.7013V11.6782H31.2133V9.65688L0 0.000881195Z"
                    fill="#E50914"
                />
            </svg>
        </Box>
    )
}

export default function Page() {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        empresa: "",
        telefone: "",
        privacidade: false,
    })

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Formulário enviado:", formData)
        // Adicione sua lógica de envio aqui
    }

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    const netflixRed = "#e50914"
    const darkBg = "#000000"
    const darkGray = "#111111"
    const mediumGray = "#222222"
    const borderGray = "#333333"
    const lightGray = "#cccccc"
    const labelGray = "#3a3a3a"

    // FAQ atualizado conforme Figma
    const faqData = [
        {
            question: "O Netflix Feito Aqui é aberto ao público?",
            answer: "Não. O evento é restrito a convidados previamente selecionados pela Netflix.",
        },
        {
            question: "O evento será presencial ou digital?",
            answer: "O evento será 100% presencial no Villaggio JK, em São Paulo.",
        },
        {
            question: "O evento é acessível?",
            answer: "Sim, o local possui total acessibilidade para pessoas com deficiência.",
        },
        {
            question: "Como confirmar minha presença no evento?",
            answer: "Preencha o formulário acima com seus dados completos.",
        },
        {
            question: "Posso indicar outra pessoa para participar do evento?",
            answer: "Não. O evento é restrito a convidados previamente selecionados pela Netflix.",
        },
        {
            question: "Fiz minha inscrição, mas não poderei comparecer. O que devo fazer?",
            answer: "",
        },
        {
            question: "O transporte até o local será oferecido pela Netflix?",
            answer: "",
        },
        {
            question: "Haverá estacionamento no local?",
            answer: "",
        },
        {
            question: "O evento oferece comidas e bebidas?",
            answer: "",
        },
        {
            question: "Como garantir meu acesso ao evento?",
            answer: "",
        },
    ]

    return (
        <Box bg={darkBg} color="white" minH="100vh" fontFamily="'Roboto', sans-serif">
            <Container maxW="600px" p={0}>
                {/* Header com Imagens */}
                <VStack gap={0} align="stretch">
                    {/* Imagem Principal */}
                    <Box position="relative" w="100%" h="auto">
                        <Image
                            src="/img/img1.png"
                            alt="Netflix Feito Aqui - Header Principal"
                            width={1053}
                            height={271}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                            priority
                        />
                    </Box>
                    {/* Imagens Secundárias */}
                    <Flex w="100%" gap={0} align="stretch">
                        {/* Imagem Secundária A (Esquerda) */}
                        <Box flex={1} position="relative" w="100%" h="auto">
                            <Image
                                src="/img/img2A.png"
                                alt="Netflix Feito Aqui - Secundária A"
                                width={300}
                                height={200}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    display: "block",
                                }}
                                priority
                            />
                        </Box>
                        {/* Imagem Secundária B (Direita) */}
                        <Box flex={1} position="relative" w="100%" h="auto">
                            <Image
                                src="/img/img2B.png"
                                alt="Netflix Feito Aqui - Secundária B"
                                width={300}
                                height={200}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    display: "block",
                                }}
                                priority
                            />
                        </Box>
                    </Flex>
                </VStack>

                {/* Data e Local - Movido para depois do header */}
                <Box bg="rgba(0, 0, 0, 0.8)" p="15px" textAlign="center" borderBottom={`2px solid ${netflixRed}`}>
                    <Text fontSize="40px" fontWeight="normal" color="white" mb="5px" fontFamily="'VCR_OSD_Mono', monospace">
                        09/12 • 17h
                    </Text>
                    <Text fontSize="14px" color={lightGray}>
                        Villaggio JK | São Paulo (SP)
                    </Text>
                </Box>

                {/* Conteúdo Principal */}
                <Box p={{ base: "20px 15px", md: "40px 20px" }}>
                    {/* Descrição do Evento */}
                    <VStack gap="30px" mb="60px" align="stretch">
                        <Text fontSize="26.667px" lineHeight="normal" color="white" fontFamily="'Roboto', sans-serif">
                            <Text as="strong" fontWeight="bold">O Netflix Feito Aqui é um encontro criado para celebrar o talento, a criatividade e o impacto do audiovisual brasileiro.</Text>
                        </Text>
                        <Text fontSize="26.667px" lineHeight="normal" color="white" fontFamily="'Roboto', sans-serif">
                            Um momento para reunir parceiros, profissionais e criadores que fazem parte dessa trajetória, compartilhando conquistas, novas histórias e o que vem pela frente.
                        </Text>
                        <Text fontSize="26.667px" lineHeight="normal" color="white" fontFamily="'Roboto', sans-serif">
                            Mais do que um evento, é uma experiência que reconhece o poder das narrativas feitas no Brasil e seu alcance global.
                        </Text>
                    </VStack>

                    {/* Formulário de Confirmação */}
                    <VStack gap="20px" mb="60px" align="stretch">
                        <Flex align="center" mb="10px">
                            <NetflixTitleIcon />
                            <Heading
                                fontSize="33.146px"
                                fontWeight="normal"
                                color="white"
                                fontFamily="'VCR_OSD_Mono', monospace"
                                letterSpacing="normal"
                            >
                                Confirme sua presença
                            </Heading>
                        </Flex>
                        <Box
                            as="form"
                            onSubmit={handleSubmit}
                            bg={darkGray}
                            p="40px"
                            borderRadius="0"
                        >
                            <VStack gap="15px" align="stretch">
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="24px"
                                        color={labelGray}
                                        mb="8px"
                                        fontFamily="'Roboto', sans-serif"
                                        fontWeight="normal"
                                    >
                                        Nome:
                                    </Text>
                                    <Input
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        bg="transparent"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor={borderGray}
                                        borderRadius="0"
                                        color="white"
                                        fontSize="24px"
                                        p="10px 0"
                                        fontFamily="'Roboto', sans-serif"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                            boxShadow: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="24px"
                                        color={labelGray}
                                        mb="8px"
                                        fontFamily="'Roboto', sans-serif"
                                        fontWeight="normal"
                                    >
                                        Sobrenome:
                                    </Text>
                                    <Input
                                        name="sobrenome"
                                        value={formData.sobrenome}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        bg="transparent"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor={borderGray}
                                        borderRadius="0"
                                        color="white"
                                        fontSize="24px"
                                        p="10px 0"
                                        fontFamily="'Roboto', sans-serif"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                            boxShadow: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="24px"
                                        color={labelGray}
                                        mb="8px"
                                        fontFamily="'Roboto', sans-serif"
                                        fontWeight="normal"
                                    >
                                        E-mail:
                                    </Text>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        bg="transparent"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor={borderGray}
                                        borderRadius="0"
                                        color="white"
                                        fontSize="24px"
                                        p="10px 0"
                                        fontFamily="'Roboto', sans-serif"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                            boxShadow: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="24px"
                                        color={labelGray}
                                        mb="8px"
                                        fontFamily="'Roboto', sans-serif"
                                        fontWeight="normal"
                                    >
                                        Empresa:
                                    </Text>
                                    <Input
                                        name="empresa"
                                        value={formData.empresa}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        bg="transparent"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor={borderGray}
                                        borderRadius="0"
                                        color="white"
                                        fontSize="24px"
                                        p="10px 0"
                                        fontFamily="'Roboto', sans-serif"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                            boxShadow: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="24px"
                                        color={labelGray}
                                        mb="8px"
                                        fontFamily="'Roboto', sans-serif"
                                        fontWeight="normal"
                                    >
                                        Telefone:
                                    </Text>
                                    <Input
                                        type="tel"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        bg="transparent"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor={borderGray}
                                        borderRadius="0"
                                        color="white"
                                        fontSize="24px"
                                        p="10px 0"
                                        fontFamily="'Roboto', sans-serif"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                            boxShadow: "none",
                                        }}
                                    />
                                </Box>

                                <HStack align="flex-start" gap="10px" mt="20px">
                                    <Box mt="3px">
                                        <Checkbox.Root
                                            checked={formData.privacidade}
                                            onCheckedChange={(e: { checked: boolean | "indeterminate" }) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    privacidade: e.checked === true,
                                                }))
                                            }
                                        >
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control />
                                        </Checkbox.Root>
                                    </Box>
                                    <Text fontSize="24px" color="white" lineHeight="normal" fontFamily="'Roboto', sans-serif" fontWeight="normal">
                                        Autorizo o tratamento dos meus dados pessoais conforme a{" "}
                                        <Link color={netflixRed} textDecoration="underline" href="#">
                                            Política de Privacidade
                                        </Link>
                                        .
                                    </Text>
                                </HStack>

                                <Button
                                    type="submit"
                                    bg={netflixRed}
                                    color="white"
                                    py="20px"
                                    px="40px"
                                    borderRadius="0"
                                    fontSize="29.141px"
                                    fontWeight="500"
                                    fontFamily="'Roboto', sans-serif"
                                    w="auto"
                                    alignSelf="center"
                                    mt="30px"
                                    _hover={{
                                        bg: "#b8070f",
                                    }}
                                >
                                    Enviar
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Local */}
                    <VStack gap="20px" mb="60px" align="stretch">
                        <Flex align="center" mb="10px">
                            <NetflixTitleIcon />
                            <Heading
                                fontSize="33.146px"
                                fontWeight="normal"
                                color="white"
                                fontFamily="'VCR_OSD_Mono', monospace"
                                letterSpacing="normal"
                            >
                                Local
                            </Heading>
                        </Flex>
                        <Box bg={darkGray} p="0" borderRadius="0">
                            <VStack align="stretch" gap="20px" p="30px">
                                <Box>
                                    <Text
                                        fontWeight="bold"
                                        color={netflixRed}
                                        fontSize="29.333px"
                                        mb="10px"
                                        fontFamily="'Roboto', sans-serif"
                                    >
                                        Villaggio JK
                                    </Text>
                                    <Text color="white" fontSize="26.667px" lineHeight="normal" fontFamily="'Roboto', sans-serif" mb="20px">
                                        R. Funchal, 500 – Vila Olímpia<br />
                                        São Paulo (SP)
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold" color="white" fontSize="29.333px" mb="15px" fontFamily="'Roboto', sans-serif">
                                        Acesso:
                                    </Text>
                                    <VStack align="stretch" gap="15px">
                                        <Text fontSize="26.667px" color="white" lineHeight="normal" fontFamily="'Roboto', sans-serif">
                                            <Text as="strong" fontWeight="bold">Carro de aplicativo:</Text> o desembarque pode ser feito em frente à entrada principal do Villaggio JK.
                                        </Text>
                                        <Text fontSize="26.667px" color="white" lineHeight="normal" fontFamily="'Roboto', sans-serif">
                                            <Text as="strong" fontWeight="bold">Carro particular:</Text> há serviço de valet disponível no local.
                                        </Text>
                                    </VStack>
                                </Box>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* FAQ */}
                    <VStack gap="20px" mb="60px" align="stretch">
                        <Flex align="center" mb="20px">
                            <NetflixTitleIcon />
                            <Heading
                                fontSize="33.146px"
                                fontWeight="normal"
                                color="white"
                                fontFamily="'VCR_OSD_Mono', monospace"
                                letterSpacing="normal"
                            >
                                Perguntas Frequentes
                            </Heading>
                        </Flex>
                        <Box>
                            <VStack gap="0" align="stretch">
                                {faqData.map((faq, idx) => (
                                    <Box
                                        key={idx}
                                        bg={darkGray}
                                        mb="10px"
                                        borderRadius="0"
                                        border="none"
                                        overflow="hidden"
                                    >
                                        <Box
                                            as="button"
                                            onClick={() => toggleFaq(idx)}
                                            bg={openFaqIndex === idx ? "#b8070f" : netflixRed}
                                            color="white"
                                            py="20px"
                                            px="20px"
                                            fontWeight="bold"
                                            fontSize="26.667px"
                                            fontFamily="'Roboto', sans-serif"
                                            w="100%"
                                            textAlign="left"
                                            position="relative"
                                            _hover={{ bg: "#b8070f" }}
                                        >
                                            <Flex justify="space-between" align="center">
                                                <Text flex={1} fontFamily="'Roboto', sans-serif">{faq.question}</Text>
                                                <Text fontSize="20px" ml="15px">
                                                    {openFaqIndex === idx ? "−" : "+"}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        {openFaqIndex === idx && faq.answer && (
                                            <Box
                                                py="20px"
                                                px="20px"
                                                color="white"
                                                fontSize="26.667px"
                                                lineHeight="normal"
                                                fontFamily="'Roboto', sans-serif"
                                            >
                                                {faq.answer}
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    </VStack>
                </Box>

                {/* Footer */}
                <Box bg={mediumGray} p="40px 20px" textAlign="center" mt="60px">
                    <Flex
                        justify="center"
                        gap="123px"
                        mb="20px"
                        direction={{ base: "column", md: "row" }}
                        align="center"
                    >
                        <Link 
                            color="white" 
                            textDecoration="underline" 
                            fontSize="18px" 
                            href="#"
                            fontFamily="'Roboto', sans-serif"
                            fontWeight="normal"
                        >
                            Contato para suporte
                        </Link>
                        <Link 
                            color="white" 
                            textDecoration="none" 
                            fontSize="18px" 
                            href="#"
                            fontFamily="'Roboto', sans-serif"
                            fontWeight="normal"
                        >
                            Política de privacidade
                        </Link>
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}
