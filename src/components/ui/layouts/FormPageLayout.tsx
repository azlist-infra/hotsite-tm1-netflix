// Layout padrão para páginas de formulário

import { Container, Box, Button} from '@chakra-ui/react'
import Link from 'next/link'
import { PageTitle } from '../text/PageTitle'
import { Card } from '@/layouts/box/Card'

interface FormPageLayoutProps {
    title: string
    description: string
    backHref: string
    backLabel?: string
    children: React.ReactNode
}

export function FormPageLayout({ 
    title, 
    description, 
    backHref,
    backLabel = '← Voltar',
    children 
}: FormPageLayoutProps) {
    return (
        <Container maxW="breakpoint-sm" py={8}>
            {/* Header */}
            <Box>
                <PageTitle title={title} description={description} />
            </Box>

            {/* Conteúdo (Formulário) */}
            <Card w="full" mt={6}>
                {children}
            </Card>

            {/* Voltar */}
            <Box mt={4} textAlign="center">
                <Button
                    asChild
                    variant="ghost"
                    colorPalette="gray"
                >
                    <Link href={backHref} passHref>
                        {backLabel} 
                    </Link>
                </Button>
            </Box>
        </Container>
    )
}

