// Componente para links em células de tabela

'use client'

import { Text, TextProps } from '@chakra-ui/react'
import Link from 'next/link'
import { LuExternalLink } from 'react-icons/lu'

interface TableLinkProps extends Omit<TextProps, 'onClick'> {
    /** Conteúdo do link */
    children: React.ReactNode
    /** URL do link */
    href?: string
    /** Função onClick (alternativa ao href) */
    onClick?: () => void
    /** Abre em nova aba */
    openInNewTab?: boolean
    /** Mostra ícone quando openInNewTab=true */
    showIcon?: boolean
}

export function TableLink({
    children,
    href,
    onClick,
    openInNewTab = false,
    showIcon = true,
    color = 'blue.500',
    ...props
}: TableLinkProps) {
    // Valida que tem href OU onClick
    if (!href && !onClick) {
        console.warn('TableLink: href ou onClick é obrigatório')
        return <Text {...props}>{children}</Text>
    }

    const content = (
        <>
            {children}
            {openInNewTab && showIcon && (
                <Text as="span" ml={1} fontSize="xs" color="gray.500">
                    <LuExternalLink />
                </Text>
            )}
        </>
    )

    // Se tem href, usa Link
    if (href) {
        return (
            <Text
                asChild
                color={color}
                textDecoration="underline"
                _hover={{ color: 'blue.600', textDecoration: 'none' }}
                cursor="pointer"
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                {...props}
            >
                <Link
                    href={href}
                    target={openInNewTab ? '_blank' : undefined}
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                >
                    {content}
                </Link>
            </Text>
        )
    }

    // Se tem onClick
    return (
        <Text
            onClick={onClick}
            color={color}
            textDecoration="underline"
            _hover={{ color: 'blue.600', textDecoration: 'none' }}
            cursor="pointer"
            {...props}
        >
            {content}
        </Text>
    )
}

