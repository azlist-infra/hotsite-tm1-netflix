'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getPaxByEmailAction } from '@/app/api/pax-netflix'
import { useModal } from '@/contexts/ModalContext'

/**
 * Schema de validação do email
 */
const emailSchema = z.object({
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido')
})

export type EmailFormData = z.infer<typeof emailSchema>

/**
 * Anima o elemento de help-text com destaque quando houver erro
 */
const highlightHelpText = () => {
    const helpTextElement = document.getElementById('help-text')

    if (helpTextElement) {
        // Remove animação anterior se existir
        helpTextElement.style.animation = 'none'

        // Força reflow
        void helpTextElement.offsetHeight

        // Adiciona animação de pulso/destaque
        helpTextElement.style.animation = 'highlight-pulse 2s ease-in-out'

        // Remove a animação após completar
        setTimeout(() => {
            helpTextElement.style.animation = ''
        }, 2000)
    }
}

/**
 * Adiciona os keyframes da animação no documento
 */
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
    @keyframes highlight-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      10%, 30%, 50%, 70%, 90% {
        transform: scale(1.05);
        opacity: 1;
        filter: brightness(1.5);
      }
      20%, 40%, 60%, 80% {
        transform: scale(1);
        opacity: 0.9;
        filter: brightness(1);
      }
    }
  `
    if (!document.getElementById('help-text-animation')) {
        styleSheet.id = 'help-text-animation'
        document.head.appendChild(styleSheet)
    }
}

/**
 * Hook customizado para gerenciar o formulário de entrada por email na home
 * 
 * Responsabilidades:
 * - Validação do email
 * - Busca do participante na API
 * - Armazenamento dos dados no sessionStorage
 * - Redirecionamento para página de inscrição
 * - Animação de destaque no help-text em caso de erro
 */
export function useHomeForm() {
    const router = useRouter()
    const { showModal } = useModal()
    const [error, setError] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema)
    })

    const onSubmit = async (data: EmailFormData) => {
        try {
            setError('')

            // Busca participante pela API
            const result = await getPaxByEmailAction(data.email)

            if (result.success && result.data) {
                // Salva dados do participante no sessionStorage
                sessionStorage.setItem('paxData', JSON.stringify(result.data))

                // Redireciona para página de inscrição
                router.push('/inscricao')
            } else {
                // Define mensagem de erro
                const errorMessage = result.error || 'Erro ao buscar participante'
                setError(errorMessage)

                // Mostra modal de erro
                showModal({
                    title: 'E-mail não encontrado',
                    message: 'Não encontramos seu e-mail em nossa lista de convidados. Por favor, verifique se digitou corretamente ou entre em contato conosco.',
                    size: 'md'
                })

                // Anima o help-text em caso de erro
                highlightHelpText()
            }
        } catch (err) {
            console.error('Erro:', err)
            setError('Erro ao processar solicitação. Tente novamente.')

            // Mostra modal de erro genérico
            showModal({
                title: 'Erro',
                message: 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
                size: 'md'
            })

            // Anima o help-text em caso de erro
            highlightHelpText()
        }
    }

    return {
        // Form methods
        register,
        handleSubmit,
        onSubmit,

        // States
        isLoading: isSubmitting,
        error,
        fieldError: errors.email?.message,
        hasError: !!errors.email || !!error,
    }
}

