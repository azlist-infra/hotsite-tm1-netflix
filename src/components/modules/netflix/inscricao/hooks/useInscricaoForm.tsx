'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPaxNetflixAction, type GetPaxNetflixResponse } from '@/app/api/pax-netflix'
import { useModal } from '@/contexts/ModalContext'
import { Text } from '@chakra-ui/react'

// Schema de validação
const inscriptionSchema = z.object({
    nome: z.string()
        .min(1, 'Nome completo é obrigatório')
        .min(3, 'Nome deve ter no mínimo 3 caracteres'),

    empresa: z.string()
        .min(1, 'Empresa é obrigatória'),

    telefone: z.string()
        .min(1, 'Telefone é obrigatório')
        .min(11, 'Telefone deve ter no mínimo 11 dígitos'),

    privacidade: z.boolean()
        .refine((val) => val === true, {
            message: 'Você deve aceitar a política de privacidade'
        })
})

type InscriptionFormData = z.infer<typeof inscriptionSchema>

/**
 * Hook para gerenciar o formulário de inscrição
 * 
 * Encapsula toda a lógica de:
 * - Carregamento de dados do sessionStorage
 * - Validação do formulário
 * - Submissão para a API
 * - Gerenciamento de estados de sucesso/erro
 */
export function useInscricaoForm() {
    const router = useRouter()
    const [paxData, setPaxData] = useState<GetPaxNetflixResponse | null>(null)
    const [error, setError] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    const { showModal } = useModal()

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<InscriptionFormData>({
        resolver: zodResolver(inscriptionSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
        defaultValues: {
            nome: '',
            empresa: '',
            telefone: '',
            privacidade: false
        }
    })

    const isLoading = isSubmitting

    // Carrega dados do participante do sessionStorage
    useEffect(() => {
        const storedData = sessionStorage.getItem('paxData')

        if (!storedData) {
            // Se não há dados, redireciona para home
            router.push('/')
            return
        }

        try {
            const parsed = JSON.parse(storedData) as GetPaxNetflixResponse

            setPaxData(parsed)
        } catch (err) {
            console.error('Erro ao carregar dados:', err)
            router.push('/')
        }
    }, [router])

    // Handler do submit do formulário
    const onSubmit = async (data: InscriptionFormData) => {
        // Busca o email em múltiplos lugares possíveis da resposta
        const email = paxData?.Email || paxData?.paxData?.Email

        if (!email) {
            setError('Email não encontrado. Por favor, volte e tente novamente.')
            console.error('Dados disponíveis:', paxData)
            return
        }

        try {
            setError('')
            setSuccessMessage('')



            const result = await createPaxNetflixAction({
                Name: data.nome,
                Email: email,
                Phone: data.telefone,
                CompanyName: data.empresa,
                SearchKey: email,
            })


            if (result.success) {
                setSuccessMessage('Inscrição realizada com sucesso! Você receberá um e-mail de confirmação.')

                // Atualiza os dados no sessionStorage com as novas informações
                const updatedPaxData = {
                    ...paxData,
                    event: 'confirmed' as const,
                    paxData: {
                        ...paxData?.paxData,
                        Name: data.nome,
                        Phone: data.telefone,
                        CompanyName: data.empresa,
                        Email: email,
                        SearchKey: email,
                    }
                }

                sessionStorage.setItem('paxData', JSON.stringify(updatedPaxData))
                setPaxData(updatedPaxData)

                // mostra modal de sucesso
                showModal({
                    title: 'Presença confirmada!',
                    message: (
                        <>
                            <Text
                                textStyle="brand.modal.text"
                                textAlign="center"
                                color="white"
                                whiteSpace="pre-line"
                            >
                                Sua inscrição foi concluída com sucesso.
                                <br /><br />
                                Esperamos por você no <Text as="span" fontStyle="italic">Feito Aqui</Text>, nasce no Brasil, viaja pelo mundo.
                            </Text>
                        </>
                    ),
                    btnText: 'Fechar',
                    size: 'md'
                })

                // Scroll para o topo
                //window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                setError(result.error || 'Erro ao realizar inscrição')
            }
        } catch (err) {
            console.error('Erro:', err)
            setError('Erro ao processar inscrição. Tente novamente.')
        }
    }

    // Verifica se já está confirmado
    const isAlreadyConfirmed = paxData?.event === 'confirmed'

    return {
        // Dados
        paxData,

        // Estados
        error,
        successMessage,
        isLoading,
        isAlreadyConfirmed,

        // Form
        control,
        handleSubmit,
        onSubmit,
    }
}


