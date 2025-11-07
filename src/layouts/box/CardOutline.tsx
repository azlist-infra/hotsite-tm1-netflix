import { VStack, FlexProps, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CardOutlineProps extends Omit<FlexProps, 'direction'> {
    children: ReactNode
}

export const CardOutline = ({ children, ...rest }: CardOutlineProps) => {
    return (
        <Flex
            flexDirection="column"
            align="center"
            justify="center"

            border="2px solid white"
            borderRadius={20}

            w={{ base: '90%', md: '682px' }}
            mx={{ base: 'auto', md: 'auto' }}
            minH={{ base: "500px", md: "657px" }}
            {...rest}
        >
            <VStack
                align="center"
                gap={8}
                p={0}
            >
                {children}
            </VStack>
        </Flex>
    )
}
