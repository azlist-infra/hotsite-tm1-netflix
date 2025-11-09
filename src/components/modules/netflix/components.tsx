import { Box } from '@chakra-ui/react'
import { Image } from '@/components/ui/image/Image'
import { JSX } from 'react'

// Re-export modal components
export { NetflixModal, NetflixModalCloseButton } from './NetflixModal'
export { ContactLink } from './ContactLink'

/**
 * Logo Netflix SVG Responsivo
 */
export const NetflixLogo = ({
    width = 120,
    height = 32,
    fillColor = '#E50914',
    responsive = true
}: {
    width?: number
    height?: number
    fillColor?: string
    responsive?: boolean
}): JSX.Element => {
    return (
        <Box
            w={responsive ? { base: '130px', md: `${width}px` } : `${width}px`}
            h={responsive ? { base: 'auto', md: `${height}px` } : `${height}px`}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
            >
                <path
                    fill={fillColor}
                    d="M92.4033 29.0328C94.0827 29.1566 95.7621 29.2928 97.4415 29.4413V0H92.4033V29.0328ZM11.3576 18.1006L4.78935 0H0V31.9918C1.67938 31.7565 3.35876 31.5213 5.03815 31.3108V13.9159L10.8724 30.5928C12.7135 30.3823 14.5422 30.1842 16.3833 29.9861V0H11.3452V18.1006H11.3576ZM21.2349 29.528C25.8749 29.1071 30.5399 28.7604 35.2297 28.488V23.5481C32.2317 23.7215 29.2461 23.9195 26.273 24.1548V16.6768C28.2261 16.6521 30.8011 16.6025 33.0776 16.6273V11.6874C31.2614 11.6874 28.3256 11.7122 26.273 11.7369V4.98943H35.2297V0H21.2349V29.528ZM38.4641 4.98943H43.7386V28.0918C45.418 28.0299 47.0973 27.9804 48.7767 27.9309V4.98943H54.0512V0H38.4641V4.98943ZM57.2732 27.7947H62.3113V16.3921H69.1408V11.4522H62.3113V4.98943H71.3426V0H57.2732V27.7947ZM119.647 0H114.111L110.466 8.41889L107.194 0H101.746L107.605 15.0426L101.211 29.8004C102.977 29.9737 104.744 30.1594 106.51 30.3451L110.23 21.7653L113.912 31.2242C115.828 31.4718 117.743 31.7318 119.659 31.9918L113.091 15.1416L119.647 0ZM79.6152 0H74.577V28.0423C79.1549 28.2033 83.7203 28.4261 88.2609 28.7356V23.7957C85.3872 23.61 82.5136 23.4491 79.6152 23.3129V0Z"
                />
            </svg>
        </Box>
    )
}

/**
 * Wrapper customizado para imagens responsivas
 */
export const CustomImage = ({
    src,
    width,
    height,
    alt,
    responsive = true,
    mobileWidth = '100%'
}: {
    src: string
    width: number
    height: number
    alt: string
    responsive?: boolean
    mobileWidth?: string
}): JSX.Element => {
    return (
        <Box
            w={responsive ? { base: mobileWidth, md: `${width}px` } : `${width}px`}
            maxW={responsive ? { base: '100%', md: `${width}px` } : `${width}px`}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain'
                }}
            />
        </Box>
    )
}

