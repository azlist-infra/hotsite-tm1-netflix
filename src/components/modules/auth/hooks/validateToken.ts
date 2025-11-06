'use server'

import { redirect } from 'next/navigation'

interface ValidateTokenResult {
  isValid: boolean
  userName?: string
}

interface ValidateInviteResult {
  isValid: boolean
  eventName?: string
  organizerName?: string
}

export async function validateResetToken(token: string): Promise<ValidateTokenResult> {
  // Validação básica: verifica se o token existe
  if (!token) {
    redirect('/auth/login')
  }

  // Simula validação de API
  // TODO: Substituir por chamada real à API
  // const response = await fetch(`${API_URL}/auth/validate-token`, {
  //   method: 'POST',
  //   body: JSON.stringify({ token }),
  // })

  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500))

  // Simula validação: '123' é válido, qualquer outro não é
  if (token === '123') {
    return {
      isValid: true,
      userName: 'João Silva' // Simula nome retornado pela API
    }
  }

  // Token inválido, redireciona para login
  redirect('/auth/login')
}

export async function validateInviteToken(token: string): Promise<ValidateInviteResult> {
  // Validação básica: verifica se o token existe
  if (!token) {
    return { isValid: false }
  }

  // Simula validação de API
  // TODO: Substituir por chamada real à API
  // const response = await fetch(`${API_URL}/auth/validate-invite`, {
  //   method: 'POST',
  //   body: JSON.stringify({ token }),
  // })

  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500))

  // Simula validação: '456' é válido, qualquer outro não é
  if (token === '456') {
    return {
      isValid: true,
      eventName: 'Conferência Tech 2025',
      organizerName: 'AZ Staff Eventos'
    }
  }

  // Token inválido
  return { isValid: false }
}
