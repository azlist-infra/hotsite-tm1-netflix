// Componente para texto em células de tabela

import { Text, TextProps } from '@chakra-ui/react'

type TextWeight = 'light' | 'normal' | 'bold'

interface TableTextProps extends TextProps {
    /** Conteúdo do texto */
    children: React.ReactNode
    /** Peso do texto */
    weight?: TextWeight
    /** Placeholder quando vazio */
    placeholder?: string
    /** Tamanho do texto */
    fontSize?: string
    /** Cor do texto */
    color?: string
}

const WEIGHT_MAP = {
    light: '300' as const,
    normal: '400' as const,
    bold: '600' as const,
}

export function TableText({ 
    children, 
    weight = 'normal',
    placeholder = '-',
    color = 'gray.900',
    fontSize = 'sm',
    ...props 
}: TableTextProps) {
    const hasContent = children !== null && children !== undefined && children !== ''
    const displayText = hasContent ? children : placeholder
    
    const fontWeight = WEIGHT_MAP[weight]
    
    return (
        <Text
            fontWeight={fontWeight}
            fontSize={fontSize}
            color={hasContent ? color : 'gray.400'}
            {...props}
        >
            {displayText}
        </Text>
    )
}

