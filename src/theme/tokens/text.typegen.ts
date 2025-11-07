import { defineTextStyles } from "@chakra-ui/react"
import fonts from '../fonts.typegen'

// fontes utlizadas no projeto importadas no theme do chakra
export const fontFamilyTokens = {
    // define a fonte padrão para os títulos do projeto
    heading: {
        value: fonts.secondaryFont.style.fontFamily,
        description: 'Fonte para títulos - Roboto'
    },
    // define a fonte padrão para os textos do projeto
    body: {
        value: fonts.secondaryFont.style.fontFamily,
        description: 'Fonte para textos - Roboto'
    },
}

// ------------------------------------------------------------------------------
// Define os estilos de texto customizados do projeto
export const textStyles = defineTextStyles({
    brand: {
        text: {
            title: {
                description: 'Texto para títulos',
                value: {
                    fontWeight: '700',
                    fontSize: '20px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
            large: {
                description: 'Texto grande',
                value: {
                    fontWeight: '700',
                    fontSize: '20px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
            default: {
                description: 'Texto padrão',
                value: {
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
            small: {
                description: 'Texto pequeno',
                value: {
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
        },
        button: {
            large: {
                description: 'Botão grande',
                value: {
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
        },
        input: {
            default: {
                description: 'Texto para inputs',
                value: {
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                },
            },
        },
    },
})
