'use client'

import React, { useMemo } from 'react'
import { QrCode, Button, Icon } from '@chakra-ui/react'
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
      //bg="yellow"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={{ base: 1, sm: 4, md: 8 }}
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
            //size="lg"
            //w="100%"
            //gap={2}
            fontSize={{ base: "14px", sm: "18px", md: "18px", lg: "20px" }}
            w={{ base: "80%", sm: "100%", md: "100%", lg: "100%" }}
            mt={{ base: 2, sm: 4, md: 4, lg: 4 }}
            //mx={{ base: 2, sm: 4, md: 4, lg: 4 }}
            
          >
            <Icon as={Icons.Download} boxSize={{ base: 4, sm: 6, md: 6, lg: 6 }} color="white" />
            {buttonText}
          </Button>
        </QrCode.DownloadTrigger>
      )}
    </QrCode.Root>
  )
}

