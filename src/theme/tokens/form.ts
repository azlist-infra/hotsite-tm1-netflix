import { defineRecipe } from "@chakra-ui/react"

// Recipe do input estendido com variante "default"
// Use com: <Input variant="default">...</Input>
// O mergeConfigs mescla automaticamente com as variantes padrão do Chakra UI
export const inputRecipe = defineRecipe({
    base: {
        height: "60px",
        borderRadius: "0px",
    },
    variants: {
        variant: {
            default: {
                bg: "white",
                color: "{colors.input.text}",
                textStyle: "brand.input.default",
                border: "2px solid",
                borderColor: "white",

                _placeholder: {
                    color: "{colors.input.placeholder}",
                },
                _focus: {
                    borderColor: "gray.300",
                    //boxShadow: "0 0 0 2px {colors.primary}",
                },
                _hover: {
                    borderColor: "gray.300",
                },
                _disabled: {
                    opacity: 0.8,
                    cursor: "not-allowed",
                    bg: "gray.50",
                },
                _invalid: {
                    //border: "3px solid",
                    borderColor: "red.500",
                },
                _readOnly: {

                    borderColor: "gray.800",
                    bg: "gray.800",
                    borderRadius: "8px",
                    cursor: "not-allowed",
                    textStyle: "brand.text.default",
                    color: "white",
                    fontWeight: "bold",


                    _focus: {
                        borderColor: "gray.800",
                    },
                    _hover: {
                        borderColor: "gray.800",
                    },
                    _disabled: {
                        opacity: 0.8,
                        cursor: "not-allowed",
                        bg: "gray.800",
                    },
                },
            },
        },
    },
})

