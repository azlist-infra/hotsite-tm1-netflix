# 🔍 Componentes de Filtros

Componentes reutilizáveis para criar filtros consistentes em todo o sistema.

---

## 📦 Componentes Disponíveis

### **1. GenericSearchFilterInput**
Input genérico de busca com suporte a Enter.

```tsx
import { GenericSearchFilterInput } from '@/components/forms/filters'

<GenericSearchFilterInput
  value={search}
  onChange={setSearch}
  onEnter={handleSearch}
  label="Buscar"
  placeholder="Nome, email..."
  flex={2}
  helperText="Pressione Enter para buscar"
/>
```

**Props:**
- `value` - Valor atual
- `onChange` - Callback quando valor muda
- `onEnter` - Callback quando Enter é pressionado (opcional)
- `label` - Label do campo (opcional)
- `placeholder` - Placeholder (opcional)
- `size` - Tamanho: 'sm', 'md', 'lg' (default: 'md')
- `disabled` - Se está desabilitado (default: false)
- `flex` - Flex grow/basis para layout
- `helperText` - Texto de ajuda abaixo do input

---

### **2. ActiveStatusFilterSelect**
Select específico para filtro Ativo/Inativo.

```tsx
import { ActiveStatusFilterSelect } from '@/components/forms/filters'

<ActiveStatusFilterSelect
  value={statusFilter}
  onChange={setStatusFilter}
  label="Status"
  placeholder="Todos"
  flex={1}
/>
```

**Props:**
- `value` - Valor atual ('', 'true', 'false')
- `onChange` - Callback quando valor muda
- `label` - Label do campo (opcional)
- `placeholder` - Texto para "Todos" (default: 'Todos')
- `size` - Tamanho: 'sm', 'md', 'lg' (default: 'md')
- `disabled` - Se está desabilitado (default: false)
- `flex` - Flex grow/basis para layout
- `activeLabel` - Texto para opção "Ativo" (default: 'Ativo')
- `inactiveLabel` - Texto para opção "Inativo" (default: 'Inativo')

**Valores:**
- `''` = Todos (padrão)
- `'true'` = Ativo
- `'false'` = Inativo

---

## 🔘 Botões de Filtro

### **SearchButton**
Botão de buscar/filtrar.

```tsx
import { SearchButton } from '@/components/ui/button'

<SearchButton onClick={handleSearch} />
<SearchButton onClick={handleSearch} loading={isSearching} />
<SearchButton onClick={handleSearch} iconOnly />
```

**Props:**
- `onClick` - Callback quando clicado
- `text` - Texto do botão (default: 'Filtrar')
- `size` - Tamanho (default: 'md')
- `loading` - Estado de loading (default: false)
- `loadingText` - Texto durante loading (default: 'Filtrando...')
- `disabled` - Se está desabilitado
- `variant` - Variante (default: 'solid')
- `colorPalette` - Cor (default: 'blue')
- `iconOnly` - Apenas ícone, sem texto
- `icon` - Ícone customizado
- `fullWidth` - Full width

---

### **CleanSearchButton**
Botão de limpar filtros.

```tsx
import { CleanSearchButton } from '@/components/ui/button'

<CleanSearchButton onClick={handleClear} />
<CleanSearchButton onClick={handleClear} iconOnly />
```

**Props:**
- `onClick` - Callback quando clicado
- `text` - Texto do botão (default: 'Limpar')
- `size` - Tamanho (default: 'md')
- `disabled` - Se está desabilitado
- `variant` - Variante (default: 'outline')
- `colorPalette` - Cor (default: 'gray')
- `iconOnly` - Apenas ícone, sem texto
- `icon` - Ícone customizado
- `fullWidth` - Full width

---

## 📝 Exemplo Completo: ClientsFilters

```tsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Flex } from '@chakra-ui/react'
import { GenericSearchFilterInput, ActiveStatusFilterSelect } from '@/components/forms/filters'
import { SearchButton, CleanSearchButton } from '@/components/ui/button'

export function ClientsFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '')

    const handleClear = () => {
        setSearch('')
        setStatusFilter('')
        router.push('/app/admin/clients')
    }

    const handleApply = () => {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (statusFilter) params.set('status', statusFilter)
        
        const queryString = params.toString()
        router.push(`/app/admin/clients${queryString ? `?${queryString}` : ''}`)
    }

    return (
        <Box bg="white" p={4} borderRadius="md" shadow="sm" borderWidth={1}>
            <Flex gap={4} align="end">
                <GenericSearchFilterInput
                    value={search}
                    onChange={setSearch}
                    onEnter={handleApply}
                    label="Buscar"
                    placeholder="Nome ou email..."
                    flex={2}
                    helperText="Pressione Enter para buscar"
                />

                <ActiveStatusFilterSelect
                    value={statusFilter}
                    onChange={setStatusFilter}
                    label="Status"
                    placeholder="Todos"
                    flex={1}
                />

                <Flex gap={2}>
                    <SearchButton onClick={handleApply} />
                    <CleanSearchButton onClick={handleClear} />
                </Flex>
            </Flex>
        </Box>
    )
}
```

---

## 🎨 Variações

### **Filtros em Grid (Vertical)**

```tsx
<Stack gap={3}>
    <GenericSearchFilterInput {...props} />
    <ActiveStatusFilterSelect {...props} />
    <Flex gap={2}>
        <SearchButton onClick={handleApply} fullWidth />
        <CleanSearchButton onClick={handleClear} fullWidth />
    </Flex>
</Stack>
```

### **Filtros Compactos (Icon Only)**

```tsx
<Flex gap={2} align="center">
    <GenericSearchFilterInput {...props} flex={1} />
    <ActiveStatusFilterSelect {...props} flex={0.5} />
    <SearchButton onClick={handleApply} iconOnly />
    <CleanSearchButton onClick={handleClear} iconOnly />
</Flex>
```

### **Com Loading State**

```tsx
const [isSearching, setIsSearching] = useState(false)

const handleApply = async () => {
    setIsSearching(true)
    // ... buscar dados
    setIsSearching(false)
}

<SearchButton 
    onClick={handleApply} 
    loading={isSearching}
    loadingText="Buscando..." 
/>
```

---

## 🚀 Próximos Componentes

Componentes que podem ser adicionados no futuro:

### **1. DateRangeFilterInput**
```tsx
<DateRangeFilterInput
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  label="Período"
/>
```

### **2. MultiSelectFilter**
```tsx
<MultiSelectFilter
  value={selectedRoles}
  onChange={setSelectedRoles}
  options={['admin', 'gestor', 'operador']}
  label="Roles"
  placeholder="Selecione as roles..."
/>
```

### **3. RangeFilterInput**
```tsx
<RangeFilterInput
  min={minValue}
  max={maxValue}
  onMinChange={setMinValue}
  onMaxChange={setMaxValue}
  label="Faixa de Preço"
/>
```

### **4. CategoryFilterSelect**
```tsx
<CategoryFilterSelect
  value={category}
  onChange={setCategory}
  categories={categories}
  label="Categoria"
/>
```

---

## 📚 Boas Práticas

### **1. Use Flex para Layout Responsivo**
```tsx
<Flex gap={4} align="end" wrap="wrap">
    <GenericSearchFilterInput flex={{ base: '100%', md: 2 }} />
    <ActiveStatusFilterSelect flex={{ base: '100%', md: 1 }} />
    <Flex gap={2} flex={{ base: '100%', md: 'auto' }}>
        <SearchButton fullWidth={{ base: true, md: false }} />
        <CleanSearchButton fullWidth={{ base: true, md: false }} />
    </Flex>
</Flex>
```

### **2. Sincronize com URL (Search Params)**
```tsx
const searchParams = useSearchParams()
const [search, setSearch] = useState(searchParams.get('search') || '')

// Atualiza URL ao aplicar filtros
const handleApply = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    router.push(`/path?${params.toString()}`)
}
```

### **3. Suporte a Enter para Buscar**
```tsx
<GenericSearchFilterInput
    onEnter={handleApply}  // ← Busca ao pressionar Enter
    helperText="Pressione Enter para buscar"
/>
```

### **4. Loading States**
```tsx
const [isSearching, setIsSearching] = useState(false)

<SearchButton 
    onClick={handleApply} 
    loading={isSearching}
    disabled={isSearching}
/>
```

---

## ✅ Checklist para Criar Novo Filtro

- [ ] Identificar campos de filtro necessários
- [ ] Usar componentes genéricos quando possível
- [ ] Sincronizar com URL (search params)
- [ ] Adicionar suporte a Enter no input de busca
- [ ] Adicionar helper text quando útil
- [ ] Implementar função de limpar
- [ ] Testar layout responsivo
- [ ] Adicionar loading states (se aplicável)

---

## 🔗 Arquivos Relacionados

- **Componentes:** `src/components/forms/filters/`
- **Botões:** `src/components/ui/button/`
- **Exemplo Real:** `src/components/modules/clients/ClientsFilters.tsx`
- **Ícones:** `src/components/ui/icon/`

