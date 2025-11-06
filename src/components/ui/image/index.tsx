"use client"

import { forwardRef } from 'react'
import { Image as RegularImage } from './Image'
import { Svg as SvgImage } from './Svg'
import { UnifiedImageProps } from './types'
import { isSvgUrl } from './utils/svg-helpers'

// === UNIFIED IMAGE COMPONENT (Router) ===
export const UnifiedImage = forwardRef<HTMLImageElement, UnifiedImageProps>(
    function UnifiedImage(props, ref) {
        const { src } = props
        
        // Se não há src, usa o componente regular
        if (!src) {
            return <RegularImage ref={ref} {...props} />
        }
        
        // Faz triagem: SVG vs Imagem regular
        if (isSvgUrl(src)) {
            // Debug log em desenvolvimento
            if (process.env.NODE_ENV === 'development') {
                console.log(`🎨 SVG detected: ${src}`)
            }
            return <SvgImage ref={ref} {...props} />
        } else {
            // Debug log em desenvolvimento
            if (process.env.NODE_ENV === 'development') {
                console.log(`📸 Regular image detected: ${src}`)
            }
            return <RegularImage ref={ref} {...props} />
        }
    }
)

// === EXPORTS ===
// Main component (with smart routing)
export { UnifiedImage as Image }

// Individual components for direct use
export { Image as RegularImage } from './Image'
export { Svg as SvgImage } from './Svg'

// Convenience components
export { Avatar, Hero, Thumbnail, SvgIcon } from './convenience'

// Utilities
export { createCloudflareProvider, createCloudinaryProvider } from './utils/providers'
export { isSvgUrl } from './utils/svg-helpers'
export { resolveChakraColor } from './utils/svg-helpers'

// Types
export type { 
    UnifiedImageProps as ImgProps,
    ImgProps as RegularImageProps,
    SvgProps,
    ImageProvider,
    ImageOptions,
    ResponsiveImageSize 
} from './types'