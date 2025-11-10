'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { NetflixModal, NetflixModalCloseButton } from '@/components/modules/netflix/NetflixModal'
import { Text } from '@chakra-ui/react'

interface ModalConfig {
  title?: string
  message: string | ReactNode
  btnText?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  onClose?: () => void
}

interface ModalContextType {
  showModal: (config: ModalConfig) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

/**
 * Provider para gerenciar modais globalmente
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ModalConfig>({
    message: ''
  })

  const showModal = (modalConfig: ModalConfig) => {
    setConfig(modalConfig)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    if (config.onClose) {
      config.onClose()
    }
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      
      {/* Modal global */}
      <NetflixModal
        open={isOpen}
        onClose={closeModal}
        title={config.title}
        size={config.size}
        showCloseButton={config.showCloseButton}
      >
        {typeof config.message === 'string' ? (
          <Text 
            textStyle="brand.modal.text" 
            textAlign="center" 
            color="white"
            whiteSpace="pre-line"
          >
            {config.message}
          </Text>
        ) : (
          config.message
        )}
        
        <NetflixModalCloseButton onClose={closeModal} btnText={config.btnText} />
      </NetflixModal>
    </ModalContext.Provider>
  )
}

/**
 * Hook para usar modais programaticamente
 * 
 * @example
 * const { showModal } = useModal()
 * 
 * showModal({
 *   title: 'Sucesso!',
 *   message: 'Operação concluída'
 * })
 */
export const useModal = () => {
  const context = useContext(ModalContext)
  
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  
  return context
}

