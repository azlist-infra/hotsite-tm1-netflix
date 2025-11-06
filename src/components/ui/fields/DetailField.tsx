// Componente para exibir campo de detalhes
'use client'

import { Stack, Text, HStack, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { Icons } from '../icon'

interface DetailFieldProps {
    label: string
    value: string | number | null | undefined
    placeholder?: string
    copyable?: boolean
}

export function DetailField({ 
    label, 
    value, 
    placeholder = 'Não informado',
    copyable = false 
}: DetailFieldProps) {
    const [copied, setCopied] = useState(false)
    
    const displayValue = value || placeholder
    const isPlaceholder = !value
    
    const handleCopy = async () => {
        if (!value) return
        
        await navigator.clipboard.writeText(String(value))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    
    return (
        <Stack gap={1}>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
                {label}
            </Text>
            <HStack justify="space-between">
                <Text 
                    fontSize="md" 
                    fontWeight={isPlaceholder ? 'normal' : 'semibold'}
                    color={isPlaceholder ? 'gray.400' : 'gray.900'}
                >
                    {displayValue}
                </Text>
                {copyable && value && (
                    <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label={copied ? 'Copiado' : 'Copiar'}
                        onClick={handleCopy}
                    >
                        {copied ? <Icons.Check /> : <Icons.Copy />}
                    </IconButton>
                )}
            </HStack>
        </Stack>
    )
}

