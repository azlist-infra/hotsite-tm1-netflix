# Upstash Redis - Configuração

Cliente Redis do Upstash para o projeto Netflix.

## Configuração

### Variáveis de Ambiente

```env
STORAGE_KV_REST_API_URL=https://xxxxx.upstash.io
STORAGE_KV_REST_API_TOKEN=xxxxx
```

## Uso

```typescript
import { redis, REDIS_KEYS } from '@/lib/upstash/redis'

// Salvar um valor em um Hash
await redis.hset(REDIS_KEYS.UNSUBSCRIBE_EMAILS, {
  'user@example.com': JSON.stringify({ email: 'user@example.com', ... })
})

// Ler um valor de um Hash
const value = await redis.hget(REDIS_KEYS.UNSUBSCRIBE_EMAILS, 'user@example.com')

// Listar todos os valores de um Hash
const allEmails = await redis.hgetall(REDIS_KEYS.UNSUBSCRIBE_EMAILS)

// Contar itens em um Hash
const count = await redis.hlen(REDIS_KEYS.UNSUBSCRIBE_EMAILS)

// Deletar um item de um Hash
await redis.hdel(REDIS_KEYS.UNSUBSCRIBE_EMAILS, 'user@example.com')
```

## Keys Disponíveis

| Key | Tipo | Descrição |
|-----|------|-----------|
| `unsubscribe:emails` | Hash | Emails cancelados com timestamp |

## Estrutura de Dados

### `unsubscribe:emails` (Hash)

```typescript
{
  "user@example.com": "{\"email\":\"user@example.com\",\"timestamp\":\"2025-11-10T12:00:00.000Z\",\"date\":\"10/11/2025, 12:00:00\"}",
  "outro@example.com": "{\"email\":\"outro@example.com\",\"timestamp\":\"2025-11-10T13:00:00.000Z\",\"date\":\"10/11/2025, 13:00:00\"}"
}
```

## Documentação

- [Upstash Redis Docs](https://upstash.com/docs/redis)
- [Upstash Console](https://console.upstash.com/)

