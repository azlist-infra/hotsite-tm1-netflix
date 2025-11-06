# 📝 Componentes de Campos de Formulário

Componentes de formulário que funcionam **com e sem React Hook Form**.

---

## 🎯 Filosofia

Estes componentes resolvem um problema comum:
- **Com RHF**: Formulários de cadastro/edição com validações
- **Sem RHF**: Filtros, buscas, e outros inputs simples

**Mesma API. Dois modos.**

---

## ⚠️ IMPORTANTE: Validação

Para que as validações do Zod + RHF funcionem corretamente (em vez da tooltip do navegador), **sempre adicione `noValidate` no form**:

```tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  {/* campos aqui */}
</form>
```

📖 Veja mais detalhes em: [`VALIDACAO.md`](./VALIDACAO.md)

---

## 📦 Componentes Disponíveis

### 1. `TextField` - Campo de Texto Genérico

Campo input genérico com suporte a diferentes tipos.

#### Com React Hook Form

```tsx
import { TextField } from '@/components/forms/fields'

<TextField
  name="company"
  control={control}
  label="Nome da Empresa"
  placeholder="Digite o nome"
  required
  disabled={isLoading}
/>
```

#### Sem React Hook Form

```tsx
<TextField
  value={search}
  onChange={setSearch}
  label="Buscar"
  placeholder="Digite para buscar..."
  onEnter={handleSearch}
/>
```

#### Props

**Com RHF:**
- `name` - Nome do campo (obrigatório)
- `control` - Control do RHF (obrigatório)
- `label?` - Label do campo
- `placeholder?` - Placeholder
- `helperText?` - Texto de ajuda
- `required?` - Se é obrigatório
- `type?` - text | email | tel | url | password | number
- `size?` - xs | sm | md | lg | xl
- `disabled?` - Se está desabilitado
- `flex?` - Para layout flex
- `autoComplete?` - Autocomplete HTML

**Sem RHF:**
- `value` - Valor (obrigatório)
- `onChange` - Callback (obrigatório)
- `label?` - Label do campo
- `placeholder?` - Placeholder
- `helperText?` - Texto de ajuda
- `required?` - Se é obrigatório
- `type?` - text | email | tel | url | password | number
- `size?` - xs | sm | md | lg | xl
- `disabled?` - Se está desabilitado
- `invalid?` - Se é inválido
- `errorMessage?` - Mensagem de erro
- `flex?` - Para layout flex
- `autoComplete?` - Autocomplete HTML
- `onEnter?` - Callback ao pressionar Enter

---

### 2. `EmailField` - Campo de Email

Campo específico para email com type, placeholder e autocomplete pré-configurados.

#### Com React Hook Form

```tsx
<EmailField
  name="email"
  control={control}
  required
  disabled={isLoading}
/>
```

#### Sem React Hook Form

```tsx
<EmailField
  value={email}
  onChange={setEmail}
  onEnter={handleSubmit}
/>
```

**Configurações Padrão:**
- `type="email"`
- `label="Email"`
- `placeholder="email@exemplo.com"`
- `autoComplete="email"`

---

### 3. `PhoneField` - Campo de Telefone

Campo específico para telefone com type, placeholder e autocomplete pré-configurados.

#### Com React Hook Form

```tsx
<PhoneField
  name="phone"
  control={control}
  helperText="Opcional"
  disabled={isLoading}
/>
```

#### Sem React Hook Form

```tsx
<PhoneField
  value={phone}
  onChange={setPhone}
/>
```

**Configurações Padrão:**
- `type="tel"`
- `label="Telefone"`
- `placeholder="+55 11 99999-9999"`
- `autoComplete="tel"`

> **Nota:** Futuramente incluirá máscara automática.

---

### 4. `CheckboxField` - Campo de Checkbox

Campo checkbox genérico.

#### Com React Hook Form

```tsx
<CheckboxField
  name="isActive"
  control={control}
  label="Cliente Ativo"
  helperText="Marque para ativar"
  colorPalette="green"
  disabled={isLoading}
/>
```

#### Sem React Hook Form

```tsx
<CheckboxField
  checked={isActive}
  onChange={setIsActive}
  label="Aceito os termos"
  colorPalette="blue"
/>
```

#### Props

**Com RHF:**
- `name` - Nome do campo (obrigatório)
- `control` - Control do RHF (obrigatório)
- `label` - Label (obrigatório)
- `helperText?` - Texto de ajuda
- `size?` - xs | sm | md | lg
- `disabled?` - Se está desabilitado
- `colorPalette?` - Cor do checkbox
- `variant?` - outline | solid | subtle

**Sem RHF:**
- `checked` - Valor (obrigatório)
- `onChange` - Callback (obrigatório)
- `label` - Label (obrigatório)
- `helperText?` - Texto de ajuda
- `size?` - xs | sm | md | lg
- `disabled?` - Se está desabilitado
- `colorPalette?` - Cor do checkbox
- `variant?` - outline | solid | subtle

---

## 🎨 Exemplos Práticos

### Formulário Completo (Com RHF)

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button } from '@chakra-ui/react'
import { TextField, EmailField, PhoneField, CheckboxField } from '@/components/forms/fields'

export function ClientForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(clientSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <TextField
          name="name"
          control={control}
          label="Nome da Empresa"
          required
        />

        <EmailField
          name="email"
          control={control}
          required
        />

        <PhoneField
          name="phone"
          control={control}
          helperText="Opcional"
        />

        <CheckboxField
          name="isActive"
          control={control}
          label="Cliente Ativo"
          colorPalette="green"
        />

        <Button type="submit">Salvar</Button>
      </Stack>
    </form>
  )
}
```

### Filtros (Sem RHF)

```tsx
'use client'

import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { TextField, CheckboxField } from '@/components/forms/fields'
import { SearchButton } from '@/components/ui/button'

export function ClientFilters() {
  const [search, setSearch] = useState('')
  const [activeOnly, setActiveOnly] = useState(false)

  return (
    <Flex gap={4}>
      <TextField
        value={search}
        onChange={setSearch}
        label="Buscar"
        placeholder="Nome ou email..."
        onEnter={handleSearch}
        flex={2}
      />

      <CheckboxField
        checked={activeOnly}
        onChange={setActiveOnly}
        label="Apenas Ativos"
      />

      <SearchButton onClick={handleSearch} />
    </Flex>
  )
}
```

---

## ✨ Vantagens

1. **API Unificada**: Mesma interface, dois modos
2. **Type-Safe**: TypeScript com tipos genéricos
3. **Validação Automática**: Erros do RHF aparecem automaticamente
4. **Acessibilidade**: Labels, helper text, error text
5. **Customizável**: Sizes, variants, colors
6. **Ref Support**: `forwardRef` para acesso ao elemento
7. **Menos Código**: Redução de 70% no código dos formulários

---

## 🔮 Futuro

- [ ] Máscara automática em `PhoneField`
- [ ] `SelectField` com suporte RHF/Standard
- [ ] `TextareaField`
- [ ] `DateField` com date picker
- [ ] `NumberField` com formatação
- [ ] `PasswordField` com toggle visibility
- [ ] `SearchField` com debounce integrado

---

## 📚 Referências

- [React Hook Form](https://react-hook-form.com/)
- [Chakra UI v3 - Input](https://chakra-ui.com/docs/components/input)
- [Chakra UI v3 - Checkbox](https://chakra-ui.com/docs/components/checkbox)

