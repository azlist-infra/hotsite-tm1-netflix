import { Roboto } from "next/font/google";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets:['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
});


const primaryFont = roboto
const secondaryFont = roboto
const customFont = roboto


const fonts = {
    primaryFont,
    secondaryFont,
    customFont,
}

export default fonts




