'use client'

import { Icon, IconProps } from "@chakra-ui/react"
import { forwardRef } from "react"

// Interface base para ícones customizados
export interface CustomIconProps extends Omit<IconProps, 'children'> {
    size?: IconProps['size']
    color?: string
}

/**
 * Ícone Toggle On - Baseado no SVG do Material Design
 */
export const ToggleOnIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z" />
                </svg>
            </Icon>
        )
    }
)

ToggleOnIcon.displayName = "ToggleOnIcon"

/**
 * Ícone Toggle Off - Versão desligada do toggle
 */
export const ToggleOffIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z" />
                </svg>
            </Icon>
        )
    }
)

ToggleOffIcon.displayName = "ToggleOffIcon"


/**
 * Ícone de Coração
 */
export const HeartIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </Icon>
        )
    }
)

HeartIcon.displayName = "HeartIcon"

/**
 * Ícone de Estrela
 */
export const StarIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </Icon>
        )
    }
)

StarIcon.displayName = "StarIcon"

/**
 * Ícone de Menu Hamburguer
 */
export const MenuIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
            </Icon>
        )
    }
)

MenuIcon.displayName = "MenuIcon"

/**
 * Ícone de Fechar (X)
 */
export const CloseIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </Icon>
        )
    }
)

CloseIcon.displayName = "CloseIcon"

/**
 * Ícone que carrega arquivo SVG diretamente
 * Usa filter para aplicar cor nos vetores/paths
 */
export const FileSVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", color = "currentColor", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} color={color} {...props}>
                <svg viewBox="0 -960 960 960" fill="currentColor">
                    <defs>
                        <filter id="recolor-filter">
                            <feFlood floodColor="currentColor" result="flood" />
                            <feComposite in="flood" in2="SourceAlpha" operator="in" />
                        </filter>
                    </defs>
                    <image 
                        href="/assets/icons/toggle_on.svg" 
                        width="960" 
                        height="960"
                        x="0"
                        y="-960"
                        filter="url(#recolor-filter)"
                    />
                </svg>
            </Icon>
        )
    }
)

FileSVGIcon.displayName = "FileSVGIcon"

/**
 * Versão simples que carrega SVG externo (sem customização de cor)
 */
export const SimpleSVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = "md", ...props }, ref) => {
        return (
            <Icon ref={ref} size={size} {...props}>
                <svg viewBox="0 -960 960 960">
                    <image 
                        href="/assets/icons/toggle_on.svg" 
                        width="960" 
                        height="960"
                        x="0"
                        y="-960"
                    />
                </svg>
            </Icon>
        )
    }
)

SimpleSVGIcon.displayName = "SimpleSVGIcon"

// Exportar todos os ícones
export const CustomIcons = {
    ToggleOn: ToggleOnIcon,
    ToggleOff: ToggleOffIcon,
    Heart: HeartIcon,
    Star: StarIcon,
    Menu: MenuIcon,
    Close: CloseIcon,
    FileSVG: FileSVGIcon,
    SimpleSVG: SimpleSVGIcon,
}
