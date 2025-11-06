// Componente para botão de ação de deletar

'use client'

import { useState } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { Icons } from '@/components/ui/icon'
import { ConfirmDeleteDialog } from '../dialog/ConfirmDeleteDialog'

interface ActionDeleteButtonProps extends Omit<ButtonProps, 'onClick'> {
    /** Função executada ao confirmar exclusão */
    onDelete: () => void | Promise<void>
    /** Texto do botão */
    buttonText?: string
    /** Se true, não mostra modal de confirmação */
    skipConfirmation?: boolean
    /** Estado de loading */
    isLoading?: boolean
    /** Título do modal de confirmação */
    confirmTitle?: string
    /** Mensagem do modal */
    confirmMessage?: string | React.ReactNode
    /** Descrição adicional do modal */
    confirmMessageSecondary?: string | React.ReactNode
    /** Texto do botão de confirmar no modal */
    confirmButtonText?: string
}

export function ActionDeleteButton({ 
    onDelete,
    buttonText = 'Excluir',
    skipConfirmation = false,
    isLoading = false,
    confirmTitle = '',
    confirmMessage = 'Tem certeza que deseja excluir este item?',
    confirmMessageSecondary = '',
    confirmButtonText = 'Confirmar Exclusão',
    size = 'sm',
    ...props 
}: ActionDeleteButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleClick = () => {
        if (skipConfirmation) {
            handleDelete()
        } else {
            setIsOpen(true)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await onDelete()
            setIsOpen(false)
        } catch (error) {
            console.error('Error deleting:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Button
                onClick={handleClick}
                colorPalette="red"
                variant="outline"
                size={size}
                loading={isLoading || isDeleting}
                {...props}
            >
                <Icons.Delete /> {buttonText}
            </Button>

            {/* Modal de Confirmação */}
            {!skipConfirmation && (
                <ConfirmDeleteDialog
                    open={isOpen}
                    onOpenChange={(e) => setIsOpen(e.open)}
                    title={confirmTitle}
                    message={confirmMessage}
                    messageSecondary={confirmMessageSecondary}
                    confirmText={confirmButtonText}
                    cancelText="Cancelar"
                    onConfirm={handleDelete}
                    isLoading={isDeleting}
                    loadingText="Excluindo..."
                    colorPalette="red"
                />
            )}
        </>
    )
}

