'use client'

import {
    Box,
    SimpleGrid,
    VStack,
    Text,
    Icon,
    Container,
    Heading
} from "@chakra-ui/react"
import { Icons } from "@/components/ui/icon"

export default function Page() {
    return (
        <Container maxW="1200px" py={8}>
            <VStack gap={8} align="start">
                {/* Header */}
                <Heading size="xl">Grid de Ícones - Teste Simples</Heading>

                {/* Ícones Padrão */}
                <Box w="full">
                    <Heading size="lg" mb={4} color="blue.600">Ícones Padrão (Lucide)</Heading>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} gap={6}>
                        {/* Home */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="blue.500">
                                <Icons.Home  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Home</Text>
                        </VStack>

                        {/* User */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="green.500">
                                <Icons.User />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">User</Text>
                        </VStack>

                        {/* Search */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="purple.500">
                                <Icons.Search  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Search</Text>
                        </VStack>

                        {/* Settings */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="orange.500">
                                <Icons.Settings  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Settings</Text>
                        </VStack>

                        {/* Mail */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="red.500">
                                <Icons.Mail  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Mail</Text>
                        </VStack>
                    </SimpleGrid>
                </Box>

                {/* Ícones Customizados */}
                <Box w="full">
                    <Heading size="lg" mb={4} color="purple.600">Ícones Customizados</Heading>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} gap={6}>
                        {/* ToggleOn */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="green.600">
                                <Icons.ToggleOn  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Toggle On (path svg)</Text>
                        </VStack>

                        {/* ToggleOff */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="gray.400">
                                <Icons.ToggleOff  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Toggle Off (path svg)</Text>
                        </VStack>

                        {/* Heart (Custom) */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="red.500">
                                <Icons.Heart  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Heart (path svg)</Text>
                        </VStack>

                        {/* Star (Custom) */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="yellow.500">
                                <Icons.Star  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">Star (path svg)</Text>
                        </VStack>

                        {/* FileSVG */}
                        <VStack gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                            <Icon size="2xl" color="blue.600">
                                <Icons.FileSVG  />
                            </Icon>
                            <Text fontSize="sm" fontWeight="semibold">File SVG (arquivo .svg)</Text>
                        </VStack>
                    </SimpleGrid>
                </Box>

                {/* Teste de tamanhos */}
                <Box w="full">
                    <Heading size="lg" mb={4} color="gray.700">Teste de Tamanhos</Heading>
                    <SimpleGrid columns={{ base: 4, md: 6 }} gap={4}>
                        {/* Tamanho xs */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon size="xs" color="blue.500">
                                <Icons.User  />
                            </Icon>
                            <Text fontSize="xs">xs</Text>
                        </VStack>

                        {/* Tamanho sm */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon  size="sm" color="blue.500">
                                <Icons.User />
                            </Icon>
                            <Text fontSize="xs">sm</Text>
                        </VStack>

                        {/* Tamanho md */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon size="md" color="blue.500" >
                                <Icons.User />
                            </Icon>
                            <Text fontSize="xs">md</Text>
                        </VStack>

                        {/* Tamanho lg */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon size="xl" color="blue.500">
                                <Icons.User />
                            </Icon>
                            <Text fontSize="xs">lg</Text>
                        </VStack>

                        {/* Tamanho xl */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon size="xl" color="blue.500">
                                <Icons.User  />
                            </Icon>
                            <Text fontSize="xs">xl</Text>
                        </VStack>

                        {/* Tamanho 2xl */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon size="2xl" color="blue.500">
                                <Icons.User  />
                            </Icon>
                            <Text fontSize="xs">2xl</Text>
                        </VStack>

                        {/* Tamanho custom with pixels  */}
                        <VStack gap={2} p={3} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
                            <Icon boxSize={100} color="blue.500">
                                <Icons.User  />
                            </Icon>
                            <Text fontSize="xs">custom 100px</Text>
                        </VStack>
                    </SimpleGrid>
                </Box>

                {/* Info */}
                <Box w="full" p={4} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
                    <Text fontSize="sm" color="blue.800">
                        📝 <strong>Grid Simples:</strong> 5 ícones padrão (Lucide) + 5 ícones customizados + teste de tamanhos.
                        Cada ícone está envolvido no componente Icon do Chakra UI v3.
                    </Text>
                </Box>
            </VStack>
        </Container>
    )
}
