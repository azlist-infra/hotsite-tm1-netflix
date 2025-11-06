import { ResponsiveImageSize } from '../types'

// === IMAGE UTILITIES ===
export const buildResponsiveSizes = (sizes?: string | ResponsiveImageSize[]): string => {
    if (typeof sizes === 'string') return sizes

    if (Array.isArray(sizes)) {
        return sizes
            .map(size => `(min-width: ${size.breakpoint}) ${size.width}px`)
            .join(', ')
    }

    return '100vw'
}

export const getImageDimensions = (
    width?: number,
    height?: number,
    aspectRatio?: number | string
): { width: number; height: number } => {
    const defaultWidth = 400
    const defaultHeight = 300

    if (width && height) {
        return { width, height }
    }

    if (width && aspectRatio) {
        const ratio = typeof aspectRatio === 'string' ? eval(aspectRatio) : aspectRatio
        return { width, height: Math.round(width / ratio) }
    }

    if (height && aspectRatio) {
        const ratio = typeof aspectRatio === 'string' ? eval(aspectRatio) : aspectRatio
        return { width: Math.round(height * ratio), height }
    }

    return {
        width: width || defaultWidth,
        height: height || defaultHeight
    }
}


