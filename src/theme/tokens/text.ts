import { defineTextStyles } from "@chakra-ui/react"
import fonts from '../fonts'



// ------------------------------------------------------------------------------
// Define os nomes das fontes para utllização fácil nos tokens
const fontFamily = {
    primary: fonts.secondaryFont.style.fontFamily,
    secondary: fonts.secondaryFont.style.fontFamily,
    custom: fonts.customFont.style.fontFamily,
    custom2: fonts.customFont2.style.fontFamily,
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
        description: 'Fonte para textos corporais - Inter'
    },
}


// ------------------------------------------------------------------------------
// define textStyle customizados para utilizar em qualquer elemento
// Exemplo: <Text textStyle="customBig">Custom Big</Text>
export const textStyles = defineTextStyles({
    brand: {

        text: {


            main: {
                description: "Texto corporal padrão para parágrafos",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    textDecoration: "None",
                    textTransform: "None",
                },
            },

            large: {
                description: 'Texto corporal maior para destaque sutil',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '28px',
                    letterSpacing: '0px',

                },
            },

            small: {
                description: 'Texto corporal menor para informações secundárias',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0px',

                },
            },

        },

        title: {
            main: {
                description: "Estilo de texto para títulos",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '600',
                    fontSize: '24px',
                    lineHeight: '32px',
                    letterSpacing: '0px',
                    textDecoration: "None",
                    textTransform: "None",
                },
            },

            subtitle: {
                description: 'Subtítulo para complementar headings',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '500',
                    fontSize: '18px',
                    lineHeight: '26px',
                    letterSpacing: '0px',

                },
            },


        },

        heading: {
            display: {
                description: 'Título principal para hero sections - usar apenas 1x por página',
                value: {
                    fontFamily: fontFamily.primary, // ← Usa o token configurado
                    fontWeight: '700',
                    fontSize: { base: '32px', md: '40px', lg: '48px' },
                    lineHeight: { base: '38px', md: '44px', lg: '52px' },
                    letterSpacing: '-0.02em',

                },
            },

            hero: {
                description: 'Título hero responsivo',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '700',
                    fontSize: { base: '28px', md: '36px', lg: '44px' },
                    lineHeight: { base: '32px', md: '40px', lg: '48px' },
                    letterSpacing: '-0.01em',


                },
            },


        },

        // ===== UI TEXTS =====
        form: {
            button: {
                description: 'Texto para botões',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                },
            },

            label: {
                description: 'Labels de formulários',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0px',

                },
            },

            helper: {
                description: 'Texto de ajuda em formulários',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0px',

                },
            },

        },


        card: {
            title: {
                description: 'Título de cartões',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '22px',
                    letterSpacing: '0px',
                },
            },
            subtitle: {
                description: 'Subtítulo de cartões',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                },
            },
            text: {
                description: 'Descrição de cartões',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                },
            },
            subtext: {
                description: 'Texto de cartões',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                },
            },
        },


        special: {

            link: {
                description: "Estilo de texto para links",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    textDecoration: "underline",
                    textTransform: "uppercase",
                },
            },
            accent: {
                description: 'Texto com destaque colorido',
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '22px',
                    letterSpacing: '0px',

                },
            },


        }
    }
})