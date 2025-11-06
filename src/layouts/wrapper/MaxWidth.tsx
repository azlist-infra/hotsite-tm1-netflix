import { Box, BoxProps, Center } from "@chakra-ui/react";


type MaxWidthProps = BoxProps & {
    children: React.ReactNode
}

export function MaxWidth({ children, ...props }: MaxWidthProps) {

    return (
        <Center>    
        <Box
            bg={props.bg || "transparent"}
            p={4}
            w="10/12"
            {...props}
        >
            {children}
        </Box>
        </Center>
    )
}