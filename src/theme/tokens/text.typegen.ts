import { defineTextStyles } from "@chakra-ui/react"
import fonts from '../fonts.typegen'

// ------------------------------------------------------------------------------
// Define os nomes das fontes para utllização fácil nos tokens
const fontFamily = {
    primary: fonts.secondaryFont.style.fontFamily,
    secondary: fonts.secondaryFont.style.fontFamily,
    custom: fonts.customFont.style.fontFamily
}

// fontes utlizadas no projeto importadas no theme do chakra
export const fontFamilyTokens = {
    // define a fonte padrão para os títulos do projeto
    heading: {
        value: fontFamily.primary,
        description: 'Fonte para títulos - Dancing Script'
    },
    // define a fonte padrão para os textos do projeto
    body: {
        value: fontFamily.secondary,
        description: 'Fonte para textos - Inter'
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
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '22px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                },
            },
            large: {
                description: 'Texto grande',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '700',
                    fontSize: '20px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
            default: {
                description: 'Texto padrão',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                },
            },
            small: {
                description: 'Texto pequeno',
                value: {
                    fontFamily: fontFamily.primary,
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
                    fontFamily: fontFamily.primary,
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
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                },
            },
        },
    },
})

