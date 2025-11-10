'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { saveUnsubscribeEmail } from '@/app/api/unsubscribe'
import { useModal } from '@/contexts/ModalContext'

// Schema de validação
const unsubscribeSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
})

type UnsubscribeFormData = z.infer<typeof unsubscribeSchema>

/**
 * Hook para gerenciar o formulário de cancelamento de inscrição
 * 
 * Encapsula toda a lógica de:
 * - Validação do formulário
 * - Submissão para Upstash Redis KV
 * - Gerenciamento de estados
 * - Modal de sucesso/erro
 */
export function useUnsubscribeForm() {
  const [error, setError] = useState<string>('')
  const { showModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<UnsubscribeFormData>({
    resolver: zodResolver(unsubscribeSchema),
    mode: 'onTouched',
  })

  const isLoading = isSubmitting

  // Handler do submit do formulário
  const onSubmit = async (data: UnsubscribeFormData) => {
    try {
      setError('')
      
      //console.log('📧 Email para cancelamento:', data.email)
      
      // Chama a Server Action para salvar no Redis KV
      const result = await saveUnsubscribeEmail(data.email)
      
      if (result.success) {
        //console.log('✅ Cancelamento processado com sucesso')
        
        // Mostra modal de sucesso
        showModal({
          title: 'Removido com Sucesso!',
          message: '',
          btnText: 'Fechar',
          size: 'md'
        })
        
        // Limpa o formulário
        reset()
      } else {
        console.error('❌ Erro ao processar cancelamento:', result.error)
        setError(result.error || 'Erro ao processar cancelamento')
        
        // Mostra modal de erro
        showModal({
          title: 'Erro',
          message: result.error || 'Não foi possível processar o cancelamento. Tente novamente.',
          btnText: 'Fechar',
          size: 'md'
        })
      }
      
    } catch (err) {
      console.error('❌ Erro ao processar cancelamento:', err)
      const errorMessage = 'Erro ao processar cancelamento. Tente novamente.'
      setError(errorMessage)
      
      // Mostra modal de erro
      showModal({
        title: 'Erro',
        message: errorMessage,
        btnText: 'Fechar',
        size: 'md'
      })
    }
  }

  return {
    // Form
    register,
    handleSubmit,
    onSubmit,
    
    // Estados
    isLoading,
    error,
    fieldError: errors.email?.message,
    hasError: !!errors.email,
  }
}

