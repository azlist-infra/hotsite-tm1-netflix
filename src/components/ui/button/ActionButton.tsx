// Componente genérico para botões de ação

'use client'

import { Button, ButtonProps } from '@chakra-ui/react'
import Link from 'next/link'
import { Icons } from '@/components/ui/icon'

type ActionType = 'edit' | 'view' | 'custom'

interface ActionButtonProps extends Omit<ButtonProps, 'onClick'> {
    /** Tipo de ação (define ícone e texto padrão) */
    action: ActionType
    /** URL para navegação (usa Next.js Link) */
    href?: string
    /** Função onClick (alternativa ao href) */
    onClick?: () => void
    /** Texto do botão (sobrescreve o padrão) */
    text?: string | null
    /** Ícone do botão (sobrescreve o padrão, null remove o ícone) */
    icon?: React.ReactNode | null
}

// Configurações padrão para cada tipo de ação
const ACTION_DEFAULTS = {
    edit: {
        icon: <Icons.Edit />,
        text: 'Editar',
        colorPalette: 'gray' as const,
    },
    view: {
        icon: <Icons.View />,
        text: 'Ver',
        colorPalette: 'gray' as const,
    },
    custom: {
        icon: null,
        text: 'Ação',
        colorPalette: 'gray' as const,
    },
}

export function ActionButton({ 
    action,
    href,
    onClick,
    text,
    icon,
    size = 'sm',
    variant = 'outline',
    colorPalette,
    ...props 
}: ActionButtonProps) {
    // Pega as configurações padrão do tipo de ação
    const defaults = ACTION_DEFAULTS[action]
    
    // Determina o ícone final (ordem: prop icon > padrão do action)
    // Se icon === null explicitamente, não mostra ícone
    // Se icon === undefined, usa o padrão
    const finalIcon = icon === null ? null : (icon !== undefined ? icon : defaults.icon)
    
    // Determina o texto final
    const finalText = text !== undefined && text !== null ? text : defaults.text
    
    // Determina a cor final
    const finalColorPalette = colorPalette || defaults.colorPalette

    // Valida que tem href OU onClick
    if (!href && !onClick) {
        console.warn('ActionButton: href ou onClick é obrigatório')
        return null
    }

    // Se tem href, usa Link
    if (href) {
        return (
            <Button
                asChild
                colorPalette={finalColorPalette}
                variant={variant}
                size={size}
                {...props}
            >
                <Link href={href}>
                    {finalIcon} {finalText}
                </Link>
            </Button>
        )
    }

    // Se tem onClick, usa botão normal
    return (
        <Button
            onClick={onClick}
            colorPalette={finalColorPalette}
            variant={variant}
            size={size}
            {...props}
        >
            {finalIcon} {finalText}
        </Button>
    )
}

