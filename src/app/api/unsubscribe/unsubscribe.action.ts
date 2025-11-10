'use server'

import { redis, REDIS_KEYS } from '@/lib/upstash/redis'

interface EmailEntry {
  email: string
  timestamp: string
  date: string
}

interface UnsubscribeResult {
  success: boolean
  error?: string
}

/**
 * Salva um email na lista de cancelamentos usando Upstash Redis
 * 
 * @param email - Email para ser adicionado à lista de cancelamentos
 * @returns Resultado da operação
 */
export async function saveUnsubscribeEmail(email: string): Promise<UnsubscribeResult> {
  try {
    // Verifica se as variáveis de ambiente estão configuradas
    if (!process.env.STORAGE_KV_REST_API_URL || !process.env.STORAGE_KV_REST_API_TOKEN) {
      console.error('❌ Variáveis STORAGE_KV_REST_API_URL ou STORAGE_KV_REST_API_TOKEN não encontradas')
      return {
        success: false,
        error: 'Configuração do servidor incompleta'
      }
    }

    // Verifica se o email foi fornecido
    if (!email || email.trim() === '') {
      console.error('❌ Email não fornecido')
      return {
        success: false,
        error: 'Email é obrigatório'
      }
    }

    console.log('📧 Processando cancelamento para:', email)

    // Normaliza o email
    const normalizedEmail = email.toLowerCase().trim()

    // Verifica se o email já existe no Redis
    const existingEntry = await redis.hget(REDIS_KEYS.UNSUBSCRIBE_EMAILS, normalizedEmail)
    
    if (existingEntry) {
      console.log('ℹ️ Email já estava na lista de cancelamentos')
      return {
        success: true
      }
    }

    // Cria nova entrada
    const now = new Date()
    const newEntry: EmailEntry = {
      email: normalizedEmail,
      timestamp: now.toISOString(),
      date: now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    console.log('📝 Novo email a ser adicionado:', newEntry.email)
    console.log('📄 Dados do email:', JSON.stringify(newEntry))

    // Salva no Redis usando Hash
    // Estrutura: unsubscribe:emails { "email@exemplo.com": "{...dados...}" }
    await redis.hset(REDIS_KEYS.UNSUBSCRIBE_EMAILS, {
      [normalizedEmail]: JSON.stringify(newEntry)
    })

    console.log('✅ Email salvo com sucesso no Redis')
    
    // Verifica quantos emails temos agora
    const totalEmails = await redis.hlen(REDIS_KEYS.UNSUBSCRIBE_EMAILS)
    console.log('📊 Total de emails na lista:', totalEmails)
    
    // Verifica imediatamente se foi salvo
    const verification = await redis.hget(REDIS_KEYS.UNSUBSCRIBE_EMAILS, normalizedEmail)
    console.log('🔍 Verificação imediata:', verification ? 'Email confirmado no Redis' : '⚠️ Email não encontrado')

    return {
      success: true
    }

  } catch (error) {
    console.error('❌ Erro ao salvar email:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao processar cancelamento'
    }
  }
}

