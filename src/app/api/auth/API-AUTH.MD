# 📘 API Auth - Documentação

Documentação completa das funções disponíveis no módulo de autenticação.

---

## 📦 Importação

```typescript
// Import tudo de uma vez
import { 
    // Tipos
    LoginCredentials,
    User,
    LoginResponse,
    RefreshTokenResponse,
    ActionResponse,
    AuthState,
    
    // Server Actions
    loginAction,
    logoutAction,
    getCurrentUser,
    isAuthenticated,
    refreshTokenAction,
    getAccessToken,
    
    // Schemas Zod
    loginSchema,
    recoverySchema,
    resetPasswordSchema,
    acceptInviteSchema,
} from '@/app/api/auth'
```

---

## 🎯 Visão Geral

O módulo de autenticação é **exclusivamente server-side** por segurança. Não possui:
- ❌ `auth.service.ts` - Credenciais nunca vão para o client
- ❌ `useAuth.ts` - Login/logout rodam no servidor

**Características**:
- ✅ Cookies httpOnly (tokens seguros)
- ✅ Server Actions apenas
- ✅ Refresh automático de tokens
- ✅ Validação Zod

---

## 📐 Tipos

### `LoginCredentials`
```typescript
interface LoginCredentials {
    email: string
    password: string
}
```

### `User`
```typescript
interface User {
    id: string
    name: string
    email: string
    clientId: string | null  // null para admins
    role: 'admin' | 'operador' | 'gestor' | 'assistente'
    isAdmin: boolean
    isActive: boolean
}
```

### `ActionResponse<T>`
```typescript
interface ActionResponse<T = void> {
    success: boolean
    error?: string
    data?: T
}
```

---

## 🔧 Server Actions

### `loginAction(credentials)`

Realiza o login do usuário.

**Parâmetros:**
```typescript
credentials: LoginCredentials
```

**Retorno:**
```typescript
Promise<ActionResponse<{ user: User; accessToken: string; refreshToken: string }>>
```

**Exemplo:**
```typescript
'use server'
import { loginAction } from '@/app/api/auth'

// Em um formulário ou Server Action
const result = await loginAction({
    email: 'user@example.com',
    password: 'senha123'
})

if (result.success) {
    console.log('Usuário logado:', result.data.user)
    // Tokens salvos automaticamente em cookies
} else {
    console.error('Erro:', result.error)
}
```

**Comportamento:**
- ✅ Valida email e senha
- ✅ Chama API `/auth/login`
- ✅ Salva tokens em cookies httpOnly
- ✅ Salva dados do usuário em cookie (não httpOnly)
- ✅ Retorna erro amigável mapeado

**Códigos de erro mapeados:**
- `invalid_credentials` → "Email ou senha incorretos"
- `invalid_inactive_user` → "Sua conta está desativada"
- `credentials_required` → "Email e senha são obrigatórios"
- `invalid_email_format` → "Formato de email inválido"

---

### `logoutAction()`

Realiza o logout do usuário.

**Retorno:**
```typescript
Promise<ActionResponse>
```

**Exemplo:**
```typescript
'use server'
import { logoutAction } from '@/app/api/auth'

const result = await logoutAction()

if (result.success) {
    console.log('Logout realizado')
    // Cookies removidos
}
```

**Comportamento:**
- ✅ Remove `access_token` cookie
- ✅ Remove `refresh_token` cookie
- ✅ Remove `user_data` cookie

---

### `getCurrentUser()`

Busca dados do usuário logado do cookie.

**Retorno:**
```typescript
Promise<User | null>
```

**Exemplo:**
```typescript
import { getCurrentUser } from '@/app/api/auth'

// Em Server Component
export default async function ProfilePage() {
    const user = await getCurrentUser()
    
    if (!user) {
        redirect('/auth/login')
    }
    
    return <div>Olá, {user.name}!</div>
}
```

**Comportamento:**
- ✅ Lê cookie `user_data`
- ✅ Retorna `User` ou `null`
- ✅ Útil para Server Components

---

### `isAuthenticated()`

Verifica se o usuário está autenticado.

**Retorno:**
```typescript
Promise<boolean>
```

**Exemplo:**
```typescript
import { isAuthenticated } from '@/app/api/auth'

// Em middleware ou Server Component
export default async function ProtectedPage() {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
        redirect('/auth/login')
    }
    
    return <ProtectedContent />
}
```

**Comportamento:**
- ✅ Verifica existência de `access_token`
- ✅ Retorna `true` ou `false`

---

### `refreshTokenAction()`

Renova o accessToken usando o refreshToken.

**Retorno:**
```typescript
Promise<ActionResponse<{ accessToken: string }>>
```

**Exemplo:**
```typescript
import { refreshTokenAction } from '@/app/api/auth'

const result = await refreshTokenAction()

if (result.success) {
    console.log('Token renovado')
} else {
    console.error('Token expirado, fazer login novamente')
}
```

**Comportamento:**
- ✅ Usa `refresh_token` do cookie
- ✅ Chama API `/auth/refresh-token`
- ✅ Atualiza `access_token` cookie
- ✅ Se falhar, faz logout automático

**Códigos de erro que causam logout:**
- `invalid_refresh_token`
- `user_not_found`
- `user_inactive`

---

### `getAccessToken()`

Pega o access token atual do cookie.

**Retorno:**
```typescript
Promise<string | null>
```

**Exemplo:**
```typescript
import { getAccessToken } from '@/app/api/auth'

// Para fazer requisições autenticadas em Server Components
const token = await getAccessToken()

if (token) {
    // Fazer requisição com token
}
```

**Comportamento:**
- ✅ Retorna token ou `null`
- ✅ Útil para requisições customizadas

---

## ✅ Schemas Zod

### `loginSchema`

Valida dados de login.

**Schema:**
```typescript
z.object({
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
})
```

**Uso:**
```typescript
import { loginSchema } from '@/app/api/auth'

const result = loginSchema.safeParse({
    email: 'user@example.com',
    password: 'senha123'
})

if (!result.success) {
    console.error(result.error.errors)
}
```

---

### `recoverySchema`

Valida email para recuperação de senha.

**Schema:**
```typescript
z.object({
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
})
```

---

### `resetPasswordSchema`

Valida redefinição de senha.

**Schema:**
```typescript
z.object({
    token: z.string().min(1, 'Token é obrigatório'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
})
```

---

### `acceptInviteSchema`

Valida aceite de convite.

**Schema:**
```typescript
z.object({
    token: z.string().min(1, 'Token é obrigatório'),
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
})
```

---

## 🔐 Fluxo de Autenticação

### Login
```
1. Usuário preenche formulário
2. Valida com loginSchema
3. Chama loginAction()
4. API retorna tokens + dados do usuário
5. Tokens salvos em cookies httpOnly
6. Usuário redirecionado
```

### Requisições Autenticadas
```
1. serverApi verifica cookie access_token
2. Adiciona header Authorization: Bearer {token}
3. API valida token
4. Retorna dados
```

### Refresh Token
```
1. API retorna 401 (token expirado)
2. Interceptor detecta 401
3. Chama refreshTokenAction()
4. Novo access_token salvo
5. Requisição original reenviada
```

### Logout
```
1. Chama logoutAction()
2. Cookies removidos
3. Usuário redirecionado para login
```

---

## 🎯 Exemplo Completo: Formulário de Login

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/api/auth'
import { loginSchema } from '@/app/api/auth'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        
        // Valida com Zod
        const validation = loginSchema.safeParse({ email, password })
        if (!validation.success) {
            setError(validation.error.errors[0].message)
            setLoading(false)
            return
        }
        
        // Chama Server Action
        const result = await loginAction({ email, password })
        
        if (result.success) {
            router.push('/app')
            router.refresh()
        } else {
            setError(result.error || 'Erro ao fazer login')
        }
        
        setLoading(false)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}
```

---

## 🔗 Links Relacionados

- [Documentação Geral de APIs](../../../docs/API.MD)
- [Criar Novo Módulo](../../../docs/ai/CRIAR-NOVA-API.md)

---

## 💡 Dicas

1. **Sempre use Server Actions** para auth (nunca client-side)
2. **Valide com Zod** antes de enviar para a action
3. **Trate erros** de forma amigável para o usuário
4. **Use `getCurrentUser()`** em Server Components
5. **Refresh automático** é gerenciado pelos interceptors

🔒 **Segurança em primeiro lugar!**

