import { Roboto } from "next/font/google";
import localFont from "next/font/local";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets:['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const vcrOsdMono = localFont({
    src: "../../public/VCR_OSD_MONO.ttf",
    variable: "--font-vcr-osd-mono",
    display: "swap",
});


const primaryFont = roboto
const secondaryFont = roboto
const customFont = vcrOsdMono


const fonts = {
    primaryFont,
    secondaryFont,
    customFont,
}

export default fonts




