# 🔐 Sistema de Permissões - Guia Completo

Documentação completa do sistema centralizado de verificação de permissões para controle de acesso às páginas.

---

## 📦 Importação

```typescript
// Para Server Components
import { checkPermission } from '@/lib/auth'

// Para Client Components  
import { usePermission } from '@/lib/auth'
```

---

## 🎯 Como Funciona

### **Regra de Redirecionamento:**
- ❌ **Sem permissão** → Redireciona para `/app`
- ❌ **Não autenticado** → Redireciona para `/auth/login`
- ✅ **Com permissão** → Continua na página

### **Tipos de Configuração:**
- ✅ `requireAdmin` - Apenas administradores
- ✅ `roles` - Lista de roles permitidas
- ✅ `customCheck` - Verificação customizada
- ✅ **SEM CONFIG** - Todos autenticados podem acessar

---

## 🔧 Server Components (SSR)

Use `checkPermission` em **Server Components** (páginas sem `'use client'`).

### **Exemplo 1: Apenas Admin**

```typescript
// src/app/app/admin/clients/page.tsx
export default async function ClientsPage() {
    // ✅ 1 linha apenas! Se não for admin, redireciona para /app
    await checkPermission({ requireAdmin: true })
    
    // Se chegou aqui, usuário é admin
    const clients = await getClientsAction()
    return <ClientsTable clients={clients} />
}
```

### **Exemplo 2: Admin ou Gestor (Roles)**

```typescript
// src/app/app/users/page.tsx
export default async function UsersPage() {
    // ✅ Permite admin OU gestor
    await checkPermission({ 
        roles: ['admin', 'gestor'] 
    })
    
    // Se chegou aqui, usuário é admin OU gestor
    const users = await getUsersAction()
    return <UsersTable users={users} />
}
```

### **Exemplo 3: Com Custom Check**

```typescript
// src/app/app/projects/[id]/page.tsx
export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params
    
    // ✅ Retorna user para usar depois
    const { user } = await checkPermission({
        customCheck: (u) => u.isAdmin || u.projectId === id
    }, { id })
    
    // Se chegou aqui, usuário tem permissão
    return <ProjectDetails projectId={id} userId={user.id} />
}
```

### **Exemplo 4: Sem Restrição (Apenas Autenticado)**

```typescript
// src/app/app/profile/page.tsx
export default async function ProfilePage() {
    // ✅ Sem config = qualquer autenticado pode
    const { user } = await checkPermission()
    
    // Qualquer usuário autenticado pode acessar
    return <ProfileCard user={user} />
}
```

### **Exemplo 5: Custom Check Assíncrono**

```typescript
// Verificação que precisa buscar dados
export default async function UserDetailPage({ params }: PageProps) {
    const { id } = await params
    
    const { user } = await checkPermission({
        customCheck: async (currentUser, params) => {
            // Admin sempre pode
            if (currentUser.isAdmin) return true
            
            // Gestor pode ver usuários do mesmo cliente
            if (currentUser.role === 'gestor') {
                const targetUser = await getUserByIdAction(params!.id)
                return targetUser.data?.clientId === currentUser.clientId
            }
            
            // Usuário pode ver próprio perfil
            return currentUser.id === params!.id
        }
    }, { id })
    
    return <UserDetails userId={id} />
}
```

---

## 🪝 Client Components (CSR)

Use `usePermission` em **Client Components** (páginas com `'use client'`).

### **Exemplo 1: Apenas Admin**

```typescript
'use client'
// src/app/app/admin/clients/new/page.tsx
export default function NewClientPage() {
    // ✅ Hook retorna user e estado de loading
    const { user, loading } = usePermission({ requireAdmin: true })
    
    // ✅ Mostra loading durante verificação
    if (loading || !user) {
        return <LoadingPage text="Verificando permissões..." />
    }
    
    // Se chegou aqui, usuário é admin
    return (
        <FormPageLayout title="Criar Cliente">
            <ClientCreateForm />
        </FormPageLayout>
    )
}
```

### **Exemplo 2: Admin ou Gestor**

```typescript
'use client'
export default function UsersPage() {
    const { user, loading } = usePermission({ 
        roles: ['admin', 'gestor'] 
    })
    
    if (loading || !user) {
        return <LoadingPage />
    }
    
    return <UsersTable currentUser={user} />
}
```

### **Exemplo 3: Custom Check com Params**

```typescript
'use client'
export default function UserDetailPage({ params }: PageProps) {
    const [userId, setUserId] = useState('')
    
    // Resolve params
    useEffect(() => {
        params.then(p => setUserId(p.id))
    }, [params])
    
    // Verifica permissão com params
    const { user, loading } = usePermission({
        customCheck: (u) => u.isAdmin || u.id === userId
    }, { userId })
    
    if (loading || !user || !userId) {
        return <LoadingPage />
    }
    
    return <UserDetails userId={userId} />
}
```

### **Exemplo 4: Sem Restrição**

```typescript
'use client'
export default function DashboardPage() {
    // Sem config = todos autenticados podem
    const { user, loading } = usePermission()
    
    if (loading || !user) {
        return <LoadingPage />
    }
    
    return <Dashboard user={user} />
}
```

---

## 📊 Comparação: Antes vs Depois

### **Antes** ❌ (40 linhas de código)

```typescript
'use client'
export default function NewClientPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [hasPermission, setHasPermission] = useState(false)

    useEffect(() => {
        async function checkPermission() {
            const currentUser = await getCurrentUser()

            if (!currentUser) {
                router.push('/auth/login')
                return
            }

            // Apenas admins podem criar clientes
            if (!currentUser.isAdmin) {
                setHasPermission(false)
                setIsLoading(false)
                return
            }

            setHasPermission(true)
            setIsLoading(false)
        }

        checkPermission()
    }, [router])

    if (isLoading) {
        return <LoadingPage text="Verificando permissões..." />
    }

    if (!hasPermission) {
        return (
            <Container maxW="container.md" py={8}>
                <ErrorBox title="Acesso Negado">
                    Apenas administradores podem criar clientes.
                </ErrorBox>
            </Container>
        )
    }
    
    return <FormPageLayout>...</FormPageLayout>
}
```

### **Depois** ✅ (4 linhas de código)

```typescript
'use client'
export default function NewClientPage() {
    const { user, loading } = usePermission({ requireAdmin: true })
    
    if (loading || !user) return <LoadingPage text="Verificando permissões..." />
    
    return <FormPageLayout>...</FormPageLayout>
}
```

**Economia:** **90% menos código!** 🎉

---

## 🔑 Tipos de Permissão

### **1. requireAdmin**

Permite apenas usuários com `isAdmin === true`.

```typescript
await checkPermission({ requireAdmin: true })
```

**Quando usar:**
- Criar/editar/deletar clientes
- Criar/editar usuários
- Configurações do sistema
- Relatórios administrativos

---

### **2. roles**

Permite apenas usuários com roles específicas.

```typescript
await checkPermission({ 
    roles: ['admin', 'gestor'] 
})
```

**Roles disponíveis:**
- `'admin'` - Administrador do sistema
- `'gestor'` - Gestor de empresa
- `'operador'` - Operador
- `'assistente'` - Assistente

**Quando usar:**
- Listar usuários (admin ou gestor)
- Ver relatórios (admin ou gestor)
- Aprovar ações (admin ou gestor)

---

### **3. customCheck**

Verificação personalizada com lógica customizada.

```typescript
await checkPermission({
    customCheck: (user, params) => {
        return user.isAdmin || user.id === params.id
    }
}, { id })
```

**Quando usar:**
- Lógica complexa de permissão
- Verificações que dependem de dados externos
- Combinação de múltiplas condições
- Permissões baseadas em relacionamentos (cliente, projeto, etc)

**Exemplos de custom checks:**

```typescript
// Ver próprio perfil OU ser admin
customCheck: (u) => u.isAdmin || u.id === userId

// Gestor do mesmo cliente OU admin
customCheck: (u) => u.isAdmin || (u.role === 'gestor' && u.clientId === clientId)

// Proprietário do recurso OU admin
customCheck: (u, params) => u.isAdmin || resource.ownerId === u.id

// Múltiplas condições
customCheck: (u) => {
    if (u.isAdmin) return true
    if (u.role === 'gestor' && u.clientId === targetClientId) return true
    if (u.id === targetUserId) return true
    return false
}
```

---

### **4. Sem Config (Padrão)**

Permite qualquer usuário autenticado.

```typescript
await checkPermission()
// ou
const { user } = usePermission()
```

**Quando usar:**
- Dashboard
- Perfil do usuário
- Páginas de informação geral
- Configurações pessoais

---

## 🎯 Casos de Uso Reais do Projeto

### **Caso 1: Módulo Clients**

```typescript
// Listar clientes - APENAS ADMIN
// src/app/app/admin/clients/page.tsx
await checkPermission({ requireAdmin: true })

// Criar cliente - APENAS ADMIN
// src/app/app/admin/clients/new/page.tsx
const { user, loading } = usePermission({ requireAdmin: true })

// Ver cliente - APENAS ADMIN
// src/app/app/admin/clients/[id]/page.tsx
const { user, loading } = usePermission({ requireAdmin: true })

// Editar cliente - APENAS ADMIN
// src/app/app/admin/clients/[id]/edit/page.tsx
const { user, loading } = usePermission({ requireAdmin: true })
```

---

### **Caso 2: Módulo Users**

```typescript
// Listar usuários - ADMIN OU GESTOR
// src/app/app/users/page.tsx
await checkPermission({ roles: ['admin', 'gestor'] })

// Criar usuário - APENAS ADMIN
// src/app/app/users/new/page.tsx
const { user, loading } = usePermission({ requireAdmin: true })

// Ver usuário - ADMIN OU GESTOR OU PRÓPRIO PERFIL
// src/app/app/users/[id]/page.tsx
const { id } = await params
const { user } = await checkPermission({
    customCheck: async (currentUser, params) => {
        // Admin pode ver todos
        if (currentUser.isAdmin) return true
        
        // Usuário pode ver próprio perfil
        if (currentUser.id === params!.id) return true
        
        // Gestor pode ver usuários do mesmo cliente
        if (currentUser.role === 'gestor') {
            const targetUser = await getUserByIdAction(params!.id)
            return targetUser.data?.clientId === currentUser.clientId
        }
        
        return false
    }
}, { id })

// Editar usuário - ADMIN OU PRÓPRIO PERFIL
// src/app/app/users/[id]/edit/page.tsx
const { user } = usePermission({
    customCheck: (u) => u.isAdmin || u.id === userId
})

// Alterar privilégios - APENAS ADMIN
// src/app/app/users/[id]/privileges/page.tsx
await checkPermission({ requireAdmin: true })
```

---

### **Caso 3: Módulo Profile**

```typescript
// Ver próprio perfil - QUALQUER AUTENTICADO
// src/app/app/profile/page.tsx
const { user } = await checkPermission()

// Editar perfil - QUALQUER AUTENTICADO
// src/app/app/profile/edit/page.tsx
const { user } = usePermission()

// Alterar senha - QUALQUER AUTENTICADO
// src/app/app/profile/password/page.tsx
const { user } = usePermission()
```

---

## 📐 API Reference

### **checkPermission (Server Action)**

```typescript
async function checkPermission(
    config?: PermissionConfig,
    params?: Record<string, string>
): Promise<{ user: User; hasPermission: true }>
```

**Parâmetros:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `config` | `PermissionConfig` | ❌ | Configuração de permissão |
| `config.requireAdmin` | `boolean` | ❌ | Se `true`, apenas admins |
| `config.roles` | `UserRole[]` | ❌ | Lista de roles permitidas |
| `config.customCheck` | `function` | ❌ | Função de verificação customizada |
| `params` | `Record<string, string>` | ❌ | Params da rota (para customCheck) |

**Retorno:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `user` | `User` | Usuário autenticado |
| `hasPermission` | `true` | Sempre `true` (ou redireciona) |

**Comportamento:**
- Se não autenticado: `redirect('/auth/login')`
- Se sem permissão: `redirect('/app')`
- Se com permissão: retorna `{ user, hasPermission: true }`

---

### **usePermission (Hook)**

```typescript
function usePermission(
    config?: PermissionConfig,
    params?: Record<string, string>
): { user: User | null; loading: boolean; hasPermission: boolean }
```

**Parâmetros:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `config` | `PermissionConfig` | ❌ | Configuração de permissão |
| `config.requireAdmin` | `boolean` | ❌ | Se `true`, apenas admins |
| `config.roles` | `UserRole[]` | ❌ | Lista de roles permitidas |
| `config.customCheck` | `function` | ❌ | Função de verificação customizada |
| `params` | `Record<string, string>` | ❌ | Params da rota (para customCheck) |

**Retorno:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `user` | `User \| null` | Usuário (null durante loading) |
| `loading` | `boolean` | Estado de loading |
| `hasPermission` | `boolean` | Se tem permissão |

**Comportamento:**
- Durante verificação: `loading = true`, `user = null`
- Se não autenticado: `router.push('/auth/login')`
- Se sem permissão: `router.push('/app')`
- Se com permissão: `loading = false`, `user = User`, `hasPermission = true`

---

## 🎨 Exemplos Avançados

### **Exemplo 1: Gestor vendo usuários do próprio cliente**

```typescript
export default async function UsersPage() {
    const { user } = await checkPermission({
        customCheck: async (currentUser) => {
            // Admin vê todos
            if (currentUser.isAdmin) return true
            
            // Gestor vê apenas do próprio cliente
            if (currentUser.role === 'gestor') {
                // A listagem será filtrada depois baseado no clientId
                return true
            }
            
            return false
        }
    })
    
    // Filtra usuários baseado no clientId se for gestor
    const users = user.isAdmin 
        ? await getUsersAction()
        : await getUsersByClientAction(user.clientId)
    
    return <UsersTable users={users} />
}
```

### **Exemplo 2: Usuário editando próprio perfil OU admin editando qualquer**

```typescript
export default async function UserEditPage({ params }: PageProps) {
    const { id } = await params
    
    const { user } = await checkPermission({
        customCheck: (currentUser) => {
            // Admin pode editar qualquer usuário
            if (currentUser.isAdmin) return true
            
            // Usuário só pode editar próprio perfil
            return currentUser.id === id
        }
    }, { id })
    
    // Busca dados do usuário a ser editado
    const targetUser = await getUserByIdAction(id)
    
    return (
        <FormPageLayout>
            <UserEditForm 
                user={targetUser.data} 
                isEditingSelf={user.id === id}
                currentUser={user}
            />
        </FormPageLayout>
    )
}
```

### **Exemplo 3: Permissão baseada em feature flag**

```typescript
export default async function BetaFeaturePage() {
    const { user } = await checkPermission({
        customCheck: (u) => {
            // Admin sempre tem acesso
            if (u.isAdmin) return true
            
            // Ou usuários com beta flag ativado
            return u.features?.betaAccess === true
        }
    })
    
    return <BetaFeature />
}
```

### **Exemplo 4: Horário de acesso**

```typescript
export default async function RestrictedPage() {
    await checkPermission({
        customCheck: (user) => {
            // Admin sempre pode
            if (user.isAdmin) return true
            
            // Outros só em horário comercial
            const hour = new Date().getHours()
            return hour >= 9 && hour < 18
        }
    })
    
    return <RestrictedContent />
}
```

---

## 🔄 Fluxo de Execução

### **Server Component:**

```
1. Página é requisitada
   ↓
2. checkPermission() executa no servidor
   ↓
3. Busca getCurrentUser()
   ↓
4. Verifica config (requireAdmin, roles, customCheck)
   ↓
5a. SEM PERMISSÃO → redirect('/app')
5b. COM PERMISSÃO → retorna { user }
   ↓
6. Página renderiza com user
```

### **Client Component:**

```
1. Página renderiza (loading=true)
   ↓
2. useEffect dispara usePermission()
   ↓
3. Busca getCurrentUser() via Server Action
   ↓
4. Verifica config (requireAdmin, roles, customCheck)
   ↓
5a. SEM PERMISSÃO → router.push('/app')
5b. COM PERMISSÃO → setState({ user, loading: false })
   ↓
6. Página re-renderiza com user
```

---

## ⚙️ Configuração de Permissões por Módulo

### **Clients (Apenas Admin)**
```typescript
// TODAS as rotas de clients requerem admin
await checkPermission({ requireAdmin: true })
```

### **Users (Admin ou Gestor para listar, Admin para criar)**
```typescript
// Listar: Admin ou Gestor
await checkPermission({ roles: ['admin', 'gestor'] })

// Criar: Apenas Admin
await checkPermission({ requireAdmin: true })

// Ver detalhes: Admin, Gestor (mesmo cliente) ou próprio perfil
await checkPermission({
    customCheck: (user, params) => {
        if (user.isAdmin) return true
        if (user.id === params.id) return true
        // ... lógica de gestor
        return false
    }
}, { id })
```

### **Profile (Qualquer Autenticado)**
```typescript
// Sem restrição - apenas autenticado
const { user } = await checkPermission()
```

---

## 🎯 Boas Práticas

### ✅ **DO (Fazer)**

```typescript
// ✅ Use checkPermission em Server Components
export default async function Page() {
    await checkPermission({ requireAdmin: true })
}

// ✅ Use usePermission em Client Components
export default function Page() {
    const { user, loading } = usePermission({ requireAdmin: true })
}

// ✅ Sempre verifique loading no Client
if (loading || !user) return <LoadingPage />

// ✅ Retorne user para evitar buscar novamente
const { user } = await checkPermission()
return <Component userId={user.id} />

// ✅ Use customCheck para lógica complexa
customCheck: (user) => user.isAdmin || user.role === 'gestor'
```

### ❌ **DON'T (Não Fazer)**

```typescript
// ❌ Não use checkPermission em Client Component
'use client'
await checkPermission()  // ERRO!

// ❌ Não use usePermission em Server Component
export default async function Page() {
    const { user } = usePermission()  // ERRO!
}

// ❌ Não ignore o loading
const { user } = usePermission()
return <Component user={user} />  // user pode ser null!

// ❌ Não faça verificação manual
if (!user.isAdmin) redirect('/app')  // Use checkPermission!

// ❌ Não busque user novamente
await checkPermission()
const user = await getCurrentUser()  // Redundante!
```

---

## 🚀 Checklist de Implementação

Ao criar uma nova página protegida:

- [ ] Identifique se é Server ou Client Component
- [ ] Escolha o tipo de permissão (admin, roles, custom, ou nenhuma)
- [ ] Adicione `checkPermission` (Server) ou `usePermission` (Client)
- [ ] Verifique `loading` no Client Component
- [ ] Use `user` retornado (evite buscar novamente)
- [ ] Teste navegação (com e sem permissão)

---

## 🔍 Debug e Troubleshooting

### **Problema: Redirect infinito**

```typescript
// ❌ Causa loop
customCheck: (user) => {
    router.push('/app')  // Não faça isso!
    return false
}

// ✅ Solução
customCheck: (user) => {
    return false  // Apenas retorne false, o sistema redireciona
}
```

### **Problema: Loading infinito**

```typescript
// ❌ Hook sem dependências corretas
useEffect(() => {
    check()
}, [])  // Faltou config e params!

// ✅ Já está correto no usePermission
useEffect(() => {
    check()
}, [config, params, router])
```

### **Problema: User null mesmo com permissão**

```typescript
// ❌ Não verifica loading
const { user } = usePermission()
return <Component user={user.id} />  // Erro: user é null!

// ✅ Sempre verifique loading
const { user, loading } = usePermission()
if (loading || !user) return <LoadingPage />
return <Component user={user.id} />
```

---

## 📈 Estatísticas de Redução de Código

### **Módulo Clients:**

| Página | Antes | Depois | Economia |
|--------|-------|--------|----------|
| `page.tsx` | 28 linhas | 1 linha | **96%** ⬇️ |
| `new/page.tsx` | 40 linhas | 4 linhas | **90%** ⬇️ |
| `[id]/page.tsx` | 47 linhas | 3 linhas | **94%** ⬇️ |
| `[id]/edit/page.tsx` | 34 linhas | 3 linhas | **91%** ⬇️ |
| **TOTAL** | **149 linhas** | **11 linhas** | **93%** ⬇️ |

---

## 🎓 Exemplo Completo - Do Zero

```typescript
// ========================================
// PÁGINA: /app/events/[id]/participants/page.tsx
// PERMISSÃO: Admin OU organizador do evento
// ========================================

'use client'

import { useEffect, useState } from 'react'
import { usePermission } from '@/lib/auth'
import { getEventByIdAction } from '@/app/api/events'
import { LoadingPage } from '@/components/ui'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function EventParticipantsPage({ params }: PageProps) {
    // 1. Resolve params
    const [eventId, setEventId] = useState('')
    
    useEffect(() => {
        params.then(p => setEventId(p.id))
    }, [params])
    
    // 2. Verifica permissão (admin OU organizador do evento)
    const { user, loading } = usePermission({
        customCheck: async (currentUser, params) => {
            // Admin pode ver todos os eventos
            if (currentUser.isAdmin) return true
            
            // Busca evento para verificar se é organizador
            if (params?.id) {
                const event = await getEventByIdAction(params.id)
                return event.data?.organizerId === currentUser.id
            }
            
            return false
        }
    }, { id: eventId })
    
    // 3. Loading state
    if (loading || !user || !eventId) {
        return <LoadingPage text="Verificando permissões..." />
    }
    
    // 4. Renderiza (tem permissão!)
    return (
        <div>
            <h1>Participantes do Evento</h1>
            <ParticipantsList eventId={eventId} />
        </div>
    )
}
```

---

## 🔗 Arquivos Relacionados

- **Implementação:** `src/lib/auth/check-permission.ts`
- **Hook:** `src/lib/auth/use-permission.ts`
- **Tipos:** `src/app/api/auth/auth.types.ts`
- **Server Action:** `src/app/api/auth/auth.action.ts`

---

## 💡 Dicas Pro

### **1. Combine permissões**

```typescript
await checkPermission({
    requireAdmin: true,  // ← Primeiro verifica se é admin
    roles: ['admin'],    // ← Se passar, verifica role
    customCheck: (u) => u.isActive  // ← Se passar, faz check custom
})
// Todas as condições são verificadas em ordem!
```

### **2. Reutilize checks**

```typescript
// src/lib/auth/common-checks.ts
export const isOwnerOrAdmin = (ownerId: string) => ({
    customCheck: (user: User) => user.isAdmin || user.id === ownerId
})

// Uso
await checkPermission(isOwnerOrAdmin(resource.ownerId))
```

### **3. Logging para debug**

```typescript
await checkPermission({
    customCheck: (user) => {
        const hasPermission = user.isAdmin || user.role === 'gestor'
        console.log('[Permission Check]', { 
            userId: user.id, 
            role: user.role, 
            hasPermission 
        })
        return hasPermission
    }
})
```

---

## 🎉 Conclusão

**Sistema de permissões:**
- ✅ Centralizado e consistente
- ✅ Simples de usar (1 linha por página)
- ✅ Flexível (admin, roles, custom)
- ✅ Type-safe
- ✅ Redirect automático
- ✅ Funciona em Server E Client
- ✅ 93% menos código

**Agora você tem controle total de permissões de forma profissional!** 🚀

