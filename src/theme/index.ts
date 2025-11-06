import { createSystem, defaultConfig, defineConfig, defineRecipe, mergeConfigs } from "@chakra-ui/react"
import { textStyles, fontFamilyTokens } from "./tokens/text"



// Recipes

export const buttonRecipe = defineRecipe({
    base: {
        display: "flex",
    },
    variants: {
        visual: {
            solid: { bg: "red.200", color: "white" },
            outline: { borderWidth: "1px", borderColor: "red.200" },
        },
        size: {
            sm: { padding: "4", fontSize: "12px" },
            lg: { padding: "8", fontSize: "24px" },
        },
    },
})



const newTheme = defineConfig({
    theme: {
        textStyles,
        tokens: {
            colors: {
                primary: { value: "#A020F0" },
                secondary: { value: "#EE0F0F" },
                background: { value: "{colors.gray.100}" },
                brand: {
                    50: { value: "#e6f2ff" },
                    100: { value: "#e6f2ff" },
                    200: { value: "#bfdeff" },
                    300: { value: "#99caff" },
                    400: { value: "#74b7ff" },
                    500: { value: "#4f9fff" },
                    600: { value: "#3588ff" },
                    700: { value: "#9D69A3" },
                    800: { value: "#005aff" },
                    900: { value: "#0044ff" },
                    950: { value: "#001a33" },
                },
            },
            fonts: fontFamilyTokens,

        },
        semanticTokens: {
            colors: {
                azstaff: { value: "{colors.teal.500}" },
                azlist: { value: "{colors.purple.500}" },
                brand: {
                    solid: { value: "{colors.brand.500}" },
                    contrast: { value: "{colors.brand.100}" },
                    fg: { value: "{colors.brand.700}" },
                    muted: { value: "{colors.brand.100}" },
                    subtle: { value: "{colors.brand.200}" },
                    emphasized: { value: "{colors.brand.300}" },
                    focusRing: { value: "{colors.brand.500}" },
                },
            },


        },


    },
})

// Extends default theme
const configCustom = mergeConfigs(defaultConfig, newTheme)
const theme = createSystem(configCustom)

export default theme