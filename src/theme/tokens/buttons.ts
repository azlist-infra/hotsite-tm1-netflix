import { defineRecipe } from "@chakra-ui/react"

// Recipe do button estendido com variante "netflix"
// Use com: <Button variant="netflix">...</Button>
// O mergeConfigs mescla automaticamente com as variantes padrão do Chakra UI
export const buttonRecipe = defineRecipe({
    variants: {
        variant: {
            custom: {
                bg: "{colors.brand.main}",
                color: "white",
                borderWidth: "0",
                borderRadius: "4px",
                height: "56px",
                py: "12px",
                px: "24px",
                textStyle: "brand.button.large",
                _hover: {
                    bg: "{colors.brand.hover}",
                },
                _active: {
                    bg: "{colors.brand.active}",
                    transform: "scale(0.98)",
                },
                _disabled: {
                    opacity: 0.7,
                    cursor: "not-allowed",
                },
            },
        },
    },
})

