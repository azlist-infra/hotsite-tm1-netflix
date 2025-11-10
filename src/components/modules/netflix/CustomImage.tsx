import { Image } from '@chakra-ui/react'
import NextImage from 'next/image'
import { JSX } from 'react'

/**
 * Wrapper customizado para imagens responsivas usando Chakra UI + Next.js Image
 */
export const CustomImage = ({
    src,
    width,
    height,
    alt,
    mobileWidth = '90%'
}: {
    src: string
    width: number
    height: number
    alt: string
    mobileWidth?: string
}): JSX.Element => {
    return (
        <Image
            asChild
            alt={alt}
            w={{ base: mobileWidth, md: `${width}px` }}
            h="auto"
            maxW="100%"
        >
            <NextImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                }}
                priority
            />
        </Image>
    )
}

