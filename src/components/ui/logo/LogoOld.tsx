"use client"

import React, { memo, useMemo } from "react"
import { Image } from "../image/Image"
// Styled component inline (sem dependência externa)
import { CSSProperties } from "react"
import { Box } from "@chakra-ui/react"

// === TYPES ===
interface LogoProps {
    variant?: 'main' | 'icon'
    theme?: 'light' | 'dark' | 'auto'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | number
    href?: string
    alt?: string
    className?: string
    priority?: boolean
    onClick?: () => void
    svgColor?: string
    svgFilter?: string
}

// === CONSTANTS ===
interface LogoAsset {
    svg: string;
    png: string;
    pngInverted: string;
}

interface LogoAssets {
    main: LogoAsset;
    icon: LogoAsset;
}

const LOGO_ASSETS: LogoAssets = {
    main: {
        svg: "/assets/logo/logo_azlist.svg",
        png: "/assets/logo/logo_azlist.png",
        pngInverted: "/assets/logo/logo_azlist-inverted.png"
    },
    icon: {
        svg: "/assets/logo/logo_azlist_short.svg",
        png: "/assets/logo/logo_azlist_icon.png",
        pngInverted: "/assets/logo/logo_azlist_icon_inverted.png"
    }
}

const SIZES = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 80, height: 80 },
    xl: { width: 120, height: 120 },
    '2xl': { width: 160, height: 160 },
    '3xl': { width: 200, height: 200 },
    '4xl': { width: 240, height: 240 },
    '5xl': { width: 280, height: 280 },
    '6xl': { width: 320, height: 320 },
    '7xl': { width: 360, height: 360 }
} as const

// === STYLED COMPONENTS (Inline JSX) ===
interface LogoWrapperProps {
    svgFilter?: string;
    svgColor?: string;
    theme: 'light' | 'dark';
    clickable?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
}

function LogoWrapper({
    svgFilter,
    svgColor,
    theme,
    clickable = false,
    className,
    onClick,
    children
}: LogoWrapperProps) {
    const wrapperStyle: CSSProperties = {
        display: 'inline-block',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'opacity 0.2s ease',
    }

    const getSvgStyle = (): CSSProperties => {
        const style: CSSProperties = {}

        if (svgFilter) {
            style.filter = svgFilter
        } else if (theme === 'dark') {
            style.filter = 'brightness(0) invert(1)'
        }

        if (svgColor) {
            style.color = svgColor
        }

        return style
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (clickable) {
            e.currentTarget.style.opacity = '0.8'
        }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (clickable) {
            e.currentTarget.style.opacity = '1'
        }
    }

    const childrenWithStyles = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const svgStyle = getSvgStyle()
            const currentStyle = (child.props as React.SVGProps<SVGElement>)?.style || {}
            const enhancedStyle = {
                ...currentStyle,
                ...svgStyle,
            }
            return React.cloneElement(child as React.ReactElement<React.SVGProps<SVGElement>>, {
                style: enhancedStyle
            })
        }
        return child
    })

    return (
        <Box
            style={wrapperStyle}
            className={className}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {childrenWithStyles}
        </Box>
    )
}

// === UTILITIES ===
const getLogoSource = (variant: 'main' | 'icon', theme: 'light' | 'dark') => {
    const asset = LOGO_ASSETS[variant]

    // Prioridade: SVG (sempre tentar primeiro)
    if (asset.svg) {
        return {
            src: asset.svg,
            type: 'svg' as const
        }
    }

    // Fallback: PNG específico por tema
    const pngSrc = theme === 'dark' ? asset.pngInverted : asset.png
    return {
        src: pngSrc,
        type: 'png' as const
    }
}

const getDimensions = (size: LogoProps['size']) => {
    if (typeof size === 'number') {
        return { width: size, height: size }
    }

    return SIZES[size || 'md']
}

const getTheme = (theme: LogoProps['theme']): 'light' | 'dark' => {
    if (theme && theme !== 'auto') return theme

    // Auto-detecção de tema (pode ser melhorado com context/hook)
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    return 'light'
}

// === MAIN COMPONENT ===
function LogoBase({
    variant = 'main',
    theme = 'auto',
    size = 'md',
    href,
    alt,
    className,
    priority = false,
    onClick,
    svgColor,
    svgFilter,
}: LogoProps) {
    const resolvedTheme = getTheme(theme)
    const dimensions = getDimensions(size)
    const logoSource = getLogoSource(variant, resolvedTheme)

    const logoAlt = alt || `AZ Staff ${variant === 'icon' ? 'Icon' : 'Logo'}`
    const isClickable = Boolean(href || onClick)

    const handleClick = useMemo(() => {
        if (!onClick) return undefined
        return (e: React.MouseEvent) => {
            e.preventDefault()
            onClick()
        }
    }, [onClick])

    return (
        <LogoWrapper
            theme={resolvedTheme}
            svgFilter={svgFilter}
            svgColor={svgColor}
            clickable={isClickable}
            className={className}
            onClick={handleClick}
        >
            <Image
                src={logoSource.src}
                alt={logoAlt}
                width={dimensions.width}
                height={dimensions.height}
                href={href}
                priority={priority}
                objectFit="contain"
            />
        </LogoWrapper>
    )
}

// === CONVENIENCE COMPONENTS ===
const Main = memo(function LogoMain(props: Omit<LogoProps, 'variant'>) {
    return <LogoBase variant="main" {...props} />
})

const Icon = memo(function LogoIcon(props: Omit<LogoProps, 'variant'>) {
    return <LogoBase variant="icon" {...props} />
})

const Light = memo(function LogoLight(props: Omit<LogoProps, 'theme'>) {
    return <LogoBase theme="light" {...props} />
})

const Dark = memo(function LogoDark(props: Omit<LogoProps, 'theme'>) {
    return <LogoBase theme="dark" {...props} />
})

// === EXPORTS ===
const LogoOld = Object.assign(memo(LogoBase), {
    Main,
    Icon,
    Light,
    Dark,
})

export { LogoOld }
export type { LogoProps }