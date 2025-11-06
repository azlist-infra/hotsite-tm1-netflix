# 🔍 Sistema de Validação dos Campos

## ⚠️ Importante: Desabilitar Validação HTML5

Para que as validações do **Zod + React Hook Form** funcionem corretamente e apareçam nos campos (em vez da tooltip padrão do navegador), é **obrigatório** adicionar `noValidate` no `<form>`:

```tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  {/* campos aqui */}
</form>
```

---

## 🎯 Como Funciona

### 1. **Sem `noValidate`** (❌ Errado)
```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  <EmailField name="email" control={control} required />
</form>
```

**Resultado:**
- ❌ Aparece tooltip do navegador (HTML5 validation)
- ❌ Não respeita mensagens do Zod
- ❌ Não respeita configuração de validação do RHF

---

### 2. **Com `noValidate`** (✅ Correto)
```tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <EmailField name="email" control={control} required />
</form>
```

**Resultado:**
- ✅ Aparece mensagem customizada do Zod
- ✅ Validação controlada pelo React Hook Form
- ✅ Mensagens estilizadas no Chakra UI
- ✅ Controle total sobre quando validar

---

## 🎨 Modos de Validação (React Hook Form)

Configure no `useForm`:

### **onSubmit** (Padrão - Recomendado)
```tsx
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
  mode: 'onSubmit', // Valida apenas ao submeter
})
```
- ✅ Valida ao clicar em "Salvar"
- ✅ Menos intrusivo
- ✅ Melhor UX para formulários longos

---

### **onChange**
```tsx
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
  mode: 'onChange', // Valida a cada mudança
})
```
- ⚡ Valida enquanto digita
- ⚠️ Pode ser intrusivo
- 👍 Bom para campos críticos

---

### **onBlur**
```tsx
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur', // Valida ao sair do campo
})
```
- 👌 Valida ao sair do campo
- ✅ Menos intrusivo que `onChange`
- 👍 Bom equilíbrio

---

### **onTouched**
```tsx
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
  mode: 'onTouched', // Valida após primeiro blur
  reValidateMode: 'onChange', // Re-valida onChange após erro
})
```
- 🎯 **Melhor experiência!**
- ✅ Primeiro erro: só ao sair do campo
- ✅ Após erro: valida enquanto digita (feedback instantâneo)
- ⭐ **Recomendado para formulários complexos**

---

## 📋 Exemplo Completo

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@chakra-ui/react'
import { TextField, EmailField } from '@/components/forms/fields'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
})

export function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched', // 🎯 Valida após tocar no campo
    reValidateMode: 'onChange', // Re-valida enquanto digita após erro
  })

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* ⚠️ IMPORTANTE! */}
      <Stack gap={4}>
        <TextField
          name="name"
          control={control}
          label="Nome"
          required
        />

        <EmailField
          name="email"
          control={control}
          required
        />

        <Button type="submit" loading={isSubmitting}>
          Salvar
        </Button>
      </Stack>
    </form>
  )
}
```

---

## 🎛️ Comparação de Modos

| Modo | Primeira validação | Re-validação após erro | UX |
|------|-------------------|----------------------|-----|
| `onSubmit` | Ao submeter | Ao submeter | 🟢 Simples |
| `onChange` | Enquanto digita | Enquanto digita | 🟡 Intrusivo |
| `onBlur` | Ao sair do campo | Ao sair do campo | 🟢 Balanceado |
| `onTouched` | Ao sair do campo | Enquanto digita | 🟢🟢 Ideal! |

---

## 🔧 Configuração Recomendada

Para **melhor experiência do usuário**:

```tsx
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
  mode: 'onTouched', // Primeira validação ao tocar
  reValidateMode: 'onChange', // Feedback instantâneo após erro
})
```

**Por quê?**
- ✅ Usuário não é incomodado enquanto digita pela primeira vez
- ✅ Após erro, feedback instantâneo ao corrigir
- ✅ Melhor equilíbrio entre validação e UX

---

## ✅ Checklist

- [ ] Adicionar `noValidate` no `<form>`
- [ ] Usar `zodResolver` no `useForm`
- [ ] Configurar `mode` e `reValidateMode`
- [ ] Testar validações no formulário

---

## 🚨 Troubleshooting

### Problema: Tooltip do navegador aparece
**Solução:** Adicione `noValidate` no form

### Problema: Mensagens não aparecem
**Solução:** Verifique se está usando `zodResolver` e se o schema Zod está correto

### Problema: Validação muito agressiva
**Solução:** Mude `mode` de `onChange` para `onTouched`

### Problema: Não valida ao digitar após erro
**Solução:** Adicione `reValidateMode: 'onChange'`

