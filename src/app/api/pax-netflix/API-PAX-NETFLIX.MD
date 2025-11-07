# 📘 API Pax Netflix - Documentação

Documentação completa das funções disponíveis no módulo de Pax Netflix.

## 📦 Importação

```typescript
// Import tudo de uma vez
import { 
    PaxNetflix,                    // tipo
    GetPaxNetflixResponse,         // tipo de resposta
    getPaxByEmailAction,           // server action
    createPaxNetflixAction,        // server action
    paxNetflixService,             // client service
    usePaxNetflix,                 // hook para buscar
    useCreatePaxNetflix,           // hook para criar
    createPaxNetflixSchema,        // schema validação
    TRANSPORTE_OPTIONS,            // constantes
    RESTRICAO_ALIMENTAR_OPTIONS,   // constantes
    TAMANHO_CAMISETA_OPTIONS,      // constantes
} from '@/app/api/pax-netflix'
```

---

## 🔧 Server Actions (Servidor)

### `getPaxByEmailAction(email)`

Busca informações de um participante por email.

**Uso:**
```typescript
const result = await getPaxByEmailAction('usuario@example.com')

if (result.success) {
    console.log('Dados:', result.data)
    console.log('Evento:', result.data.event) // 'base' ou 'confirmed'
    console.log('Nome:', result.data.Name)
    console.log('Ticket:', result.data.eventTicket)
} else {
    console.error('Erro:', result.error)
}
```

**Parâmetros:**
- `email` (string): Email do participante cadastrado

**Retorno:**
```typescript
{
    success: boolean
    data?: GetPaxNetflixResponse
    error?: string
}
```

**Resposta de sucesso (`data`):**
```typescript
{
    event: 'base' | 'confirmed'
    paxData: {
        id: number
        Name: string
        Email: string
        Phone: string | null
        Cpf: string | null
        CompanyName: string
        Entered: boolean
        DateEntered: string
        eventTicket: {
            id: number
            ticket: {
                Name: string
                id: number
                Color: string
            }
            event: {
                Name: string
                id: number
            }
        }
        // ... outros campos
    }
    answersData?: {
        transporte: string[]
        restricaoAlimentar: string
        tamanhoCamiseta: string
    }
    // ... campos duplicados no root
}
```

**Erros possíveis:**
- `"E-mail é obrigatório"`
- `"Formato de e-mail inválido"`
- `"E-mail não encontrado. Verifique se você digitou corretamente o e-mail do convite."`
- `"CPF inválido"`

---

### `createPaxNetflixAction(data)`

Cria um novo participante no evento Netflix.

**Uso:**
```typescript
const result = await createPaxNetflixAction({
    Name: 'João Silva',
    Email: 'joao@example.com',
    Phone: '11999999999',
    CompanyName: 'AZ List',
    SearchKey: 'joao@example.com',
    Cpf: '12345678900', // opcional
    answersData: {
        transporte: ['Metrô', 'BRT'],
        restricaoAlimentar: 'Não, como de tudo',
        tamanhoCamiseta: 'G'
    }
})

if (result.success) {
    console.log('Participante criado:', result.data)
} else {
    console.error('Erro:', result.error)
}
```

**Parâmetros:**
```typescript
{
    Name: string                  // Nome completo
    Email: string                 // Email (único)
    Phone: string                 // Telefone
    CompanyName: string           // Nome da empresa/franquia
    SearchKey: string             // Chave de busca (geralmente o email)
    Cpf?: string                  // CPF (opcional, 11 dígitos)
    answersData?: {               // Respostas do questionário (opcional)
        transporte: string[]      // Lista de opções de transporte
        restricaoAlimentar: string
        tamanhoCamiseta: string
    }
}
```

**Retorno:**
```typescript
{
    success: boolean
    data?: CreatePaxNetflixResponse
    error?: string
}
```

**Erros possíveis:**
- `"Nome é obrigatório"`
- `"E-mail é obrigatório"`
- `"Telefone é obrigatório"`
- `"Nome da empresa é obrigatório"`
- `"Este e-mail já está cadastrado"`
- `"Nome inválido"`

---

## 🎣 Hooks TanStack Query (Cliente)

### `usePaxNetflix(email, enabled?)`

Hook para buscar participante por email com cache automático.

**Uso:**
```typescript
function MeuComponente() {
    const { data, isLoading, error, refetch } = usePaxNetflix('usuario@example.com')

    if (isLoading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error.message}</div>
    if (!data) return <div>Não encontrado</div>

    return (
        <div>
            <h1>{data.Name}</h1>
            <p>Email: {data.Email}</p>
            <p>Evento: {data.event}</p>
            <p>Ticket: {data.eventTicket.ticket.Name}</p>
        </div>
    )
}
```

**Parâmetros:**
- `email` (string): Email do participante
- `enabled` (boolean, opcional): Se a query deve executar automaticamente (padrão: `true`)

**Retorno (React Query):**
- `data`: Dados do participante
- `isLoading`: Se está carregando
- `error`: Erro caso ocorra
- `refetch()`: Função para recarregar
- `isSuccess`: Se teve sucesso
- `isError`: Se teve erro

---

### `useCreatePaxNetflix()`

Hook para criar novo participante com invalidação automática do cache.

**Uso:**
```typescript
function FormularioInscricao() {
    const { mutate, isPending, error } = useCreatePaxNetflix()

    const handleSubmit = (formData) => {
        mutate(formData, {
            onSuccess: (data) => {
                console.log('Criado com sucesso:', data)
                // Redirecionar ou mostrar sucesso
            },
            onError: (error) => {
                console.error('Erro:', error.message)
            }
        })
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit({
                Name: 'João Silva',
                Email: 'joao@example.com',
                Phone: '11999999999',
                CompanyName: 'AZ List',
                SearchKey: 'joao@example.com'
            })
        }}>
            <button type="submit" disabled={isPending}>
                {isPending ? 'Criando...' : 'Criar'}
            </button>
        </form>
    )
}
```

**Retorno (React Query Mutation):**
- `mutate(data, options)`: Função para executar
- `mutateAsync(data)`: Versão async
- `isPending`: Se está executando
- `error`: Erro caso ocorra
- `isSuccess`: Se teve sucesso
- `isError`: Se teve erro

---

## 🔑 Service Direto (Cliente)

### `paxNetflixService.getByEmail(email)`

Busca participante por email (client-side).

```typescript
try {
    const data = await paxNetflixService.getByEmail('usuario@example.com')
    console.log(data)
} catch (error) {
    console.error(error)
}
```

### `paxNetflixService.create(data)`

Cria novo participante (client-side).

```typescript
try {
    const newPax = await paxNetflixService.create({
        Name: 'João Silva',
        Email: 'joao@example.com',
        Phone: '11999999999',
        CompanyName: 'AZ List',
        SearchKey: 'joao@example.com'
    })
    console.log(newPax)
} catch (error) {
    console.error(error)
}
```

---

## ✅ Schemas de Validação (Zod)

### `createPaxNetflixSchema`

Schema para validar dados de criação.

```typescript
import { createPaxNetflixSchema } from '@/app/api/pax-netflix'

const result = createPaxNetflixSchema.safeParse({
    Name: 'João Silva',
    Email: 'joao@example.com',
    Phone: '11999999999',
    CompanyName: 'AZ List',
    SearchKey: 'joao@example.com'
})

if (result.success) {
    console.log('Dados válidos:', result.data)
} else {
    console.error('Erros:', result.error.errors)
}
```

### `emailSchema`

Schema para validar apenas email.

```typescript
import { emailSchema } from '@/app/api/pax-netflix'

const result = emailSchema.safeParse('usuario@example.com')
```

### `answersDataSchema`

Schema para validar respostas do questionário.

```typescript
import { answersDataSchema } from '@/app/api/pax-netflix'

const result = answersDataSchema.safeParse({
    transporte: ['Metrô', 'BRT'],
    restricaoAlimentar: 'Não, como de tudo',
    tamanhoCamiseta: 'G'
})
```

---

## 📊 Constantes

### Opções de Transporte

```typescript
import { TRANSPORTE_OPTIONS } from '@/app/api/pax-netflix'

TRANSPORTE_OPTIONS.AEREO                // "Aéreo"
TRANSPORTE_OPTIONS.ONIBUS_FORA_RJ       // "Ônibus (colaborador de fora do RJ)"
TRANSPORTE_OPTIONS.ONIBUS_RJ            // "Ônibus (colaborador do RJ)"
TRANSPORTE_OPTIONS.METRO                // "Metrô"
TRANSPORTE_OPTIONS.BRT                  // "BRT"
TRANSPORTE_OPTIONS.VEICULO_APLICATIVO   // "Veículo de aplicativo"
TRANSPORTE_OPTIONS.VEICULO_PARTICULAR   // "Veículo particular"
```

### Opções de Restrição Alimentar

```typescript
import { RESTRICAO_ALIMENTAR_OPTIONS } from '@/app/api/pax-netflix'

RESTRICAO_ALIMENTAR_OPTIONS.NAO          // "Não, como de tudo"
RESTRICAO_ALIMENTAR_OPTIONS.VEGETARIANO  // "Sim, sou vegetariano"
RESTRICAO_ALIMENTAR_OPTIONS.VEGANO       // "Sim, sou vegano"
RESTRICAO_ALIMENTAR_OPTIONS.INTOLERANTE  // "Sim, sou intolerante a glúten, lactose ou similares"
```

### Opções de Tamanho de Camiseta

```typescript
import { TAMANHO_CAMISETA_OPTIONS } from '@/app/api/pax-netflix'

TAMANHO_CAMISETA_OPTIONS.PP   // "PP"
TAMANHO_CAMISETA_OPTIONS.P    // "P"
TAMANHO_CAMISETA_OPTIONS.M    // "M"
TAMANHO_CAMISETA_OPTIONS.G    // "G"
TAMANHO_CAMISETA_OPTIONS.GG   // "GG"
TAMANHO_CAMISETA_OPTIONS.XG3  // "3G"
TAMANHO_CAMISETA_OPTIONS.XG4  // "4G"
TAMANHO_CAMISETA_OPTIONS.XG5  // "5G"
```

---

## 🎯 Exemplos de Uso Completo

### Exemplo 1: Tela de Login com Email

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPaxByEmailAction } from '@/app/api/pax-netflix'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const result = await getPaxByEmailAction(email)

        if (result.success) {
            // Salvar dados no sessionStorage ou context
            sessionStorage.setItem('paxData', JSON.stringify(result.data))
            router.push('/inscricao')
        } else {
            setError(result.error || 'Erro ao buscar participante')
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Buscando...' : 'Entrar'}
            </button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    )
}
```

### Exemplo 2: Formulário de Inscrição

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPaxNetflixSchema, type CreatePaxNetflixInput } from '@/app/api/pax-netflix'
import { createPaxNetflixAction } from '@/app/api/pax-netflix'

export default function InscricaoPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePaxNetflixInput>({
        resolver: zodResolver(createPaxNetflixSchema)
    })

    const onSubmit = async (data: CreatePaxNetflixInput) => {
        const result = await createPaxNetflixAction(data)
        
        if (result.success) {
            alert('Inscrição realizada com sucesso!')
        } else {
            alert(result.error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('Name')} placeholder="Nome completo" />
            {errors.Name && <span>{errors.Name.message}</span>}

            <input {...register('Email')} type="email" placeholder="Email" />
            {errors.Email && <span>{errors.Email.message}</span>}

            <input {...register('Phone')} placeholder="Telefone" />
            {errors.Phone && <span>{errors.Phone.message}</span>}

            <input {...register('CompanyName')} placeholder="Empresa" />
            {errors.CompanyName && <span>{errors.CompanyName.message}</span>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Inscrever'}
            </button>
        </form>
    )
}
```

---

## 🔐 Autenticação

Esta API usa um **token fixo** configurado em `API_CONFIG.NETFLIX.TOKEN`.

O token é automaticamente incluído em todas as requisições via header `Authorization: Bearer TOKEN`.

---

## 🌐 Endpoint Base

```
https://api-rds-aztools.onrender.com
```

### Endpoints disponíveis:
- `GET /api/pax/netflix/:email` - Buscar por email
- `POST /api/pax/netflix` - Criar participante

---

## 📝 Observações

1. **CompanyName** é usado como "Franquia" no contexto deste evento
2. **SearchKey** geralmente é o mesmo valor do email
3. **answersData** é opcional na criação
4. O campo **event** na resposta pode ser `'base'` ou `'confirmed'` indicando o status do participante
5. Todos os hooks usam cache de 5 minutos por padrão

