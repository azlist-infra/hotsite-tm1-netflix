import { Box, BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps {
    children: React.ReactNode
    /** Nível de elevação/sombra */
    elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const ELEVATION_SHADOWS = {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const

export const Card = ({ children, elevation = 'sm', ...rest }: CardProps) => {
    return (
        <Box
            maxW="400px"
            w="full"
            p={8}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            boxShadow={ELEVATION_SHADOWS[elevation]}
            transition="box-shadow 0.2s ease-in-out"
            _hover={{
                boxShadow: ELEVATION_SHADOWS.lg,
            }}
            {...rest}
        >
            {children}
        </Box>
    )
}
