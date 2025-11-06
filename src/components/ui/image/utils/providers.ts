import { ImageProvider, ImageOptions } from '../types'

// === PROVIDER FACTORIES ===
export const createCloudflareProvider = (accountHash: string): ImageProvider => ({
    name: 'cloudflare',
    getUrl: (src: string, options = {}) => {
        const params = new URLSearchParams()
        if (options.width) params.set('width', options.width.toString())
        if (options.height) params.set('height', options.height.toString())
        if (options.quality) params.set('quality', options.quality.toString())
        if (options.format && options.format !== 'auto') params.set('format', options.format)

        const baseUrl = `https://imagedelivery.net/${accountHash}`
        const queryString = params.toString()
        return `${baseUrl}/${src}${queryString ? `?${queryString}` : ''}`
    },
    supportedFormats: ['webp', 'avif', 'jpeg', 'png']
})

export const createCloudinaryProvider = (cloudName: string): ImageProvider => ({
    name: 'cloudinary',
    getUrl: (src: string, options = {}) => {
        const transformations = []
        if (options.width) transformations.push(`w_${options.width}`)
        if (options.height) transformations.push(`h_${options.height}`)
        if (options.quality) transformations.push(`q_${options.quality}`)
        if (options.format && options.format !== 'auto') transformations.push(`f_${options.format}`)
        if (options.crop) transformations.push(`c_${options.crop}`)

        const transformStr = transformations.length > 0 ? `/${transformations.join(',')}` : ''
        return `https://res.cloudinary.com/${cloudName}/image/upload${transformStr}/${src}`
    },
    supportedFormats: ['webp', 'avif', 'jpeg', 'png', 'gif']
})

// === UTILITIES ===
const buildNextImageUrl = (src: string): string => {
    // Next.js Image optimization is handled automatically
    return src
}

export const getOptimizedSrc = (
    src: string,
    provider: 'next' | 'cloudflare' | 'cloudinary' | 'custom',
    imageOptions: ImageOptions = {},
    customProvider?: ImageProvider
): string => {
    if (!src) return ''

    switch (provider) {
        case 'cloudflare':
            // Require environment variable for Cloudflare
            const cfHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH
            if (!cfHash) return src
            return createCloudflareProvider(cfHash).getUrl(src, imageOptions)

        case 'cloudinary':
            // Require environment variable for Cloudinary
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            if (!cloudName) return src
            return createCloudinaryProvider(cloudName).getUrl(src, imageOptions)

        case 'custom':
            if (customProvider) {
                return customProvider.getUrl(src, imageOptions)
            }
            return src

        case 'next':
        default:
            return buildNextImageUrl(src)
    }
}
