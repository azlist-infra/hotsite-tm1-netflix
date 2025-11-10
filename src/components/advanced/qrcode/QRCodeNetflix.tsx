'use client'

import React, { useMemo } from 'react'
import { QrCode, Button, Icon } from '@chakra-ui/react'
import { LuDownload } from 'react-icons/lu'
import { Icons } from '@/components/ui/icon'

interface QRCodeNetflixProps {
  /** Valor a ser codificado no QR Code (obrigatório) */
  value: string
  /** Se deve criptografar o valor antes de gerar o QR Code */
  encrypt?: boolean
  /** Se deve mostrar o botão de download */
  hasDownloadButton?: boolean
  /** Se deve mostrar um logo no centro do QR Code */
  hasLogo?: boolean
  /** Logo personalizado (React Node) */
  logo?: React.ReactNode
  /** Nome do arquivo ao fazer download */
  fileName?: string
  /** Tipo MIME da imagem */
  mimeType?: 'image/png' | 'image/jpeg'
  /** Texto do botão de download */
  buttonText?: string
}

/**
 * Componente de QR Code Netflix
 * 
 * Gera QR Codes com opção de criptografia, download e logo
 * 
 * @example
 * // QR Code simples
 * <QRCodeNetflix value="https://example.com" />
 * 
 * @example
 * // QR Code criptografado com download
 * <QRCodeNetflix 
 *   value="user@email.com"
 *   encrypt
 *   hasDownloadButton
 * />
 * 
 * @example
 * // QR Code com logo
 * <QRCodeNetflix 
 *   value="https://example.com"
 *   hasLogo
 *   logo={<img src="/logo.png" alt="Logo" />}
 * />
 */
export const QRCodeNetflix = ({
  value,
  encrypt = false,
  hasDownloadButton = false,
  hasLogo = false,
  logo,
  fileName = 'netflix_qrcode.jpg',
  mimeType = 'image/jpeg',
  buttonText = 'Baixar QR Code'
}: QRCodeNetflixProps) => {
  // Processa o valor do QR Code (com ou sem criptografia)
  const qrCodeValue = useMemo(() => {
    // Valida que o valor não está vazio
    if (!value || value.trim() === '') {
      console.error('QRCodeNetflix: value prop is required and cannot be empty')
      return ''
    }

    if (encrypt) {
      // Criptografa os dados
      const qrCodeString = `{"SearchKey": "${value}"}`
      return btoa(qrCodeString)
    }
    
    // Retorna o valor puro
    return value
  }, [value, encrypt])

  // Retorna null se o valor for inválido
  if (!qrCodeValue) {
    return null
  }

  return (
    <QrCode.Root 
      value={qrCodeValue}
      size="full"
      encoding={{
        ecc: hasLogo ? 'H' : 'M' // Maior correção de erro se tiver logo
      }}
    >
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>

      {/* Logo no centro do QR Code */}
      {hasLogo && logo && (
        <QrCode.Overlay>
          {logo}
        </QrCode.Overlay>
      )}

      {/* Botão de Download */}
      {hasDownloadButton && (
        <QrCode.DownloadTrigger
          asChild
          fileName={fileName}
          mimeType={mimeType}
        >
          <Button
            variant="custom"
            size="md"
            mt={4}
            w="100%"
            gap={2}
          >
            <Icon as={Icons.Download} boxSize={6} color="white" />
            {buttonText}
          </Button>
        </QrCode.DownloadTrigger>
      )}
    </QrCode.Root>
  )
}

