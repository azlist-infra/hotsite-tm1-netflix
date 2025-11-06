# 🌐 Arquitetura de APIs - Documentação Geral

Documentação da estrutura e funcionamento das chamadas de API no projeto Next.js 15.

---

## 📁 Estrutura dos Módulos

```
src/app/api/
├── _shared/                      ← Tipos e utilitários compartilhados
│   ├── index.ts                 
│   ├── types.ts                  ← ApiResponse, ActionResponse, ApiError, etc
│   └── error-handler.ts          ← Tratamento de erros padronizado
│
├── auth/                         ← Módulo de autenticação
│   ├── index.ts                  ← Barrel export
│   ├── auth.types.ts             ← Interfaces TypeScript
│   ├── auth.schemas.ts           ← Validações Zod
│   ├── auth.action.ts            ← Server Actions
│   └── API-AUTH.MD              ← Documentação específica
│
├── clients/                      ← Módulo de clientes
│   ├── index.ts
│   ├── clients.types.ts
│   ├── clients.schemas.ts
│   ├── clients.action.ts         ← Server Actions
│   ├── clients.service.ts        ← Client Service
│   ├── useClients.ts            ← Hooks React Query
│   └── API-CLIENTS.MD
│
└── users/                        ← Módulo de usuários
    ├── index.ts
    ├── users.types.ts
    ├── users.schemas.ts
    ├── users.action.ts
    ├── users.service.ts
    ├── useUsers.ts
    └── API-USERS.MD
```

---

## 🏗️ Arquitetura em Camadas

Cada módulo segue uma arquitetura em **4 camadas principais**:

### **1. `*.types.ts` - Definições de Tipos**
**O que faz**: Define todas as interfaces TypeScript do módulo

**Contém**:
- Interfaces das entidades (`Client`, `User`)
- DTOs (Data Transfer Objects) para criação/atualização
- Tipos de resposta da API
- Tipos de filtros e parâmetros
- Re-exportações de tipos compartilhados

**Quando usar**: Sempre que precisar importar tipos

**Exemplo**:
```typescript
import type { User, CreateUserDto } from '@/app/api/users'
```

---

### **2. `*.schemas.ts` - Validações Zod**
**O que faz**: Define schemas de validação usando Zod

**Contém**:
- Schemas para criação (`createXxxSchema`)
- Schemas para atualização (`updateXxxSchema`)
- Schemas para filtros (`xxxFiltersSchema`)
- Tipos inferidos dos schemas

**Quando usar**: Em formulários e validações

**Exemplo**:
```typescript
import { createUserSchema } from '@/app/api/users'

const result = createUserSchema.safeParse(formData)
```

---

### **3. `*.action.ts` - Server Actions**
**O que faz**: Funções que rodam **exclusivamente no servidor** (Next.js 15)

**Usa**: `serverApi` (fetch no servidor)

**Quando usar**: 
- Server Components que precisam buscar dados
- Formulários sem necessidade de React Query
- Operações simples sem cache no cliente
- Quando precisa de segurança extra (acesso a cookies, tokens)

**Características**:
- `'use server'` no topo
- Acesso direto aos cookies (auth)
- Pode fazer `revalidatePath()` para atualizar cache do Next.js
- Usa `handleActionError` para tratamento consistente

**Exemplo**:
```typescript
import { getUsersAction } from '@/app/api/users'

// Em Server Component
const result = await getUsersAction()
if (result.success) {
    console.log(result.data)
}
```

---

### **4a. `*.service.ts` - Client-Side Service**
**O que faz**: Funções para fazer requisições **do navegador**

**Usa**: `apiClient` (fetch + interceptors)

**Quando usar**: 
- Com TanStack Query/React Query
- Client Components que precisam de cache/invalidação
- Operações que se beneficiam de loading/error states automáticos

**Características**:
- Retorna dados puros (não wrapped em ActionResponse)
- Lança exceções em caso de erro
- Token gerenciado por interceptors

**Exemplo**:
```typescript
import { usersService } from '@/app/api/users'

// Usado dentro de hooks ou funções client-side
const users = await usersService.getAll()
```

---

### **4b. `use*.ts` - Hooks React Query**
**O que faz**: Hooks customizados usando TanStack Query

**Usa**: `*.service.ts`

**Fornece**:
- `useXxxs()`, `useXxx(id)` - queries com cache
- `useCreateXxx()`, `useUpdateXxx()` - mutations
- Query keys organizadas para invalidação
- Invalidação automática de cache após mutations

**Vantagens**: 
- Cache inteligente
- Refetch automático
- Loading/error states
- Optimistic updates

**Exemplo**:
```typescript
'use client'
import { useUsers } from '@/app/api/users'

function UsersList() {
    const { data: users, isLoading, error } = useUsers()
    
    if (isLoading) return <Spinner />
    if (error) return <Error />
    return <Table data={users} />
}
```

---

## 🔄 Quando Usar Cada Camada?

| Camada | Onde roda | Usa com | Quando usar |
|--------|-----------|---------|-------------|
| `*.types.ts` | - | Tudo | Sempre (tipagens) |
| `*.schemas.ts` | Cliente/Servidor | Formulários | Validação de dados |
| `*.action.ts` | Servidor | Server Components | Dados no SSR, forms simples, segurança |
| `*.service.ts` | Cliente | React Query | Não use diretamente! |
| `use*.ts` | Cliente | Components | Cache, loading states, interatividade |

---

## 📦 Sistema de Imports

### **Barrel Exports (`index.ts`)**

Cada módulo tem um `index.ts` que centraliza todas as exportações:

```typescript
// src/app/api/users/index.ts
export * from './users.types'
export * from './users.action'
export * from './users.service'
export * from './users.schemas'
export * from './useUsers'
```

### **Imports Limpos**

**❌ Antes (verboso):**
```typescript
import { User } from '@/app/api/users/users.types'
import { getUsersAction } from '@/app/api/users/users.action'
import { useUsers } from '@/app/api/users/useUsers'
```

**✅ Agora (limpo):**
```typescript
import { User, getUsersAction, useUsers } from '@/app/api/users'
```

---

## 🛠️ Tipos Compartilhados (`_shared`)

### **`_shared/types.ts`**

Tipos reutilizáveis em todos os módulos:

```typescript
// Resposta padrão da API
interface ApiResponse<T> {
    success: boolean
    message?: string
    data: T
}

// Resposta de Server Actions
interface ActionResponse<T = void> {
    success: boolean
    error?: string
    data?: T
}

// Erro individual da API
interface ApiError {
    code: string
    description: string
    field?: string
}

// Estrutura de erro completa
interface ApiErrorData {
    message?: string
    errors?: ApiError[]
}

// Resposta de erro (RFC 7807)
interface ApiErrorResponse {
    errors: ApiError[]
}

// Filtros base para listagens
interface BaseFilters {
    search?: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}
```

### **`_shared/error-handler.ts`**

Utilitários para tratamento consistente de erros:

```typescript
/**
 * Formata um erro da API em mensagem amigável
 */
function formatApiError(error: ServerApiError): string

/**
 * Trata erros de forma consistente
 */
function handleActionError<T>(
    error: unknown,
    defaultMessage?: string
): ActionResponse<T>

/**
 * Adiciona mensagens de erro customizadas
 */
function addErrorMessages(messages: Record<string, string>): void
```

**Uso em Server Actions:**
```typescript
export async function createUserAction(data: CreateUserDto) {
    try {
        // ... lógica
    } catch (error) {
        return handleActionError(error, 'Erro ao criar usuário')
    }
}
```

---

## 🎯 Fluxo de Dados

### **Server-Side (SSR)**
```
Server Component
    ↓
Server Action (*.action.ts)
    ↓
serverApi (fetch no servidor)
    ↓
API Externa
    ↓
Response → ActionResponse
    ↓
Server Component renderiza
```

### **Client-Side (CSR com Cache)**
```
Client Component
    ↓
Hook (use*.ts)
    ↓
Service (*.service.ts)
    ↓
apiClient (fetch no browser)
    ↓
API Externa
    ↓
Response → Cache (React Query)
    ↓
Component re-renderiza
```

---

## 🔐 Autenticação

### **Server-Side**
- Usa cookies httpOnly (mais seguro)
- Token enviado automaticamente pelo `serverApi`
- `requireAuth: true` nas actions

### **Client-Side**
- Token gerenciado por interceptors
- Refresh automático em 401
- Logout automático se refresh falhar

---

## 📊 Comparação: Service vs Hook

### **`*.service.ts` - Funções Puras**

```typescript
// ✅ Função pura - retorna Promise
export const usersService = {
    getAll: async (): Promise<User[]> => {
        const response = await apiClient.get(...)
        return response.data
    }
}
```

**Características**:
- ✅ Funções JavaScript puras
- ✅ Sem estado (stateless)
- ✅ Sem hooks do React
- ✅ Pode ser usado fora de componentes
- ❌ Não tem cache automático
- ❌ Você gerencia loading/error manualmente

**Quando usar**:
- ✅ Como "matéria-prima" para os hooks
- ❌ NÃO use direto em componentes React

---

### **`use*.ts` - Hooks React Query**

```typescript
// ✅ Hook - gerencia estado, cache, refetch
export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => usersService.getAll(),
        staleTime: 5 * 60 * 1000,
    })
}
```

**Características**:
- ✅ Hook do React
- ✅ Cache inteligente
- ✅ Loading/error states automáticos
- ✅ Refetch automático
- ✅ Invalidação de cache
- ❌ Só funciona em componentes React

**Quando usar**:
- ✅ Em componentes React (recomendado!)

---

## 🎨 Exemplos Práticos

### **Exemplo 1: Listar em Server Component**

```typescript
// app/users/page.tsx
import { getUsersAction } from '@/app/api/users'

export default async function UsersPage() {
    const result = await getUsersAction()
    
    if (!result.success) {
        return <Error message={result.error} />
    }
    
    return <UsersList users={result.data} />
}
```

### **Exemplo 2: Listar em Client Component (com cache)**

```typescript
'use client'
import { useUsers } from '@/app/api/users'

export default function UsersPage() {
    const { data: users, isLoading, error } = useUsers()
    
    if (isLoading) return <Spinner />
    if (error) return <Error message={error.message} />
    
    return <UsersList users={users} />
}
```

### **Exemplo 3: Criar com Mutation**

```typescript
'use client'
import { useCreateUser } from '@/app/api/users'
import { createUserSchema } from '@/app/api/users'

export default function CreateUserForm() {
    const { mutate, isPending } = useCreateUser()
    
    const handleSubmit = (formData: CreateUserDto) => {
        // Valida com Zod
        const result = createUserSchema.safeParse(formData)
        if (!result.success) {
            // Mostra erros
            return
        }
        
        mutate(result.data, {
            onSuccess: () => {
                toast.success('Usuário criado!')
                // Cache é invalidado automaticamente!
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }
    
    return <form onSubmit={handleSubmit}>...</form>
}
```

---

## 📚 Documentação dos Módulos

Cada módulo possui sua documentação específica:

- **Auth**: `src/app/api/auth/API-AUTH.MD`
- **Clients**: `src/app/api/clients/API-CLIENTS.MD`
- **Users**: `src/app/api/users/API-USERS.MD`

---

## 🔗 Links Úteis

- [Criar Novo Módulo](./ai/CRIAR-NOVA-API.md) - Guia completo
- [Next.js 15 Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod Validation](https://zod.dev/)

---

## 🎯 Regras de Ouro

1. **✅ Use tipos compartilhados**: Sempre importe de `_shared`
2. **✅ Sem duplicação**: Nunca recrie tipos que já existem
3. **✅ Imports limpos**: Use barrel exports (`from '@/app/api/xxx'`)
4. **✅ Tratamento de erros**: Use `handleActionError` nas Server Actions
5. **✅ Cache inteligente**: Defina `staleTime` apropriado nos hooks
6. **✅ Validação Zod**: Use schemas antes de enviar para API
7. **✅ Documente tudo**: Mantenha API-[MODULO].MD atualizado

---

## 🎉 Conclusão

Esta arquitetura oferece:
- ✅ **Type-safety** completo
- ✅ **Segurança** (Server Actions + httpOnly cookies)
- ✅ **Performance** (cache inteligente com React Query)
- ✅ **Escalabilidade** (padrão consistente para novos módulos)
- ✅ **Flexibilidade** (Server Actions OU React Query conforme necessidade)
- ✅ **Manutenibilidade** (código organizado e documentado)

🚀 **Pronto para criar APIs de forma profissional!**

