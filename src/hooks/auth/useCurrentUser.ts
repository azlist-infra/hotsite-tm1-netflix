'use client'

// Hook simplificado - hotsite não tem autenticação
// import { useState, useEffect } from 'react'
// import type { User } from '@/app/api/auth/auth.types'

/**
 * Hook para obter dados do usuário logado no lado do cliente
 * Lê o cookie user_data que é configurado como httpOnly: false
 * 
 * NOTA: Hotsite público - sem autenticação
 */
export function useCurrentUser() {
    // Hotsite público - sem autenticação
    return { user: null, isLoading: false }
}

