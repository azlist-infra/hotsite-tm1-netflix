import React, { JSX } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

interface TitleBaseProps {
  title: string
}

export const TitleBase = ({ title }: TitleBaseProps): JSX.Element => {
  return (
    <Flex
      align="center"
      justify="flex-start"
      gap={{ base: 4, sm: 4, md: 6 }}
      borderBottom="1px solid"
      borderColor="white"
      pb={{ base: 4, sm: 6, md: 8 }}
      mb={{ base: 4, sm: 6, md: 8 }}
      mt={{ base: 6, sm: 6, md: 12 }}
      w="100%"
    >
      <Box
        as="span"
        display="inline-block"
        flexShrink={0}
        verticalAlign="middle"
        lineHeight={0}
        w={{ base: '24px', sm: '28px', md: '32px' }}
        h={{ base: '18px', sm: '18px', md: '22px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 32 21"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0 0.000881195L31.2133 9.65688L0 20.4355Z"
            fill="#E50914"
          />
        </svg>
      </Box>
      <Heading
        fontFamily="custom"
        color="white"
        fontSize={{ base: '22px', sm: '28px', md: '32px' }}
        fontWeight="400"
        letterSpacing="1px"
      >
        {title}
      </Heading>
    </Flex>
  )
}

