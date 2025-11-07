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
    const textGray = "#666666"

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
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        },
        {
            question: "O transporte até o local será oferecido pela Netflix?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        },
        {
            question: "Haverá estacionamento no local?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        },
        {
            question: "O evento oferece comidas e bebidas?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        },
        {
            question: "Como garantir meu acesso ao evento?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        },
    ]

    return (
        <Box bg={darkBg} color="white" minH="100vh">
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
                                width={136}
                                height={21}
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
                                width={654}
                                height={27}
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

                {/* Conteúdo Principal */}
                <Box p={{ base: "20px 15px", md: "30px 20px" }}>
                    {/* Descrição do Evento */}
                    <VStack gap="20px" mb="40px" align="stretch">
                        <Text fontSize="16px" lineHeight="1.6" color="white">
                            <Text as="strong">O Netflix Feito Aqui é um encontro criado para celebrar o talento, a criatividade e o impacto do audiovisual brasileiro.</Text>
                        </Text>
                        <Text fontSize="16px" lineHeight="1.6" color="white">
                            Um momento para reunir parceiros, profissionais e criadores que fazem parte dessa trajetória, compartilhando conquistas, novas histórias e o que vem pela frente.
                        </Text>
                        <Text fontSize="16px" lineHeight="1.6" color="white">
                            Mais do que um evento, é uma experiência que reconhece o poder das narrativas feitas no Brasil e seu alcance global.
                        </Text>
                        <Text fontSize="16px" lineHeight="1.6" color="white">
                            <Text as="strong">Um brinde a quem faz do nosso conteúdo uma referência para o mundo inteiro.</Text>
                        </Text>
                    </VStack>

                    {/* Formulário de Confirmação */}
                    <VStack gap="15px" mb="40px" align="stretch">
                        <Flex align="center">
                            <NetflixTitleIcon />
                            <Heading
                                fontSize="18px"
                                fontWeight="bold"
                                color={netflixRed}
                                textTransform="uppercase"
                                letterSpacing="1px"
                            >
                                Confirme sua presença
                            </Heading>
                        </Flex>
                        <Box
                            as="form"
                            onSubmit={handleSubmit}
                            bg={darkGray}
                            p="25px"
                            borderRadius="8px"
                            border={`1px solid ${borderGray}`}
                        >
                            <VStack gap="15px" align="stretch">
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="14px"
                                        color={lightGray}
                                        mb="5px"
                                    >
                                        Nome:
                                    </Text>
                                    <Input
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        placeholder="Seu nome"
                                        bg={mediumGray}
                                        border={`1px solid #444444`}
                                        borderRadius="4px"
                                        color="white"
                                        fontSize="14px"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="14px"
                                        color={lightGray}
                                        mb="5px"
                                    >
                                        Sobrenome:
                                    </Text>
                                    <Input
                                        name="sobrenome"
                                        value={formData.sobrenome}
                                        onChange={handleInputChange}
                                        placeholder="Seu sobrenome"
                                        bg={mediumGray}
                                        border={`1px solid #444444`}
                                        borderRadius="4px"
                                        color="white"
                                        fontSize="14px"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="14px"
                                        color={lightGray}
                                        mb="5px"
                                    >
                                        E-mail:
                                    </Text>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="seu@email.com"
                                        bg={mediumGray}
                                        border={`1px solid #444444`}
                                        borderRadius="4px"
                                        color="white"
                                        fontSize="14px"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="14px"
                                        color={lightGray}
                                        mb="5px"
                                    >
                                        Empresa:
                                    </Text>
                                    <Input
                                        name="empresa"
                                        value={formData.empresa}
                                        onChange={handleInputChange}
                                        placeholder="Sua empresa"
                                        bg={mediumGray}
                                        border={`1px solid #444444`}
                                        borderRadius="4px"
                                        color="white"
                                        fontSize="14px"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        as="label"
                                        display="block"
                                        fontSize="14px"
                                        color={lightGray}
                                        mb="5px"
                                    >
                                        Telefone:
                                    </Text>
                                    <Input
                                        type="tel"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleInputChange}
                                        placeholder="(11) 99999-9999"
                                        bg={mediumGray}
                                        border={`1px solid #444444`}
                                        borderRadius="4px"
                                        color="white"
                                        fontSize="14px"
                                        _focus={{
                                            borderColor: netflixRed,
                                            outline: "none",
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
                                    <Text fontSize="12px" color={lightGray} lineHeight="1.4">
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
                                    py="15px"
                                    px="40px"
                                    borderRadius="4px"
                                    fontSize="16px"
                                    fontWeight="bold"
                                    w="100%"
                                    textTransform="uppercase"
                                    letterSpacing="1px"
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
                    <VStack gap="15px" mb="40px" align="stretch">
                        <Flex align="center">
                            <NetflixTitleIcon />
                            <Heading
                                fontSize="18px"
                                fontWeight="bold"
                                color={netflixRed}
                                textTransform="uppercase"
                                letterSpacing="1px"
                            >
                                Local
                            </Heading>
                        </Flex>
                        <Box bg={darkGray} p="20px" borderRadius="8px">
                            <VStack align="stretch" gap="15px">
                                <Box>
                                    <Text
                                        fontWeight="bold"
                                        color={netflixRed}
                                        fontSize="16px"
                                        mb="5px"
                                    >
                                        Villaggio JK
                                    </Text>
                                    <Text color={lightGray} fontSize="14px" mb="15px">
                                        R. Funchal, 500 – Vila Olímpia
                                        <br />
                                        São Paulo (SP)
                                    </Text>
                                </Box>
                                <Box mt="15px">
                                    <Text fontWeight="bold" color="white" fontSize="14px" mb="10px">
                                        Acesso:
                                    </Text>
                                    <VStack align="stretch" gap="10px">
                                        <Text fontSize="14px" color={lightGray}>
                                            <Text as="strong">Carro de aplicativo:</Text> o desembarque pode ser feito em frente à entrada principal do Villaggio JK.
                                        </Text>
                                        <Text fontSize="14px" color={lightGray}>
                                            <Text as="strong">Carro particular:</Text> há serviço de valet disponível no local.
                                        </Text>
                                    </VStack>
                                </Box>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* FAQ */}
                    <VStack gap="15px" mb="40px" align="stretch">
                        <Flex align="center">
                            <NetflixTitleIcon />
                            <Heading
                                fontSize="18px"
                                fontWeight="bold"
                                color={netflixRed}
                                textTransform="uppercase"
                                letterSpacing="1px"
                            >
                                Perguntas Frequentes
                            </Heading>
                        </Flex>
                        <Box mt="30px">
                            <VStack gap="10px" align="stretch">
                                {faqData.map((faq, idx) => (
                                    <Box
                                        key={idx}
                                        bg={darkGray}
                                        mb="10px"
                                        borderRadius="4px"
                                        border="none"
                                        overflow="hidden"
                                    >
                                        <Box
                                            as="button"
                                            onClick={() => toggleFaq(idx)}
                                            bg={openFaqIndex === idx ? "#b8070f" : netflixRed}
                                            color="white"
                                            py="15px"
                                            px="20px"
                                            fontWeight="bold"
                                            fontSize="14px"
                                            w="100%"
                                            textAlign="left"
                                            position="relative"
                                            _hover={{ bg: "#b8070f" }}
                                        >
                                            <Flex justify="space-between" align="center">
                                                <Text flex={1}>{faq.question}</Text>
                                                <Text fontSize="18px" ml="10px">
                                                    {openFaqIndex === idx ? "−" : "+"}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        {openFaqIndex === idx && (
                                            <Box
                                                py="15px"
                                                px="20px"
                                                color={lightGray}
                                                fontSize="14px"
                                                lineHeight="1.5"
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
                <Box bg={mediumGray} p="30px 20px" textAlign="center" mt="40px">
                    <Heading
                        fontSize="20px"
                        fontWeight="bold"
                        color={netflixRed}
                        mb="15px"
                    >
                        NETFLIX
                    </Heading>
                    <Flex
                        justify="center"
                        gap="30px"
                        mb="20px"
                        direction={{ base: "column", md: "row" }}
                    >
                        <Link color={lightGray} textDecoration="underline" fontSize="12px" href="#">
                            Contato para suporte
                        </Link>
                        <Link color={lightGray} textDecoration="underline" fontSize="12px" href="#">
                            Política de privacidade
                        </Link>
                    </Flex>
                    <Text color={textGray} fontSize="11px">
                        © 2024 Netflix, Inc. Todos os direitos reservados.
                    </Text>
                </Box>
            </Container>
        </Box>
    )
}
