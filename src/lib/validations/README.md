# 🔍 Sistema de Validações Centralizadas

Sistema de validações Zod reutilizáveis para **formulários** (não para APIs).

---

## 🎯 Filosofia

### ✅ O Que São Estas Validações?

Validações **client-side** para formulários React:
- **Objetivo:** Melhorar UX com feedback visual
- **Onde:** Componentes de formulário
- **Quando:** Ao digitar, blur, submit (configurável)

### ❌ O Que NÃO São?

**NÃO são validações de API:**
- Server Actions **não validam** com Zod
- Backend é a **única fonte da verdade**
- Validação aqui é apenas para **experiência do usuário**

---

## 📁 Estrutura

```
src/lib/validations/
├── common.ts          # Validações reutilizáveis (email, phone, etc)
├── clients.ts         # Schemas de formulários de clientes
├── users.ts           # Schemas de formulários de usuários
├── index.ts           # Barrel export
└── README.md          # Esta documentação
```

---

## 📦 Arquivos

### `common.ts` - Validações Reutilizáveis

Validações genéricas que podem ser usadas em qualquer formulário:

```ts
import { commonValidations } from '@/lib/validations/common'

// Email
commonValidations.email
commonValidations.emailOptional

// Telefone
commonValidations.phone
commonValidations.phoneOptional

// Nomes
commonValidations.companyName
commonValidations.personName

// Senha
commonValidations.password
commonValidations.passwordStrong

// Boolean
commonValidations.isActive
commonValidations.isActiveOptional

// Paginação
commonValidations.page
commonValidations.limit

// Texto
commonValidations.shortText    // até 50 chars
commonValidations.mediumText   // até 200 chars
commonValidations.longText     // até 1000 chars

// Números
commonValidations.positiveNumber
commonValidations.nonNegativeNumber

// Datas
commonValidations.date
commonValidations.dateOptional

// IDs
commonValidations.mongoId
```

### `clients.ts` - Schemas de Clientes

Schemas específicos para formulários de clientes:

```ts
import { createClientFormSchema } from '@/lib/validations/clients'

// Para criar cliente
createClientFormSchema

// Para editar cliente
updateClientFormSchema

// Para filtros
clientFiltersSchema
```

---

## 🎨 Como Usar

### 1. Criar Schema Novo (Exemplo: Fornecedores)

```ts
// src/lib/validations/suppliers.ts
import { z } from 'zod'
import { commonValidations } from './common'

export const createSupplierFormSchema = z.object({
    name: commonValidations.companyName,
    email: commonValidations.email,
    phone: commonValidations.phoneOptional,
    cnpj: z.string()
        .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
})

export type CreateSupplierFormInput = z.infer<typeof createSupplierFormSchema>
```

### 2. Usar em Custom Hook

```ts
// src/components/modules/suppliers/hooks/useSupplierCreateForm.ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSupplierFormSchema } from '@/lib/validations/suppliers'

export function useSupplierCreateForm() {
    const form = useForm({
        resolver: zodResolver(createSupplierFormSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    })

    // ... lógica de submit
}
```

### 3. Usar no Componente

```tsx
// src/components/modules/suppliers/SupplierCreateForm.tsx
import { useSupplierCreateForm } from './hooks'

export function SupplierCreateForm() {
    const { form, onSubmit, isLoading } = useSupplierCreateForm()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <TextField name="name" control={form.control} />
            {/* ... */}
        </form>
    )
}
```

---

## ✅ Vantagens desta Estrutura

### 1. **Consistência**
Mesmas regras de validação em todo o sistema:
```ts
// ✅ Todos os emails validam da mesma forma
email: commonValidations.email
```

### 2. **Reutilização**
Uma validação, múltiplos usos:
```ts
// Clientes usam
email: commonValidations.email

// Usuários usam
email: commonValidations.email

// Fornecedores usam
email: commonValidations.email
```

### 3. **Manutenção Centralizada**
Mudar validação em um lugar afeta todos:
```ts
// Atualizar em common.ts
email: z.string()
    .email('Email inválido')
    .endsWith('@empresa.com', 'Apenas emails corporativos') // ✨ Nova regra

// Automaticamente reflete em:
// - Clientes
// - Usuários  
// - Fornecedores
// - etc...
```

### 4. **Mensagens Padronizadas**
Usuários veem mensagens consistentes:
- "Email inválido" (sempre igual)
- "Nome deve ter no mínimo 3 caracteres" (sempre igual)

### 5. **DRY (Don't Repeat Yourself)**
Sem duplicação de código!

---

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────┐
│  1. Usuário preenche formulário                 │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  2. Validação Zod (lib/validations)             │
│     ✅ Feedback visual instantâneo              │
│     ✅ Mensagens em português                   │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  3. Custom Hook (components/.../hooks)          │
│     • Transforma dados (FormInput → DTO)        │
│     • Chama Server Action                       │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  4. Server Action (app/api/.../action.ts)       │
│     ❌ Sem validação Zod                        │
│     • Apenas envia para API                     │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  5. Backend API                                  │
│     ✅ Validação definitiva                     │
│     ✅ Única fonte da verdade                   │
│     ✅ Segurança                                │
└─────────────────────────────────────────────────┘
```

---

## 📚 Helpers

### `createSearchSchema`

Helper para criar schemas de busca/filtro rapidamente:

```ts
// Básico (apenas search, page, limit)
const myFiltersSchema = createSearchSchema()

// Com campos adicionais
const myFiltersSchema = createSearchSchema({
    isActive: z.boolean().optional(),
    category: z.string().optional(),
})
```

---

## 🚨 Regras Importantes

### ❌ NÃO faça:

1. **Não valide nas Server Actions:**
   ```ts
   // ❌ ERRADO
   export async function createClientAction(data: CreateClientDto) {
       const validation = schema.safeParse(data) // ❌
       // ...
   }
   ```

2. **Não duplique validações:**
   ```ts
   // ❌ ERRADO
   email: z.string().email('Email inválido') // Em 10 lugares diferentes
   
   // ✅ CERTO
   email: commonValidations.email // Em 1 lugar, usado em 10
   ```

3. **Não misture validações de form com API:**
   ```ts
   // ❌ ERRADO - colocar em src/app/api/
   
   // ✅ CERTO - colocar em src/lib/validations/
   ```

### ✅ FAÇA:

1. **Use validações comuns:**
   ```ts
   // ✅ CERTO
   import { commonValidations } from '@/lib/validations/common'
   
   email: commonValidations.email
   ```

2. **Crie schemas específicos por módulo:**
   ```ts
   // ✅ CERTO
   // src/lib/validations/suppliers.ts
   export const createSupplierFormSchema = z.object({ ... })
   ```

3. **Use Custom Hooks:**
   ```ts
   // ✅ CERTO
   const { form, onSubmit, isLoading } = useClientCreateForm()
   ```

---

## 🎯 Checklist para Novo Módulo

Ao criar um novo módulo (ex: "fornecedores"):

- [ ] Criar `src/lib/validations/suppliers.ts`
- [ ] Definir schemas usando `commonValidations`
- [ ] Criar `src/components/modules/suppliers/hooks/useSupplierCreateForm.ts`
- [ ] Criar `src/components/modules/suppliers/hooks/useSupplierEditForm.ts`
- [ ] Criar componentes de formulário
- [ ] **NÃO** adicionar validação nas Server Actions
- [ ] Adicionar exports em `src/lib/validations/index.ts`

---

## 📖 Referências

- [Zod Documentation](https://zod.dev/)
- [React Hook Form + Zod](https://react-hook-form.com/get-started#SchemaValidation)
- Veja também: `src/components/forms/fields/VALIDACAO.md`

