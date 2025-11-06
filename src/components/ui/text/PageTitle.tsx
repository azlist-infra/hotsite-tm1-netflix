import { Box, Flex, Heading, Text } from "@chakra-ui/react";


interface PageTitleProps {
    title: string
    description?: string
    align?: "left" | "center" | "right"
}

export function PageTitle({ title, description, align = "left" }: PageTitleProps) {

    if (!title && !description) {
        return null
    }


    return (
        <Flex direction="column" align={align} justify="center" gap={0} h="100%" w="full" >
            {title && (
                <Heading size="xl">
                    {title}
                </Heading>
            )}
            {description && (
                <Text color="gray.300" fontSize="sm">
                    {description}
                </Text>
            )}
        </Flex>
    )
}
