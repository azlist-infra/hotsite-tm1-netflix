import { Redis } from '@upstash/redis'

/**
 * Cliente Redis do Upstash
 * 
 * Configurado com variáveis de ambiente:
 * - STORAGE_KV_REST_API_URL
 * - STORAGE_KV_REST_API_TOKEN
 */
export const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL!,
  token: process.env.STORAGE_KV_REST_API_TOKEN!,
})

/**
 * Chaves utilizadas no Redis
 */
export const REDIS_KEYS = {
  UNSUBSCRIBE_EMAILS: 'unsubscribe:emails', // Hash com todos os emails cancelados
} as const

