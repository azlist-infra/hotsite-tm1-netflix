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
            justify="flex-start"

            border="1px solid white"
            borderRadius={20}

            w={{ base: '80%', md: '682px' }}
            mx="auto"
            minH={{ base: "auto", md: "auto" }}
            
            {...rest}
        >
            <VStack
                align="center"
                gap={{ base: 3, md: 4 }}
                p={4}
                w="100%"
            >
                {children}
            </VStack>
        </Flex>
    )
}
