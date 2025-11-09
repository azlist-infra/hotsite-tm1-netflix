'use client'

import { Dialog, Flex, Text, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NetflixModalProps {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showCloseButton?: boolean
}

/**
 * Modal Netflix personalizado
 * 
 * @param open - Controla se o modal está aberto
 * @param onClose - Função para fechar o modal
 * @param title - Título opcional do modal
 * @param children - Conteúdo do modal
 * @param size - Tamanho do modal (default: 'lg')
 * @param showCloseButton - Mostra botão de fechar (default: true)
 */
export const NetflixModal = ({
    open,
    onClose,
    title,
    children,
    size = 'lg',
    showCloseButton = true,
}: NetflixModalProps) => {

    const sizeMap = {
        sm: { base: '90%', md: '400px' },
        md: { base: '90%', md: '778px' }, // Modal padrão de alerta
        lg: { base: '90%', md: '900px' },
        xl: { base: '90%', md: '1000px' },
    }

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(details) => !details.open && onClose()}
            placement="center"
            motionPreset="slide-in-bottom"
        >
            <Dialog.Backdrop
                bg="rgba(0, 0, 0, 0.85)"
                backdropFilter="blur(4px)"
            />

            <Dialog.Positioner>
                <Dialog.Content
                    bg="black"
                    border="2px solid"
                    borderColor="#E50914"
                    borderRadius="20px"
                    w={sizeMap[size]}
                    maxW="90vw"
                    p={{ base: 6, md: 12 }}
                >
                    {showCloseButton && (
                        <Dialog.CloseTrigger
                            position="absolute"
                            top="16px"
                            right="16px"
                            color="white"
                            _hover={{ color: '#E50914' }}
                            fontSize="24px"
                        />
                    )}

                    <Dialog.Body p={0}>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            gap={{ base: 6, md: 8 }}
                        >
                            {title && (
                                <Text
                                    textStyle="brand.modal.title"
                                    textAlign="center"
                                    color="white"
                                    maxW="90%"
                                >
                                    {title}
                                </Text>
                            )}

                            {children}
                        </Flex>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}

/**
 * Botão de fechar padrão Netflix
 */
export const NetflixModalCloseButton = ({
    onClose
}: {
    onClose: () => void
}) => {
    return (
        <Button
            onClick={onClose}
            bg="#E50914"
            color="white"
            _hover={{ bg: '#B20710' }}
            _active={{ bg: '#8B0509' }}
            borderRadius="8px"
            px={{ base: 8, md: 12 }}
            py={{ base: 6, md: 7 }}
            fontSize={{ base: '20px', md: '29px' }}
            fontWeight="500"
            minW={{ base: '200px', md: '274px' }}
            h={{ base: '56px', md: '66px' }}
        >
            Fechar
        </Button>
    )
}
