# 📘 API Users - Documentação

Documentação completa das funções disponíveis no módulo de usuários.

---

## 📦 Importação

```typescript
// Import tudo de uma vez
import { 
    // Tipos
    User,
    USER_ROLES,
    UserRole,
    CreateUserDto,
    UpdateUserDto,
    ChangePasswordDto,
    UpdatePrivilegesDto,
    UserFilters,
    UserActionResponse,
    
    // Server Actions
    getUsersAction,
    getUserByIdAction,
    createUserAction,
    updateUserAction,
    deleteUserAction,
    changePasswordAction,
    updatePrivilegesAction,
    
    // Client Service
    usersService,
    
    // Hooks React Query
    useUsers,
    useUser,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useChangePassword,
    useUpdatePrivileges,
    usersKeys,
    
    // Schemas Zod
    createUserSchema,
    updateUserSchema,
    changePasswordSchema,
    updatePrivilegesSchema,
    userFiltersSchema,
} from '@/app/api/users'
```

---

## 🎯 Visão Geral

O módulo de usuários é o mais completo, com operações CRUD + extras:
- ✅ **CRUD básico** (listar, buscar, criar, editar, deletar)
- ✅ **Alterar senha** (própria ou de outros usuários)
- ✅ **Atualizar privilégios** (role, isAdmin)

**Requisitos de Permissão:**
- 📌 Listar/buscar: requer autenticação
- 📌 Criar/editar/deletar: apenas **admins**
- 📌 Alterar senha: próprio usuário ou admin
- 📌 Atualizar privilégios: apenas **admins**

---

## 📐 Tipos

### `User`
```typescript
interface User {
    _id: string
    clientId: string | null  // null para super admins
    name: string
    email: string
    role: UserRole
    isAdmin: boolean
    isActive: boolean
    lastLogin?: string  // ISO date
    createdAt: string   // ISO date
    updatedAt: string   // ISO date
    __v: number
}
```

### `USER_ROLES` e `UserRole`
```typescript
const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    COMPANY: 'company',
    USER: 'user',
} as const

type UserRole = 'admin' | 'manager' | 'company' | 'user'
```

### `CreateUserDto`
```typescript
interface CreateUserDto {
    clientId?: string  // Obrigatório para não-admins
    name: string
    email: string
    password: string
    role: UserRole
}
```

### `UpdateUserDto`
```typescript
interface UpdateUserDto {
    clientId?: string
    name?: string
    email?: string
    role?: UserRole
    isActive?: boolean
}
```

### `ChangePasswordDto`
```typescript
interface ChangePasswordDto {
    currentPassword?: string  // Opcional quando admin altera de outro
    newPassword: string
    confirmPassword: string
}
```

### `UpdatePrivilegesDto`
```typescript
interface UpdatePrivilegesDto {
    role?: UserRole
    isAdmin?: boolean
}
```

### `UserFilters`
```typescript
interface UserFilters {
    search?: string       // Busca por nome ou email
    role?: UserRole
    isActive?: boolean
    clientId?: string
}
```

---

## 🔧 Server Actions

Use em **Server Components** ou **Server Actions**.

### `getUsersAction()`

Lista todos os usuários.

**Retorno:**
```typescript
Promise<UserActionResponse<User[]>>
```

**Exemplo:**
```typescript
import { getUsersAction } from '@/app/api/users'

export default async function UsersPage() {
    const result = await getUsersAction()
    
    if (!result.success) {
        return <Error message={result.error} />
    }
    
    return <UsersList users={result.data} />
}
```

**Permissões:** Requer autenticação

---

### `getUserByIdAction(id)`

Busca um usuário específico por ID.

**Parâmetros:**
```typescript
id: string  // ID do usuário
```

**Retorno:**
```typescript
Promise<UserActionResponse<User>>
```

**Exemplo:**
```typescript
import { getUserByIdAction } from '@/app/api/users'

export default async function UserPage({ params }: { params: { id: string } }) {
    const result = await getUserByIdAction(params.id)
    
    if (!result.success) {
        return <Error message={result.error} />
    }
    
    return <UserDetails user={result.data} />
}
```

**Permissões:** Requer autenticação

---

### `createUserAction(data)`

Cria um novo usuário.

**Parâmetros:**
```typescript
data: CreateUserDto
```

**Retorno:**
```typescript
Promise<UserActionResponse<User>>
```

**Exemplo:**
```typescript
'use server'
import { createUserAction } from '@/app/api/users'

export async function handleCreateUser(formData: FormData) {
    const result = await createUserAction({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        role: formData.get('role') as UserRole,
        clientId: formData.get('clientId') as string,
    })
    
    if (result.success) {
        redirect(`/app/users/${result.data._id}`)
    }
    
    return result
}
```

**Comportamento:**
- ✅ Valida dados obrigatórios
- ✅ Cria usuário na API
- ✅ Revalida rotas relacionadas
- ✅ Envia email de convite (se habilitado na API)

**Permissões:** Requer admin

**Códigos de erro comuns:**
- `duplicate_email` → "Este email já está cadastrado"
- `invalid_email_format` → "Email inválido"
- `invalid_client_not_found` → "Cliente não encontrado"

---

### `updateUserAction(id, data)`

Atualiza um usuário existente.

**Parâmetros:**
```typescript
id: string         // ID do usuário
data: UpdateUserDto
```

**Retorno:**
```typescript
Promise<UserActionResponse<User>>
```

**Exemplo:**
```typescript
'use server'
import { updateUserAction } from '@/app/api/users'

export async function handleUpdateUser(id: string, formData: FormData) {
    const result = await updateUserAction(id, {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as UserRole,
        isActive: formData.get('isActive') === 'true',
    })
    
    return result
}
```

**Comportamento:**
- ✅ Atualiza apenas campos fornecidos
- ✅ Revalida rotas relacionadas
- ✅ Retorna usuário atualizado

**Permissões:** Requer admin

---

### `deleteUserAction(id)`

Deleta um usuário (soft delete).

**Parâmetros:**
```typescript
id: string  // ID do usuário
```

**Retorno:**
```typescript
Promise<UserActionResponse>
```

**Exemplo:**
```typescript
'use server'
import { deleteUserAction } from '@/app/api/users'

export async function handleDeleteUser(id: string) {
    const result = await deleteUserAction(id)
    
    if (result.success) {
        redirect('/app/users')
    }
    
    return result
}
```

**Comportamento:**
- ✅ Soft delete (isActive = false)
- ✅ Revalida rotas relacionadas

**Permissões:** Requer admin

---

### `changePasswordAction(id, data)`

Altera a senha de um usuário.

**Parâmetros:**
```typescript
id: string              // ID do usuário
data: ChangePasswordDto
```

**Retorno:**
```typescript
Promise<UserActionResponse<{ userId: string; passwordChangedAt: string }>>
```

**Exemplo:**
```typescript
'use server'
import { changePasswordAction } from '@/app/api/users'

// Usuário alterando própria senha
export async function handleChangeOwnPassword(
    userId: string,
    formData: FormData
) {
    const result = await changePasswordAction(userId, {
        currentPassword: formData.get('currentPassword') as string,
        newPassword: formData.get('newPassword') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    })
    
    if (result.success) {
        return { success: true, message: 'Senha alterada!' }
    }
    
    return result
}

// Admin alterando senha de outro usuário
export async function handleAdminChangePassword(
    userId: string,
    newPassword: string
) {
    const result = await changePasswordAction(userId, {
        // currentPassword não é necessário para admin
        newPassword,
        confirmPassword: newPassword,
    })
    
    return result
}
```

**Comportamento:**
- ✅ Valida senha atual (se fornecida)
- ✅ Valida confirmação de senha
- ✅ Admin pode alterar sem senha atual
- ✅ Revalida rotas relacionadas

**Permissões:** Próprio usuário ou admin

**Códigos de erro comuns:**
- `invalid_current_password` → "Senha atual incorreta"
- `passwords_mismatch` → "As senhas não conferem"

---

### `updatePrivilegesAction(id, data)`

Atualiza privilégios de um usuário (role, isAdmin).

**Parâmetros:**
```typescript
id: string                 // ID do usuário
data: UpdatePrivilegesDto
```

**Retorno:**
```typescript
Promise<UserActionResponse<User>>
```

**Exemplo:**
```typescript
'use server'
import { updatePrivilegesAction } from '@/app/api/users'

export async function handleUpdatePrivileges(
    userId: string,
    formData: FormData
) {
    const result = await updatePrivilegesAction(userId, {
        role: formData.get('role') as UserRole,
        isAdmin: formData.get('isAdmin') === 'true',
    })
    
    return result
}
```

**Comportamento:**
- ✅ Atualiza role e/ou isAdmin
- ✅ Revalida rotas relacionadas
- ✅ Retorna usuário atualizado

**Permissões:** Requer admin

---

## 🌐 Client Service

**⚠️ NÃO use diretamente!** Use os **hooks** abaixo.

O `usersService` é usado internamente pelos hooks React Query.

```typescript
export const usersService = {
    getAll: async (): Promise<User[]>
    getById: async (id: string): Promise<User>
    create: async (data: CreateUserDto): Promise<User>
    update: async (id: string, data: UpdateUserDto): Promise<User>
    delete: async (id: string): Promise<void>
    changePassword: async (id: string, data: ChangePasswordDto): Promise<{ userId: string; passwordChangedAt: string }>
    updatePrivileges: async (id: string, data: UpdatePrivilegesDto): Promise<User>
}
```

---

## 🪝 Hooks React Query

Use em **Client Components** para cache automático.

### `useUsers()`

Lista todos os usuários com cache.

**Retorno:**
```typescript
{
    data: User[] | undefined
    isLoading: boolean
    error: Error | null
    refetch: () => void
    // ... outros campos do useQuery
}
```

**Exemplo:**
```typescript
'use client'
import { useUsers } from '@/app/api/users'

export default function UsersList() {
    const { data: users, isLoading, error } = useUsers()
    
    if (isLoading) return <Spinner />
    if (error) return <Error message={error.message} />
    if (!users) return null
    
    return (
        <table>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
```

**Cache:** 5 minutos (staleTime)

---

### `useUser(id, enabled?)`

Busca um usuário específico por ID.

**Parâmetros:**
```typescript
id: string
enabled?: boolean  // Default: true
```

**Retorno:**
```typescript
{
    data: User | undefined
    isLoading: boolean
    error: Error | null
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useUser } from '@/app/api/users'

export default function UserDetails({ id }: { id: string }) {
    const { data: user, isLoading, error } = useUser(id)
    
    if (isLoading) return <Spinner />
    if (error) return <Error />
    if (!user) return null
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>Role: {user.role}</p>
            <p>Admin: {user.isAdmin ? 'Sim' : 'Não'}</p>
        </div>
    )
}
```

**Cache:** 5 minutos (staleTime)

---

### `useCreateUser()`

Hook para criar um usuário com mutation.

**Retorno:**
```typescript
{
    mutate: (data: CreateUserDto, options?) => void
    mutateAsync: (data: CreateUserDto) => Promise<User>
    isPending: boolean
    isError: boolean
    error: Error | null
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useCreateUser } from '@/app/api/users'
import { createUserSchema } from '@/app/api/users'

export default function CreateUserForm() {
    const { mutate, isPending } = useCreateUser()
    
    const handleSubmit = (data: CreateUserDto) => {
        // Valida com Zod
        const validation = createUserSchema.safeParse(data)
        if (!validation.success) {
            // Mostra erros
            return
        }
        
        mutate(validation.data, {
            onSuccess: (user) => {
                toast.success('Usuário criado!')
                router.push(`/app/users/${user._id}`)
                // Cache da lista é invalidado automaticamente!
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }
    
    return <form>...</form>
}
```

**Comportamento:**
- ✅ Invalida automaticamente `usersKeys.lists()`

---

### `useUpdateUser()`

Hook para atualizar um usuário.

**Retorno:**
```typescript
{
    mutate: ({ id, data }: { id: string, data: UpdateUserDto }, options?) => void
    mutateAsync: ({ id, data }) => Promise<User>
    isPending: boolean
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useUpdateUser } from '@/app/api/users'

export default function EditUserForm({ user }: { user: User }) {
    const { mutate, isPending } = useUpdateUser()
    
    const handleSubmit = (data: UpdateUserDto) => {
        mutate(
            { id: user._id, data },
            {
                onSuccess: () => {
                    toast.success('Usuário atualizado!')
                    // Cache é atualizado automaticamente!
                }
            }
        )
    }
    
    return <form>...</form>
}
```

**Comportamento:**
- ✅ Atualiza cache do usuário específico com `setQueryData`
- ✅ Invalida `usersKeys.lists()`

---

### `useDeleteUser()`

Hook para deletar um usuário.

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
import { useDeleteUser } from '@/app/api/users'

export default function DeleteUserButton({ id }: { id: string }) {
    const { mutate, isPending } = useDeleteUser()
    
    const handleDelete = () => {
        if (!confirm('Tem certeza?')) return
        
        mutate(id, {
            onSuccess: () => {
                toast.success('Usuário removido!')
                router.push('/app/users')
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
- ✅ Invalida `usersKeys.lists()`

---

### `useChangePassword()`

Hook para alterar senha de um usuário.

**Retorno:**
```typescript
{
    mutate: ({ id, data }: { id: string, data: ChangePasswordDto }, options?) => void
    mutateAsync: ({ id, data }) => Promise<{ userId: string; passwordChangedAt: string }>
    isPending: boolean
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useChangePassword } from '@/app/api/users'
import { changePasswordSchema } from '@/app/api/users'

export default function ChangePasswordForm({ userId }: { userId: string }) {
    const { mutate, isPending } = useChangePassword()
    
    const handleSubmit = (data: ChangePasswordDto) => {
        // Valida com Zod
        const validation = changePasswordSchema.safeParse(data)
        if (!validation.success) {
            // Mostra erros
            return
        }
        
        mutate(
            { id: userId, data: validation.data },
            {
                onSuccess: () => {
                    toast.success('Senha alterada!')
                    // Cache é invalidado automaticamente!
                },
                onError: (error) => {
                    toast.error(error.message)
                }
            }
        )
    }
    
    return <form>...</form>
}
```

**Comportamento:**
- ✅ Invalida `usersKeys.detail(id)`
- ✅ Invalida `usersKeys.lists()`

---

### `useUpdatePrivileges()`

Hook para atualizar privilégios de um usuário.

**Retorno:**
```typescript
{
    mutate: ({ id, data }: { id: string, data: UpdatePrivilegesDto }, options?) => void
    mutateAsync: ({ id, data }) => Promise<User>
    isPending: boolean
    // ...
}
```

**Exemplo:**
```typescript
'use client'
import { useUpdatePrivileges } from '@/app/api/users'
import { updatePrivilegesSchema } from '@/app/api/users'

export default function UpdatePrivilegesForm({ user }: { user: User }) {
    const { mutate, isPending } = useUpdatePrivileges()
    
    const handleSubmit = (data: UpdatePrivilegesDto) => {
        // Valida com Zod
        const validation = updatePrivilegesSchema.safeParse(data)
        if (!validation.success) {
            return
        }
        
        mutate(
            { id: user._id, data: validation.data },
            {
                onSuccess: () => {
                    toast.success('Privilégios atualizados!')
                }
            }
        )
    }
    
    return <form>...</form>
}
```

**Comportamento:**
- ✅ Atualiza cache do usuário específico
- ✅ Invalida `usersKeys.lists()`

---

## ✅ Schemas Zod

### `createUserSchema`

Valida dados para criar usuário.

**Schema:**
```typescript
z.object({
    name: z.string().min(3).max(100),
    email: z.string().email().max(100),
    password: z.string().min(8).max(50),
    role: z.enum(['admin', 'user']),
    clientId: z.string().min(1).optional(),
})
```

---

### `updateUserSchema`

Valida dados para atualizar usuário.

**Schema:**
```typescript
z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().max(100).optional(),
    role: z.enum(['admin', 'user']).optional(),
    clientId: z.string().optional(),
    isActive: z.boolean().optional(),
})
```

---

### `changePasswordSchema`

Valida alteração de senha.

**Schema:**
```typescript
z.object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string().min(8).max(50),
})
```

---

### `updatePrivilegesSchema`

Valida atualização de privilégios.

**Schema:**
```typescript
z.object({
    isAdmin: z.boolean(),
})
```

---

### `userFiltersSchema`

Valida filtros de busca.

**Schema:**
```typescript
z.object({
    search: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
    isActive: z.boolean().optional(),
    clientId: z.string().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().max(100).optional(),
})
```

---

## 🔑 Query Keys

```typescript
import { usersKeys } from '@/app/api/users'

// Estrutura das keys
usersKeys = {
    all: ['users'],
    lists: () => ['users', 'list'],
    list: (filters?) => ['users', 'list', filters],
    details: () => ['users', 'detail'],
    detail: (id) => ['users', 'detail', id],
}
```

---

## 🎯 Exemplo Completo: CRUD + Extras

```typescript
'use client'
import { 
    useUsers,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useChangePassword,
    useUpdatePrivileges,
} from '@/app/api/users'

export default function UsersManager() {
    const { data: users, isLoading } = useUsers()
    const createUser = useCreateUser()
    const updateUser = useUpdateUser()
    const deleteUser = useDeleteUser()
    const changePassword = useChangePassword()
    const updatePrivileges = useUpdatePrivileges()
    
    // ... implementação dos handlers
    
    return (
        <div>
            {/* Lista, formulários, etc */}
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
2. **Valide com Zod** antes de enviar dados
3. **Alterar senha**: admin não precisa de senha atual
4. **Privilégios**: só admins podem alterar
5. **Soft delete**: usuário não é removido, apenas desativado

🚀 **Gerenciamento completo de usuários!**

