import { Box } from '@chakra-ui/react'
import { Image } from '@/components/ui/image/Image'
import { JSX } from 'react'

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
            w={responsive ? { base: mobileWidth, sm: '100%', md: '100%', lg: '100%', xl: `${width}px` } : `${width}px`}
            maxW={responsive ? { base: '100%', sm: '100%', md: '100%', lg: '100%', xl: `${width}px` } : `${width}px`}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            bg="black.600"
            border="3px solid red"
            
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    border: '3px solid yellow'
                }}
                
                
            />
        </Box>
    )
}

