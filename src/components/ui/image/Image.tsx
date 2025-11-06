"use client"

import { default as NextImage } from 'next/image'
import Link from 'next/link'
import { useState, useCallback, forwardRef, useMemo } from 'react'
import { CSSProperties } from 'react'

import { ImgProps, ImageOptions } from './types'
import { getOptimizedSrc } from './utils/providers'
import { buildResponsiveSizes, getImageDimensions } from './utils/image-helpers'

// === IMAGE COMPONENT ===
export const Image = forwardRef<HTMLImageElement, ImgProps>(function Image({
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

    const imgAlt = alt || ariaLabel || 'Image'
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

        // Se o style do usuário definir apenas uma dimensão, completa a outra com 'auto' para manter proporção
        const userWidth = (style as CSSProperties | undefined)?.width
        const userHeight = (style as CSSProperties | undefined)?.height
        if (userWidth && !userHeight) {
            baseStyle.height = 'auto'
        } else if (userHeight && !userWidth) {
            baseStyle.width = 'auto'
        }

        return baseStyle
    }, [objectFit, style, aspectRatio, rounded, bgColor, isLoading])

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

    // === IMAGE ELEMENT ===
    const imageElement = (
        <NextImage
            ref={ref}
            src={currentSrc || fallback}
            alt={imgAlt}
            width={dimensions.width}
            height={dimensions.height}
            sizes={responsive ? responsiveSizes : undefined}
            style={{ 
                ...computedStyle,
                // Força as dimensões para evitar warnings
                width: dimensions.width,
                height: dimensions.height
            }}
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