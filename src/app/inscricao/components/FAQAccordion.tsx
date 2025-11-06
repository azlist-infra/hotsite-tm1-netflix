'use client'

import React, { JSX, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface FAQItem {
    question: string
    answer: string
}

interface FAQAccordionProps {
    items: FAQItem[]
}

export const FAQAccordion = ({ items }: FAQAccordionProps): JSX.Element => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <Flex direction="column" gap={2} mt={4}>
            {items.map((item, index) => (
                <Box
                    key={index}
                    bg="gray.900"
                    borderRadius="4px"
                    border="none"
                    overflow="hidden"
                    mb={2}
                >
                    <Box
                        as="button"
                        onClick={() => toggleItem(index)}
                        bg={openIndex === index ? '#B20710' : '#E50914'}
                        color="white"
                        py={4}
                        px={5}
                        fontWeight="bold"
                        fontSize="14px"
                        w="100%"
                        textAlign="left"
                        _hover={{ bg: '#B20710' }}
                        transition="background-color 0.2s"
                    >
                        <Flex justify="space-between" align="center">
                            <Text flex={1} pr={2}>{item.question}</Text>
                            <Text fontSize="18px" fontWeight="bold">
                                {openIndex === index ? '−' : '+'}
                            </Text>
                        </Flex>
                    </Box>
                    {openIndex === index && (
                        <Box
                            py={4}
                            px={5}
                            color="gray.300"
                            fontSize="14px"
                            lineHeight="1.5"
                            bg="gray.800"
                        >
                            {item.answer}
                        </Box>
                    )}
                </Box>
            ))}
        </Flex>
    )
}

