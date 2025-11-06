// Componente para datas em células de tabela

import { Text, TextProps } from '@chakra-ui/react'
import { 
    formatDate, 
    formatDateTime, 
    formatDateShort, 
    formatDateRelative 
} from '@/lib/utils/date'

type DateFormat = 'date' | 'datetime' | 'time' | 'short' | 'relative' | 'full'

interface TableDateProps extends TextProps {
    /** Data em formato ISO ou timestamp */
    date: string | Date
    /** Formato de exibição */
    format?: DateFormat
    /** Placeholder quando vazio */
    placeholder?: string
}

export function TableDate({ 
    date, 
    format = 'date',
    placeholder = '-',
    color = 'gray.600',
    fontSize = 'sm',
    ...props 
}: TableDateProps) {
    // Valida se há data
    if (!date) {
        return (
            <Text color="gray.400" fontSize={fontSize} {...props}>
                {placeholder}
            </Text>
        )
    }

    // Converte para string se for Date
    const dateString = date instanceof Date ? date.toISOString() : date

    // Formata baseado no tipo
    let formattedDate: string
    
    switch (format) {
        case 'datetime':
            formattedDate = formatDateTime(dateString)
            break
        case 'time':
            formattedDate = new Date(dateString).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            })
            break
        case 'short':
            formattedDate = formatDateShort(dateString)
            break
        case 'relative':
            formattedDate = formatDateRelative(dateString)
            break
        case 'full':
            formattedDate = formatDateTime(dateString)
            break
        case 'date':
        default:
            formattedDate = formatDate(dateString)
            break
    }

    return (
        <Text color={color} fontSize={fontSize} {...props}>
            {formattedDate}
        </Text>
    )
}

