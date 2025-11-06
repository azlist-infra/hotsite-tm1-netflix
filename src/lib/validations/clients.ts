// Schemas de validação Zod para FORMULÁRIOS de clientes
// Usados pelos componentes React, não pelas APIs

import { z } from 'zod'
import { commonValidations, returnSchema, createSearchSchema } from './common'

/**
 * Schema para formulário de criação de cliente
 */
export const createClientFormSchema = z.object({
    name: returnSchema(commonValidations.companyName, 'required', 'Nome da empresa é obrigatório'),
    email: returnSchema(commonValidations.email, 'required', 'Email é obrigatório'),
    phone: returnSchema(commonValidations.phone, 'optional'),
})

/**
 * Schema para formulário de edição de cliente
 */
export const updateClientFormSchema = z.object({
    name: returnSchema(commonValidations.companyName, 'required', 'Nome da empresa é obrigatório'),
    email: returnSchema(commonValidations.email, 'required', 'Email é obrigatório'),
    phone: returnSchema(commonValidations.phone, 'optional'),
    isActive: returnSchema(commonValidations.boolean, 'optional'),
})

/**
 * Schema para filtros de clientes
 */
export const clientFiltersSchema = createSearchSchema({
    isActive: z.boolean().optional(),
})

// ============================================
// TIPOS INFERIDOS
// ============================================
export type CreateClientFormInput = z.infer<typeof createClientFormSchema>
export type UpdateClientFormInput = z.infer<typeof updateClientFormSchema>
export type ClientFiltersInput = z.infer<typeof clientFiltersSchema>

