'use client'

import { TextHighlightHalf } from "@/components/ui/text/Text"
import { VStack, Text, Container, Heading, HStack, Box, Highlight } from "@chakra-ui/react"

export default function TextPage() {
    return (
        <Container maxW="1200px" py={8} bgColor="white">
            <VStack gap={12} align="start">
                {/* Header */}
                <Heading size="2xl">Componente TextHighlightHalf</Heading>

                {/* Higlight nativo chakraui 3.0 */}
                <Box>
                <Highlight query="Hello" styles={{ fontWeight: "thin" }}>Hello World</Highlight>

                    <Heading lineHeight="tall">
                    <Highlight 
                    query={["Hello", "World"]}
                    styles={{ px: "0.5", bg: "teal.muted" }}>Hello World</Highlight>
                        <Highlight
                            query={["spotlight", "emphasize", "accentuate"]}
                            styles={{ px: "0.5", bg: "teal.muted" }}
                        >
                            With the Highlight component, you can spotlight, emphasize and
                            accentuate words.
                        </Highlight>
                    </Heading>

                </Box>

                {/* Exemplo principal */}
                <Box>
                    <Heading size="lg" mb={4}>Exemplo Principal:</Heading>
                    <HStack gap={2} align="baseline" fontSize="4xl" fontWeight="bold">
                        <TextHighlightHalf>Write once,</TextHighlightHalf>
                        <Text>run anywhere</Text>
                    </HStack>
                </Box>

                {/* Variações de posição */}
                <Box>
                    <Heading size="lg" mb={4}>Posições do Highlight:</Heading>
                    <VStack gap={4} align="start">
                        <TextHighlightHalf
                            highlightPosition="bottom"
                            fontSize="2xl"
                            fontWeight="semibold"
                        >
                            Highlight na parte inferior (padrão)
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightPosition="top"
                            fontSize="2xl"
                            fontWeight="semibold"
                        >
                            Highlight na parte superior
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightPosition="center"
                            fontSize="2xl"
                            fontWeight="semibold"
                        >
                            Highlight no centro
                        </TextHighlightHalf>
                    </VStack>
                </Box>

                {/* Variações de cor */}
                <Box>
                    <Heading size="lg" mb={4}>Cores Diferentes:</Heading>
                    <VStack gap={4} align="start">
                        <TextHighlightHalf
                            highlightColor="yellow.200"
                            fontSize="xl"
                        >
                            Highlight amarelo (padrão)
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightColor="blue.200"
                            fontSize="xl"
                        >
                            Highlight azul
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightColor="red.200"
                            fontSize="xl"
                        >
                            Highlight vermelho
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightColor="green.200"
                            fontSize="xl"
                        >
                            Highlight verde
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightColor="purple.200"
                            fontSize="xl"
                        >
                            Highlight roxo
                        </TextHighlightHalf>
                    </VStack>
                </Box>

                {/* Variações de altura */}
                <Box>
                    <Heading size="lg" mb={4}>Alturas Diferentes:</Heading>
                    <VStack gap={4} align="start">
                        <TextHighlightHalf
                            highlightHeight="30%"
                            fontSize="xl"
                            highlightColor="orange.200"
                        >
                            Highlight 30% da altura
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightHeight="50%"
                            fontSize="xl"
                            highlightColor="pink.200"
                        >
                            Highlight 50% da altura (padrão)
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightHeight="70%"
                            fontSize="xl"
                            highlightColor="cyan.200"
                        >
                            Highlight 70% da altura
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            highlightHeight="100%"
                            fontSize="xl"
                            highlightColor="gray.200"
                        >
                            Highlight 100% da altura
                        </TextHighlightHalf>
                    </VStack>
                </Box>

                {/* Exemplo de uso em títulos */}
                <Box>
                    <Heading size="lg" mb={4}>Em Títulos:</Heading>
                    <VStack gap={6} align="start">
                        <TextHighlightHalf
                            fontSize="5xl"
                            fontWeight="black"
                            highlightColor="yellow.300"
                        >
                            Título Principal
                        </TextHighlightHalf>

                        <TextHighlightHalf
                            fontSize="3xl"
                            fontWeight="bold"
                            highlightColor="blue.300"
                            highlightPosition="center"
                        >
                            Subtítulo Destacado
                        </TextHighlightHalf>
                    </VStack>
                </Box>

                {/* Info sobre uso */}
                <Box w="full" p={6} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
                    <Heading size="md" mb={3}>Como usar:</Heading>
                    <Text fontSize="sm" fontFamily="mono" bg="white" p={3} borderRadius="md" border="1px solid" borderColor="gray.200">
                        {`import { TextHighlightHalf } from "@/components/ui/text/Text"

<TextHighlightHalf 
    highlightColor="yellow.200"
    highlightHeight="50%"
    highlightPosition="bottom"
    fontSize="2xl"
>
    Seu texto aqui
</TextHighlightHalf>`}
                    </Text>
                </Box>
            </VStack>
        </Container>
    )
}
