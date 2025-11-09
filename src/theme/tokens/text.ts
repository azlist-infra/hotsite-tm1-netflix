import { defineTextStyles } from "@chakra-ui/react"
import fonts from '../fonts'



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
        description: 'Fonte para textos corporais - Inter'
    },
}


// ------------------------------------------------------------------------------
// define textStyle customizados para utilizar em qualquer elemento
// Exemplo: <Text textStyle="customBig">Custom Big</Text>
export const textStyles = defineTextStyles({
    brand: {

        modal: {
            title: {
                description: "Título do modal",
                value: {
                    fontFamily: fontFamily.secondary,
                    fontWeight: '700',
                    fontSize: { base: '24px', md: '36px' },
                    lineHeight: '100%',
                    letterSpacing: '0%',
                },
            },
            text: {
                description: "Texto do modal",
                value: {
                    fontFamily: fontFamily.secondary,
                    fontWeight: '400',
                    fontSize: { base: '18px', md: '26.67px' },
                    lineHeight: '100%',
                    letterSpacing: '0%',
                },
            },
        },

        button: {
            large: {
                description: "Texto para botões",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    
                },
            },
            small: {
                description: "Texto para botões",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '16px',
                    letterSpacing: '0px',
                },
            },
        },

        text: {

            default: {
                description: "Texto default",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontSize: { base: '18px', md: '22px' },
                    lineHeight: '130%',
                    letterSpacing: '0%',
                },
            },

            large: {
                description: "Texto large",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '700',
                    fontSize: { base: '18px', md: '22px' },
                    lineHeight: '130%',
                    letterSpacing: '0%',
                },
            },

            small: {
                description: "Texto small",
                value: {
                    fontFamily: fontFamily.primary,
                    fontWeight: '400',
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
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