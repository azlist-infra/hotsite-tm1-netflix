import theme from '@/theme'

// === URL UTILITIES ===
export const isSvgUrl = (src: string): boolean => {
    return src.toLowerCase().endsWith('.svg') || src.includes('data:image/svg+xml')
}

// === COLOR UTILITIES ===
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2
    
    if (max === min) {
        h = s = 0 // achromatic
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
            default: h = 0; break
        }
        h /= 6
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}

// === CHAKRA COLOR RESOLUTION ===
export const resolveChakraColor = (color: string): string => {
    // Se não é uma cor do Chakra, retorna como está
    if (!color.includes('.')) {
        return color
    }
    
    // Usa o tema importado diretamente
    try {
        // Converte formato "brand.50" para "colors.brand.50"
        const tokenPath = `colors.${color}`
        const resolvedColor = theme.token(tokenPath)
        
        if (resolvedColor && resolvedColor !== tokenPath) {
            if (process.env.NODE_ENV === 'development') {
                console.log(`🎨 Chakra color resolved: ${color} → ${resolvedColor}`)
            }
            return resolvedColor
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Error resolving Chakra color ${color}:`, error)
        }
    }
    
    // Fallback simples para cores básicas quando sistema não está disponível
    const basicColorMap: { [key: string]: string } = {
        // Cores básicas do Chakra UI como fallback
        'gray.50': '#f7fafc',
        'gray.100': '#edf2f7',
        'gray.200': '#e2e8f0',
        'gray.300': '#cbd5e0',
        'gray.400': '#a0aec0',
        'gray.500': '#718096',
        'red.200': '#fc8181',
        'red.400': '#e53e3e',
        'red.500': '#c53030',
        'green.200': '#9ae6b4',
        'green.400': '#48bb78',
        'green.500': '#38a169',
        'blue.200': '#90cdf4',
        'blue.400': '#4299e1',
        'blue.500': '#3182ce',
        'purple.200': '#d6bcfa',
        'purple.400': '#9f7aea',
        'purple.500': '#805ad5',
        'orange.200': '#fbd38d',
        'orange.300': '#f6ad55',
        'orange.400': '#ed8936',
        'orange.500': '#dd6b20',
    }
    
    if (basicColorMap[color]) {
        console.log(`🎨 Basic fallback: ${color} → ${basicColorMap[color]}`)
        return basicColorMap[color]
    }
    
    // Se nada funcionar, retorna a cor original
    console.warn(`Chakra color not resolved: ${color}. Make sure you're using the Image component within a ChakraProvider.`)
    return color
}

// === SVG FILTER GENERATION ===
export const getSvgFilterFromColor = (color: string): string => {
    // Resolve cores do Chakra UI primeiro
    const resolvedColor = resolveChakraColor(color)
    
    // Casos especiais otimizados
    if (resolvedColor === '#000000' || resolvedColor === 'black') return 'brightness(0)'
    if (resolvedColor === '#ffffff' || resolvedColor === 'white') return 'brightness(0) invert(1)'
    
    // Cores básicas com filtros precisos conhecidos
    const knownColors: { [key: string]: string } = {
        // Cores básicas
        '#ff0000': 'brightness(0) saturate(100%) invert(14%) sepia(89%) saturate(7475%) hue-rotate(359deg) brightness(98%) contrast(118%)',
        'red': 'brightness(0) saturate(100%) invert(14%) sepia(89%) saturate(7475%) hue-rotate(359deg) brightness(98%) contrast(118%)',
        '#0000ff': 'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(4049%) hue-rotate(234deg) brightness(91%) contrast(135%)',
        'blue': 'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(4049%) hue-rotate(234deg) brightness(91%) contrast(135%)',
        '#00ff00': 'brightness(0) saturate(100%) invert(35%) sepia(100%) saturate(1538%) hue-rotate(85deg) brightness(113%) contrast(119%)',
        'green': 'brightness(0) saturate(100%) invert(35%) sepia(100%) saturate(1538%) hue-rotate(85deg) brightness(113%) contrast(119%)',
        '#ffff00': 'brightness(0) saturate(100%) invert(89%) sepia(100%) saturate(2062%) hue-rotate(359deg) brightness(102%) contrast(107%)',
        'yellow': 'brightness(0) saturate(100%) invert(89%) sepia(100%) saturate(2062%) hue-rotate(359deg) brightness(102%) contrast(107%)',
        '#800080': 'brightness(0) saturate(100%) invert(26%) sepia(81%) saturate(2851%) hue-rotate(286deg) brightness(87%) contrast(129%)',
        'purple': 'brightness(0) saturate(100%) invert(26%) sepia(81%) saturate(2851%) hue-rotate(286deg) brightness(87%) contrast(129%)',
        '#ffa500': 'brightness(0) saturate(100%) invert(59%) sepia(100%) saturate(611%) hue-rotate(360deg) brightness(103%) contrast(101%)',
        'orange': 'brightness(0) saturate(100%) invert(59%) sepia(100%) saturate(611%) hue-rotate(360deg) brightness(103%) contrast(101%)',
        
        // Cores dos exemplos da documentação
        '#ff6b6b': 'brightness(0) saturate(100%) invert(64%) sepia(68%) saturate(4164%) hue-rotate(327deg) brightness(99%) contrast(102%)',
        '#4ecdc4': 'brightness(0) saturate(100%) invert(77%) sepia(28%) saturate(1274%) hue-rotate(138deg) brightness(95%) contrast(94%)',
        '#9b59b6': 'brightness(0) saturate(100%) invert(46%) sepia(39%) saturate(2392%) hue-rotate(261deg) brightness(88%) contrast(103%)',
        '#f39c12': 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1815%) hue-rotate(359deg) brightness(102%) contrast(93%)',
        
        // Cores nomeadas adicionais
        'crimson': '#dc143c',
        '#dc143c': 'brightness(0) saturate(100%) invert(22%) sepia(89%) saturate(6498%) hue-rotate(340deg) brightness(91%) contrast(94%)'
    }
    
    // Verifica se é uma cor conhecida (normaliza para lowercase)
    const normalizedColor = resolvedColor.toLowerCase()
    if (knownColors[normalizedColor]) {
        return knownColors[normalizedColor]
    }
    
    // Cores nomeadas básicas do CSS
    const namedColors: { [key: string]: string } = {
        'red': '#ff0000',
        'green': '#00ff00',
        'blue': '#0000ff',
        'yellow': '#ffff00',
        'purple': '#800080',
        'orange': '#ffa500',
        'pink': '#ffc0cb',
        'brown': '#a52a2a',
        'gray': '#808080',
        'grey': '#808080',
        'crimson': '#dc143c'
    }
    
    // Converte cor nomeada para hex se necessário
    let hexColor = resolvedColor
    if (namedColors[resolvedColor.toLowerCase()]) {
        hexColor = namedColors[resolvedColor.toLowerCase()]
        // Verifica novamente se a cor convertida tem filtro conhecido
        if (knownColors[hexColor]) {
            return knownColors[hexColor]
        }
    }
    
    // Converte hex para RGB
    const rgb = hexToRgb(hexColor)
    if (!rgb) {
        // Fallback para cores inválidas
        console.warn(`Invalid color format: ${color} (resolved to: ${resolvedColor})`)
        return 'sepia(100%) saturate(2) hue-rotate(0deg)'
    }
    
    // Converte RGB para HSL
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    
    // Algoritmo melhorado para calcular filtros
    const targetLuminance = hsl.l / 100
    const targetHue = hsl.h
    const targetSaturation = hsl.s / 100
    
    // Para cores muito escuras (luminância < 0.2)
    if (targetLuminance < 0.2) {
        return `brightness(0) invert(${targetLuminance * 5}) sepia(100%) saturate(${targetSaturation * 500}%) hue-rotate(${targetHue}deg) brightness(90%)`
    }
    
    // Para cores muito claras (luminância > 0.8)
    if (targetLuminance > 0.8) {
        return `brightness(0) invert(1) sepia(100%) saturate(${targetSaturation * 300}%) hue-rotate(${targetHue}deg) brightness(${targetLuminance * 120}%)`
    }
    
    // Para cores médias - algoritmo mais preciso
    const invert = targetLuminance < 0.5 ? 100 : 0
    const sepia = 100
    const saturate = Math.max(100, targetSaturation * 400)
    const brightness = Math.max(80, targetLuminance * 150)
    
    return `brightness(0) saturate(100%) invert(${invert}%) sepia(${sepia}%) saturate(${saturate}%) hue-rotate(${targetHue}deg) brightness(${brightness}%) contrast(120%)`
}

export const createSvgColorFilter = (
    svgColor?: string,
    svgFilter?: string
): string | undefined => {
    if (svgFilter) return svgFilter
    if (svgColor) return getSvgFilterFromColor(svgColor)
    return undefined
}
