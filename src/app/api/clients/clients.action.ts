'use server'

// Server Actions para clientes
// Executa no servidor, requer permissões de admin

import { revalidatePath } from 'next/cache'
import { serverApi, ServerApiError } from '@/lib/api/server-api'
import API_CONFIG from '@/lib/api/api-config'
import type {
    Client,
    CreateClientDto,
    UpdateClientDto,
    ClientActionResponse,
    ListClientsResponse,
    GetClientResponse,
    CreateClientResponse,
    UpdateClientResponse,
    DeleteClientResponse,
} from './clients.types'

/**
 * Lista todos os clientes
 * Requer: Admin
 */
export async function getClientsAction(): Promise<ClientActionResponse<Client[]>> {
    try {
        const response = await serverApi.get<ListClientsResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BASE,
            { requireAuth: true }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao buscar clientes',
            }
        }

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        console.error('Get clients error:', error)

        if (error instanceof ServerApiError) {
            const apiError = error.data

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0]

                const errorMessages: Record<string, string> = {
                    'invalid_unauthorized': 'Autenticação inválida',
                    'invalid_forbidden': 'Acesso negado. Apenas administradores podem listar clientes',
                }

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao buscar clientes',
                }
            }

            return {
                success: false,
                error: error.message || 'Erro ao buscar clientes',
            }
        }

        return {
            success: false,
            error: 'Erro ao conectar com o servidor',
        }
    }
}

/**
 * Busca um cliente por ID
 * Requer: Admin
 */
export async function getClientByIdAction(id: string): Promise<ClientActionResponse<Client>> {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID do cliente é obrigatório',
            }
        }

        const response = await serverApi.get<GetClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BY_ID(id),
            { requireAuth: true }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Cliente não encontrado',
            }
        }

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        console.error('Get client by ID error:', error)

        if (error instanceof ServerApiError) {
            const apiError = error.data

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0]

                const errorMessages: Record<string, string> = {
                    'invalid_not_found': 'Cliente não encontrado',
                    'invalid_forbidden': 'Acesso negado',
                }

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao buscar cliente',
                }
            }

            return {
                success: false,
                error: error.message || 'Erro ao buscar cliente',
            }
        }

        return {
            success: false,
            error: 'Erro ao buscar cliente',
        }
    }
}

/**
 * Cria um novo cliente
 * Requer: Admin
 */
export async function createClientAction(
    data: CreateClientDto
): Promise<ClientActionResponse<Client>> {
    try {
        const response = await serverApi.post<CreateClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BASE,
            {
                body: data,
                requireAuth: true,
            }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao criar cliente',
            }
        }

        // Revalida as páginas de clientes
        revalidatePath('/app/clients')

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        console.error('Create client error:', error)

        if (error instanceof ServerApiError) {
            const apiError = error.data

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0]

                const errorMessages: Record<string, string> = {
                    'invalid_name_required': 'Nome é obrigatório',
                    'invalid_email_format': 'Formato de email inválido',
                    'invalid_email_duplicate': 'Este email já está em uso',
                    'invalid_phone_format': 'Formato de telefone inválido',
                    'invalid_forbidden': 'Acesso negado. Apenas administradores podem criar clientes',
                }

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao criar cliente',
                }
            }

            return {
                success: false,
                error: error.message || 'Erro ao criar cliente',
            }
        }

        return {
            success: false,
            error: 'Erro ao criar cliente',
        }
    }
}

/**
 * Atualiza um cliente existente
 * Requer: Admin
 */
export async function updateClientAction(
    id: string,
    data: UpdateClientDto
): Promise<ClientActionResponse<Client>> {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID do cliente é obrigatório',
            }
        }

        const response = await serverApi.put<UpdateClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BY_ID(id),
            {
                body: data,
                requireAuth: true,
            }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao atualizar cliente',
            }
        }

        // Revalida as páginas de clientes
        revalidatePath('/app/admin/clients')
        revalidatePath(`/app/admin/clients/${id}`)

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        console.error('Update client error:', error)

        if (error instanceof ServerApiError) {
            const apiError = error.data

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0]

                const errorMessages: Record<string, string> = {
                    'invalid_email_format': 'Formato de email inválido',
                    'invalid_email_duplicate': 'Este email já está em uso',
                    'invalid_phone_format': 'Formato de telefone inválido',
                    'invalid_not_found': 'Cliente não encontrado',
                    'invalid_forbidden': 'Acesso negado',
                }

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao atualizar cliente',
                }
            }

            return {
                success: false,
                error: error.message || 'Erro ao atualizar cliente',
            }
        }

        return {
            success: false,
            error: 'Erro ao atualizar cliente',
        }
    }
}

/**
 * Remove um cliente (soft delete)
 * Requer: Admin
 */
export async function deleteClientAction(id: string): Promise<ClientActionResponse<Client>> {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID do cliente é obrigatório',
            }
        }

        const response = await serverApi.delete<DeleteClientResponse>(
            API_CONFIG.ENDPOINTS.CLIENTS.BY_ID(id),
            { requireAuth: true }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao remover cliente',
            }
        }

        // Revalida as páginas de clientes
        revalidatePath('/app/admin/clients')

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        console.error('Delete client error:', error)

        if (error instanceof ServerApiError) {
            const apiError = error.data

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0]

                const errorMessages: Record<string, string> = {
                    'invalid_not_found': 'Cliente não encontrado',
                    'invalid_client_has_dependencies': 'Cliente possui usuários ou eventos ativos e não pode ser removido',
                    'invalid_forbidden': 'Acesso negado. Apenas administradores podem remover clientes',
                }

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao remover cliente',
                }
            }

            return {
                success: false,
                error: error.message || 'Erro ao remover cliente',
            }
        }

        return {
            success: false,
            error: 'Erro ao remover cliente',
        }
    }
}

