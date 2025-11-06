# 📘 API Clients - Documentação

Documentação completa das funções disponíveis no módulo de clientes.

---

## 📦 Importação

```typescript
// Import tudo de uma vez
import { 
    // Tipos
    Client,
    CreateClientDto,
    UpdateClientDto,
    ClientFilters,
    ClientActionResponse,
    
    // Server Actions
    getClientsAction,
    getClientByIdAction,
    createClientAction,
    updateClientAction,
    deleteClientAction,
    
    // Client Service
    clientsService,
    
    // Hooks React Query
    useClients,
    useClient,
    useCreateClient,
    useUpdateClient,
    useDeleteClient,
    clientsKeys,
    
    // Schemas Zod
    createClientSchema,
    updateClientSchema,
    clientFiltersSchema,
} from '@/app/api/clients'
```

---

## 🎯 Visão Geral

O módulo de clientes possui **3 camadas**:
- ✅ **Server Actions** - Para SSR e Server Components
- ✅ **Service** - Funções puras para client-side
- ✅ **Hooks** - React Query com cache automático

**Requisitos de Permissão:**
- 📌 Todas as operações requerem autenticação
- 📌 Apenas **admins** podem criar, editar e deletar

---

## 📐 Tipos

### `Client`
```typescript
interface Client {
    _id: string
    name: string
    email: string
    phone?: string
    isActive: boolean
    createdAt: string  // ISO date
    updatedAt: string  // ISO date
    __v?: number
}
```

### `CreateClientDto`
```typescript
interface CreateClientDto {
    name: string
    email: string
    phone?: string
}
```

### `UpdateClientDto`
```typescript
interface UpdateClientDto {
    name?: string
    email?: string
    phone?: string
    isActive?: boolean
}
```

### `ClientFilters`
```typescript
interface ClientFilters {
    search?: string  // Busca por nome ou email
    isActive?: boolean
}
```

---

## 🔧 Server Actions

Use em **Server Components** ou **Server Actions**.

### `getClientsAction()`

Lista todos os clientes.

**Retorno:**
```typescript
Promise<ClientActionResponse<Client[]>>
```

**Exemplo:**
```typescript
import { getClientsAction } from '@/app/api/clients'

export default async function ClientsPage() {
    const result = await getClientsAction()
    
    if (!result.success) {
        return <Error message={result.error} />
    }
    
    return <ClientsList clients={result.data} />
}
```

**Permissões:** Requer autenticação (admin)

---

### `getClientByIdAction(id)`

Busca um cliente específico por ID.

**Parâmetros:**
```typescript
id: string  // ID do cliente
```

**Retorno:**
```typescript
Promise<ClientActionResponse<Client>>
```

**Exemplo:**
```typescript
import { getClientByIdAction } from '@/app/api/clients'

export default async function ClientPage({ params }: { params: { id: string } }) {
    const result = await getClientByIdAction(params.id)
    
    if (!result.success) {
        return <Error message={result.error} />
    }
    
    return <ClientDetails client={result.data} />
}
```

**Permissões:** Requer autenticação

---

### `createClientAction(data)`

Cria um novo cliente.

**Parâmetros:**
```typescript
data: CreateClientDto
```

**Retorno:**
```typescript
Promise<ClientActionResponse<Client>>
```

**Exemplo:**
```typescript
'use server'
import { createClientAction } from '@/app/api/clients'

export async function handleCreateClient(formData: FormData) {
    const result = await createClientAction({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
    })
    
    if (result.success) {
        redirect(`/app/admin/clients/${result.data._id}`)
    }
    
    return result
}
```

**Comportamento:**
- ✅ Valida dados obrigatórios
- ✅ Cria cliente na API
- ✅ Revalida `/app/clients`
- ✅ Retorna cliente criado

**Permissões:** Requer admin

**Códigos de erro comuns:**
- `duplicate_email` → "Este email já está cadastrado"
- `invalid_email_format` → "Email inválido"

---

### `updateClientAction(id, data)`

Atualiza um cliente existente.

**Parâmetros:**
```typescript
id: string           // ID do cliente
data: UpdateClientDto
```

**Retorno:**
```typescript
Promise<ClientActionResponse<Client>>
```

**Exemplo:**
```typescript
'use server'
import { updateClientAction } from '@/app/api/clients'

export async function handleUpdateClient(id: string, formData: FormData) {
    const result = await updateClientAction(id, {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        isActive: formData.get('isActive') === 'true',
    })
    
    if (result.success) {
        revalidatePath(`/app/admin/clients/${id}`)
    }
    
    return result
}
```

**Comportamento:**
- ✅ Atualiza apenas campos fornecidos
- ✅ Revalida rotas relacionadas
- ✅ Retorna cliente atualizado

**Permissões:** Requer admin

---

### `deleteClientAction(id)`

Deleta um cliente (soft delete).

**Parâmetros:**
```typescript
id: string  // ID do cliente
```

**Retorno:**
```typescript
Promise<ClientActionResponse>
```

**Exemplo:**
```typescript
'use server'
import { deleteClientAction } from '@/app/api/clients'

export async function handleDeleteClient(id: string) {
    const result = await deleteClientAction(id)
    
    if (result.success) {
        redirect('/app/clients')
    }
    
    return result
}
```

**Comportamento:**
- ✅ Soft delete (isActive = false)
- ✅ Revalida `/app/clients`

**Permissões:** Requer admin

---

## 🌐 Client Service

**⚠️ NÃO use diretamente!** Use os **hooks** abaixo.

O `clientsService` é usado internamente pelos hooks React Query.

```typescript
export const clientsService = {
    getAll: async (): Promise<Client[]>
    getById: async (id: string): Promise<Client>
    create: async (data: CreateClientDto): Promise<Client>
    update: async (id: string, data: UpdateClientDto): Promise<Client>
    delete: async (id: string): Promise<void>
}
```

---

## 🪝 Hooks React Query

Use em **Client Components** para cache automático.

### `useClients()`

Lista todos os clientes com cache.

**Retorno:**
```typescript
{
    data: Client[] | undefined
    isLoading: boolean
    error: Error | null
    refetch: () => void
    // ... outros campos do useQuery
}
```

**Exemplo:**
```typescript
'use client'
import { useClients } from '@/app/api/clients'

export default function ClientsList() {
    const { data: clients, isLoading, error } = useClients()
    
    if (isLoading) return <Spinner />
    if (error) return <Error message={error.message} />
    if (!clients) return null
    
    return (
        <ul>
            {clients.map(client => (
                <li key={client._id}>{client.name}</li>
            ))}
        </ul>
    )
}
```

**Cache:** 5 minutos (staleTime)

---

### `useClient(id, enabled?)`

Busca um cliente específico por ID.

**Parâmetros:**
```typescript
id: string
enabled?: boolean  // Default: true
```

**Retorno:**
```typescript
{
    data: Client | undefined
    isLoading: boolean
    error: Error | null
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useClient } from '@/app/api/clients'

export default function ClientDetails({ id }: { id: string }) {
    const { data: client, isLoading, error } = useClient(id)
    
    if (isLoading) return <Spinner />
    if (error) return <Error />
    if (!client) return null
    
    return (
        <div>
            <h1>{client.name}</h1>
            <p>{client.email}</p>
        </div>
    )
}
```

**Cache:** 5 minutos (staleTime)

---

### `useCreateClient()`

Hook para criar um cliente com mutation.

**Retorno:**
```typescript
{
    mutate: (data: CreateClientDto, options?) => void
    mutateAsync: (data: CreateClientDto) => Promise<Client>
    isPending: boolean
    isError: boolean
    error: Error | null
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useCreateClient } from '@/app/api/clients'
import { createClientSchema } from '@/app/api/clients'

export default function CreateClientForm() {
    const { mutate, isPending } = useCreateClient()
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        }
        
        // Valida com Zod
        const validation = createClientSchema.safeParse(data)
        if (!validation.success) {
            // Mostra erros
            return
        }
        
        mutate(validation.data, {
            onSuccess: (client) => {
                toast.success('Cliente criado!')
                router.push(`/app/admin/clients/${client._id}`)
                // Cache da lista é invalidado automaticamente!
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input name="name" required />
            <input name="email" type="email" required />
            <input name="phone" />
            <button type="submit" disabled={isPending}>
                {isPending ? 'Criando...' : 'Criar Cliente'}
            </button>
        </form>
    )
}
```

**Comportamento:**
- ✅ Invalida automaticamente `clientsKeys.lists()`
- ✅ Triggers refetch da lista

---

### `useUpdateClient()`

Hook para atualizar um cliente.

**Retorno:**
```typescript
{
    mutate: ({ id, data }: { id: string, data: UpdateClientDto }, options?) => void
    mutateAsync: ({ id, data }) => Promise<Client>
    isPending: boolean
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useUpdateClient } from '@/app/api/clients'

export default function EditClientForm({ client }: { client: Client }) {
    const { mutate, isPending } = useUpdateClient()
    
    const handleSubmit = (data: UpdateClientDto) => {
        mutate(
            { id: client._id, data },
            {
                onSuccess: () => {
                    toast.success('Cliente atualizado!')
                    // Cache é atualizado automaticamente!
                }
            }
        )
    }
    
    return <form>...</form>
}
```

**Comportamento:**
- ✅ Atualiza cache do cliente específico com `setQueryData`
- ✅ Invalida `clientsKeys.lists()`

---

### `useDeleteClient()`

Hook para deletar um cliente.

**Retorno:**
```typescript
{
    mutate: (id: string, options?) => void
    mutateAsync: (id: string) => Promise<void>
    isPending: boolean
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useDeleteClient } from '@/app/api/clients'

export default function DeleteClientButton({ id }: { id: string }) {
    const { mutate, isPending } = useDeleteClient()
    
    const handleDelete = () => {
        if (!confirm('Tem certeza?')) return
        
        mutate(id, {
            onSuccess: () => {
                toast.success('Cliente removido!')
                router.push('/app/clients')
                // Cache é limpo automaticamente!
            }
        })
    }
    
    return (
        <button onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Removendo...' : 'Remover'}
        </button>
    )
}
```

**Comportamento:**
- ✅ Remove do cache com `removeQueries`
- ✅ Invalida `clientsKeys.lists()`

---

## ✅ Schemas Zod

### `createClientSchema`

Valida dados para criar cliente.

**Schema:**
```typescript
z.object({
    name: z.string().min(3).max(100),
    email: z.string().email().max(100),
    phone: z.string().min(10).max(20).optional().or(z.literal('')),
})
```

**Uso:**
```typescript
import { createClientSchema } from '@/app/api/clients'

const result = createClientSchema.safeParse({
    name: 'Empresa ABC',
    email: 'contato@abc.com',
    phone: '11999999999'
})

if (!result.success) {
    console.error(result.error.errors)
}
```

---

### `updateClientSchema`

Valida dados para atualizar cliente.

**Schema:**
```typescript
z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().max(100).optional(),
    phone: z.string().min(10).max(20).optional().or(z.literal('')),
    isActive: z.boolean().optional(),
})
```

---

### `clientFiltersSchema`

Valida filtros de busca.

**Schema:**
```typescript
z.object({
    search: z.string().optional(),
    isActive: z.boolean().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().max(100).optional(),
})
```

---

## 🔑 Query Keys

Para invalidação manual de cache:

```typescript
import { clientsKeys } from '@/app/api/clients'

// Estrutura das keys
clientsKeys = {
    all: ['clients'],
    lists: () => ['clients', 'list'],
    list: (filters?) => ['clients', 'list', filters],
    details: () => ['clients', 'detail'],
    detail: (id) => ['clients', 'detail', id],
}

// Uso para invalidação manual
queryClient.invalidateQueries({ queryKey: clientsKeys.all })
queryClient.invalidateQueries({ queryKey: clientsKeys.lists() })
queryClient.invalidateQueries({ queryKey: clientsKeys.detail(id) })
```

---

## 📊 Comparação: Server Action vs Hook

### Quando usar Server Action?
✅ Server Components (SSR)  
✅ Server Actions (forms)  
✅ Não precisa de cache  
✅ Dados carregados no servidor  

### Quando usar Hook?
✅ Client Components  
✅ Precisa de cache  
✅ Loading states automáticos  
✅ Interatividade (criar, editar, deletar)  

---

## 🎯 Exemplos Completos

### Exemplo 1: Listar com Server Action (SSR)

```typescript
// app/clients/page.tsx
import { getClientsAction } from '@/app/api/clients'

export default async function ClientsPage() {
    const result = await getClientsAction()
    
    if (!result.success) {
        return <div>Erro: {result.error}</div>
    }
    
    return (
        <div>
            <h1>Clientes</h1>
            <ul>
                {result.data.map(client => (
                    <li key={client._id}>{client.name}</li>
                ))}
            </ul>
        </div>
    )
}
```

### Exemplo 2: Listar com Hook (com cache)

```typescript
'use client'
// components/ClientsList.tsx
import { useClients } from '@/app/api/clients'

export default function ClientsList() {
    const { data: clients, isLoading, error } = useClients()
    
    if (isLoading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error.message}</div>
    
    return (
        <ul>
            {clients?.map(client => (
                <li key={client._id}>{client.name}</li>
            ))}
        </ul>
    )
}
```

### Exemplo 3: CRUD Completo com Hooks

```typescript
'use client'
import { 
    useClients, 
    useCreateClient, 
    useUpdateClient, 
    useDeleteClient 
} from '@/app/api/clients'

export default function ClientsManager() {
    const { data: clients, isLoading } = useClients()
    const createClient = useCreateClient()
    const updateClient = useUpdateClient()
    const deleteClient = useDeleteClient()
    
    const handleCreate = () => {
        createClient.mutate(
            { name: 'Novo Cliente', email: 'novo@cliente.com' },
            { onSuccess: () => toast.success('Criado!') }
        )
    }
    
    const handleUpdate = (id: string) => {
        updateClient.mutate(
            { id, data: { name: 'Cliente Atualizado' } },
            { onSuccess: () => toast.success('Atualizado!') }
        )
    }
    
    const handleDelete = (id: string) => {
        deleteClient.mutate(id, {
            onSuccess: () => toast.success('Removido!')
        })
    }
    
    if (isLoading) return <div>Carregando...</div>
    
    return (
        <div>
            <button onClick={handleCreate}>Criar</button>
            <ul>
                {clients?.map(client => (
                    <li key={client._id}>
                        {client.name}
                        <button onClick={() => handleUpdate(client._id)}>
                            Editar
                        </button>
                        <button onClick={() => handleDelete(client._id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
```

---

## 🔗 Links Relacionados

- [Documentação Geral de APIs](../../../docs/API.MD)
- [Criar Novo Módulo](../../../docs/ai/CRIAR-NOVA-API.md)

---

## 💡 Dicas

1. **Use hooks em Client Components** (cache automático)
2. **Use Server Actions em Server Components** (SSR)
3. **Valide com Zod** antes de enviar dados
4. **Aproveite o cache** do React Query (5 min)
5. **Mutations invalidam automaticamente** a lista

🚀 **CRUD completo e otimizado!**

