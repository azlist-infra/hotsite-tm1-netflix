"use client"

import { default as NextImage } from 'next/image'
import Link from 'next/link'
import { useState, useCallback, forwardRef, useMemo, useEffect } from 'react'
import { CSSProperties } from 'react'

import { SvgProps, ImageOptions } from './types'
import { getOptimizedSrc } from './utils/providers'
import { buildResponsiveSizes, getImageDimensions } from './utils/image-helpers'
import { createSvgColorFilter, resolveChakraColor } from './utils/svg-helpers'

// === SVG INLINE COMPONENT ===
interface InlineSvgProps {
    src: string
    width: number
    height: number
    svgFill?: string
    svgStroke?: string
    svgStrokeWidth?: number
    svgColor?: string
    className?: string
    onClick?: (event: React.MouseEvent<Element>) => void
}

const InlineSvg = forwardRef<HTMLDivElement, InlineSvgProps>(function InlineSvg({
    src,
    width,
    height,
    svgFill,
    svgStroke,
    svgStrokeWidth,
    svgColor,
    className,
    onClick
}, ref) {
    const [svgContent, setSvgContent] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetch(src)
            .then(response => response.text())
            .then(svgText => {
                // Apply color modifications to SVG content
                let modifiedSvg = svgText

                // Resolve cores do Chakra UI usando o sistema dinâmico
                const resolvedFill = svgFill ? resolveChakraColor(svgFill) : undefined
                const resolvedStroke = svgStroke ? resolveChakraColor(svgStroke) : undefined  
                const resolvedColor = svgColor ? resolveChakraColor(svgColor) : undefined

                if (resolvedFill) {
                    modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, `fill="${resolvedFill}"`)
                    modifiedSvg = modifiedSvg.replace(/<path(?![^>]*fill=)/g, `<path fill="${resolvedFill}"`)
                }

                if (resolvedStroke) {
                    modifiedSvg = modifiedSvg.replace(/stroke="[^"]*"/g, `stroke="${resolvedStroke}"`)
                    modifiedSvg = modifiedSvg.replace(/<path(?![^>]*stroke=)/g, `<path stroke="${resolvedStroke}"`)
                }

                if (svgStrokeWidth) {
                    modifiedSvg = modifiedSvg.replace(/stroke-width="[^"]*"/g, `stroke-width="${svgStrokeWidth}"`)
                }

                if (resolvedColor && !resolvedFill) {
                    // Replace currentColor and apply primary color
                    modifiedSvg = modifiedSvg.replace(/currentColor/g, resolvedColor)
                    modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, `fill="${resolvedColor}"`)
                }

                // Set width and height
                modifiedSvg = modifiedSvg.replace(/width="[^"]*"/g, `width="${width}"`)
                modifiedSvg = modifiedSvg.replace(/height="[^"]*"/g, `height="${height}"`)

                setSvgContent(modifiedSvg)
            })
            .catch(() => setError(true))
    }, [src, svgFill, svgStroke, svgStrokeWidth, svgColor, width, height])

    if (error || !svgContent) {
        return (
            <div 
                ref={ref}
                style={{ width, height, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className={className}
            >
                <span style={{ fontSize: '12px', color: '#999' }}>SVG Error</span>
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className={className}
            onClick={onClick}
            style={{ width, height, display: 'inline-block' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    )
})

// === SVG COMPONENT ===
export const Svg = forwardRef<HTMLImageElement, SvgProps>(function Svg({
    // Essentials
    src,
    alt,
    width,
    height,

    // Layout & Styling
    objectFit = 'cover',
    aspectRatio,
    rounded,
    bgColor,
    style,

    // SVG Specific
    svgColor,
    svgFill,
    svgStroke,
    svgStrokeWidth,
    svgFilter,
    renderSvgInline = false,

    // Responsive
    sizes,
    responsive = true,

    // Linking
    href,
    external = false,
    target = '_self',

    // Providers & Optimization
    provider = 'next',
    imageOptions = {},
    customProvider,

    // Fallbacks
    fallback = 'no-image.png',
    fallbackComponent,
    showFallbackOnError = true,

    // Performance
    eager = false,
    preload = false,
    priority = false,
    lazy = true,

    // Accessibility
    role,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,

    // Events
    onLoad,
    onError,
    onLoadStart,
    onClick,

    // Rest
    className,
    ...props
}, ref) {

    // === STATE ===
    const [currentSrc, setCurrentSrc] = useState<string>('')
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // === COMPUTED VALUES ===
    const dimensions = useMemo(() =>
        getImageDimensions(width, height, aspectRatio),
        [width, height, aspectRatio]
    )

    const optimizedSrc = useMemo(() => {
        if (!src) return fallback

        const mergedOptions: ImageOptions = {
            width: dimensions.width,
            height: dimensions.height,
            quality: 85,
            format: 'auto',
            ...imageOptions
        }

        return getOptimizedSrc(src, provider, mergedOptions, customProvider)
    }, [src, provider, imageOptions, customProvider, dimensions, fallback])

    const responsiveSizes = useMemo(() =>
        buildResponsiveSizes(sizes),
        [sizes]
    )

    const imgAlt = alt || ariaLabel || 'SVG'
    const shouldPreload = priority || preload || eager
    const shouldLazyLoad = !shouldPreload && lazy

    // === COMPUTED STYLES ===
    const computedStyle: CSSProperties = useMemo(() => {
        const baseStyle: CSSProperties = {
            objectFit,
            transition: 'opacity 0.3s ease',
            ...style
        }

        if (aspectRatio) {
            baseStyle.aspectRatio = aspectRatio.toString()
        }

        if (rounded) {
            if (typeof rounded === 'boolean') {
                baseStyle.borderRadius = '0.5rem'
            } else {
                baseStyle.borderRadius = rounded.toString()
            }
        }

        if (bgColor) {
            baseStyle.backgroundColor = bgColor
        }

        if (isLoading) {
            baseStyle.opacity = 0.7
        }

        // Apply SVG color styling for non-inline SVGs
        if (!renderSvgInline) {
            const svgColorFilter = createSvgColorFilter(svgColor, svgFilter)
            if (svgColorFilter) {
                baseStyle.filter = svgColorFilter
                // Force the filter to apply by removing any existing fills
                baseStyle.color = 'transparent'
                // Debug: log the filter being applied
                if (process.env.NODE_ENV === 'development' && svgColor) {
                    console.log(`SVG Filter Applied - Color: ${svgColor}, Filter: ${svgColorFilter}`)
                }
            }
        }

        return baseStyle
    }, [objectFit, style, aspectRatio, rounded, bgColor, isLoading, renderSvgInline, svgColor, svgFilter])

    // === EVENT HANDLERS ===
    const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoading(false)
        setHasError(false)
        onLoad?.(event)
    }, [onLoad])

    const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        setHasError(true)
        setIsLoading(false)

        if (showFallbackOnError && fallback && currentSrc !== fallback) {
            setCurrentSrc(fallback) 
        }

        onError?.(event)
    }, [onError, showFallbackOnError, fallback, currentSrc])

    const handleLoadStart = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoading(true)
        onLoadStart?.(event)
    }, [onLoadStart])

    // === EFFECTS ===
    useState(() => {
        setCurrentSrc(optimizedSrc)
        setHasError(false)
        setIsLoading(true)
    })

    // === FALLBACK HANDLING ===
    if (hasError && fallbackComponent) {
        return <>{fallbackComponent}</>
    }

    // === SVG INLINE RENDERING ===
    if (renderSvgInline && src) {
        const svgElement = (
            <InlineSvg
                ref={ref as React.RefObject<HTMLDivElement>}
                src={src}
                width={dimensions.width}
                height={dimensions.height}
                svgFill={svgFill}
                svgStroke={svgStroke}
                svgStrokeWidth={svgStrokeWidth}
                svgColor={svgColor}
                className={className}
                onClick={onClick as (event: React.MouseEvent<Element>) => void}
            />
        )

        if (href) {
            const linkTarget = external ? '_blank' : target
            const linkProps = external ? { rel: 'noopener noreferrer' } : {}
            
            return (
                <Link href={href} target={linkTarget} {...linkProps}>
                    {svgElement}
                </Link>
            )
        }

        return svgElement
    }

    // === IMAGE ELEMENT (SVG via NextImage) ===
    const imageElement = (
        <NextImage
            ref={ref}
            src={currentSrc || fallback}
            alt={imgAlt}
            width={dimensions.width}
            height={dimensions.height}
            sizes={responsive ? responsiveSizes : undefined}
            style={{ ...computedStyle }}
            className={className}
            priority={shouldPreload}
            loading={shouldLazyLoad ? 'lazy' : 'eager'}
            role={role}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            onLoad={handleLoad}
            onError={handleError}
            onLoadStart={handleLoadStart}
            onClick={onClick}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8UA8AAkUBYdOfF4cAAAAASUVORK5CYII="
            {...props}
        />
    )

    // === WITH LINK ===
    if (href) {
        const linkTarget = external ? '_blank' : target
        const linkProps = external ? { rel: 'noopener noreferrer' } : {}

        return (
            <Link href={href} target={linkTarget} {...linkProps}>
                {imageElement}
            </Link>
        )
    }

    return imageElement
})
