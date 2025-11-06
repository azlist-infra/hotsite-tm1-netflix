"use client"

import { Image, Avatar, Hero, Thumbnail, SvgIcon } from "@/components/ui/image"
import {
    Box,
    Container,
    Heading,
    Text,
    HStack,
    SimpleGrid,
    Code
} from "@chakra-ui/react"

export default function ImagesDocsPage() {
    return (
        <Container maxW="6xl" py={8}>
            <Box>

                {/* Header */}
                <Box textAlign="center" mb={8}>
                    <Heading size="2xl" mb={4}>
                        📸 Componente Image
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        Sistema avançado de imagens com múltiplos providers, otimização automática e fallbacks inteligentes
                    </Text>
                </Box>

                {/* Debug Section */}
                <Box mb={8} p={4} bg="yellow.50" border="1px" borderColor="yellow.200" borderRadius="md">
                    <Heading size="md" mb={4}>🔧 Debug - Teste de Cores SVG</Heading>
                    
                    <Text fontSize="sm" mb={4} color="orange.700">
                        <strong>SVG Original (com cores hardcoded):</strong>
                    </Text>
                    <HStack gap={4} justify="center" mb={6}>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist.svg"
                                alt="SVG Original"
                                width={50}
                                height={50}
                            />
                            <Text fontSize="xs" mt={1}>Original</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist.svg"
                                alt="SVG Vermelho"
                                width={50}
                                height={50}
                                svgColor="#ff0000"
                            />
                            <Text fontSize="xs" mt={1}>Red (limitado)</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist.svg"
                                alt="SVG Azul"
                                width={50}
                                height={50}
                                svgColor="#0000ff"
                            />
                            <Text fontSize="xs" mt={1}>Blue (limitado)</Text>
                        </Box>
                    </HStack>
                    
                    <Text fontSize="sm" mb={4} color="green.700">
                        <strong>SVG Limpo (currentColor - funciona perfeitamente):</strong>
                    </Text>
                    <HStack gap={4} justify="center" mb={4}>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Clean Original"
                                width={50}
                                height={50}
                            />
                            <Text fontSize="xs" mt={1}>Original</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Clean Vermelho"
                                width={50}
                                height={50}
                                svgColor="#ff0000"
                            />
                            <Text fontSize="xs" mt={1}>Red #ff0000</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Clean Azul"
                                width={50}
                                height={50}
                                svgColor="#0000ff"
                            />
                            <Text fontSize="xs" mt={1}>Blue #0000ff</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Clean Verde"
                                width={50}
                                height={50}
                                svgColor="#00ff00"
                            />
                            <Text fontSize="xs" mt={1}>Green #00ff00</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Clean Roxo"
                                width={50}
                                height={50}
                                svgColor="#9b59b6"
                            />
                            <Text fontSize="xs" mt={1}>#9b59b6</Text>
                        </Box>
                    </HStack>
                    
                    <Text fontSize="sm" mb={4} color="purple.700">
                        <strong>Cores do Chakra UI (CSS Filter):</strong>
                    </Text>
                    <HStack gap={4} justify="center" mb={4}>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Green.200"
                                width={50}
                                height={50}
                                svgColor="green.200"
                            />
                            <Text fontSize="xs" mt={1}>green.200</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Blue.400"
                                width={50}
                                height={50}
                                svgColor="blue.400"
                            />
                            <Text fontSize="xs" mt={1}>blue.400</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Purple.500"
                                width={50}
                                height={50}
                                svgColor="purple.500"
                            />
                            <Text fontSize="xs" mt={1}>purple.500</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Brand.500"
                                width={50}
                                height={50}
                                svgColor="brand.500"
                            />
                            <Text fontSize="xs" mt={1}>brand.500</Text>
                        </Box>
                        <Box textAlign="center">
                            <Image
                                src="/assets/logo/logo_azlist_clean.svg"
                                alt="SVG Brand.200"
                                width={50}
                                height={50}
                                svgColor="brand.200"
                            />
                            <Text fontSize="xs" mt={1}>brand.200</Text>
                        </Box>
                    </HStack>
                    
                    <Text fontSize="sm" color="blue.600" mt={2}>
                        ✅ Use `logo_azlist_clean.svg` para controle total de cores via CSS
                    </Text>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Uso Básico */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>📦 Uso Básico</Heading>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo AZ List"
                                    width={120}
                                    height={80}
                                />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Image Padrão</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/logo.png" 
  alt="Logo" 
  width={120}
  height={80}
/>`}
                            </Code>
                            <Text fontSize="sm" color="blue.500" mt={2}>Provider Next.js</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo com link"
                                    width={120}
                                    height={80}
                                    href="/dashboard"
                                />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Image com Link</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/logo.png" 
  alt="Logo" 
  href="/dashboard"
/>`}
                            </Code>
                            <Text fontSize="sm" color="green.500" mt={2}>Clickable</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo rounded"
                                    width={120}
                                    height={80}
                                    rounded={12}
                                />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Image Rounded</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/logo.png" 
  alt="Logo" 
  rounded={12}
/>`}
                            </Code>
                            <Text fontSize="sm" color="purple.500" mt={2}>Border Radius</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Aspect Ratio */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>📐 Aspect Ratio e Object Fit</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3} bg="gray.50" borderRadius="md" overflow="hidden">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo 1:1"
                                    width={150}
                                    aspectRatio={1}
                                    objectFit="cover"
                                />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Square 1:1</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">aspectRatio={1}</Code>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3} bg="gray.50" borderRadius="md" overflow="hidden">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo 16:9"
                                    width={150}
                                    aspectRatio="16/9"
                                    objectFit="cover"
                                />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Widescreen 16:9</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">aspectRatio=&quot;16/9&quot;</Code>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3} bg="gray.50" borderRadius="md" overflow="hidden">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo 4:3"
                                    width={150}
                                    aspectRatio="4/3"
                                    objectFit="contain"
                                />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Classic 4:3</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">aspectRatio=&quot;4/3&quot;</Code>
                        </Box>

                        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={3} bg="gray.50" borderRadius="md" overflow="hidden">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Logo 3:4"
                                    width={150}
                                    aspectRatio="3/4"
                                    objectFit="cover"
                                />
                            </Box>
                            <Text fontWeight="bold" fontSize="sm">Portrait 3:4</Text>
                            <Code fontSize="xs" bg="gray.100" p={1} borderRadius="sm">aspectRatio=&quot;3/4&quot;</Code>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Componentes de Conveniência */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🎯 Componentes de Conveniência</Heading>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4} display="flex" justifyContent="center">
                                <Avatar
                                    src="/assets/logo/logo_azlist_icon.png"
                                    alt="Avatar do usuário"
                                    bgColor="yellow"
                                    width={80}
                                    height={80}
                                />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Avatar</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Avatar 
  src="/user.jpg" 
  alt="João Silva"
  width={80}
  height={80}
/>`}
                            </Code>
                            <Text fontSize="sm" color="blue.500" mt={2}>Circular automático</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4} bg="gray.50" borderRadius="md" overflow="hidden">
                                <Hero
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Hero banner"
                                    width={200}
                                    height={100}
                                    bgColor="purple"
                                />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Hero</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Hero 
  src="/banner.jpg" 
  alt="Hero banner"
  width={400}
  height={200}
/>`}
                            </Code>
                            <Text fontSize="sm" color="green.500" mt={2}>Priority + Responsive</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
                            <Box mb={4} bg="gray.50" borderRadius="md" overflow="hidden">
                                <Thumbnail
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Thumbnail do post"
                                    width={150}
                                    height={113}
                                />
                            </Box>
                            <Text fontWeight="bold" mb={2}>Thumbnail</Text>
                            <Code fontSize="sm" p={2} bg="gray.100" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Thumbnail 
  src="/post.jpg" 
  alt="Post thumbnail"
  width={200}
/>`}
                            </Code>
                            <Text fontSize="sm" color="purple.500" mt={2}>4:3 + Lazy loading</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />


                {/* SVG Examples */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🎨 Controle de Cores SVG</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>SVG com CSS Filter (Qualquer Cor)</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center">
                                <SimpleGrid columns={3} gap={3} mb={4}>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist.svg"
                                            alt="SVG Original"
                                            width={50}
                                            height={50}
                                        />
                                        <Text fontSize="xs" mt={1}>Original</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Hex"
                                            width={50}
                                            height={50}
                                            svgColor="#ff6b6b"
                                        />
                                        <Text fontSize="xs" mt={1}>#ff6b6b</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Hex 2"
                                            width={50}
                                            height={50}
                                            svgColor="#4ecdc4"
                                        />
                                        <Text fontSize="xs" mt={1}>#4ecdc4</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Purple"
                                            width={50}
                                            height={50}
                                            svgColor="#9b59b6"
                                        />
                                        <Text fontSize="xs" mt={1}>#9b59b6</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Orange"
                                            width={50}
                                            height={50}
                                            svgColor="#f39c12"
                                        />
                                        <Text fontSize="xs" mt={1}>#f39c12</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Named"
                                            width={50}
                                            height={50}
                                            svgColor="red"
                                        />
                                        <Text fontSize="xs" mt={1}>crimson</Text>
                                    </Box>
                                </SimpleGrid>
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
{`// Cores HEX
<Image src="/icon.svg" svgColor="#ff6b6b" />
<Image src="/icon.svg" svgColor="#4ecdc4" />

// Cores nomeadas CSS
<Image src="/icon.svg" svgColor="crimson" />
<Image src="/icon.svg" svgColor="orange" />

// Cores do Chakra UI 🎨
<Image src="/icon.svg" svgColor="green.200" />
<Image src="/icon.svg" svgColor="blue.400" />
<Image src="/icon.svg" svgColor="purple.500" />

// Cores customizadas do seu tema! ✨
<Image src="/icon.svg" svgColor="brand.500" />
<Image src="/icon.svg" svgColor="brand.200" />`}
                            </Code>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>SVG Inline (Controle Total)</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center" overflow="auto">
                                <HStack justify="center" gap={4} align="flex-start" width="fit-content" mx="auto">
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Fill Verde"
                                            width={60}
                                            height={60}
                                            renderSvgInline
                                            svgFill="#22c55e"
                                        />
                                        <Text fontSize="xs" mt={1}>Fill Verde</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Stroke"
                                            width={60}
                                            height={60}
                                            renderSvgInline
                                            svgFill="none"
                                            svgStroke="purple.500"
                                            svgStrokeWidth={2}
                                        />
                                        <Text fontSize="xs" mt={1}>Stroke purple.500</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="SVG Brand Inline"
                                            width={60}
                                            height={60}
                                            renderSvgInline
                                            svgFill="brand.600"
                                        />
                                        <Text fontSize="xs" mt={1}>Fill brand.600</Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
{`<Image 
  src="/icon.svg"
  renderSvgInline        // Inline para controle total
  svgFill="#22c55e"     // Cor HEX
  svgStroke="purple.500" // Cor Chakra UI 🎨
  svgStrokeWidth={2}     // Largura do contorno
/>

<Image 
  src="/icon.svg"
  renderSvgInline
  svgFill="blue.300"     // Cores do Chakra UI funcionam!
/>

<Image 
  src="/icon.svg"
  renderSvgInline
  svgFill="brand.600"    // Suas cores customizadas! ✨
/>`}
                            </Code>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>SvgIcon Component</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center">
                                <HStack justify="center" gap={4}>
                                    <Box textAlign="center">
                                        <SvgIcon
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="Ícone Pequeno"
                                            width={32}
                                            height={32}
                                            svgFill="#ef4444"
                                        />
                                        <Text fontSize="xs" mt={1}>32px</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <SvgIcon
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="Ícone Médio"
                                            width={48}
                                            height={48}
                                            svgFill="#3b82f6"
                                        />
                                        <Text fontSize="xs" mt={1}>48px</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <SvgIcon
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="Ícone Grande"
                                            width={64}
                                            height={64}
                                            svgFill="green.400"
                                        />
                                        <Text fontSize="xs" mt={1}>green.400</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <SvgIcon
                                            src="/assets/logo/logo_azlist_clean.svg"
                                            alt="Ícone Brand"
                                            width={48}
                                            height={48}
                                            svgFill="brand.700"
                                        />
                                        <Text fontSize="xs" mt={1}>brand.700</Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
{`<SvgIcon 
  src="/icon.svg"
  width={48}
  height={48}
  svgFill="#3b82f6"    // Cor HEX
/>

<SvgIcon 
  src="/icon.svg"
  width={64}
  height={64}
  svgFill="green.400"  // Cores Chakra UI 🎨
/>

<SvgIcon 
  src="/icon.svg"
  width={48}
  height={48}
  svgFill="orange.500" // Inline automático
/>

<SvgIcon 
  src="/icon.svg"
  width={48}
  height={48}
  svgFill="brand.700"  // Suas cores customizadas! ✨
/>`}
                            </Code>
                        </Box>
                    </SimpleGrid>
                </Box>



                {/* Performance e Loading */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>⚡ Performance e Loading</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Estratégias de Loading</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md">
                                <HStack gap={4} justify="center">
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_icon.png"
                                            alt="Priority"
                                            width={60}
                                            height={60}
                                            priority
                                        />
                                        <Text fontSize="xs" mt={1}>Priority</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_icon.png"
                                            alt="Lazy"
                                            width={60}
                                            height={60}
                                            lazy
                                        />
                                        <Text fontSize="xs" mt={1}>Lazy</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_icon.png"
                                            alt="Eager"
                                            width={60}
                                            height={60}
                                            eager
                                        />
                                        <Text fontSize="xs" mt={1}>Eager</Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image src="/hero.jpg" priority />     // Carrega primeiro
<Image src="/content.jpg" lazy />      // Lazy loading
<Image src="/above.jpg" eager />       // Carrega imediatamente
<Image src="/important.jpg" preload /> // Preload no head`}
                            </Code>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md" width="1000px" height="500px">
                            <Text fontWeight="bold" mb={4}>Responsive Images..</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Responsive image"
                                    width={200}
                                    height={100}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    responsive
                                />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/responsive.jpg" 
  sizes="(max-width: 768px) 100vw, 50vw"
  responsive
/>`}
                            </Code>
                            <Text fontSize="sm" color="teal.500" mt={2}>Tamanhos automáticos por breakpoint</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Fallbacks e Error Handling */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🛡️ Fallbacks e Error Handling</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Fallback Automático</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center">
                                <Image
                                    src="/imagem-que-nao-existe.jpg"
                                    alt="Imagem com fallback"
                                    width={150}
                                    height={100}
                                    fallback="no-image.png"
                                />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/might-fail.jpg" 
  alt="Imagem"
  fallback="no-image.png"
  showFallbackOnError
/>`}
                            </Code>
                            <Text fontSize="sm" color="orange.500" mt={2}>Fallback automático em caso de erro</Text>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Fallback Component</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center">
                                <Image
                                    src="/outra-imagem-que-nao-existe.jpg"
                                    alt="Imagem com fallback component"
                                    width={150}
                                    height={100}
                                    fallbackComponent={
                                        <Box
                                            width="150px"
                                            height="100px"
                                            bg="gray.200"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            borderRadius="md"
                                        >
                                            <Text fontSize="sm" color="gray.600">Sem imagem</Text>
                                        </Box>
                                    }
                                />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/fail.jpg" 
  fallbackComponent={<CustomFallback />}
/>`}
                            </Code>
                            <Text fontSize="sm" color="red.500" mt={2}>Componente customizado para erro</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Providers */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>🌐 Image Providers</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Providers Suportados</Text>
                            <Box mb={4}>
                                <HStack gap={4} justify="center" mb={4}>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_icon.png"
                                            alt="Next.js"
                                            width={50}
                                            height={50}
                                            provider="next"
                                        />
                                        <Text fontSize="xs" mt={1}>Next.js</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_icon.png"
                                            alt="Cloudflare"
                                            width={50}
                                            height={50}
                                            provider="cloudflare"
                                        />
                                        <Text fontSize="xs" mt={1}>Cloudflare</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Image
                                            src="/assets/logo/logo_azlist_icon.png"
                                            alt="Cloudinary"
                                            width={50}
                                            height={50}
                                            provider="cloudinary"
                                        />
                                        <Text fontSize="xs" mt={1}>Cloudinary</Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`// Next.js (padrão)
<Image src="/logo.png" provider="next" />

// Cloudflare Images
<Image src="image-id" provider="cloudflare" />

// Cloudinary
<Image src="sample.jpg" provider="cloudinary" />`}
                            </Code>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Otimizações Automáticas</Text>
                            <Box mb={4} bg="gray.50" p={4} borderRadius="md" textAlign="center">
                                <Image
                                    src="/assets/logo/logo_azlist.png"
                                    alt="Imagem otimizada"
                                    width={150}
                                    height={100}
                                    imageOptions={{
                                        quality: 90,
                                        format: 'webp'
                                    }}
                                />
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`<Image 
  src="/photo.jpg"
  imageOptions={{
    quality: 90,
    format: 'webp',
    blur: false
  }}
/>`}
                            </Code>
                            <Text fontSize="sm" color="green.500" mt={2}>WebP, AVIF, qualidade automática</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Casos de Uso Práticos */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>💼 Casos de Uso Práticos</Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Galeria de Produtos</Text>
                            <SimpleGrid columns={2} gap={2} mb={4}>
                                <Thumbnail
                                    src="/assets/logo/logo_azlist_icon.png"
                                    alt="Produto 1"
                                    width={100}
                                />
                                <Thumbnail
                                    src="/assets/logo/logo_azlist_icon.png"
                                    alt="Produto 2"
                                    width={100}
                                />
                                <Thumbnail
                                    src="/assets/logo/logo_azlist_icon.png"
                                    alt="Produto 3"
                                    width={100}
                                />
                                <Thumbnail
                                    src="/assets/logo/logo_azlist_icon.png"
                                    alt="Produto 4"
                                    width={100}
                                />
                            </SimpleGrid>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`{products.map(product => (
  <Thumbnail 
    key={product.id}
    src={product.image}
    alt={product.name}
    href={\`/products/\${product.id}\`}
    lazy
  />
))}`}
                            </Code>
                        </Box>

                        <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                            <Text fontWeight="bold" mb={4}>Lista de Usuários</Text>
                            <Box mb={4}>
                                <HStack gap={3} mb={3}>
                                    <Avatar
                                        src="/assets/logo/logo_azlist_icon.png"
                                        alt="Usuário 1"
                                        width={40}
                                        height={40}
                                    />
                                    <Box>
                                        <Text fontWeight="bold" fontSize="sm">João Silva</Text>
                                        <Text fontSize="xs" color="gray.600">Desenvolvedor</Text>
                                    </Box>
                                </HStack>
                                <HStack gap={3} mb={3}>
                                    <Avatar
                                        src="/assets/logo/logo_azlist_icon.png"
                                        alt="Usuário 2"
                                        width={40}
                                        height={40}
                                    />
                                    <Box>
                                        <Text fontWeight="bold" fontSize="sm">Maria Santos</Text>
                                        <Text fontSize="xs" color="gray.600">Designer</Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Code fontSize="sm" p={3} bg="gray.50" borderRadius="md" display="block" whiteSpace="pre-wrap">
                                {`{users.map(user => (
  <HStack key={user.id}>
    <Avatar 
      src={user.avatar}
      alt={user.name}
      width={40}
      height={40}
    />
    <Box>
      <Text>{user.name}</Text>
      <Text>{user.role}</Text>
    </Box>
  </HStack>
))}`}
                            </Code>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box height="1px" bg="gray.200" mb={8} />

                {/* Documentação */}
                <Box mb={8}>
                    <Heading size="lg" mb={6}>📚 Documentação Completa</Heading>

                    <Box p={6} border="1px" borderColor="gray.200" borderRadius="md">
                        <Text fontWeight="bold" mb={4}>Props Principais:</Text>
                                                    <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap" mb={6}>
                                {`interface ImgProps {
  // === ESSENTIALS ===
  src: string | null                    // URL da imagem
  alt?: string                          // Texto alternativo
  width?: number                        // Largura
  height?: number                       // Altura
  
  // === LAYOUT & STYLING ===
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  aspectRatio?: number | string         // Ex: 1, "16/9", "4/3"
  rounded?: boolean | number | string   // Border radius
  
  // === SVG SPECIFIC ===
  svgColor?: string                     // Cor primária (CSS filter)
  svgFill?: string                      // Cor de preenchimento (inline)
  svgStroke?: string                    // Cor de contorno (inline)
  svgStrokeWidth?: number               // Largura do contorno (inline)
  svgFilter?: string                    // Filtro CSS customizado
  renderSvgInline?: boolean             // Renderizar inline para controle total
  
  // === RESPONSIVE ===
  sizes?: string | ResponsiveImageSize[] // Breakpoints
  responsive?: boolean                   // Habilita responsive
  
  // === LINKING ===
  href?: string                         // Link de navegação
  external?: boolean                    // Link externo
  target?: '_blank' | '_self'           // Target do link
  
  // === PROVIDERS ===
  provider?: 'next' | 'cloudflare' | 'cloudinary' | 'custom'
  imageOptions?: ImageOptions           // Opções de otimização
  customProvider?: ImageProvider        // Provider customizado
  
  // === FALLBACKS ===
  fallback?: string                     // URL de fallback
  fallbackComponent?: React.ReactNode   // Componente de fallback
  showFallbackOnError?: boolean         // Exibir fallback em erro
  
  // === PERFORMANCE ===
  priority?: boolean                    // Loading prioritário
  lazy?: boolean                        // Lazy loading
  eager?: boolean                       // Loading imediato
  preload?: boolean                     // Preload no head
}`}
                        </Code>

                        <Text fontWeight="bold" mb={4}>Variáveis de Ambiente:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap" mb={6}>
                            {`# .env.local

# Cloudflare Images
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH=your_hash_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name`}
                        </Code>

                        <Text fontWeight="bold" mb={4}>Componentes de Conveniência:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap" mb={6}>
                            {`// Avatar circular automático
<Avatar src="/user.jpg" alt="João" width={80} />

// Hero com priority e responsive
<Hero src="/banner.jpg" alt="Banner" width={400} />

// Thumbnail com aspect ratio 4:3
<Thumbnail src="/post.jpg" alt="Post" width={200} />

// SVG Icon com renderização inline automática
<SvgIcon src="/icon.svg" width={24} height={24} svgFill="#3b82f6" />`}
                        </Code>

                        <Text fontWeight="bold" mb={4}>Estratégias para SVG:</Text>
                        <Code p={4} bg="gray.50" borderRadius="md" fontSize="sm" display="block" whiteSpace="pre-wrap">
                            {`// 1. CSS Filters (mais rápido, limitado)
<Image src="/icon.svg" svgColor="red" />
<Image src="/icon.svg" svgFilter="hue-rotate(120deg)" />

// 2. SVG Inline (controle total, mais lento)
<Image 
  src="/icon.svg" 
  renderSvgInline
  svgFill="#22c55e" 
  svgStroke="#8b5cf6"
  svgStrokeWidth={2}
/>

// 3. Component SvgIcon (inline automático)
<SvgIcon src="/icon.svg" svgFill="#3b82f6" width={24} />`}
                        </Code>
                    </Box>
                </Box>

            </Box>
        </Container>
    )
}
