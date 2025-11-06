import { useState } from 'react'

interface UseInviteAcceptReturn {
  acceptInvite: (token: string, name: string, password: string) => Promise<void>
  isLoading: boolean
  error: string | null
  success: boolean
}

export const useInviteAccept = (): UseInviteAcceptReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const acceptInvite = async (token: string, name: string, password: string) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500))

      // TODO: Substituir por chamada real à API
      // const response = await fetch(`${API_URL}/auth/accept-invite`, {
      //   method: 'POST',
      //   body: JSON.stringify({ token, name, password }),
      // })

      // Simula sucesso
      console.log('Invite accepted:', { token, name, password })
      setSuccess(true)
    } catch {
      setError('Erro ao aceitar convite. Tente novamente.')
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    acceptInvite,
    isLoading,
    error,
    success
  }
}
