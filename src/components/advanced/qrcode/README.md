# QRCodeNetflix Component

Componente de QR Code personalizado para o projeto Netflix, com suporte a criptografia, download e logo overlay.

## Instalação

O componente já está pronto para uso no projeto.

## Uso Básico

```tsx
import { QRCodeNetflix } from '@/components/advanced/qrcode'

// QR Code simples
<QRCodeNetflix value="https://netflix.com" />
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `value` | `string` | **obrigatório** | Valor a ser codificado no QR Code |
| `encrypt` | `boolean` | `false` | Se deve criptografar o valor antes de gerar o QR Code |
| `hasDownloadButton` | `boolean` | `false` | Se deve mostrar o botão de download |
| `hasLogo` | `boolean` | `false` | Se deve mostrar um logo no centro do QR Code |
| `logo` | `React.ReactNode` | `undefined` | Logo personalizado (React Node) |
| `fileName` | `string` | `'netflix_qrcode.jpg'` | Nome do arquivo ao fazer download |
| `mimeType` | `'image/png' \| 'image/jpeg'` | `'image/jpeg'` | Tipo MIME da imagem |

## Exemplos

### QR Code com Criptografia

```tsx
<QRCodeNetflix 
  value="user@email.com"
  encrypt
/>
```

Quando `encrypt=true`, o valor é transformado em:
```javascript
btoa(`{"SearchKey": "${value}"}`)
```

### QR Code com Botão de Download

```tsx
<QRCodeNetflix 
  value="https://netflix.com"
  hasDownloadButton
  fileName="meu_qrcode.png"
  mimeType="image/png"
/>
```

### QR Code com Logo

```tsx
<QRCodeNetflix 
  value="https://netflix.com"
  hasLogo
  logo={<img src="/logo.png" alt="Netflix" style={{ width: 64, height: 64 }} />}
/>
```

**Nota:** Quando `hasLogo=true`, o nível de correção de erro é automaticamente aumentado para `H` (30%), permitindo que o logo cubra até 30% do QR Code sem comprometer a leitura.

### Exemplo Completo (Netflix Use Case)

```tsx
<Box bg="white" p={6} borderRadius="12px" w="400px">
  <QRCodeNetflix
    value={paxEmail}
    encrypt
    hasDownloadButton
    fileName="netflix_convite.jpg"
    mimeType="image/jpeg"
  />
</Box>
```

## Tamanho

O QR Code ocupa 100% do elemento pai. Para controlar o tamanho, envolva o componente em um container com largura definida:

```tsx
<Box w="300px">
  <QRCodeNetflix value="..." />
</Box>
```

## Níveis de Correção de Erro

| Nível | Recuperação | Quando usar |
|-------|-------------|-------------|
| `L` | 7% | QR Code simples, sem logo |
| `M` | 15% | Padrão (usado quando `hasLogo=false`) |
| `Q` | 25% | Links muito longos |
| `H` | 30% | Com logo (usado quando `hasLogo=true`) |

## Tecnologia

Este componente usa o [Chakra UI QR Code](https://chakra-ui.com/docs/components/qr-code) internamente, baseado no Ark UI.

## Notas Importantes

1. **Valor obrigatório**: O prop `value` não pode ser vazio ou `null`
2. **Criptografia**: Usa `btoa()` (Base64) - não é criptografia forte, apenas ofuscação
3. **Logo**: Requer nível de correção `H` para garantir legibilidade
4. **Download**: O arquivo é gerado no lado do cliente usando Canvas API

