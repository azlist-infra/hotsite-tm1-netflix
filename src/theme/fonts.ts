

import { Roboto } from "next/font/google";
//import { Barriecito} from "next/font/google";



const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

/*
const barriecito = Barriecito({
    variable: "--font-barriecito",
    subsets: ["latin"],
    weight: "400",
});
*/


const primaryFont = roboto
const secondaryFont = roboto
const customFont = roboto


const fonts = {
    primaryFont,
    secondaryFont,
    customFont,
}

export default fonts



// Fontes do sistema para evitar conflitos com o CLI do Chakra
// Usar este bloco abaixo para rodar CLI do Chakra
// 1. comentar o bloco de fontes padrão + const de cada fontes e imports (ou seja, tudo acima e descomentar o bloco de fontes temporárias abaixo
// 2. rodar o comando cli "npx @chakra-ui/cli typegen src/theme/index.ts"
// 3. retornar o bloco de fontes padrão e comentar o bloco de fontes

// npx @chakra-ui/cli typegen src/theme/index.ts

/*
const fonts = {
    primaryFont: { style: { fontFamily: "'Dancing Script', cursive" } },
    secondaryFont: { style: { fontFamily: "'Inter', sans-serif" } },
    customFont: { style: { fontFamily: "'Inter', sans-serif" } },
}

export default fonts
*/


