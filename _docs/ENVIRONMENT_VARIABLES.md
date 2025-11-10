# Variáveis de Ambiente Necessárias

Este documento lista todas as variáveis de ambiente necessárias para o projeto funcionar corretamente.

## 🔴 Obrigatórias para Produção

### 1. API_TOKEN

**Descrição:** Token de autenticação para a API Netflix Pax  
**Usado em:** `src/app/api/pax-netflix/`  
**Valor padrão:** (contate o administrador)

```env
API_TOKEN=YmxzLmZlbGlwZWRhczpkaXdlZndoaXVkamlvYXNkam5lYm5lbw==
```

**Como obter:**
- Contate o administrador do projeto
- Este é o token fixo para a API Netflix

**Configuração na Vercel:**
1. Acesse: [Vercel Dashboard](https://vercel.com/dashboard) → Seu Projeto → Settings → Environment Variables
2. Adicione: `API_TOKEN` = `[valor do token]`
3. Aplique em: Production, Preview, Development

---

### 2. STORAGE_KV_REST_API_URL

**Descrição:** URL da API REST do Upstash Redis KV  
**Usado em:** `src/lib/upstash/redis.ts` (para unsubscribe)  
**Formato:** `https://xxxxx.upstash.io`

```env
STORAGE_KV_REST_API_URL=https://xxxxx.upstash.io
```

**Como obter:**
1. Acesse: [Upstash Console](https://console.upstash.com/) ou Vercel Dashboard → Storage → KV
2. Selecione seu banco Redis/KV
3. Vá em **Details** → **REST API**
4. Copie o valor de **UPSTASH_REDIS_REST_URL**

**Configuração na Vercel:**
- Se criou o KV via Vercel, já está configurado automaticamente
- Se criou no Upstash Console, adicione manualmente em Environment Variables

---

### 3. STORAGE_KV_REST_API_TOKEN

**Descrição:** Token de autenticação do Upstash Redis KV  
**Usado em:** `src/lib/upstash/redis.ts` (para unsubscribe)

```env
STORAGE_KV_REST_API_TOKEN=xxxxx
```

**Como obter:**
1. Mesmo local da URL acima
2. Copie o valor de **UPSTASH_REDIS_REST_TOKEN**

**Configuração na Vercel:**
- Mesma instrução da URL acima

---

## 🟡 Opcionais

### NEXT_PUBLIC_API_URL

**Descrição:** URL base da API (se houver)  
**Usado em:** `src/lib/api/api-config.ts`

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📋 Checklist de Deploy

Antes de fazer deploy na Vercel, certifique-se de que configurou:

- [ ] `API_TOKEN` - Token da API Netflix
- [ ] `STORAGE_KV_REST_API_URL` - URL do Redis KV
- [ ] `STORAGE_KV_REST_API_TOKEN` - Token do Redis KV

---

## 🧪 Para Desenvolvimento Local

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Token
API_TOKEN=YmxzLmZlbGlwZWRhczpkaXdlZndoaXVkamlvYXNkam5lYm5lbw==

# Upstash Redis KV
STORAGE_KV_REST_API_URL=https://xxxxx.upstash.io
STORAGE_KV_REST_API_TOKEN=xxxxx
```

**Importante:** Nunca commite o arquivo `.env.local` no Git!

---

## ❌ Erros Comuns

### Erro: "API_TOKEN não está configurado nas variáveis de ambiente"

**Causa:** A variável `API_TOKEN` não foi configurada  
**Solução:** Adicione `API_TOKEN` nas Environment Variables da Vercel

### Erro: "Variáveis STORAGE_KV_REST_API_URL ou STORAGE_KV_REST_API_TOKEN não encontradas"

**Causa:** As variáveis do Redis KV não foram configuradas  
**Solução:** Adicione as duas variáveis nas Environment Variables da Vercel

---

## 🔗 Links Úteis

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Upstash Console](https://console.upstash.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

