import { LayoutHotsite } from "@/layouts/layout/LayoutHotsite"
import { Container, Flex } from "@chakra-ui/react"
import { TitleBase } from "../inscricao/components/TitleBase"

export default function UnsubscribePage() {
    return (
        <>
            <LayoutHotsite>
                <Container maxW="100vw" py={10} minH="100vh" bgColor="black">
                    <Flex gap={8} align="center" justify="center" bgColor="black" flexDirection="column" py={30}>
                        <TitleBase title="Unsubscribe" />
                    </Flex>
                </Container>
            </LayoutHotsite>
        </>
    )
}