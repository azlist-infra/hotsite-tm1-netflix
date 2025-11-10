"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import theme from "@/theme"
import fonts from "@/theme/fonts"


export function ChakraProviderApp(props: { children: React.ReactNode }) {
    return (
        <ChakraProvider value={theme}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <div className={`${fonts.primaryFont.variable} ${fonts.secondaryFont.variable} ${fonts.customFont.variable}`}>
                    {props.children}
                </div>
            </ThemeProvider>
        </ChakraProvider>
    )
}