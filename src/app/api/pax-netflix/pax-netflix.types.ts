// Tipos para o módulo de Pax Netflix

import type { 
    ApiResponse,
    ActionResponse
} from '@/app/api/_shared'

// Re-exporta tipos compartilhados
export type { ActionResponse, ApiError } from '@/app/api/_shared'

// ==========================================
// ENUMS E CONSTANTES
// ==========================================

export const TRANSPORTE_OPTIONS = {
    AEREO: 'Aéreo',
    ONIBUS_FORA_RJ: 'Ônibus (colaborador de fora do RJ)',
    ONIBUS_RJ: 'Ônibus (colaborador do RJ)',
    METRO: 'Metrô',
    BRT: 'BRT',
    VEICULO_APLICATIVO: 'Veículo de aplicativo',
    VEICULO_PARTICULAR: 'Veículo particular',
} as const

export type TransporteOption = typeof TRANSPORTE_OPTIONS[keyof typeof TRANSPORTE_OPTIONS]

export const RESTRICAO_ALIMENTAR_OPTIONS = {
    NAO: 'Não, como de tudo',
    VEGETARIANO: 'Sim, sou vegetariano',
    VEGANO: 'Sim, sou vegano',
    INTOLERANTE: 'Sim, sou intolerante a glúten, lactose ou similares',
} as const

export type RestricaoAlimentarOption = typeof RESTRICAO_ALIMENTAR_OPTIONS[keyof typeof RESTRICAO_ALIMENTAR_OPTIONS]

export const TAMANHO_CAMISETA_OPTIONS = {
    PP: 'PP',
    P: 'P',
    M: 'M',
    G: 'G',
    GG: 'GG',
    XG3: '3G',
    XG4: '4G',
    XG5: '5G',
} as const

export type TamanhoCamisetaOption = typeof TAMANHO_CAMISETA_OPTIONS[keyof typeof TAMANHO_CAMISETA_OPTIONS]

export const EVENT_TYPE = {
    BASE: 'base',
    CONFIRMED: 'confirmed',
} as const

export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE]

// ==========================================
// INTERFACES PRINCIPAIS
// ==========================================

/**
 * Interface do ticket do evento
 */
export interface EventTicketInfo {
    Name: string
    id: number
    Color: string
}

/**
 * Interface do evento
 */
export interface EventInfo {
    Name: string
    id: number
}

/**
 * Interface completa do ticket do evento
 */
export interface EventTicket {
    id: number
    ticket: EventTicketInfo
    event: EventInfo
}

/**
 * Interface de respostas adicionais (questionário)
 */
export interface AnswersData {
    transporte: string[]
    restricaoAlimentar: string
    tamanhoCamiseta: string
}

/**
 * Interface completa do Pax Netflix
 * Baseada na resposta da API
 */
export interface PaxNetflix {
    id: number
    Name: string
    FkEventTicketList: number
    FkEventUser: number
    Entered: boolean
    DateEntered: string // ISO date
    IsRemoved: boolean
    Cpf: string | null
    Phone: string | null
    Email: string
    CompanyName: string
    CityState: string | null
    JobTitle: string | null
    Address: string | null
    SearchKey: string
    eventTicket: EventTicket
}

/**
 * Dados do Pax retornados pela API
 */
export interface PaxData extends PaxNetflix {
    // Herda todos os campos de PaxNetflix
}

/**
 * Resposta completa do GET
 */
export interface PaxNetflixFullResponse {
    event: EventType
    paxData: PaxData
    answersData?: AnswersData
    id: number
    Name: string
    FkEventTicketList: number
    FkEventUser: number
    Entered: boolean
    DateEntered: string
    IsRemoved: boolean
    Cpf: string | null
    Phone: string | null
    Email: string
    CompanyName: string
    CityState: string | null
    JobTitle: string | null
    Address: string | null
    SearchKey: string
    eventTicket: EventTicket
    eventTarget?: string
    eventTargetId?: number
}

// ==========================================
// DTOs (Data Transfer Objects)
// ==========================================

/**
 * Dados para criar/inserir um novo Pax Netflix
 * POST /api/pax/netflix
 */
export interface CreatePaxNetflixDto {
    Name: string
    Email: string
    Phone: string
    CompanyName: string
    SearchKey: string
    Cpf?: string
    answersData?: AnswersData
}

// ==========================================
// RESPOSTAS DA API
// ==========================================

/**
 * Resposta de buscar por email
 * GET /api/pax/netflix/:email
 */
export type GetPaxNetflixResponse = PaxNetflixFullResponse

/**
 * Resposta de criar
 * POST /api/pax/netflix
 */
export interface CreatePaxNetflixResponse {
    id: number
    Name: string
    Email: string
    Phone: string
    CompanyName: string
    SearchKey: string
    Cpf?: string
    FkEventTicketList: number
    FkEventUser: number
    answersData?: AnswersData
}

// ==========================================
// RESPONSE DAS SERVER ACTIONS
// ==========================================

/**
 * Response padrão das Server Actions de Pax Netflix
 * Usa o ActionResponse compartilhado
 */
export type PaxNetflixActionResponse<T = unknown> = ActionResponse<T>

// ==========================================
// TYPES DE ERRO
// ==========================================

/**
 * Tipos de erro retornados pela API
 */
export const PAX_NETFLIX_ERROR = {
    PAX_NOT_FOUND: 'pax_not_found',
    INVALID_CPF: 'invalid_cpf',
    INVALID_NAME: 'invalid_name',
    EMAIL_ALREADY_IN_USE: 'email_already_in_use',
    MISSING_EMAIL: 'missing_email',
    NOT_FOUND: 'not_found',
} as const

export type PaxNetflixError = typeof PAX_NETFLIX_ERROR[keyof typeof PAX_NETFLIX_ERROR]

/**
 * Resposta de erro da API
 */
export interface PaxNetflixErrorResponse {
    error: string
}

