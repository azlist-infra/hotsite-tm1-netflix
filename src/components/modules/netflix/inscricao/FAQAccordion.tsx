'use client'

import React, { JSX } from 'react'
import { Accordion, Box, Text } from '@chakra-ui/react'
import type { FAQItem } from './faq.tsx'

interface FAQAccordionProps {
    items: FAQItem[]
}

const ArrowDownIcon = () => {
    return (
        <Box
            transition="transform 0.2s"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="34px"
            h="17px"
            transformOrigin="center center"
            _open={{ 
                transform: 'rotate(180deg)',
            }}
        >
            <svg 
                width="34" 
                height="17" 
                viewBox="0 0 34 17" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M33.3453 0.000495911L16.672 16.6738L0 0.000495911H33.3453Z" 
                    fill="white"
                />
            </svg>
        </Box>
    )
}

export const FAQAccordion = ({ items }: FAQAccordionProps): JSX.Element => {
    return (
        <Accordion.Root 
            collapsible 
            variant="plain"
            mt={0}
            
        >
            {items.map((item, index) => (
                <Accordion.Item 
                    key={index} 
                    value={`item-${index}`}
                    bg="transparent"
                    mb={{ base: 2, sm: 4, md: 6 }}
                    borderRadius="20px"
                    overflow="hidden"
                >
                    <Accordion.ItemTrigger
                        bg="primary"
                        color="white"
                        h="85px"
                        minH="85px"
                        px={5}
                        _hover={{ bg: 'brand.hover', cursor: 'pointer' }}
                        _open={{ bg: 'primary' }}
                        transition="background-color 0.2s"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box 
                            flex={1}
                            pr={4}
                        >
                            {typeof item.question === 'string' ? (
                                <Text 
                                    textStyle="brand.text.xlbold" 
                                    color="white"
                                    textAlign="left"
                                >
                                    {item.question}
                                </Text>
                            ) : (
                                <Box
                                    textStyle="brand.text.xlbold" 
                                    color="white"
                                    textAlign="left"
                                >
                                    {item.question}
                                </Box>
                            )}
                        </Box>
                        <Accordion.ItemIndicator>
                            <ArrowDownIcon />
                        </Accordion.ItemIndicator>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent
                        bg="primary"
                        color="white"
                    >
                        <Accordion.ItemBody
                            py={4}
                            px={5}
                        >
                            {typeof item.answer === 'string' ? (
                                <Text 
                                    textStyle="brand.text.xl" 
                                    color="white"
                                >
                                    {item.answer}
                                </Text>
                            ) : (
                                <Box
                                    textStyle="brand.text.xl" 
                                    color="white"
                                >
                                    {item.answer}
                                </Box>
                            )}
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}

