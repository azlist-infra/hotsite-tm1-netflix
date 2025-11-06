"use client"

import { forwardRef } from 'react'
import { UnifiedImage } from './index'
import { UnifiedImageProps } from './types'

// === CONVENIENCE COMPONENTS ===
export const Avatar = forwardRef<HTMLImageElement, Omit<UnifiedImageProps, 'aspectRatio' | 'objectFit'>>(
    function Avatar({ alt = "Avatar", ...props }, ref) {
        return (
            <UnifiedImage
                ref={ref}
                alt={alt}
                aspectRatio={1}
                objectFit="cover"
                rounded="50%"
                {...props}
            />
        )
    }
)

export const Hero = forwardRef<HTMLImageElement, Omit<UnifiedImageProps, 'objectFit'>>(
    function Hero({ alt = "Hero image", ...props }, ref) {
        return (
            <UnifiedImage
                ref={ref}
                alt={alt}
                objectFit="cover"
                priority
                responsive
                {...props}
            />
        )
    }
)

export const Thumbnail = forwardRef<HTMLImageElement, Omit<UnifiedImageProps, 'aspectRatio' | 'objectFit'>>(
    function Thumbnail({ alt = "Thumbnail", ...props }, ref) {
        return (
            <UnifiedImage
                ref={ref}
                alt={alt}
                aspectRatio="4/3"
                objectFit="cover"
                lazy
                {...props}
            />
        )
    }
)

export const SvgIcon = forwardRef<HTMLImageElement, Omit<UnifiedImageProps, 'renderSvgInline'>>(
    function SvgIcon({ alt = "Icon", ...props }, ref) {
        return (
            <UnifiedImage
                ref={ref}
                alt={alt}
                renderSvgInline={true}
                {...props}
            />
        )
    }
)
