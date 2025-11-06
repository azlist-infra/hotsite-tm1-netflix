

import { Inter, Dancing_Script, Hanalei_Fill } from "next/font/google";
//import { Barriecito} from "next/font/google";



const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const dancingScript = Dancing_Script({
    variable: "--font-dancing-script",
    subsets: ["latin"],
});

const hanaleiFill = Hanalei_Fill({
    variable: "--font-hanalei-fill",
    subsets: ["latin"],
    weight: "400",
});

/*
const barriecito = Barriecito({
    variable: "--font-barriecito",
    subsets: ["latin"],
    weight: "400",
});
*/


const primaryFont = inter
const secondaryFont = inter
const customFont = hanaleiFill
const customFont2 = dancingScript





const fonts = {
    primaryFont,
    secondaryFont,
    customFont,
    customFont2,
}




// Fontes do sistema para evitar conflitos com o CLI do Chakra
// Usar este bloco abaixo para rodar CLI do Chakra
// 1. comentar o bloco de fontes padrão + const de cada fontes e imports (ou seja, tudo acima e descomentar o bloco de fontes temporárias abaixo
// 2. rodar o comando cli
// 3. retornar o bloco de fontes padrão e comentar o bloco de fontes
/*
const fonts = {
    primaryFont: { style: { fontFamily: "'Dancing Script', cursive" } },
    secondaryFont: { style: { fontFamily: "'Inter', sans-serif" } },
}
*/


export default fonts