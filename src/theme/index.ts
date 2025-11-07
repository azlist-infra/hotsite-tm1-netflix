import { createSystem, defaultConfig, defineConfig, mergeConfigs } from "@chakra-ui/react"
import { textStyles, fontFamilyTokens } from "./tokens/text"
import { buttonRecipe } from "./tokens/buttons"
import { inputRecipe } from "./tokens/form"
import { colorTokens, semanticColorTokens } from "./tokens/colors"



const newTheme = defineConfig({
    theme: {
        textStyles,
        recipes: {
            button: buttonRecipe,
            input: inputRecipe,
        },
        tokens: {
            colors: colorTokens,
            fonts: fontFamilyTokens,
        },
        semanticTokens: {
            colors: semanticColorTokens,
        },


    },
})

// Extends default theme
const configCustom = mergeConfigs(defaultConfig, newTheme)
const theme = createSystem(configCustom)

export default theme