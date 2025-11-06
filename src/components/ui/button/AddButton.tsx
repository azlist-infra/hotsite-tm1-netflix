import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { Icons } from "../icon";

export function AddButton({ onClick, href, text, ...props }: AddButtonProps) {

    if (!href && !onClick) {
        return null
    }

    if (!text) {
        text = 'Adicionar'
    }

    const colorPalette = 'green'

    // Se tem href, usa asChild com Link (Next.js)
    if (href) {
        return (
            <Button
                asChild
                colorPalette={colorPalette}
                size="md"
                {...props}
            >
                <Link href={href}>
                    <Icons.Plus /> {text}
                </Link>
            </Button>
        )
    }

    // Se só tem onClick, renderiza botão normal
    return (
        <Button
            onClick={onClick}
            colorPalette={colorPalette}
            size="md"
            {...props}
        >
            <Icons.Plus /> {text}
        </Button>
    )
}

interface AddButtonProps extends ButtonProps {
    onClick?: () => void
    href?: string | null | undefined
    text?: string | null | undefined
}