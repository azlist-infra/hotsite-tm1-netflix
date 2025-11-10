# API de Unsubscribe - Upstash Redis

API para gerenciar cancelamentos de inscrição, salvando emails no Upstash Redis KV.

## Configuração

### 1. Variáveis de Ambiente

Adicione as variáveis ao arquivo `.env` ou `.env.local`:

```env
STORAGE_KV_REST_API_URL=https://xxxxx.upstash.io
STORAGE_KV_REST_API_TOKEN=xxxxx
```

Para obter as credenciais:
1. Acesse o [Upstash Console](https://console.upstash.com/) ou Vercel Dashboard
2. Crie ou selecione seu banco Redis/KV
3. Vá em **Details** → **REST API**
4. Copie `STORAGE_KV_REST_API_URL` e `STORAGE_KV_REST_API_TOKEN`

### 2. Estrutura de Dados no Redis

**Tipo:** Hash  
**Key:** `unsubscribe:emails`  
**Estrutura:**
```
{
  "user@example.com": "{\"email\":\"user@example.com\",\"timestamp\":\"...\",\"date\":\"...\"}",
  "outro@example.com": "{\"email\":\"outro@example.com\",\"timestamp\":\"...\",\"date\":\"...\"}"
}
```

## Estrutura de Dados

### Formato do JSON

```json
[
  {
    "email": "teste@teste.com",
    "timestamp": "2025-11-04T16:42:18.243Z",
    "date": "04/11/2025, 16:42:18"
  },
  {
    "email": "outro@exemplo.com",
    "timestamp": "2025-11-05T10:30:45.123Z",
    "date": "05/11/2025, 10:30:45"
  }
]
```

### Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `email` | string | Email (lowercase, trimmed) |
| `timestamp` | string | ISO 8601 timestamp |
| `date` | string | Data formatada em pt-BR |

## Server Action

### `saveUnsubscribeEmail(email: string)`

Salva um email na lista de cancelamentos usando Redis.

**Validações:**
- ✅ Verifica se as variáveis KV estão no `.env`
- ✅ Verifica se o email foi fornecido
- ✅ Previne duplicatas (email já existente)
- ✅ Converte email para lowercase
- ✅ Remove espaços em branco

**Comportamento:**
1. Verifica se o email já existe no Redis Hash
2. Se não existir, adiciona o novo email
3. Salva usando `HSET` no Redis
4. Retorna sucesso imediatamente (sem cache)

**Retorno:**
```typescript
interface UnsubscribeResult {
  success: boolean
  error?: string
}
```

**Erros possíveis:**
- Variáveis STORAGE_KV não configuradas
- Email vazio
- Erro ao acessar Redis
- Erro ao salvar dados

## Uso

### No Hook

```typescript
import { saveUnsubscribeEmail } from '@/app/api/unsubscribe'

const result = await saveUnsubscribeEmail('user@example.com')

if (result.success) {
  // Email salvo com sucesso
} else {
  // Tratar erro: result.error
}
```

### Logs

A função gera logs detalhados no console:

```
📧 Processando cancelamento para: user@example.com
📝 Novo email a ser adicionado: user@example.com
📄 Dados do email: {"email":"user@example.com",...}
✅ Email salvo com sucesso no Redis
📊 Total de emails na lista: 42
🔍 Verificação imediata: Email confirmado no Redis
```

ou

```
❌ Variáveis STORAGE_KV_REST_API_URL ou STORAGE_KV_REST_API_TOKEN não encontradas
```

## Comandos Redis Úteis

### Listar todos os emails
```bash
HGETALL unsubscribe:emails
```

### Ver total de emails
```bash
HLEN unsubscribe:emails
```

### Buscar email específico
```bash
HGET unsubscribe:emails "user@example.com"
```

### Deletar email específico
```bash
HDEL unsubscribe:emails "user@example.com"
```

### Deletar todos os emails
```bash
DEL unsubscribe:emails
```

## Dependências

```json
{
  "@upstash/redis": "^1.x.x"
}
```

Instalar:
```bash
npm install @upstash/redis
```

## Troubleshooting

### Erro: "Variáveis não encontradas"
- Verifique se `STORAGE_KV_REST_API_URL` e `STORAGE_KV_REST_API_TOKEN` estão no `.env`
- Reinicie o servidor de desenvolvimento

### Erro de conexão com Redis
- Verifique se o banco Redis está ativo no Upstash Console
- Teste a conexão usando o Upstash CLI ou Dashboard

### Email duplicado
- Por design, a função não adiciona emails duplicados
- Retorna `success: true` mesmo se o email já existir

## Vantagens do Redis vs Blob Storage

✅ **Sem problemas de cache** - Dados atualizados instantaneamente  
✅ **Performance superior** - Operações em memória  
✅ **Operações atômicas** - HSET garante consistência  
✅ **Comandos poderosos** - HGETALL, HLEN, etc  
✅ **Sem limite de requisições** - Plano gratuito generoso  
✅ **Simples e direto** - Sem necessidade de `allowOverwrite`

