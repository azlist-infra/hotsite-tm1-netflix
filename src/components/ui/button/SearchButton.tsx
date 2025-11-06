'use client'

import { Button } from '@chakra-ui/react'
import { Icons } from '@/components/ui/icon'
import type { ReactNode } from 'react'

interface SearchButtonProps {
    /** Callback quando o botão é clicado */
    onClick: () => void
    /** Texto do botão */
    text?: string
    /** Tamanho do botão */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Se o botão está em loading */
    loading?: boolean
    /** Texto durante loading */
    loadingText?: string
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
 * Botão de Buscar/Filtrar genérico
 * 
 * Recursos:
 * - Ícone de busca integrado
 * - Estados de loading
 * - Variantes e cores customizáveis
 * - Modo icon-only
 * - Ícone customizável
 * 
 * @example
 * // Padrão
 * <SearchButton onClick={handleSearch} />
 * 
 * @example
 * // Com loading
 * <SearchButton onClick={handleSearch} loading={isSearching} />
 * 
 * @example
 * // Icon only
 * <SearchButton onClick={handleSearch} iconOnly />
 * 
 * @example
 * // Customizado
 * <SearchButton 
 *   onClick={handleSearch} 
 *   text="Buscar clientes"
 *   colorPalette="green"
 * />
 */
export function SearchButton({
    onClick,
    text = 'Filtrar',
    size = 'md',
    loading = false,
    loadingText = 'Filtrando...',
    disabled = false,
    variant = 'solid',
    colorPalette = 'blue',
    iconOnly = false,
    icon,
    fullWidth = false,
}: SearchButtonProps) {
    const buttonIcon = icon || <Icons.Search />

    return (
        <Button
            onClick={onClick}
            size={size}
            loading={loading}
            loadingText={loadingText}
            disabled={disabled || loading}
            variant={variant}
            colorPalette={colorPalette}
            width={fullWidth ? 'full' : 'auto'}
        >
            {buttonIcon}
            {!iconOnly && text}
        </Button>
    )
}

