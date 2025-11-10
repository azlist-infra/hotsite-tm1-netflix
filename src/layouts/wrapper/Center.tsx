import { Flex, FlexProps, Center as ChakraCenter } from "@chakra-ui/react";


type CenterProps = FlexProps & {
    children: React.ReactNode
}

export function Center({ children, justify = "center", direction = "row", ...props }: CenterProps) {

    return (
        <ChakraCenter>
        <Flex
            align="center"
            justify={justify}
            direction={direction}
            bg={props.bg || "transparent"}
            //bg='green.600'

            p={props.padding || 4}
            minH={props.minH || "200px"}
            minW={props.minW || "breakpoint-base"}
            w={props.w || "100%"}
            maxW={props.maxW || "100%"}
            flex='1'
            {...props}
        >
            {children}
        </Flex>
        </ChakraCenter>
    )
}