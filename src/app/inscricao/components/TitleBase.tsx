import React, { JSX } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

interface TitleBaseProps {
  title: string
}

export const TitleBase = ({ title }: TitleBaseProps): JSX.Element => {
  return (
    <Flex align="center" gap={2}>
      <Box
        as="span"
        display="inline-block"
        flexShrink={0}
        verticalAlign="middle"
        lineHeight={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31.213"
          height="20.435"
          viewBox="0 0 32 21"
          fill="none"
        >
          <path
            d="M0 0.000881195V20.4355H6.73733V18.1902H12.1267V15.9449H18.1893V13.4742H24.7013V11.6782H31.2133V9.65688L0 0.000881195Z"
            fill="#E50914"
          />
        </svg>
      </Box>
      <Heading
        fontSize="18px"
        fontWeight="bold"
        color="#E50914"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        {title}
      </Heading>
    </Flex>
  )
}

