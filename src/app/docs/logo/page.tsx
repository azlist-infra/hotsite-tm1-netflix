"use client"

import { Logo } from "@/components/ui/logo/LogoOld"
import { LogoSVG } from "@/assets/LogoSVG"
import {
    Box,
    Container,
    Heading,
    Text,
    HStack,
    SimpleGrid,
    Code
} from "@chakra-ui/react"
import { LogoSVGIcon } from "@/assets/LogoSVGIcon"

export default function LogoDocsPage() {
    return (
        <Container maxW="6xl" py={8}>
            <Box>

                {/* Header */}
                <Box textAlign="center" mb={8}>
                    <Heading size="2xl" mb={4}>
                        🎨 Componente Logo
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        Demonstrações e exemplos de uso do sistema de logos
                    </Text>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Uso Básico */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>📦 Uso Básico</Heading>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4}>
                                <Logo />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo Padrão</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo /&gt;</Code>
                            <Text fontSize="sm" color="blue.500" mt={2}>md (48px)</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4}>
                                <Logo variant="main" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo Principal</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo variant=&quot;main&quot; /&gt;</Code>
                            <Text fontSize="sm" color="green.500" mt={2}>Variante Main</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4}>
                                <Logo variant="icon" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo Ícone</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo variant=&quot;icon&quot; /&gt;</Code>
                            <Text fontSize="sm" color="purple.500" mt={2}>Variante Icon</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Tamanhos */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>📐 Tamanhos Disponíveis</Heading>

                    <SimpleGrid columns={{ base: 2, md: 5 }} gap={6} mb={6}>
                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3}>
                                <Logo size="xs" />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Extra Small</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">size=&quot;xs&quot;</Code>
                            <Text fontSize="xs" color="gray.600" mt={1}>24x24</Text>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3}>
                                <Logo size="sm" />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Small</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">size=&quot;sm&quot;</Code>
                            <Text fontSize="xs" color="gray.600" mt={1}>32x32</Text>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3}>
                                <Logo size="md" />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Medium</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">size=&quot;md&quot;</Code>
                            <Text fontSize="xs" color="blue.500" mt={1}>48x48 (padrão)</Text>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3}>
                                <Logo size="lg" />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Large</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">size=&quot;lg&quot;</Code>
                            <Text fontSize="xs" color="gray.600" mt={1}>80x80</Text>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3}>
                                <Logo size="xl" />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Extra Large</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">size=&quot;xl&quot;</Code>
                            <Text fontSize="xs" color="gray.600" mt={1}>120x120</Text>
                        </Box>
                    </SimpleGrid>

                    {/* Tamanho Customizado */}
                    <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                        <Text fontWeight="bold" mb={4} textAlign="center">Tamanho Customizado</Text>
                        <HStack justify="center" gap={8}>
                            <Box textAlign="center">
                                <Logo size={64} />
                                <Code fontSize="sm" mt={2} bg="gray.100" p={1} borderRadius="sm">size={`{64}`}</Code>
                            </Box>
                            <Box textAlign="center">
                                <Logo size={96} />
                                <Code fontSize="sm" mt={2} bg="gray.100" p={1} borderRadius="sm">size={`{96}`}</Code>
                            </Box>
                            <Box textAlign="center">
                                <Logo size={128} />
                                <Code fontSize="sm" mt={2} bg="gray.100" p={1} borderRadius="sm">size={`{128}`}</Code>
                            </Box>
                        </HStack>
                    </Box>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Temas */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🌓 Temas e Cores</Heading>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box bg="white" p={4} rounded="md" border="1px" borderColor="gray.200" mb={4}>
                                <Logo theme="light" size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Tema Claro</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo theme=&quot;light&quot; /&gt;</Code>
                            <Text fontSize="sm" color="yellow.600" mt={2}>Light Theme</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box bg="gray.800" p={4} rounded="md" mb={4}>
                                <Logo theme="dark" size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Tema Escuro</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo theme=&quot;dark&quot; /&gt;</Code>
                            <Text fontSize="sm" color="gray.600" mt={2}>Dark Theme</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4}>
                                <Logo theme="auto" size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Auto-Detecção</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo theme=&quot;auto&quot; /&gt;</Code>
                            <Text fontSize="sm" color="teal.500" mt={2}>Auto Theme</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Componentes de Conveniência */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🚀 Componentes de Conveniência</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4}>
                                <Logo.Main size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo.Main</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo.Main /&gt;</Code>
                            <Text fontSize="sm" color="blue.500" mt={2}>Main + Auto Theme</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4}>
                                <Logo.Icon size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo.Icon</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo.Icon /&gt;</Code>
                            <Text fontSize="sm" color="purple.500" mt={2}>Icon + Auto Theme</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box bg="white" p={4} rounded="md" border="1px" borderColor="gray.200" mb={4}>
                                <Logo.Light size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo.Light</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo.Light /&gt;</Code>
                            <Text fontSize="sm" color="yellow.600" mt={2}>Forçado Light</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box bg="gray.800" p={4} rounded="md" mb={4}>
                                <Logo.Dark size="lg" />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Logo.Dark</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md">&lt;Logo.Dark /&gt;</Code>
                            <Text fontSize="sm" color="gray.600" mt={2}>Forçado Dark</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Logo SVG Component */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🖼️ Componente SVG Nativo</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>LogoSVG Padrão</Text>
                            <Box textAlign="center" mb={4}>
                                <LogoSVG width={200} height={80} />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<LogoSVG width={200} height={80} />`}
                            </Code>
                            <Text fontSize="sm" color="blue.500" mt={2}>React SVG Component</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>LogoSVG Customizado</Text>
                            <HStack justify="center" gap={4} mb={4}>
                                <Box textAlign="center">
                                    <LogoSVG
                                        width={100}
                                        height={40}
                                        fill="#ef4444"
                                    />
                                    <Text fontSize="sm" mt={1}>Vermelho</Text>
                                </Box>
                                <Box textAlign="center">
                                    <LogoSVG
                                        width={100}
                                        height={40}
                                        fill="#10b981"
                                    />
                                    <Text fontSize="sm" mt={1}>Verde</Text>
                                </Box>
                                <Box textAlign="center">
                                    <LogoSVG
                                        width={100}
                                        height={40}
                                        fillA="red"
                                        fillZ="blue"
                                        fillList="green"
                                    />
                                    <Text fontSize="sm" mt={1}>Cores Por Path</Text>
                                </Box>

                                <Box textAlign="center">
                                    <LogoSVGIcon
                                        width={100}
                                        height={40}
                                        fillA="red"
                                        fillZ="blue"
                                    />
                                    <Text fontSize="sm" mt={1}>Icon</Text>
                                </Box>


                                <Box textAlign="center">
                                    <LogoSVGIcon
                                        width={100}
                                        height={40}
                                        fillA="red"
                                        fillZ="blue"
                                    />
                                    <Text fontSize="sm" mt={1}>Icon animation</Text>
                                </Box>
                            </HStack>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<LogoSVG fill="#ef4444" />
<LogoSVG fill="#10b981" />
<LogoSVG fill="#3b82f6" />`}
                            </Code>
                            <Text fontSize="sm" color="green.500" mt={2}>Direct SVG Props</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>LogoSVG Responsivo</Text>
                            <Box textAlign="center" mb={4}>
                                <LogoSVG
                                    width="100%"
                                    height="auto"
                                    style={{ maxWidth: "300px" }}
                                />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<LogoSVG 
  width="100%" 
  height="auto" 
  style={{ maxWidth: "300px" }}
/>`}
                            </Code>
                            <Text fontSize="sm" color="purple.500" mt={2}>Responsive SVG</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>LogoSVG com Tema</Text>
                            <HStack justify="center" gap={6} mb={4}>
                                <Box textAlign="center">
                                    <Box bg="white" p={4} rounded="md" border="1px" borderColor="gray.200">
                                        <LogoSVG
                                            width={120}
                                            height={48}
                                            fill="#1f2937"
                                        />
                                    </Box>
                                    <Text fontSize="sm" mt={2}>Light Theme</Text>
                                </Box>
                                <Box textAlign="center">
                                    <Box bg="gray.800" p={4} rounded="md">
                                        <LogoSVG
                                            width={120}
                                            height={48}
                                            fill="#f9fafb"
                                        />
                                    </Box>
                                    <Text fontSize="sm" mt={2}>Dark Theme</Text>
                                </Box>
                            </HStack>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`// Light theme
<LogoSVG fill="#1f2937" />

// Dark theme  
<LogoSVG fill="#f9fafb" />`}
                            </Code>
                            <Text fontSize="sm" color="teal.500" mt={2}>Theme Variants</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Uso Avançado */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>⚡ Uso Avançado</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Logo com Link</Text>
                            <Box textAlign="center" mb={4}>
                                <Logo
                                    size="lg"
                                    href="/dashboard"
                                    onClick={() => alert('Logo clicado!')}
                                />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Logo 
  size="lg" 
  href="/dashboard"
  onClick={() => alert('Clicado!')}
/>`}
                            </Code>
                            <Text fontSize="sm" color="green.500" mt={2}>Clickable + Link</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Logo com Cores Customizadas</Text>
                            <HStack justify="center" gap={4} mb={4}>
                                <Box textAlign="center">
                                    <Logo
                                        size="md"
                                        svgColor="#86EFAC"
                                    />
                                    <Text fontSize="sm" mt={1}>Vermelho</Text>
                                </Box>
                                <Box textAlign="center">
                                    <Logo
                                        size="md"
                                        svgFilter="hue-rotate(120deg)"
                                    />
                                    <Text fontSize="sm" mt={1}>Hue Rotate</Text>
                                </Box>
                                <Box textAlign="center">
                                    <Logo
                                        size="md"
                                        svgFilter="sepia(100%) saturate(200%)"
                                    />
                                    <Text fontSize="sm" mt={1}>Sepia</Text>
                                </Box>
                            </HStack>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Logo svgColor="#ff6b6b" />
<Logo svgFilter="hue-rotate(120deg)" />
<Logo svgFilter="sepia(100%)" />`}
                            </Code>
                            <Text fontSize="sm" color="purple.500" mt={2}>Custom Colors</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Documentação */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>📚 Documentação</Heading>

                    <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                        <Text fontWeight="bold" mb={4}>Props Disponíveis:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap" mb={6}>
                            {`interface LogoProps {
  variant?: 'main' | 'icon'           // Variante do logo
  theme?: 'light' | 'dark' | 'auto'   // Tema de cores
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number  // Tamanho
  href?: string                       // Link de navegação
  alt?: string                        // Texto alternativo
  className?: string                  // Classes CSS customizadas
  priority?: boolean                  // Next.js Image priority
  onClick?: () => void                // Callback de clique
  svgColor?: string                   // Cor customizada para SVG
  svgFilter?: string                  // Filtro CSS customizado
}`}
                        </Code>

                        <Text fontWeight="bold" mb={4}>Componentes Disponíveis:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap" mb={4}>
                            {`// Componente Logo (baseado em imagens)
import { Logo } from "@/components/ui/logo/Logo"

// Componente SVG nativo (React)
import { LogoSVG } from "@/lib/assets/LogoSVG"`}
                        </Code>

                        <Text fontWeight="bold" mb={4}>Props do LogoSVG:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap" mb={4}>
                            {`interface LogoSVGProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number         // Largura do SVG
  height?: string | number        // Altura do SVG
  fill?: string                   // Cor de preenchimento
  stroke?: string                 // Cor do contorno
  className?: string              // Classes CSS
  style?: React.CSSProperties     // Estilos inline
  onClick?: () => void            // Callback de clique
  // ... todas as props padrão de SVG
}`}
                        </Code>

                        <Text fontWeight="bold" mb={4}>Assets Necessários:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap">
                            {`public/assets/logo/
├── logo_azlist.svg              # Logo principal SVG
├── logo_azlist_icon.svg         # Ícone SVG
├── logo_azlist.png              # Logo principal PNG (fallback)
├── logo_azlist-inverted.png     # Logo PNG tema escuro
├── logo_azlist_icon.png         # Ícone PNG (fallback)
└── logo_azlist_icon_inverted.png # Ícone PNG tema escuro

src/lib/assets/
└── LogoSVG.tsx                  # Componente SVG React nativo`}
                        </Code>
                    </Box>
                </Box>

            </Box>
        </Container>
    )
}
