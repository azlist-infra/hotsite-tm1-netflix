// Componente para estados vazios

import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import { Icons } from '../icon'

interface EmptyStateProps {
    len?: number | undefined
    icon?: React.ReactNode
    title?: string
    description?: string
    action?: React.ReactNode
}

export function EmptyState({ 
    len,
    icon = <Icons.BellOff />, 
    title = "Nenhum resultado encontrado", 
    description,
    action 
}: EmptyStateProps) {

    if (len === undefined || len > 0) {
        return null
    }

    return (
        <Box 
            bg="white" 
            borderRadius="md" 
            p={12} 
            textAlign="center"
            borderWidth={1}
            borderStyle="dashed"
            borderColor="gray.300"
        >
            <VStack gap={0}>
                {icon && (
                    <Icon height={"60px"} width={"60px"} color="red.300"> 
                        {icon}
                    </Icon>
                )}
                
                <Heading size="lg" color="gray.800" mt={4}>
                    {title}
                </Heading>
                
                {description && (
                    <Text color="gray.500" maxW="base" fontSize="sm" fontWeight="light">
                        {description}
                    </Text>
                )}
                
                {action && (
                    <Box mt={8}>
                        {action}
                    </Box>
                )}
            </VStack>
        </Box>
    )
}

