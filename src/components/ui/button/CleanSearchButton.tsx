'use client'

import { Button } from '@chakra-ui/react'
import { Icons } from '@/components/ui/icon'
import type { ReactNode } from 'react'

interface CleanSearchButtonProps {
    /** Callback quando o botão é clicado */
    onClick: () => void
    /** Texto do botão */
    text?: string
    /** Tamanho do botão */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Se o botão está desabilitado */
    disabled?: boolean
    /** Variante do botão */
    variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
    /** Palette de cores */
    colorPalette?: 'blue' | 'green' | 'red' | 'gray'
    /** Se deve mostrar apenas o ícone (sem texto) */
    iconOnly?: boolean
    /** Ícone customizado (opcional) */
    icon?: ReactNode
    /** Full width */
    fullWidth?: boolean
}

/**
 * Botão de Limpar filtros genérico
 * 
 * Recursos:
 * - Ícone de limpar integrado
 * - Variantes e cores customizáveis
 * - Modo icon-only
 * - Ícone customizável
 * 
 * @example
 * // Padrão
 * <CleanSearchButton onClick={handleClear} />
 * 
 * @example
 * // Icon only
 * <CleanSearchButton onClick={handleClear} iconOnly />
 * 
 * @example
 * // Customizado
 * <CleanSearchButton 
 *   onClick={handleClear} 
 *   text="Resetar filtros"
 *   colorPalette="red"
 *   variant="ghost"
 * />
 */
export function CleanSearchButton({
    onClick,
    text = 'Limpar',
    size = 'md',
    disabled = false,
    variant = 'outline',
    colorPalette = 'gray',
    iconOnly = false,
    icon,
    fullWidth = false,
}: CleanSearchButtonProps) {
    const buttonIcon = icon || <Icons.Clear />

    return (
        <Button
            onClick={onClick}
            size={size}
            disabled={disabled}
            variant={variant}
            colorPalette={colorPalette}
            width={fullWidth ? 'full' : 'auto'}
        >
            {buttonIcon}
            {!iconOnly && text}
        </Button>
    )
}

