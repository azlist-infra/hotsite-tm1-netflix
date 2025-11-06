import { useState } from 'react'

interface UsePasswordResetReturn {
  resetPassword: (token: string, password: string) => Promise<void>
  isLoading: boolean
  error: string | null
  success: boolean
}

export const usePasswordReset = (): UsePasswordResetReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500))

      // TODO: Substituir por chamada real à API
      // const response = await fetch(`${API_URL}/auth/reset-password`, {
      //   method: 'POST',
      //   body: JSON.stringify({ token, password }),
      // })

      // Simula sucesso
      console.log('Password reset for token:', token)
      console.log('New password:', password)
      setSuccess(true)
    } catch {
      setError('Erro ao redefinir senha. Tente novamente.')
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    resetPassword,
    isLoading,
    error,
    success
  }
}
