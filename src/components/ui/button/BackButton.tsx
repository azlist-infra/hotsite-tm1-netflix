import { Button, ButtonProps } from "@chakra-ui/react"
import Link from "next/link"

interface BackButtonProps extends Omit<ButtonProps, 'onClick'> {
    onBack?: () => void
    href?: string
    label?: string
}

export function BackButton({ 
    onBack, 
    href, 
    label = '← Voltar',
    ...props 
}: BackButtonProps) {
    // Se tem href, usa Link
    if (href) {
        return (
            <Button
                asChild
                variant="ghost"
                colorPalette="gray"
                {...props}
            >
                <Link href={href}>
                    {label}
                </Link>
            </Button>
        )
    }

    // Se tem onClick, usa botão normal
    if (onBack) {
        return (
            <Button
                onClick={onBack}
                variant="ghost"
                colorPalette="gray"
                {...props}
            >
                {label}
            </Button>
        )
    }

    // Fallback: botão desabilitado
    return null
}

