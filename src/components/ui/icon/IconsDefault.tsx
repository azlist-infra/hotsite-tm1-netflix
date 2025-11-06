

import { Icon } from "@chakra-ui/react"

import {
    // Navegação & Interface
    LuHouse,
    LuMenu,
    LuX,
    LuChevronLeft,
    LuChevronRight,
    LuChevronUp,
    LuChevronDown,
    LuArrowLeft,
    LuArrowRight,
    LuSearch,
    LuFilter,

    // Usuário & Autenticação
    LuUser,
    LuCircleUser,
    LuUsers,
    LuLogIn,
    LuLogOut,
    LuSettings,

    // Comunicação
    LuMail,
    LuPhone,
    LuMessageCircle,
    LuBell,
    LuBellOff,

    // Ações & Estados
    LuSquarePen,
    LuTrash2,
    LuPlus,
    LuMinus,
    LuCheck,
    LuCircleAlert,
    LuEye,
    LuEyeOff,
    LuHeart,
    LuStar,
    LuShare,

    // Arquivos & Conteúdo
    LuFile,
    LuFileText,
    LuImage,
    LuVideo,
    LuDownload,
    LuUpload,

    // Tempo & Data
    LuCalendar,
    LuClock,

    // Dados & Analytics
    LuTrendingUp,

    // Sistema
    LuRefreshCw,
    LuLoader,
    LuWifi,
    LuWifiOff,
    LuBattery,
    LuPower,

    // Extras úteis
    LuInfo,
    LuCircleHelp,
    LuExternalLink,
    LuCopy,

    // Telescópio
    LuTelescope,
} from "react-icons/lu";

import { MdOutlineList } from "react-icons/md";

/*
Lucide Icons via react-icons
https://react-icons.github.io/react-icons/icons/lu/
https://lucide.dev/

Material Design Icons via react-icons
https://react-icons.github.io/react-icons/icons/md/
https://fonts.google.com/icons?hl=pt-br&icon.size=24&icon.color=%23FFFFFF&icon.platform=web
https://material.io/resources/icons/?style=baseline

Nomes genéricos para facilitar troca de biblioteca no futuro
*/

export const DefaultIcons = {
    // Navegação & Interface
    Home: LuHouse ,
    Menu: LuMenu,
    Close: LuX,
    Clear: LuX,
    ChevronLeft: LuChevronLeft,
    ChevronRight: LuChevronRight,
    ChevronUp: LuChevronUp,
    ChevronDown: LuChevronDown,
    ArrowLeft: LuArrowLeft,
    ArrowRight: LuArrowRight,
    Search: LuSearch,
    Filter: LuFilter,

    // Usuário & Autenticação
    User: LuUser,
    UserCircle: LuCircleUser,
    Users: LuUsers,
    Login: LuLogIn,
    Logout: LuLogOut,
    Settings: LuSettings,

    // Comunicação
    Mail: LuMail,
    Phone: LuPhone,
    Message: LuMessageCircle,
    Bell: LuBell,
    BellOff: LuBellOff,

    // Ações & Estados
    Edit: LuSquarePen,
    Delete: LuTrash2,
    Plus: LuPlus,
    Minus: LuMinus,
    Check: LuCheck,
    Alert: LuCircleAlert ,
    View: LuEye,
    EyeOff: LuEyeOff,
    Heart: LuHeart,
    Star: LuStar,
    Share: LuShare,

    // Arquivos & Conteúdo
    File: LuFile,
    FileText: LuFileText,
    Image: LuImage,
    Video: LuVideo,
    Download: LuDownload,
    Upload: LuUpload,

    // Tempo & Data
    Calendar: LuCalendar,
    Clock: LuClock,

    // Dados & Analytics
    TrendingUp: LuTrendingUp,

    // Sistema
    Refresh: LuRefreshCw,
    Loader: LuLoader,
    Wifi: LuWifi,
    WifiOff: LuWifiOff,
    Battery: LuBattery,
    Power: LuPower,

    // Extras úteis
    Info: LuInfo,
    Help: LuCircleHelp,
    ExternalLink: LuExternalLink,
    Copy: LuCopy,
    ItemList: MdOutlineList,
}
