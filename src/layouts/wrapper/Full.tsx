import { Box, BoxProps } from "@chakra-ui/react";
import { debug } from "@/layouts/debug";


type FullProps = BoxProps & {
    children: React.ReactNode
}

export function Full({ children, ...props }: FullProps) {

    //const marginX = marginPixel * 2


    return (
        <Box
            {...props}
            bg={props.bg || "transparent"}
            w="100%"
            //mx={`${marginPixel}px`}
        >
            {children}
        </Box>
    )
}