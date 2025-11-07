// Service para chamadas de API de Pax Netflix no CLIENT-SIDE
// Use com TanStack Query quando precisar de cache e controle avançado

import API_CONFIG from '@/lib/api/api-config'
import type {
    GetPaxNetflixResponse,
    CreatePaxNetflixDto,
    CreatePaxNetflixResponse,
} from './pax-netflix.types'

/**
 * Cliente HTTP customizado para API Netflix
 * Usa o endpoint e token específicos da Netflix
 */
class NetflixApiClient {
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
        })

        const data = await response.json()

        if (!response.ok) {
            throw new NetflixApiError(
                data.error || 'Erro na requisição',
                response.status,
                data
            )
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

/**
 * Classe de erro customizada para API Netflix
 */
export class NetflixApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public data?: unknown
    ) {
        super(message)
        this.name = 'NetflixApiError'
    }
}

// Instância do cliente
const netflixClient = new NetflixApiClient()

/**
 * Service de Pax Netflix
 */
export const paxNetflixService = {
    /**
     * GET /api/pax/netflix/:email
     * Busca um Pax por email
     */
    getByEmail: async (email: string): Promise<GetPaxNetflixResponse> => {
        return netflixClient.get<GetPaxNetflixResponse>(
            API_CONFIG.ENDPOINTS.PAX_NETFLIX.BY_EMAIL(email)
        )
    },

    /**
     * POST /api/pax/netflix
     * Cria um novo Pax Netflix
     */
    create: async (data: CreatePaxNetflixDto): Promise<CreatePaxNetflixResponse> => {
        return netflixClient.post<CreatePaxNetflixResponse>(
            API_CONFIG.ENDPOINTS.PAX_NETFLIX.BASE,
            data
        )
    },
}

