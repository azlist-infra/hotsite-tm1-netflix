# 📚 GUIA COMPLETO: Como Criar Novos Módulos de API

Este guia mostra como implementar novos módulos de API seguindo a arquitetura padronizada do projeto Next.js 15 + TanStack Query + Server Actions + Zod.

---

## 🏗️ Arquitetura dos Módulos

Cada módulo de API segue uma estrutura em **6 arquivos**:

```
src/app/api/[modulo]/
├── index.ts              ← Barrel export (imports limpos)
├── [modulo].types.ts     ← Interfaces TypeScript
├── [modulo].schemas.ts   ← Validação Zod
├── [modulo].action.ts    ← Server Actions (SSR)
├── [modulo].service.ts   ← Client Service (browser)
├── use[Modulo].ts        ← Hooks React Query
└── API-[MODULO].MD       ← Documentação do módulo
```

---

## 🎯 Passo a Passo

### **1️⃣ Analise a Documentação LLM da API**

Identifique na documentação (llm.txt):
- ✅ **Endpoints disponíveis** (GET, POST, PUT, PATCH, DELETE)
- ✅ **Estrutura dos dados** (request body, response)
- ✅ **Regras de permissão** (quem pode acessar)
- ✅ **Códigos de erro** (para tratamento)
- ✅ **Validações** (min/max length, formato, obrigatórios)

**Exemplo (Products):**
```
GET    /products           - Listar produtos (requer auth)
GET    /products/:id       - Buscar por ID (requer auth)
POST   /products           - Criar produto (apenas admin)
PUT    /products/:id       - Atualizar produto (apenas admin)
DELETE /products/:id       - Deletar produto (apenas admin)
```

---

### **2️⃣ Crie os Types (`[modulo].types.ts`)**

Crie interfaces TypeScript baseadas na documentação da API.

**Template:**

```typescript
// Tipos para o módulo de [modulos]

import type { 
    ApiResponse,
    ActionResponse
} from '@/app/api/_shared'

// Re-exporta tipos compartilhados
export type { ActionResponse, ApiError } from '@/app/api/_shared'

// ==========================================
// ENUMS E CONSTANTES
// ==========================================

export const [MODULO]_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
} as const

export type [Modulo]Status = typeof [MODULO]_STATUS[keyof typeof [MODULO]_STATUS]

// ==========================================
// INTERFACES PRINCIPAIS
// ==========================================

/**
 * Interface completa do [módulo]
 * Baseada na resposta da API
 */
export interface [Modulo] {
    _id: string
    name: string
    description?: string
    isActive: boolean
    createdAt: string // ISO date
    updatedAt: string // ISO date
    __v?: number
}

// ==========================================
// DTOs (Data Transfer Objects)
// ==========================================

/**
 * Dados para criar um novo [módulo]
 * POST /[modulo]
 */
export interface Create[Modulo]Dto {
    name: string
    description?: string
}

/**
 * Dados para atualizar [módulo]
 * PUT /[modulo]/:id
 */
export interface Update[Modulo]Dto {
    name?: string
    description?: string
    isActive?: boolean
}

// ==========================================
// RESPOSTAS DA API
// ==========================================

/**
 * Tipos ApiError e ApiResponse são importados de _shared
 */

/**
 * Resposta de listagem
 * GET /[modulo]
 */
export type List[Modulo]Response = ApiResponse<[Modulo][]>

/**
 * Resposta de buscar por ID
 * GET /[modulo]/:id
 */
export type Get[Modulo]Response = ApiResponse<[Modulo]>

/**
 * Resposta de criar
 * POST /[modulo]
 */
export type Create[Modulo]Response = ApiResponse<[Modulo]>

/**
 * Resposta de atualizar
 * PUT /[modulo]/:id
 */
export type Update[Modulo]Response = ApiResponse<[Modulo]>

/**
 * Resposta de deletar
 * DELETE /[modulo]/:id
 */
export type Delete[Modulo]Response = ApiResponse<[Modulo]>

// ==========================================
// RESPONSE DAS SERVER ACTIONS
// ==========================================

/**
 * Response padrão das Server Actions de [modulos]
 * Usa o ActionResponse compartilhado
 */
export type [Modulo]ActionResponse<T = unknown> = ActionResponse<T>

// ==========================================
// TYPES AUXILIARES
// ==========================================

/**
 * Filtros para listar [modulos]
 */
export interface [Modulo]Filters {
    search?: string
    isActive?: boolean
}
```

**Checklist Types:**
- ✅ Importa tipos de `@/app/api/_shared`
- ✅ Re-exporta tipos compartilhados
- ✅ Interface principal com todos os campos da API
- ✅ DTOs para criar e atualizar
- ✅ Tipos de resposta para cada endpoint
- ✅ ActionResponse usando tipo compartilhado
- ✅ Enums para constantes (status, roles, etc)

---

### **3️⃣ Crie os Schemas Zod (`[modulo].schemas.ts`)**

Crie validações Zod baseadas nas regras da API.

**Template:**

```typescript
// Schemas de validação Zod para [modulos]

import { z } from 'zod'

/**
 * Schema para criação de [modulo]
 */
export const create[Modulo]Schema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z.string()
        .max(500, 'Descrição deve ter no máximo 500 caracteres')
        .optional()
        .or(z.literal('')),
})

/**
 * Schema para atualização de [modulo]
 */
export const update[Modulo]Schema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .optional(),
    description: z.string()
        .max(500, 'Descrição deve ter no máximo 500 caracteres')
        .optional()
        .or(z.literal('')),
    isActive: z.boolean().optional(),
})

/**
 * Schema para filtros de [modulo]
 */
export const [modulo]FiltersSchema = z.object({
    search: z.string().optional(),
    isActive: z.boolean().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().max(100).optional(),
})

// Tipos inferidos dos schemas
export type Create[Modulo]Input = z.infer<typeof create[Modulo]Schema>
export type Update[Modulo]Input = z.infer<typeof update[Modulo]Schema>
export type [Modulo]FiltersInput = z.infer<typeof [modulo]FiltersSchema>
```

**Checklist Schemas:**
- ✅ Schema para cada operação (create, update, filters)
- ✅ Mensagens de erro em português
- ✅ Validações conforme regras da API
- ✅ Tipos inferidos exportados

---

### **4️⃣ Atualize o API Config (`lib/api/api-config.ts`)**

Adicione os novos endpoints no objeto `ENDPOINTS`.

**Exemplo:**

```typescript
export const API_CONFIG = {
    // ... configurações existentes
    
    ENDPOINTS: {
        // ... endpoints existentes
        
        [MODULO]: {
            BASE: '/[modulo]',
            BY_ID: (id: string) => `/[modulo]/${id}`,
            // Adicione endpoints especiais aqui
            SPECIAL: (id: string) => `/[modulo]/${id}/special`,
        },
    },
} as const
```

---

### **5️⃣ Crie o Service (`[modulo].service.ts`)**

Service contém as chamadas de API para usar no **CLIENT-SIDE** com TanStack Query.

**Template:**

```typescript
// Service para chamadas de API de [modulos] no CLIENT-SIDE
// Use com TanStack Query quando precisar de cache e controle avançado

import { apiClient } from '@/lib/api/api-client'
import API_CONFIG from '@/lib/api/api-config'
import type {
    [Modulo],
    Create[Modulo]Dto,
    Update[Modulo]Dto,
    List[Modulo]Response,
    Get[Modulo]Response,
    Create[Modulo]Response,
    Update[Modulo]Response,
} from './[modulo].types'

export const [modulo]Service = {
    /**
     * GET /[modulo]
     * Lista todos os [modulos]
     */
    getAll: async (): Promise<[Modulo][]> => {
        const response = await apiClient.get<List[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BASE
        )
        return response.data
    },

    /**
     * GET /[modulo]/:id
     * Busca um [modulo] específico por ID
     */
    getById: async (id: string): Promise<[Modulo]> => {
        const response = await apiClient.get<Get[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BY_ID(id)
        )
        return response.data
    },

    /**
     * POST /[modulo]
     * Cria um novo [modulo]
     */
    create: async (data: Create[Modulo]Dto): Promise<[Modulo]> => {
        const response = await apiClient.post<Create[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BASE,
            { body: data }
        )
        return response.data
    },

    /**
     * PUT /[modulo]/:id
     * Atualiza dados de um [modulo]
     */
    update: async (id: string, data: Update[Modulo]Dto): Promise<[Modulo]> => {
        const response = await apiClient.put<Update[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BY_ID(id),
            { body: data }
        )
        return response.data
    },

    /**
     * DELETE /[modulo]/:id
     * Remove [modulo]
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(
            API_CONFIG.ENDPOINTS.[MODULO].BY_ID(id)
        )
    },
}
```

**Checklist Service:**
- ✅ Método para cada endpoint da API
- ✅ Tipos corretos no retorno
- ✅ Use `apiClient` (client-side)
- ✅ Retorne apenas `response.data` (sem wrapper)
- ✅ Imports relativos (`./[modulo].types`)

---

### **6️⃣ Crie as Server Actions (`[modulo].action.ts`)**

Server Actions para operações no **SERVIDOR** (mais seguro).

**Template:**

```typescript
'use server'

// Server Actions para [modulos]
// Executa no servidor, mais seguro

import { revalidatePath } from 'next/cache'
import { serverApi } from '@/lib/api/server-api'
import { handleActionError } from '@/app/api/_shared'
import API_CONFIG from '@/lib/api/api-config'
import type {
    [Modulo],
    Create[Modulo]Dto,
    Update[Modulo]Dto,
    [Modulo]ActionResponse,
    List[Modulo]Response,
    Get[Modulo]Response,
    Create[Modulo]Response,
    Update[Modulo]Response,
    Delete[Modulo]Response,
} from './[modulo].types'

/**
 * Lista todos os [modulos]
 */
export async function get[Modulo]sAction(): Promise<[Modulo]ActionResponse<[Modulo][]>> {
    try {
        const response = await serverApi.get<List[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BASE,
            { requireAuth: true }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao buscar [modulos]',
            }
        }

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return handleActionError(error, 'Erro ao buscar [modulos]')
    }
}

/**
 * Busca um [modulo] por ID
 */
export async function get[Modulo]ByIdAction(id: string): Promise<[Modulo]ActionResponse<[Modulo]>> {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID é obrigatório',
            }
        }

        const response = await serverApi.get<Get[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BY_ID(id),
            { requireAuth: true }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || '[Modulo] não encontrado',
            }
        }

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return handleActionError(error, 'Erro ao buscar [modulo]')
    }
}

/**
 * Cria um novo [modulo]
 */
export async function create[Modulo]Action(
    data: Create[Modulo]Dto
): Promise<[Modulo]ActionResponse<[Modulo]>> {
    try {
        // Validação básica
        if (!data.name) {
            return {
                success: false,
                error: 'Nome é obrigatório',
            }
        }

        const response = await serverApi.post<Create[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BASE,
            {
                body: data,
                requireAuth: true,
            }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao criar [modulo]',
            }
        }

        // Revalida as páginas relacionadas
        revalidatePath('/app/[modulo]')
        revalidatePath(`/app/[modulo]/${response.data._id}`)

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return handleActionError(error, 'Erro ao criar [modulo]')
    }
}

/**
 * Atualiza um [modulo]
 */
export async function update[Modulo]Action(
    id: string,
    data: Update[Modulo]Dto
): Promise<[Modulo]ActionResponse<[Modulo]>> {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID é obrigatório',
            }
        }

        const response = await serverApi.put<Update[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BY_ID(id),
            {
                body: data,
                requireAuth: true,
            }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao atualizar [modulo]',
            }
        }

        // Revalida as páginas relacionadas
        revalidatePath('/app/[modulo]')
        revalidatePath(`/app/[modulo]/${id}`)
        revalidatePath(`/app/[modulo]/${id}/edit`)

        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return handleActionError(error, 'Erro ao atualizar [modulo]')
    }
}

/**
 * Deleta um [modulo]
 */
export async function delete[Modulo]Action(id: string): Promise<[Modulo]ActionResponse> {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID é obrigatório',
            }
        }

        const response = await serverApi.delete<Delete[Modulo]Response>(
            API_CONFIG.ENDPOINTS.[MODULO].BY_ID(id),
            { requireAuth: true }
        )

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao deletar [modulo]',
            }
        }

        // Revalida a lista
        revalidatePath('/app/[modulo]')

        return {
            success: true,
        }
    } catch (error) {
        return handleActionError(error, 'Erro ao deletar [modulo]')
    }
}
```

**Checklist Server Actions:**
- ✅ `'use server'` no topo
- ✅ Use `serverApi` (server-side)
- ✅ `requireAuth: true` para rotas autenticadas
- ✅ Validação básica antes de chamar API
- ✅ Use `handleActionError` do `_shared` para tratamento consistente
- ✅ `revalidatePath()` após mutations
- ✅ Retorne `ActionResponse`
- ✅ Imports relativos

---

### **7️⃣ Crie os Hooks TanStack Query (`use[Modulo].ts`)**

Hooks para usar no **CLIENT-SIDE** com cache e invalidação automática.

**Template:**

```typescript
'use client'

// Hooks TanStack Query para [modulos]
// Use quando precisar de cache, invalidação automática, etc no CLIENT-SIDE

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { [modulo]Service } from './[modulo].service'
import type {
    Create[Modulo]Dto,
    Update[Modulo]Dto,
    [Modulo]Filters,
} from './[modulo].types'

// ==========================================
// QUERY KEYS
// ==========================================

export const [modulo]Keys = {
    all: ['[modulo]'] as const,
    lists: () => [...[modulo]Keys.all, 'list'] as const,
    list: (filters?: [Modulo]Filters) => [...[modulo]Keys.lists(), filters] as const,
    details: () => [...[modulo]Keys.all, 'detail'] as const,
    detail: (id: string) => [...[modulo]Keys.details(), id] as const,
}

// ==========================================
// QUERIES (GET)
// ==========================================

/**
 * Hook para listar todos os [modulos]
 */
export function use[Modulo]s() {
    return useQuery({
        queryKey: [modulo]Keys.lists(),
        queryFn: () => [modulo]Service.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

/**
 * Hook para buscar um [modulo] específico por ID
 */
export function use[Modulo](id: string, enabled: boolean = true) {
    return useQuery({
        queryKey: [modulo]Keys.detail(id),
        queryFn: () => [modulo]Service.getById(id),
        enabled: !!id && enabled,
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

// ==========================================
// MUTATIONS (POST, PUT, DELETE)
// ==========================================

/**
 * Hook para criar um novo [modulo]
 */
export function useCreate[Modulo]() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Create[Modulo]Dto) => [modulo]Service.create(data),
        onSuccess: () => {
            // Invalida a lista para refetch
            queryClient.invalidateQueries({ queryKey: [modulo]Keys.lists() })
        },
    })
}

/**
 * Hook para atualizar um [modulo]
 */
export function useUpdate[Modulo]() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Update[Modulo]Dto }) =>
            [modulo]Service.update(id, data),
        onSuccess: (updated[Modulo]) => {
            // Atualiza o cache do [modulo] específico
            queryClient.setQueryData([modulo]Keys.detail(updated[Modulo]._id), updated[Modulo])

            // Invalida a lista
            queryClient.invalidateQueries({ queryKey: [modulo]Keys.lists() })
        },
    })
}

/**
 * Hook para deletar um [modulo]
 */
export function useDelete[Modulo]() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => [modulo]Service.delete(id),
        onSuccess: (_, deletedId) => {
            // Remove do cache
            queryClient.removeQueries({ queryKey: [modulo]Keys.detail(deletedId) })

            // Invalida a lista
            queryClient.invalidateQueries({ queryKey: [modulo]Keys.lists() })
        },
    })
}
```

**Checklist Hooks:**
- ✅ `'use client'` no topo
- ✅ Query keys organizados e tipados
- ✅ `useQuery` para GET (leitura)
- ✅ `useMutation` para POST/PUT/DELETE (escrita)
- ✅ `invalidateQueries` após mutations
- ✅ `setQueryData` para atualizar cache específico
- ✅ Imports relativos

---

### **8️⃣ Crie o Barrel Export (`index.ts`)**

Centraliza todas as exportações do módulo para imports limpos.

**Template:**

```typescript
// Barrel export para módulo de [modulos]

export * from './[modulo].types'
export * from './[modulo].action'
export * from './[modulo].service'
export * from './[modulo].schemas'
export * from './use[Modulo]'
```

---

### **9️⃣ Crie a Documentação do Módulo (`API-[MODULO].MD`)**

Documente todas as funções disponíveis no módulo.

**Ver exemplo completo em:** `src/app/api/users/API-USERS.MD`

**Template básico:**

```markdown
# 📘 API [Modulo] - Documentação

Documentação completa das funções disponíveis no módulo de [modulos].

## 📦 Importação

\`\`\`typescript
// Import tudo de uma vez
import { 
    [Modulo],                // tipo
    get[Modulo]sAction,      // server action
    [modulo]Service,         // client service
    use[Modulo]s,            // hook
    create[Modulo]Schema     // schema
} from '@/app/api/[modulo]'
\`\`\`

## 🔧 Server Actions

### get[Modulo]sAction()
Lista todos os [modulos].
...

[Continue documentando todas as funções]
```

---

## 🎯 Resumo do Fluxo

```
LLM.txt (Documentação da API)
    ↓
1. [modulo].types.ts          (Interfaces TypeScript)
    ↓
2. [modulo].schemas.ts        (Validações Zod)
    ↓
3. api-config.ts              (Adicionar endpoints)
    ↓
4. [modulo].service.ts        (Client-side API calls)
    ↓
5. [modulo].action.ts         (Server Actions)
    ↓
6. use[Modulo].ts             (TanStack Query hooks)
    ↓
7. index.ts                   (Barrel export)
    ↓
8. API-[MODULO].MD           (Documentação)
    ↓
9. Usar nas páginas/componentes
```

---

## ✅ Checklist Final

Antes de considerar o módulo completo:

- ✅ Types criados e exportados
- ✅ Schemas Zod com validações
- ✅ Endpoints adicionados em `api-config.ts`
- ✅ Service com todos os endpoints
- ✅ Server Actions com `handleActionError`
- ✅ Hooks TanStack Query com cache
- ✅ Barrel export (index.ts)
- ✅ Documentação API-[MODULO].MD
- ✅ Testado pelo menos um fluxo completo

---

## 🔥 Dicas Pro

1. **Use tipos compartilhados**: Sempre importe `ApiResponse`, `ActionResponse` de `_shared`
2. **Sem duplicação**: Nunca crie tipos que já existem em `_shared`
3. **Imports limpos**: Use o `index.ts` para importar (`from '@/app/api/[modulo]'`)
4. **Validação Zod**: Crie schemas antes de implementar formulários
5. **Tratamento de erros**: Use `handleActionError` do `_shared`
6. **Query keys**: Organize hierarquicamente para facilitar invalidação
7. **Cache estratégico**: `staleTime` baseado na frequência de mudança
8. **Documente tudo**: API-[MODULO].MD é essencial para uso futuro

---

## 📝 Exemplos Reais

Veja os módulos existentes como referência:
- **Auth**: `src/app/api/auth/` (simples, só server actions)
- **Clients**: `src/app/api/clients/` (completo com CRUD)
- **Users**: `src/app/api/users/` (completo com operações extras)

Todos seguem **exatamente** este guia!

---

## 🎉 Pronto!

Agora você pode criar novos módulos de API seguindo este padrão consistente, escalável e documentado! 🚀
