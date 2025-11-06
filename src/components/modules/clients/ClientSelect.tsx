'use client'

import { Field } from '@chakra-ui/react'
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'
import { forwardRef, useEffect, useState } from 'react'
import { getClientsAction } from '@/app/api/clients'
import type { Client } from '@/app/api/clients'

interface ClientSelectProps {
  error?: string
  isInvalid?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  name?: string
  required?: boolean
  disabled?: boolean
}


export const ClientSelect = forwardRef<HTMLSelectElement, ClientSelectProps>(
  ({ error, isInvalid, ...rest }, ref) => {
    const [clients, setClients] = useState<Client[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string>('')

    useEffect(() => {
      async function loadClients() {
        try {
          setIsLoading(true)
          setFetchError('')

          const result = await getClientsAction()

          if (result.success && result.data) {
            // Filtra apenas clientes ativos
            const activeClients = result.data.filter(c => c.isActive)
            setClients(activeClients)
          } else {
            setFetchError(result.error || 'Erro ao carregar clientes')
          }
        } catch (err) {
          console.error('Erro ao carregar clientes:', err)
          setFetchError('Erro ao carregar clientes')
        } finally {
          setIsLoading(false)
        }
      }

      loadClients()
    }, [])

    return (
      <Field.Root invalid={isInvalid || !!fetchError} required={rest.required}>
        <Field.Label>Cliente</Field.Label>
        <NativeSelectRoot>
          <NativeSelectField
            ref={ref}
            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
            {...rest}
          >
            {isLoading ? (
              <option value="">Carregando clientes...</option>
            ) : fetchError ? (
              <option value="">Erro ao carregar clientes</option>
            ) : clients.length === 0 ? (
              <option value="">Nenhum cliente disponível</option>
            ) : (
              <>
                <option value="">Selecione um cliente</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </>
            )}
          </NativeSelectField>
        </NativeSelectRoot>
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
        {fetchError && !error && (
          <Field.ErrorText>{fetchError}</Field.ErrorText>
        )}
        <Field.HelperText>
          Selecione a empresa cliente para vincular este usuário
        </Field.HelperText>
      </Field.Root>
    )
  }
)

ClientSelect.displayName = 'ClientSelect'
