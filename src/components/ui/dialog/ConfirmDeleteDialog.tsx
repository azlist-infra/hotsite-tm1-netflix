// Dialog genérico de confirmação reutilizável

'use client'

import { Box, Button, Dialog, Text } from '@chakra-ui/react'

interface ConfirmDeleteDialogProps {
    /** Controla se o dialog está aberto */
    open: boolean
    /** Callback quando o estado de abertura muda */
    onOpenChange: (details: { open: boolean }) => void
    /** Título do dialog */
    title?: string
    /** Mensagem principal do dialog */
    message: string | React.ReactNode
    /** Texto adicional/descrição (opcional) */
    messageSecondary?: string | React.ReactNode
    /** Texto do botão de confirmação */
    confirmText?: string
    /** Texto do botão de cancelar */
    cancelText?: string
    /** Função executada ao confirmar */
    onConfirm: () => void | Promise<void>
    /** Estado de loading durante a ação */
    isLoading?: boolean
    /** Texto durante loading */
    loadingText?: string
    /** Cor do botão de confirmação */
    colorPalette?: 'red' | 'blue' | 'green' | 'orange'
    /** Tamanho do dialog */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function ConfirmDeleteDialog({
    open,
    onOpenChange,
    title = 'Confirmar Ação',
    message,
    messageSecondary,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    isLoading = false,
    loadingText = 'Processando...',
    colorPalette = 'red',
    size = 'md',
}: ConfirmDeleteDialogProps) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={onOpenChange}
            size={size}
            role="alertdialog"
        >
            <Dialog.Backdrop />

            <Dialog.Positioner>
                <Dialog.Content>

                    <Dialog.Header>
                        <Dialog.Title>{title}</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        {typeof message === 'string' ? (
                            <Text mt={2} fontSize="md" color="gray.800" textAlign="center">
                                {message}
                            </Text>
                        ) : (
                            <Box mt={0} fontSize="md" color="gray.800" textAlign="center">
                                {message}
                            </Box>
                        )}

                        {messageSecondary && (
                            typeof messageSecondary === 'string' ? (
                                <Text mt={2} fontSize="md" color="gray.600" textAlign="center">
                                    {messageSecondary}
                                </Text>
                            ) : (
                                <Box mt={2} fontSize="md" color="gray.600" textAlign="center">
                                    {messageSecondary}
                                </Box>
                            )
                        )}
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline" disabled={isLoading}>
                                {cancelText}
                            </Button>
                        </Dialog.ActionTrigger>
                        <Button
                            colorPalette={colorPalette}
                            onClick={onConfirm}
                            loading={isLoading}
                            loadingText={loadingText}
                        >
                            {confirmText}
                        </Button>
                    </Dialog.Footer>

                    <Dialog.CloseTrigger />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}

