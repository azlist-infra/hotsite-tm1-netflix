// Validações Zod reutilizáveis em todo o sistema
// Use estas validações para manter consistência

import { z } from 'zod'

/**
 * Helper universal para tornar qualquer validação required ou optional
 * Inspirado no zodUtils.returnSchema do projeto anterior
 * 
 * ✅ Resolve o problema de "Invalid input: expected string, received undefined"
 * ✅ Valida "campo obrigatório" PRIMEIRO, antes de outras validações
 */
export const returnSchema = <T extends z.ZodTypeAny>(
    schema: T,
    mode: 'required' | 'optional',
    customMessage?: string
): z.ZodTypeAny => {
    if (mode === 'optional') {
        if (schema instanceof z.ZodString) {
            return schema.optional().or(z.literal(''))
        }
        return schema.optional()
    }
    
    // Required mode
    const message = customMessage || 'Preenchimento obrigatório'
    
    if (schema instanceof z.ZodString) {
        // ✅ Valida required PRIMEIRO usando superRefine
        // Só depois valida o resto (email, min, max, etc)
        return z.preprocess(
            (val) => (val === undefined || val === null ? '' : val),
            z.string()
                .superRefine((val, ctx) => {
                    // PRIMEIRA validação: verifica se está vazio
                    if (!val || val.trim().length === 0) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: message,
                        })
                        return z.NEVER // Para aqui, não valida mais nada
                    }
                })
                .pipe(schema) // DEPOIS valida o resto (email, formato, etc)
        )
    }
    
    if (schema instanceof z.ZodNumber) {
        return z.preprocess(
            (val) => (val === undefined || val === null || val === '' ? undefined : val),
            schema.refine((val) => val !== undefined, { message })
        )
    }
    
    if (schema instanceof z.ZodBoolean) {
        return schema.refine((val) => val !== undefined, { message })
    }
    
    // Para Date e outros tipos
    return schema.refine((val) => val !== undefined && val !== null, { message })
}

/**
 * Validações comuns que podem ser usadas em qualquer módulo
 * Cada validação retorna o schema BASE (sem required/optional)
 */
export const commonValidations = {
    // ============================================
    // EMAIL
    // ============================================
    email: z.string()
        .email({ message: 'Email inválido' })
        .max(100, 'Email deve ter no máximo 100 caracteres')
        .toLowerCase()
        .trim(),

    // ============================================
    // TELEFONE
    // ============================================
    phone: z.string()
        .min(10, 'Telefone inválido')
        .max(20, 'Telefone deve ter no máximo 20 caracteres')
        .regex(/^[\d\s()+\-]+$/, 'Formato de telefone inválido'),

    // Telefone Celular BR (11 dígitos com DDD)
    cellPhone: z.string()
        .trim()
        .max(16, 'Número de celular inválido')
        .transform((val) => val.replace(/\D/g, '')) // Remove máscara
        .refine((val) => val.length === 11, { 
            message: 'Número de celular inválido. Digite com DDD no formato: 11922223333' 
        }),

    // Telefone Fixo BR (10 dígitos com DDD)
    landlinePhone: z.string()
        .trim()
        .max(14, 'Número de telefone inválido')
        .transform((val) => val.replace(/\D/g, '')) // Remove máscara
        .refine((val) => val.length === 10, { 
            message: 'Número de telefone inválido. Digite com DDD no formato: 1122223333' 
        }),

    // ============================================
    // NOMES
    // ============================================
    companyName: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim(),
        //.transform((val) => val.trim().replace(/\s+/g, ' ')), // Remove espaços múltiplos

    companyLegalName: z.string()
        .min(3, 'Razão social deve ter no mínimo 3 caracteres')
        .max(150, 'Razão social deve ter no máximo 150 caracteres')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' ')),

    personName: z.string()
        .min(2, 'Nome deve ter no mínimo 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' ')),

    personFullName: z.string()
        .min(2, 'Nome completo deve ter no mínimo 2 caracteres')
        .max(100, 'Nome completo deve ter no máximo 100 caracteres')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' '))
        .refine((val) => val.split(' ').length >= 2, {
            message: 'Nome deve conter pelo menos duas palavras (Nome e Sobrenome)'
        }),

    username: z.string()
        .min(3, 'Nome de usuário deve ter no mínimo 3 caracteres')
        .max(20, 'Nome de usuário deve ter no máximo 20 caracteres')
        .regex(/^[a-z0-9_]+$/, {
            message: 'Nome de usuário deve conter apenas letras minúsculas, números e underscores'
        })
        .trim(),

    // ============================================
    // PASSWORD
    // ============================================
    password: z.string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres'),

    passwordStrong: z.string()
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
        }),

    // ============================================
    // URL
    // ============================================
    url: z.string()
        .url({ message: 'URL inválida' })
        .max(200, 'URL muito longa'),

    // ============================================
    // BOOLEAN
    // ============================================
    boolean: z.boolean(),

    // ============================================
    // PAGINAÇÃO
    // ============================================
    page: z.number()
        .int('Página deve ser um número inteiro')
        .positive('Página deve ser positiva')
        .default(1),

    limit: z.number()
        .int('Limite deve ser um número inteiro')
        .positive('Limite deve ser positivo')
        .max(100, 'Limite máximo é 100')
        .default(10),

    // ============================================
    // TEXTO
    // ============================================
    shortText: z.string()
        .max(50, 'Texto deve ter no máximo 50 caracteres')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' ')),

    mediumText: z.string()
        .max(200, 'Texto deve ter no máximo 200 caracteres')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' ')),

    longText: z.string()
        .max(1000, 'Texto deve ter no máximo 1000 caracteres')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' ')),

    textArea: z.string()
        .max(5000, 'Texto deve ter no máximo 5000 caracteres')
        .trim()
        .transform((val) => val.trim().replace(/\s+/g, ' ')),

    // ============================================
    // NÚMEROS
    // ============================================
    positiveNumber: z.number()
        .positive('Deve ser um número positivo'),

    nonNegativeNumber: z.number()
        .nonnegative('Não pode ser negativo'),

    // ============================================
    // DATAS
    // ============================================
    date: z.coerce.date({
        message: 'Data inválida',
    }),

    // Data de nascimento com validação de idade mínima
    birthday: (minAge?: number) => {
        const baseSchema = z.string()
            .trim()
            .max(10, 'Data de nascimento inválida')
            .transform((val) => val.replace(/\D/g, '')) // Remove máscara
            .refine((val) => {
                // Valida se é uma data válida (DDMMYYYY)
                if (val.length !== 8) return false
                const day = parseInt(val.substring(0, 2))
                const month = parseInt(val.substring(2, 4))
                const year = parseInt(val.substring(4, 8))
                
                const date = new Date(year, month - 1, day)
                return date.getDate() === day && 
                       date.getMonth() === month - 1 && 
                       date.getFullYear() === year
            }, { message: 'Data de nascimento inválida' })
        
        if (minAge) {
            return baseSchema.refine((val) => {
                const day = parseInt(val.substring(0, 2))
                const month = parseInt(val.substring(2, 4))
                const year = parseInt(val.substring(4, 8))
                const birthDate = new Date(year, month - 1, day)
                const today = new Date()
                const minBirthDate = new Date(
                    today.getFullYear() - minAge,
                    today.getMonth(),
                    today.getDate()
                )
                return birthDate <= minBirthDate
            }, { message: `A idade mínima é de ${minAge} anos` })
        }
        
        return baseSchema
    },

    // ============================================
    // IDs
    // ============================================
    mongoId: z.string()
        .regex(/^[a-f\d]{24}$/i, 'ID inválido'),

    // ============================================
    // DOCUMENTOS BRASIL
    // ============================================
    cpf: z.string()
        .trim()
        .max(14, 'CPF inválido')
        .transform((val) => val.replace(/\D/g, '')) // Remove máscara
        .refine((val) => val.length === 11, { message: 'CPF deve ter 11 dígitos' })
        .refine((val) => {
            // Validação algoritmo CPF
            if (val.length !== 11) return false
            if (/^(\d)\1+$/.test(val)) return false // CPFs iguais (111.111.111-11) são inválidos
            
            let sum = 0
            for (let i = 1; i <= 9; i++) {
                sum += parseInt(val.substring(i - 1, i)) * (11 - i)
            }
            let remainder = (sum * 10) % 11
            if (remainder === 10 || remainder === 11) remainder = 0
            if (remainder !== parseInt(val.substring(9, 10))) return false
            
            sum = 0
            for (let i = 1; i <= 10; i++) {
                sum += parseInt(val.substring(i - 1, i)) * (12 - i)
            }
            remainder = (sum * 10) % 11
            if (remainder === 10 || remainder === 11) remainder = 0
            
            return remainder === parseInt(val.substring(10, 11))
        }, { message: 'CPF inválido' }),

    cnpj: z.string()
        .trim()
        .max(18, 'CNPJ inválido')
        .transform((val) => val.replace(/\D/g, '')) // Remove máscara
        .refine((val) => val.length === 14, { message: 'CNPJ deve ter 14 dígitos' })
        .refine((val) => {
            // Validação algoritmo CNPJ
            if (val.length !== 14) return false
            if (/^(\d)\1+$/.test(val)) return false // CNPJs iguais são inválidos
            
            let length = val.length - 2
            let numbers = val.substring(0, length)
            const digits = val.substring(length)
            let sum = 0
            let pos = length - 7
            
            for (let i = length; i >= 1; i--) {
                sum += parseInt(numbers.charAt(length - i)) * pos--
                if (pos < 2) pos = 9
            }
            
            let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
            if (result !== parseInt(digits.charAt(0))) return false
            
            length = length + 1
            numbers = val.substring(0, length)
            sum = 0
            pos = length - 7
            
            for (let i = length; i >= 1; i--) {
                sum += parseInt(numbers.charAt(length - i)) * pos--
                if (pos < 2) pos = 9
            }
            
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
            
            return result === parseInt(digits.charAt(1))
        }, { message: 'CNPJ inválido' }),

    cpfCnpj: z.string()
        .trim()
        .max(18, 'CPF/CNPJ inválido')
        .transform((val) => val.replace(/\D/g, ''))
        .refine((val) => val.length === 11 || val.length === 14, {
            message: 'CPF/CNPJ deve ter 11 ou 14 dígitos'
        })
        .refine((val) => {
            if (val.length === 11) {
                // Valida CPF
                if (/^(\d)\1+$/.test(val)) return false
                let sum = 0
                for (let i = 1; i <= 9; i++) {
                    sum += parseInt(val.substring(i - 1, i)) * (11 - i)
                }
                let remainder = (sum * 10) % 11
                if (remainder === 10 || remainder === 11) remainder = 0
                if (remainder !== parseInt(val.substring(9, 10))) return false
                
                sum = 0
                for (let i = 1; i <= 10; i++) {
                    sum += parseInt(val.substring(i - 1, i)) * (12 - i)
                }
                remainder = (sum * 10) % 11
                if (remainder === 10 || remainder === 11) remainder = 0
                return remainder === parseInt(val.substring(10, 11))
            } else if (val.length === 14) {
                // Valida CNPJ
                if (/^(\d)\1+$/.test(val)) return false
                let length = val.length - 2
                let numbers = val.substring(0, length)
                const digits = val.substring(length)
                let sum = 0
                let pos = length - 7
                
                for (let i = length; i >= 1; i--) {
                    sum += parseInt(numbers.charAt(length - i)) * pos--
                    if (pos < 2) pos = 9
                }
                
                let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
                if (result !== parseInt(digits.charAt(0))) return false
                
                length = length + 1
                numbers = val.substring(0, length)
                sum = 0
                pos = length - 7
                
                for (let i = length; i >= 1; i--) {
                    sum += parseInt(numbers.charAt(length - i)) * pos--
                    if (pos < 2) pos = 9
                }
                
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
                return result === parseInt(digits.charAt(1))
            }
            return false
        }, { message: 'CPF/CNPJ inválido' }),

    // ============================================
    // MOEDA (R$)
    // ============================================
    money: z.preprocess(
        (val) => {
            if (val === null || val === undefined || val === '') return undefined
            if (typeof val === 'number') return val
            // Remove formatação monetária (R$, pontos, vírgulas)
            const cleaned = String(val).replace(/[^\d,]/g, '').replace(',', '.')
            return parseFloat(cleaned)
        },
        z.number({
            message: 'Valor monetário inválido',
        })
        .min(0, 'O valor deve ser maior ou igual a zero')
    ),
}

/**
 * Helper para criar schemas de busca/filtro
 */
export const createSearchSchema = (additionalFields?: Record<string, z.ZodTypeAny>) => {
    return z.object({
        search: z.string().optional(),
        page: commonValidations.page.optional(),
        limit: commonValidations.limit.optional(),
        ...additionalFields,
    })
}

