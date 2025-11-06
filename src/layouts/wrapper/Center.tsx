import { Flex, FlexProps, Center as ChakraCenter } from "@chakra-ui/react";


type CenterProps = FlexProps & {
    children: React.ReactNode
}

export function Center({ children, justify = "center", direction = "column", ...props }: CenterProps) {

    return (
        <ChakraCenter>
        <Flex
            align="center"
            justify={justify}
            direction={direction}
            bg={props.bg || "transparent"}
            p={4}
            minH={props.minH || "200px"}
            minW={props.minW || "breakpoint-sm"}
            w={props.w || "50%"}
            maxW={props.maxW || "100%"}
            {...props}
        >
            {children}
        </Flex>
        </ChakraCenter>
    )
}