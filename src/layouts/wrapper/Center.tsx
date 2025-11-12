import { Flex, FlexProps, Center as ChakraCenter } from "@chakra-ui/react";


type CenterProps = FlexProps & {
    children: React.ReactNode
}

export function Center({ children, justify = "center", direction = "row", ...props }: CenterProps) {

    return (
        <ChakraCenter minW="280px">
        <Flex
            align="center"
            justify={justify}
            direction={direction}
            bg={props.bg || "transparent"}
            //bg='green.600'

            p={props.padding || 4}
            minH={props.minH || "200px"}
            minW={props.minW || "280px"}
            w={props.w || "100%"}
            maxW={props.maxW || "100%"}
            flex='1'
            //layerStyle={'fill.solid'}
            {...props}
        >
            {children}
        </Flex>
        </ChakraCenter>
    )
}