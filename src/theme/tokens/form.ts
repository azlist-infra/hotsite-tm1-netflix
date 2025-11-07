import { defineRecipe } from "@chakra-ui/react"

// Recipe do input estendido com variante "default"
// Use com: <Input variant="default">...</Input>
// O mergeConfigs mescla automaticamente com as variantes padrão do Chakra UI
export const inputRecipe = defineRecipe({
    variants: {
        variant: {
            default: {
                bg: "white",
                height: "51px",
                borderRadius: "0px",

                color: "{colors.input.text}",
                textStyle: "brand.input.default",
                _focus: {
                    borderColor: "{colors.brand.main}",
                    boxShadow: "0 0 0 2px {colors.brand.main}",
                },
                _hover: {
                    borderColor: "gray.300",
                },
                _disabled: {
                    opacity: 0.8,
                    cursor: "not-allowed",
                    bg: "gray.50",
                },
            },
        },
    },
})

