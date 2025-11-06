import { ImageProps } from 'next/image'
import { CSSProperties } from 'react'

// === PROVIDER TYPES ===
export interface ImageProvider {
    name: string
    getUrl: (src: string, options?: ImageOptions) => string
    supportedFormats?: string[]
}

export interface ImageOptions {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto'
    blur?: boolean
    overlay?: string
    crop?: 'fill' | 'fit' | 'crop' | 'scale'
}

export interface ResponsiveImageSize {
    breakpoint: string
    width: number
    height?: number
}

// === SHARED PROPS ===
export interface BaseImageProps extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'sizes'> {
    // === ESSENTIALS ===
    src: string | null
    alt?: string
    width?: number
    height?: number

    // === LAYOUT & STYLING ===
    objectFit?: CSSProperties['objectFit']
    aspectRatio?: number | string
    rounded?: boolean | number | string
    bgColor?: string

    // === RESPONSIVE ===
    sizes?: string | ResponsiveImageSize[]
    responsive?: boolean

    // === LINKING ===
    href?: string | null
    external?: boolean
    target?: '_blank' | '_self' | '_parent' | '_top'

    // === PROVIDERS & OPTIMIZATION ===
    provider?: 'next' | 'cloudflare' | 'cloudinary' | 'custom'
    imageOptions?: ImageOptions
    customProvider?: ImageProvider

    // === FALLBACKS ===
    fallback?: string
    fallbackComponent?: React.ReactNode
    showFallbackOnError?: boolean

    // === PERFORMANCE ===
    eager?: boolean
    preload?: boolean
    priority?: boolean
    lazy?: boolean

    // === ACCESSIBILITY ===
    role?: string
    'aria-label'?: string
    'aria-describedby'?: string

    // === EVENTS ===
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
    onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void
    onLoadStart?: (event: React.SyntheticEvent<HTMLImageElement>) => void
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

// === IMAGE PROPS ===
export type ImgProps = BaseImageProps

// === SVG PROPS ===
export interface SvgProps extends BaseImageProps {
    // === SVG SPECIFIC ===
    svgColor?: string              // Cor primária para SVGs (usa currentColor ou filtros)
    svgFill?: string               // Cor de preenchimento específica
    svgStroke?: string             // Cor de contorno específica
    svgStrokeWidth?: number        // Largura do contorno
    svgFilter?: string             // Filtro CSS customizado
    renderSvgInline?: boolean      // Renderizar SVG inline para controle total
}

// === UNIFIED PROPS (para o componente principal) ===
export interface UnifiedImageProps extends BaseImageProps {
    // === SVG SPECIFIC (opcional) ===
    svgColor?: string
    svgFill?: string
    svgStroke?: string
    svgStrokeWidth?: number
    svgFilter?: string
    renderSvgInline?: boolean
}
