// Schemas de validação Zod para Pax Netflix

import { z } from 'zod'
import { 
    TRANSPORTE_OPTIONS, 
    RESTRICAO_ALIMENTAR_OPTIONS, 
    TAMANHO_CAMISETA_OPTIONS 
} from './pax-netflix.types'

/**
 * Schema para validação de email
 */
export const emailSchema = z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')

/**
 * Schema para validação de telefone
 */
export const phoneSchema = z.string()
    .min(8, 'Telefone deve ter no mínimo 8 dígitos')
    .max(15, 'Telefone deve ter no máximo 15 dígitos')

/**
 * Schema para validação de CPF (opcional)
 */
export const cpfSchema = z.string()
    .regex(/^\d{11}$/, 'CPF deve conter 11 dígitos')
    .optional()
    .or(z.literal(''))

/**
 * Schema para respostas adicionais (questionário)
 */
export const answersDataSchema = z.object({
    transporte: z.array(
        z.enum([
            TRANSPORTE_OPTIONS.AEREO,
            TRANSPORTE_OPTIONS.ONIBUS_FORA_RJ,
            TRANSPORTE_OPTIONS.ONIBUS_RJ,
            TRANSPORTE_OPTIONS.METRO,
            TRANSPORTE_OPTIONS.BRT,
            TRANSPORTE_OPTIONS.VEICULO_APLICATIVO,
            TRANSPORTE_OPTIONS.VEICULO_PARTICULAR,
        ])
    ).min(1, 'Selecione pelo menos um meio de transporte'),
    
    restricaoAlimentar: z.enum([
        RESTRICAO_ALIMENTAR_OPTIONS.NAO,
        RESTRICAO_ALIMENTAR_OPTIONS.VEGETARIANO,
        RESTRICAO_ALIMENTAR_OPTIONS.VEGANO,
        RESTRICAO_ALIMENTAR_OPTIONS.INTOLERANTE,
    ]),
    
    tamanhoCamiseta: z.enum([
        TAMANHO_CAMISETA_OPTIONS.PP,
        TAMANHO_CAMISETA_OPTIONS.P,
        TAMANHO_CAMISETA_OPTIONS.M,
        TAMANHO_CAMISETA_OPTIONS.G,
        TAMANHO_CAMISETA_OPTIONS.GG,
        TAMANHO_CAMISETA_OPTIONS.XG3,
        TAMANHO_CAMISETA_OPTIONS.XG4,
        TAMANHO_CAMISETA_OPTIONS.XG5,
    ]),
})

/**
 * Schema para criação de Pax Netflix
 */
export const createPaxNetflixSchema = z.object({
    Name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    
    Email: emailSchema,
    
    Phone: phoneSchema,
    
    CompanyName: z.string()
        .min(2, 'Nome da empresa deve ter no mínimo 2 caracteres')
        .max(100, 'Nome da empresa deve ter no máximo 100 caracteres'),
    
    SearchKey: z.string()
        .min(1, 'SearchKey é obrigatório'),
    
    Cpf: cpfSchema,
    
    answersData: answersDataSchema.optional(),
})

/**
 * Schema para buscar Pax por email
 */
export const getPaxByEmailSchema = z.object({
    email: emailSchema,
})

// Tipos inferidos dos schemas
export type CreatePaxNetflixInput = z.infer<typeof createPaxNetflixSchema>
export type GetPaxByEmailInput = z.infer<typeof getPaxByEmailSchema>
export type AnswersDataInput = z.infer<typeof answersDataSchema>

