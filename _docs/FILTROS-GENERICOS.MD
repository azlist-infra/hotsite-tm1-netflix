# 🔍 Sistema de Filtros Genérico

Sistema declarativo e reutilizável para aplicar filtros em qualquer módulo do sistema.

---

## 🎯 Problema Resolvido

### **Antes (Código Repetitivo):**

```typescript
// ❌ Em CADA página precisa repetir essa lógica:
const params = await searchParams

let clients = result.data || []

if (params.search) {
    const searchLower = params.search.toLowerCase()
    clients = clients.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower)
    )
}

if (params.status) {
    const isActive = params.status === 'true'
    clients = clients.filter(c => c.isActive === isActive)
}

// ... mais 20 linhas em CADA módulo 😵
```

**Problemas:**
- ❌ Código duplicado em cada módulo
- ❌ Difícil manter consistência
- ❌ Bugs precisam ser corrigidos em vários lugares
- ❌ Não normaliza buscas (acentos, case)

---

### **Depois (Declarativo):**

```typescript
// ✅ 1 linha apenas!
const clients = applyFilters(
    result.data || [],
    params,
    createBasicFilterConfig(['name', 'email'], 'isActive')
)
```

**Vantagens:**
- ✅ 1 linha vs 20+ linhas (95% redução!)
- ✅ Declarativo e legível
- ✅ Reutilizável em todos os módulos
- ✅ Normaliza buscas (remove acentos automaticamente!)
- ✅ Type-safe
- ✅ Manutenção centralizada

---

## 📦 API Completa

### **Função Principal: `applyFilters()`**

```typescript
function applyFilters<T>(
    data: T[],                // Array de dados
    params: FilterParams,     // Parâmetros da URL
    config: FilterConfig<T>   // Config de filtros
): T[]
```

#### **Parâmetros:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `data` | `T[]` | Array de dados a filtrar |
| `params` | `FilterParams` | Parâmetros da URL (`{ search, status, ... }`) |
| `config` | `FilterConfig<T>` | Configuração de quais campos filtrar |

#### **Config:**

```typescript
interface FilterConfig<T> {
    searchFields?: (keyof T)[]        // Campos para busca
    statusField?: keyof T             // Campo de status
    customFilters?: {                 // Filtros customizados
        [key: string]: (item: T, value: string) => boolean
    }
}
```

---

## 🚀 Exemplos Práticos

### **Exemplo 1: Clientes (Básico)**

```typescript
// src/app/app/admin/clients/page.tsx

const clients = applyFilters(
    result.data || [],
    await searchParams,
    createBasicFilterConfig(['name', 'email'], 'isActive')
)
```

**O que faz:**
- ✅ Busca em `name` e `email`
- ✅ Filtra por `isActive` (ativo/inativo)
- ✅ Normaliza strings (remove acentos)

**URL suportada:**
```
/app/admin/clients?search=projeto&status=true
```

---

### **Exemplo 2: Usuários (Básico)**

```typescript
// src/app/app/admin/users/page.tsx

const users = applyFilters(
    result.data || [],
    await searchParams,
    createBasicFilterConfig(['name', 'email'], 'isActive')
)
```

**Resultado:** Mesma lógica, código idêntico! 🎉

---

### **Exemplo 3: Com Filtro Customizado (Role)**

```typescript
const users = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['name', 'email'],
        statusField: 'isActive',
        customFilters: {
            // Filtro customizado para role
            role: (user, value) => user.role === value,
        }
    }
)
```

**URL suportada:**
```
/app/admin/users?search=joão&status=true&role=admin
```

**Resultado:**
- ✅ Busca "joão" em name e email
- ✅ Apenas usuários ativos
- ✅ Apenas role "admin"

---

### **Exemplo 4: Múltiplos Filtros Customizados**

```typescript
const users = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['name', 'email'],
        statusField: 'isActive',
        customFilters: {
            role: (user, value) => user.role === value,
            client: (user, value) => user.clientId === value,
            hasAccess: (user, value) => 
                value === 'true' ? user.lastLoginAt !== null : user.lastLoginAt === null,
        }
    }
)
```

**URL suportada:**
```
/app/admin/users?search=maria&status=true&role=gestor&client=123&hasAccess=true
```

---

### **Exemplo 5: Busca em Mais Campos**

```typescript
const events = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['title', 'description', 'location', 'organizerName'],
        statusField: 'isActive',
    }
)
```

**Resultado:** Busca em 4 campos diferentes automaticamente!

---

## 🎨 Recursos Avançados

### **1. Normalização Automática de Strings**

```typescript
// Busca: "projeto"
// Encontra: "Projeto", "PROJETO", "projeto", "Projétö" ✅

// Remove acentos automaticamente!
normalizeString("José") === normalizeString("Jose")  // true
```

**Benefício:** Busca mais tolerante e amigável.

---

### **2. Busca em Múltiplos Campos**

```typescript
searchFields: ['name', 'email', 'phone']
// Busca "joão" → Encontra em QUALQUER um dos 3 campos!
```

---

### **3. Filtros Customizados Ilimitados**

```typescript
customFilters: {
    minAge: (user, value) => user.age >= parseInt(value),
    maxAge: (user, value) => user.age <= parseInt(value),
    hasEmail: (user, value) => value === 'true' ? !!user.email : !user.email,
    createdAfter: (user, value) => new Date(user.createdAt) > new Date(value),
}
```

---

## 📊 Comparação: Antes vs Depois

### **ClientsPage:**

#### **Antes (32 linhas de filtros):**
```typescript
const params = await searchParams

let clients = result.data || []

if (params.search) {
    const searchLower = params.search.toLowerCase()
    clients = clients.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower)
    )
}

if (params.status) {
    const isActive = params.status === 'true'
    clients = clients.filter(c => c.isActive === isActive)
}

// Se tivesse phone, mais 5 linhas...
// Se tivesse clientId, mais 5 linhas...
// Se tivesse role, mais 5 linhas...
```

#### **Depois (4 linhas - 87% redução!):**
```typescript
const clients = applyFilters(
    result.data || [],
    await searchParams,
    createBasicFilterConfig(['name', 'email'], 'isActive')
)
```

**Redução:** **87% menos código!** 🎉

---

## 🔄 Reutilização em Outros Módulos

### **UsersPage:**

```typescript
// src/app/app/admin/users/page.tsx

const users = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['name', 'email'],
        statusField: 'isActive',
        customFilters: {
            role: (user, value) => user.role === value,
        }
    }
)
```

**Pronto!** Apenas copiar e ajustar os campos. 🎯

---

### **EventsPage:**

```typescript
// src/app/app/events/page.tsx

const events = applyFilters(
    result.data || [],
    await searchParams,
    createBasicFilterConfig(['title', 'description', 'location'], 'isActive')
)
```

---

### **ProductsPage:**

```typescript
const products = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['name', 'description', 'sku'],
        statusField: 'isActive',
        customFilters: {
            category: (product, value) => product.categoryId === value,
            minPrice: (product, value) => product.price >= parseFloat(value),
            maxPrice: (product, value) => product.price <= parseFloat(value),
            inStock: (product, value) => value === 'true' ? product.stock > 0 : product.stock === 0,
        }
    }
)
```

---

## 🎯 Helper Functions

### **1. `createBasicFilterConfig()`**

Atalho para o caso mais comum (search + status).

```typescript
createBasicFilterConfig(['name', 'email'], 'isActive')

// Equivalente a:
{
    searchFields: ['name', 'email'],
    statusField: 'isActive'
}
```

---

### **2. `hasActiveFilters()`**

Verifica se há filtros ativos.

```typescript
const params = { search: 'teste', status: '' }

if (hasActiveFilters(params)) {
    console.log('Usuário aplicou filtros!')
}
// true (porque search tem valor)
```

**Uso:** Mostrar badge/contador de filtros ativos.

---

### **3. `countActiveFilters()`**

Conta quantos filtros estão ativos.

```typescript
const params = { search: 'teste', status: 'true', role: 'admin' }

countActiveFilters(params)  // 3
```

**Uso:** Mostrar "3 filtros aplicados" na UI.

---

## 🎨 Casos de Uso Avançados

### **Caso 1: Filtro de Data**

```typescript
const events = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['title', 'description'],
        statusField: 'isActive',
        customFilters: {
            startDate: (event, value) => {
                const eventDate = new Date(event.startDate)
                const filterDate = new Date(value)
                return eventDate >= filterDate
            },
            endDate: (event, value) => {
                const eventDate = new Date(event.endDate)
                const filterDate = new Date(value)
                return eventDate <= filterDate
            },
        }
    }
)
```

**URL:**
```
/events?startDate=2025-01-01&endDate=2025-12-31
```

---

### **Caso 2: Filtro de Faixa Numérica**

```typescript
const products = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['name', 'sku'],
        customFilters: {
            minPrice: (product, value) => product.price >= parseFloat(value),
            maxPrice: (product, value) => product.price <= parseFloat(value),
        }
    }
)
```

**URL:**
```
/products?minPrice=100&maxPrice=500
```

---

### **Caso 3: Filtro por Relacionamento**

```typescript
const users = applyFilters(
    result.data || [],
    await searchParams,
    {
        searchFields: ['name', 'email'],
        statusField: 'isActive',
        customFilters: {
            client: (user, value) => user.clientId === value,
            hasClient: (user, value) => 
                value === 'true' ? user.clientId !== null : user.clientId === null,
        }
    }
)
```

**URL:**
```
/users?client=123abc
/users?hasClient=false  (usuários sem cliente)
```

---

### **Caso 4: Filtro Complexo (Múltiplas Condições)**

```typescript
customFilters: {
    // Usuários que logaram nos últimos X dias
    recentLogin: (user, value) => {
        if (!user.lastLoginAt) return false
        const days = parseInt(value)
        const limitDate = new Date()
        limitDate.setDate(limitDate.getDate() - days)
        return new Date(user.lastLoginAt) >= limitDate
    },
    
    // Usuários com permissões específicas
    hasPermission: (user, value) => 
        user.permissions?.includes(value) ?? false,
}
```

**URL:**
```
/users?recentLogin=30  (últimos 30 dias)
/users?hasPermission=create_event
```

---

## 📝 Estrutura da Página (Pattern)

### **Template Padrão:**

```typescript
interface PageProps {
    searchParams: Promise<{
        search?: string
        status?: string
        // ... outros filtros
    }>
}

export default async function Page({ searchParams }: PageProps) {
    // 1. Verificar permissão
    await checkPermission({ requireAdmin: true })

    // 2. Buscar dados
    const result = await getDataAction()
    
    // 3. Aplicar filtros (1 linha!)
    const filteredData = applyFilters(
        result.data || [],
        await searchParams,
        createBasicFilterConfig(['field1', 'field2'], 'isActive')
    )
    
    // 4. Renderizar
    return (
        <Wrapper.MaxWidth>
            <Filters />
            <Table data={filteredData} />
        </Wrapper.MaxWidth>
    )
}
```

---

## 🎨 Comparação Completa

### **ClientsPage - Antes:**

```typescript
export default async function ClientsPage({ searchParams }: Props) {
    await checkPermission({ requireAdmin: true })
    
    const result = await getClientsAction()
    const params = await searchParams
    
    // ❌ 20 linhas de código de filtros
    let clients = result.data || []
    
    if (params.search) {
        const searchLower = params.search.toLowerCase()
        clients = clients.filter(c => 
            c.name.toLowerCase().includes(searchLower) ||
            c.email.toLowerCase().includes(searchLower)
        )
    }
    
    if (params.status) {
        const isActive = params.status === 'true'
        clients = clients.filter(c => c.isActive === isActive)
    }
    
    return <ClientsTable clients={clients} />
}
```

**Total:** ~50 linhas

---

### **ClientsPage - Depois:**

```typescript
export default async function ClientsPage({ searchParams }: Props) {
    await checkPermission({ requireAdmin: true })
    
    const result = await getClientsAction()
    
    // ✅ 1 linha de código de filtros!
    const clients = applyFilters(
        result.data || [],
        await searchParams,
        createBasicFilterConfig(['name', 'email'], 'isActive')
    )
    
    return <ClientsTable clients={clients} />
}
```

**Total:** ~30 linhas (40% redução!)

---

## 🔧 Helper Functions

### **1. `createBasicFilterConfig()`**

Atalho para caso comum (search + status).

```typescript
// Forma curta
createBasicFilterConfig(['name', 'email'], 'isActive')

// Equivalente a:
{
    searchFields: ['name', 'email'],
    statusField: 'isActive'
}
```

---

### **2. `hasActiveFilters()`**

Verifica se há filtros aplicados.

```typescript
const params = { search: 'teste', status: '' }

if (hasActiveFilters(params)) {
    console.log('Há filtros ativos!')
}
```

**Uso:** Mostrar indicador visual de filtros ativos.

---

### **3. `countActiveFilters()`**

Conta filtros ativos.

```typescript
const params = { search: 'teste', status: 'true', role: 'admin' }

const count = countActiveFilters(params)  // 3
```

**Uso:** Badge "3 filtros aplicados" na UI.

---

## 🎯 Recursos do Sistema

### **1. Normalização Automática**

```typescript
// Busca: "jose"
// Encontra: "José", "JOSÉ", "jose", "JoSé" ✅
```

Remove acentos e ignora case automaticamente!

---

### **2. Busca em Múltiplos Campos**

```typescript
searchFields: ['name', 'email', 'phone']

// Busca "joão" encontra em QUALQUER campo!
```

---

### **3. Type-Safe**

```typescript
createBasicFilterConfig(['name', 'email'], 'isActive')
//                       ^^^^^^^^^^^^^^  ^^^^^^^^
//                       ✅ Autocomplete  ✅ Autocomplete
```

TypeScript valida que os campos existem no tipo!

---

### **4. Extensível**

Adicione quantos filtros customizados precisar:

```typescript
customFilters: {
    role: (item, value) => ...,
    client: (item, value) => ...,
    category: (item, value) => ...,
    minPrice: (item, value) => ...,
    maxPrice: (item, value) => ...,
    // ... infinitos filtros!
}
```

---

## 💡 Melhorias Futuras

### **1. Filtro de Array (Tags)**

```typescript
// URL: /posts?tags=react,nextjs,typescript
customFilters: {
    tags: (post, value) => {
        const searchTags = value.split(',')
        return searchTags.some(tag => post.tags.includes(tag))
    }
}
```

---

### **2. Ordenação Integrada**

```typescript
interface FilterConfig<T> {
    searchFields?: (keyof T)[]
    statusField?: keyof T
    sortField?: keyof T        // ← Campo para ordenar
    sortOrder?: 'asc' | 'desc' // ← Ordem
}

// URL: /clients?sortBy=name&order=asc
```

---

### **3. Paginação Integrada**

```typescript
interface FilterConfig<T> {
    // ... filtros
    pagination?: {
        page: number
        limit: number
    }
}

// URL: /clients?page=2&limit=20
```

---

## ✅ Checklist de Uso

Para usar filtros em uma nova página:

- [ ] Adicione `searchParams` ao props da página
- [ ] Defina interface com tipos dos filtros
- [ ] Busque dados com action
- [ ] Chame `applyFilters()` com config apropriado
- [ ] Use `createBasicFilterConfig()` se for simples
- [ ] Adicione `customFilters` se necessário
- [ ] Teste com diferentes combinações de filtros

---

## 📁 Estrutura de Arquivos

```
src/lib/utils/
└── filters.ts                     ← Sistema de filtros genérico

src/components/forms/filters/
├── GenericSearchFilterInput.tsx   ← Input de busca
├── ActiveStatusFilterSelect.tsx   ← Select de status
└── index.ts

src/components/ui/button/
├── SearchButton.tsx               ← Botão filtrar
└── CleanSearchButton.tsx          ← Botão limpar
```

---

## 🎉 Conclusão

**Sistema de Filtros Genérico:**
- ✅ 87% menos código nas páginas
- ✅ 1 linha para aplicar filtros
- ✅ Normalização automática (acentos)
- ✅ Reutilizável em todos os módulos
- ✅ Type-safe e extensível
- ✅ Suporta filtros customizados ilimitados
- ✅ Manutenção centralizada

**Agora você pode adicionar filtros em qualquer módulo em segundos!** 🚀🔍✨

---

## 📖 Referências

- **Implementação:** `src/lib/utils/filters.ts`
- **Exemplo Real:** `src/app/app/admin/clients/page.tsx`
- **Componentes UI:** `src/components/forms/filters/`
- **Documentação:** `_docs/COMPONENTES-FILTROS.MD`

