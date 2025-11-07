'use server'

// Server Actions para Pax Netflix
// Executa no servidor, mais seguro

import { revalidatePath } from 'next/cache'
import { handleActionError } from '@/app/api/_shared'
import API_CONFIG from '@/lib/api/api-config'
import type {
    GetPaxNetflixResponse,
    CreatePaxNetflixDto,
    CreatePaxNetflixResponse,
    PaxNetflixActionResponse,
} from './pax-netflix.types'

/**
 * Cliente customizado para a API Netflix (server-side)
 */
class NetflixServerApiClient {
    private baseURL: string
    private token: string

    constructor() {
        this.baseURL = API_CONFIG.NETFLIX.BASE_URL
        this.token = API_CONFIG.NETFLIX.TOKEN
    }

    private async request<T>(
        method: string,
        endpoint: string,
        body?: unknown
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: body ? JSON.stringify(body) : undefined,
            cache: 'no-store',
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição')
        }

        return data
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>('GET', endpoint)
    }

    async post<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>('POST', endpoint, body)
    }
}

const netflixServerApi = new NetflixServerApiClient()

/**
 * Busca um Pax Netflix por email
 * GET /api/pax/netflix/:email
 */
export async function getPaxByEmailAction(
    email: string
): Promise<PaxNetflixActionResponse<GetPaxNetflixResponse>> {
    try {
        if (!email) {
            return {
                success: false,
                error: 'E-mail é obrigatório',
            }
        }

        // Valida formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: 'Formato de e-mail inválido',
            }
        }

        const response = await netflixServerApi.get<GetPaxNetflixResponse>(
            API_CONFIG.ENDPOINTS.PAX_NETFLIX.BY_EMAIL(email)
        )

        return {
            success: true,
            data: response,
        }
    } catch (error) {
        // Mapeia erros específicos da API Netflix
        if (error instanceof Error) {
            const errorMessage = error.message.toLowerCase()
            
            if (errorMessage.includes('pax_not_found')) {
                return {
                    success: false,
                    error: 'E-mail não encontrado. Verifique se você digitou corretamente o e-mail do convite.',
                }
            }
            
            if (errorMessage.includes('invalid_cpf')) {
                return {
                    success: false,
                    error: 'CPF inválido',
                }
            }
        }

        return handleActionError(error, 'Erro ao buscar informações do participante')
    }
}

/**
 * Cria um novo Pax Netflix
 * POST /api/pax/netflix
 */
export async function createPaxNetflixAction(
    data: CreatePaxNetflixDto
): Promise<PaxNetflixActionResponse<CreatePaxNetflixResponse>> {
    try {
        // Validações básicas
        if (!data.Name) {
            return {
                success: false,
                error: 'Nome é obrigatório',
            }
        }

        if (!data.Email) {
            return {
                success: false,
                error: 'E-mail é obrigatório',
            }
        }

        if (!data.Phone) {
            return {
                success: false,
                error: 'Telefone é obrigatório',
            }
        }

        if (!data.CompanyName) {
            return {
                success: false,
                error: 'Nome da empresa é obrigatório',
            }
        }

        if (!data.SearchKey) {
            return {
                success: false,
                error: 'SearchKey é obrigatório',
            }
        }

        const response = await netflixServerApi.post<CreatePaxNetflixResponse>(
            API_CONFIG.ENDPOINTS.PAX_NETFLIX.BASE,
            data
        )

        // Revalida as páginas relacionadas
        revalidatePath('/')
        revalidatePath('/inscricao')

        return {
            success: true,
            data: response,
        }
    } catch (error) {
        // Mapeia erros específicos da API Netflix
        if (error instanceof Error) {
            const errorMessage = error.message.toLowerCase()
            
            if (errorMessage.includes('email_already_in_use')) {
                return {
                    success: false,
                    error: 'Este e-mail já está cadastrado',
                }
            }
            
            if (errorMessage.includes('invalid_name')) {
                return {
                    success: false,
                    error: 'Nome inválido',
                }
            }
            
            if (errorMessage.includes('missing_email')) {
                return {
                    success: false,
                    error: 'E-mail é obrigatório',
                }
            }
        }

        return handleActionError(error, 'Erro ao criar participante')
    }
}

