'use server'

// Utilitários para tratamento de erros consistente

import { ServerApiError } from '@/lib/api/server-api'
import type { ActionResponse, ApiErrorData } from './types'

/**
 * Mapeia códigos de erro comuns para mensagens amigáveis
 */
const commonErrorMessages: Record<string, string> = {
    // Erros de autenticação
    'invalid_credentials': 'Email ou senha incorretos',
    'invalid_inactive_user': 'Sua conta está desativada',
    'credentials_required': 'Email e senha são obrigatórios',
    'invalid_email_format': 'Formato de email inválido',
    'invalid_refresh_token': 'Sessão expirada',
    'user_not_found': 'Usuário não encontrado',
    'user_inactive': 'Usuário inativo',
    
    // Erros de validação
    'validation_error': 'Dados inválidos',
    'required_field': 'Campo obrigatório',
    'invalid_format': 'Formato inválido',
    'duplicate_entry': 'Registro já existe',
    
    // Erros de permissão
    'unauthorized': 'Você não tem permissão para esta ação',
    'forbidden': 'Acesso negado',
    'token_expired': 'Sua sessão expirou. Faça login novamente',
    
    // Erros gerais
    'not_found': 'Registro não encontrado',
    'server_error': 'Erro no servidor',
    'network_error': 'Erro de conexão',
}

/**
 * Formata um erro da API em uma mensagem amigável
 */
export function formatApiError(error: ServerApiError): string {
    const apiError = error.data as ApiErrorData | undefined

    // Se houver erros específicos, usa o primeiro
    if (apiError?.errors && Array.isArray(apiError.errors) && apiError.errors.length > 0) {
        const firstError = apiError.errors[0]
        
        // Retorna mensagem mapeada ou a descrição do erro
        return commonErrorMessages[firstError.code] || firstError.description || error.message
    }

    // Retorna a mensagem da API ou a mensagem do erro
    return apiError?.message || error.message || 'Erro desconhecido'
}

/**
 * Trata erros de forma consistente e retorna ActionResponse
 */
export function handleActionError<T = void>(
    error: unknown,
    defaultMessage: string = 'Erro ao processar requisição'
): ActionResponse<T> {
    console.error('Action error:', error)

    // Erro da API
    if (error instanceof ServerApiError) {
        return {
            success: false,
            error: formatApiError(error),
        }
    }

    // Erro genérico
    if (error instanceof Error) {
        return {
            success: false,
            error: error.message || defaultMessage,
        }
    }

    // Erro desconhecido
    return {
        success: false,
        error: defaultMessage,
    }
}

/**
 * Adiciona mensagens de erro customizadas ao mapa
 */
export function addErrorMessages(messages: Record<string, string>) {
    Object.assign(commonErrorMessages, messages)
}

