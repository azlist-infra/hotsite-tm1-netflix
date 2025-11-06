# 📸 Componente Image - Documentação

Sistema avançado de imagens com múltiplos providers, otimização automática, controle SVG e fallbacks inteligentes.

## 📋 Índice

- [Instalação](#instalação)
- [Uso Básico](#uso-básico)
- [Controle SVG](#controle-svg)
- [Providers de Imagem](#providers-de-imagem)
- [Componentes de Conveniência](#componentes-de-conveniência)
- [Performance e Loading](#performance-e-loading)
- [Fallbacks e Error Handling](#fallbacks-e-error-handling)
- [Props Completas](#props-completas)
- [Exemplos Práticos](#exemplos-práticos)

---

## 🚀 Instalação

```tsx
import { Image, Avatar, Hero, Thumbnail, SvgIcon } from "@/components/ui/image"
```

## 🏗️ Arquitetura Modular

O sistema de imagens utiliza uma **arquitetura modular** que faz triagem automática entre imagens tradicionais e SVGs:

### Estrutura de Arquivos
```
src/lib/components/ui/image/
├── index.ts              # Componente principal com triagem automática
├── Image.tsx             # Componente para imagens tradicionais (PNG, JPG, etc.)
├── Svg.tsx               # Componente especializado para SVGs
├── convenience.tsx       # Componentes de conveniência (Avatar, Hero, etc.)
├── types.ts              # Tipos TypeScript compartilhados
└── utils/                # Funções auxiliares
    ├── providers.ts      # Lógica de providers (Cloudflare, Cloudinary)
    ├── image-helpers.ts  # Utilidades para imagens
    └── svg-helpers.ts    # Utilidades específicas para SVG
```

### Triagem Inteligente
O componente `Image` principal detecta automaticamente o tipo de arquivo:

```tsx
// Detecta SVG automaticamente e usa componente especializado
<Image src="/icon.svg" svgColor="brand.500" />

// Detecta imagem tradicional e usa componente otimizado  
<Image src="/photo.jpg" aspectRatio="16/9" />
```

**Vantagens:**
- ✅ **API Unificada**: Um componente para todos os tipos
- ✅ **Otimização Específica**: Lógica especializada para cada tipo
- ✅ **Manutenibilidade**: Código organizado em módulos
- ✅ **Tree Shaking**: Importa apenas o necessário

---

## 📦 Uso Básico

### Image Padrão
```tsx
<Image 
  src="/logo.png" 
  alt="Logo" 
  width={120}
  height={80}
/>
```

### Image com Link
```tsx
<Image 
  src="/logo.png" 
  alt="Logo" 
  href="/dashboard"
  width={120}
  height={80}
/>
```

### Image com Border Radius
```tsx
<Image 
  src="/logo.png" 
  alt="Logo" 
  rounded={12}
  width={120}
  height={80}
/>
```

---

## 🎨 Controle SVG

O componente oferece **3 estratégias** para controle de cores SVG:

### 1. CSS Filters (Mais Rápido)
```tsx
// Qualquer cor HEX
<Image src="/icon.svg" svgColor="#ff6b6b" />
<Image src="/icon.svg" svgColor="#4ecdc4" />
<Image src="/icon.svg" svgColor="#9b59b6" />

// Cores nomeadas CSS
<Image src="/icon.svg" svgColor="red" />
<Image src="/icon.svg" svgColor="crimson" />
<Image src="/icon.svg" svgColor="orange" />

// Cores do Chakra UI (dinâmicas)
<Image src="/icon.svg" svgColor="brand.500" />
<Image src="/icon.svg" svgColor="blue.400" />
<Image src="/icon.svg" svgColor="green.200" />

// Filtros CSS customizados
<Image src="/icon.svg" svgFilter="hue-rotate(120deg)" />
<Image src="/icon.svg" svgFilter="sepia(100%) saturate(200%)" />
```

**Vantagens:**
- ✅ Performance máxima
- ✅ Sem requests adicionais
- ✅ Aceita qualquer cor HEX, nomeada ou Chakra UI
- ✅ Resolução dinâmica de tokens do design system
- ✅ Compatível com Next.js Image
- ✅ Conversão automática HEX → CSS Filter

**Limitações:**
- ❌ Aproximação da cor (pode ter pequenas variações)
- ❌ Sem controle granular de múltiplas cores

### 2. SVG Inline (Controle Total)
```tsx
<Image 
  src="/icon.svg" 
  renderSvgInline
  svgFill="#22c55e"      // Cor de preenchimento (HEX)
  svgStroke="purple.500" // Cor de contorno (Chakra UI)
  svgStrokeWidth={2}     // Largura do contorno
/>

// Exemplo com cores customizadas do tema
<Image 
  src="/icon.svg" 
  renderSvgInline
  svgFill="brand.600"    // Suas cores customizadas!
/>
```

**Vantagens:**
- ✅ Controle total sobre fill/stroke
- ✅ Cores exatas (HEX, RGB, HSL, Chakra UI)
- ✅ Suporte a tokens customizados do design system
- ✅ Modificação de múltiplos atributos

**Limitações:**
- ❌ Fetch adicional do SVG
- ❌ Re-render ao mudar props

### 3. SvgIcon Component (Híbrido)
```tsx
<SvgIcon 
  src="/icon.svg"
  width={24}
  height={24}
  svgFill="brand.500"    // Cores do seu tema!
/>
```

**Vantagens:**
- ✅ Inline automático
- ✅ API simplificada
- ✅ Otimizado para ícones

---

## 🌐 Providers de Imagem

### Next.js (Padrão)
```tsx
<Image src="/logo.png" provider="next" />
```

### Cloudflare Images
```tsx
<Image src="image-id" provider="cloudflare" />
```
**Variável de ambiente:**
```env
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH=your_hash_here
```

### Cloudinary
```tsx
<Image src="sample.jpg" provider="cloudinary" />
```
**Variável de ambiente:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Provider Customizado
```tsx
import { createCustomProvider } from "@/components/ui/image/Image"

const myProvider = {
  name: 'custom',
  getUrl: (src, options) => `https://mycdn.com/${src}?w=${options.width}`,
}

<Image 
  src="image.jpg" 
  provider="custom"
  customProvider={myProvider}
/>
```

---

## 🎯 Componentes de Conveniência

### Avatar
```tsx
<Avatar 
  src="/user.jpg" 
  alt="João Silva"
  width={80}
  height={80}
/>
```
- ✅ Circular automático (`rounded="50%"`)
- ✅ `aspectRatio={1}` (quadrado)
- ✅ `objectFit="cover"`

### Hero
```tsx
<Hero 
  src="/banner.jpg" 
  alt="Hero banner"
  width={400}
  height={200}
/>
```
- ✅ `priority={true}` (carregamento prioritário)
- ✅ `responsive={true}` (imagens responsivas)
- ✅ `objectFit="cover"`

### Thumbnail
```tsx
<Thumbnail 
  src="/post.jpg" 
  alt="Post thumbnail"
  width={200}
/>
```
- ✅ `aspectRatio="4/3"`
- ✅ `lazy={true}` (lazy loading)
- ✅ `objectFit="cover"`

### SvgIcon
```tsx
<SvgIcon 
  src="/icon.svg"
  width={24}
  height={24}
  svgFill="#3b82f6"
/>
```
- ✅ `renderSvgInline={true}` (inline automático)
- ✅ Controle total de cores
- ✅ Otimizado para ícones

---

## ⚡ Performance e Loading

### Estratégias de Loading
```tsx
// Carregamento prioritário (above-the-fold)
<Image src="/hero.jpg" priority />

// Lazy loading (padrão)
<Image src="/content.jpg" lazy />

// Carregamento imediato
<Image src="/above.jpg" eager />

// Preload no <head>
<Image src="/important.jpg" preload />
```

### Responsive Images
```tsx
<Image 
  src="/responsive.jpg" 
  sizes="(max-width: 768px) 100vw, 50vw"
  responsive
/>

// Com breakpoints customizados
<Image 
  src="/responsive.jpg"
  sizes={[
    { breakpoint: '640px', width: 320 },
    { breakpoint: '1024px', width: 512 },
    { breakpoint: '1440px', width: 720 }
  ]}
/>
```

### Otimizações Automáticas
```tsx
<Image 
  src="/photo.jpg"
  imageOptions={{
    quality: 90,        // Qualidade da imagem
    format: 'webp',     // Formato de saída
    blur: false         // Blur placeholder
  }}
/>
```

---

## 🛡️ Fallbacks e Error Handling

### Fallback Automático
```tsx
<Image 
  src="/might-fail.jpg" 
  alt="Imagem"
  fallback="no-image.png"
  showFallbackOnError
/>
```

### Fallback Component
```tsx
const CustomFallback = () => (
  <div style={{ 
    width: '150px', 
    height: '100px', 
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <span>Imagem não encontrada</span>
  </div>
)

<Image 
  src="/fail.jpg" 
  fallbackComponent={<CustomFallback />}
/>
```

---

## 📐 Aspect Ratio e Object Fit

```tsx
// Aspect ratios comuns
<Image src="/photo.jpg" aspectRatio={1} />          // 1:1 (quadrado)
<Image src="/photo.jpg" aspectRatio="16/9" />       // 16:9 (widescreen)
<Image src="/photo.jpg" aspectRatio="4/3" />        // 4:3 (clássico)
<Image src="/photo.jpg" aspectRatio={0.75} />       // 3:4 (portrait)

// Object fit
<Image src="/photo.jpg" objectFit="cover" />    // Preenche cortando
<Image src="/photo.jpg" objectFit="contain" />  // Ajusta mantendo proporção
<Image src="/photo.jpg" objectFit="fill" />     // Estica para preencher
```

---

## 📋 Props Completas

```tsx
interface ImgProps {
  // === ESSENTIALS ===
  src: string | null                    // URL da imagem
  alt?: string                          // Texto alternativo
  width?: number                        // Largura
  height?: number                       // Altura
  
  // === LAYOUT & STYLING ===
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  aspectRatio?: number | string         // Ex: 1, "16/9", "4/3"
  rounded?: boolean | number | string   // Border radius
  bgColor?: string                      // Cor de fundo
  
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
  target?: '_blank' | '_self' | '_parent' | '_top'
  
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
  
  // === ACCESSIBILITY ===
  role?: string                         // Role ARIA
  'aria-label'?: string                 // Label ARIA
  'aria-describedby'?: string           // Descrição ARIA
  
  // === EVENTS ===
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onLoadStart?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}
```

---

## 🎪 Exemplos Práticos

### Galeria de Produtos
```tsx
const ProductGallery = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {products.map(product => (
      <Thumbnail 
        key={product.id}
        src={product.image}
        alt={product.name}
        href={`/products/${product.id}`}
        width={200}
        lazy
      />
    ))}
  </div>
)
```

### Lista de Usuários
```tsx
const UserList = ({ users }) => (
  <div className="space-y-4">
    {users.map(user => (
      <div key={user.id} className="flex items-center gap-3">
        <Avatar 
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
        />
        <div>
          <h3>{user.name}</h3>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
    ))}
  </div>
)
```

### Hero Section Responsivo
```tsx
const HeroSection = () => (
  <div className="relative">
    <Hero 
      src="/hero-banner.jpg"
      alt="Hero banner"
      width={1920}
      height={1080}
      sizes="100vw"
      priority
      responsive
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-white text-4xl font-bold">
        Bem-vindo ao nosso site
      </h1>
    </div>
  </div>
)
```

### Sistema de Ícones
```tsx
const IconButton = ({ icon, color = "#3b82f6", size = 24, ...props }) => (
  <button className="p-2 rounded hover:bg-gray-100" {...props}>
    <SvgIcon 
      src={`/icons/${icon}.svg`}
      width={size}
      height={size}
      svgFill={color}
    />
  </button>
)

// Uso
<IconButton icon="heart" color="#ef4444" />
<IconButton icon="share" color="#10b981" />
<IconButton icon="bookmark" color="#8b5cf6" />
```

---

## 🛠️ Configuração de Ambiente

### .env.local
```env
# Cloudflare Images
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH=your_hash_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imagedelivery.net', 'res.cloudinary.com'], // Para providers externos
    formats: ['image/webp', 'image/avif'], // Formatos otimizados
  },
}

module.exports = nextConfig
```

---

## 🔧 Troubleshooting

### SVG não está mudando de cor
1. **Verifique se é SVG**: O arquivo tem extensão `.svg`?
2. **CSS Filters vs Inline**: Use `renderSvgInline` para controle total
3. **SVG com currentColor**: Alguns SVGs usam `currentColor` que funciona melhor com `svgColor`

### Imagens não carregam
1. **Verifique o provider**: Está configurado corretamente?
2. **Variáveis de ambiente**: As env vars estão definidas?
3. **Domínios permitidos**: Adicionou no `next.config.js`?

### Performance lenta
1. **Use lazy loading**: Padrão para imagens fora da viewport
2. **Priority apenas para above-the-fold**: Não abuse do `priority`
3. **Responsive images**: Use `sizes` para diferentes breakpoints

---

## 📚 Recursos Adicionais

- **Página de Exemplos**: `/docs/images` - Documentação visual completa
- **Componente Logo**: Integração com sistema de logos
- **Chakra UI**: Compatível com o design system
- **TypeScript**: Tipagem completa para todas as props

---

## 🎯 Melhores Práticas

### ✅ Recomendado
```tsx
// Use componentes de conveniência
<Avatar src="/user.jpg" width={40} />

// Priority apenas para imagens importantes
<Hero src="/banner.jpg" priority />

// Lazy loading para conteúdo
<Thumbnail src="/product.jpg" lazy />

// SVG inline apenas quando necessário
<SvgIcon src="/icon.svg" svgFill="#3b82f6" />
```

### ❌ Evite
```tsx
// Não abuse do priority
<Image src="/footer-logo.jpg" priority /> // ❌

// Não use inline SVG desnecessariamente
<Image src="/simple-icon.svg" renderSvgInline /> // ❌ Use svgColor

// Não esqueça do alt text
<Image src="/important.jpg" /> // ❌ Faltou alt
```

---

**🚀 Agora você tem controle total sobre imagens em seu projeto Next.js!**
