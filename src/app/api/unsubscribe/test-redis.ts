/**
 * Arquivo de teste para validar integração com Upstash Redis
 * 
 * Para testar:
 * 1. Adicione as variáveis UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN no .env
 * 2. Execute este arquivo ou use os comandos diretamente no Upstash Console
 */

import { redis, REDIS_KEYS } from '@/lib/upstash/redis'

/**
 * Testa a conexão e operações básicas com Redis
 */
export async function testRedisConnection() {
  try {
    console.log('🧪 Testando conexão com Upstash Redis...')

    // 1. Adiciona um email de teste
    const testEmail = 'teste@redis.com'
    const testData = {
      email: testEmail,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('pt-BR')
    }

    await redis.hset(REDIS_KEYS.UNSUBSCRIBE_EMAILS, {
      [testEmail]: JSON.stringify(testData)
    })
    console.log('✅ Email de teste adicionado')

    // 2. Busca o email
    const retrieved = await redis.hget(REDIS_KEYS.UNSUBSCRIBE_EMAILS, testEmail)
    console.log('✅ Email recuperado:', retrieved)

    // 3. Conta total de emails
    const total = await redis.hlen(REDIS_KEYS.UNSUBSCRIBE_EMAILS)
    console.log('✅ Total de emails:', total)

    // 4. Lista todos os emails
    const allEmails = await redis.hgetall(REDIS_KEYS.UNSUBSCRIBE_EMAILS)
    console.log('✅ Todos os emails:', Object.keys(allEmails || {}))

    // 5. Remove o email de teste
    await redis.hdel(REDIS_KEYS.UNSUBSCRIBE_EMAILS, testEmail)
    console.log('✅ Email de teste removido')

    console.log('🎉 Todos os testes passaram!')
    return true

  } catch (error) {
    console.error('❌ Erro ao testar Redis:', error)
    return false
  }
}

/**
 * Limpa todos os emails (use com cuidado!)
 */
export async function clearAllEmails() {
  await redis.del(REDIS_KEYS.UNSUBSCRIBE_EMAILS)
  console.log('🗑️ Todos os emails foram removidos')
}

/**
 * Lista todos os emails salvos
 */
export async function listAllEmails() {
  const allEmails = await redis.hgetall(REDIS_KEYS.UNSUBSCRIBE_EMAILS)
  
  if (!allEmails || Object.keys(allEmails).length === 0) {
    console.log('📭 Nenhum email encontrado')
    return []
  }

  const emails = Object.entries(allEmails).map(([email, data]) => {
    try {
      return JSON.parse(data as string)
    } catch {
      return { email, data }
    }
  })

  console.log('📧 Emails encontrados:', emails.length)
  emails.forEach(email => {
    console.log(`  - ${email.email} (${email.date})`)
  })

  return emails
}

