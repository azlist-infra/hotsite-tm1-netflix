// Página de edição de usuário

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Heading, Text, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { getCurrentUser } from '@/app/api/auth/auth.action'
import { getUserByIdAction } from '@/app/api/users/users.action'
import { UserEditForm } from '@/components/modules/users/UserEditForm'
import { ErrorBox } from '@/components/ui'
import type { User } from '@/app/api/users/users.types'

interface UserEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default function UserEditPage({ params }: UserEditPageProps) {
  const [id, setId] = React.useState<string>('')
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function initParams() {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    initParams()
  }, [params])

  useEffect(() => {
    if (!id) return
    
    async function loadUser() {
      try {
        // Verifica autenticação
        const currentUser = await getCurrentUser()

        if (!currentUser) {
          router.push('/auth/login')
          return
        }

        // Busca usuário
        const result = await getUserByIdAction(id)

        if (!result.success || !result.data) {
          setError(result.error || 'Usuário não encontrado')
          setIsLoading(false)
          return
        }

        const targetUser = result.data

        // Verifica permissão
        const hasPermission =
          currentUser.isAdmin || currentUser.id === targetUser._id

        if (!hasPermission) {
          setError('Você não tem permissão para editar este usuário')
          setIsLoading(false)
          return
        }

        setUser(targetUser)
      } catch {
        setError('Erro inesperado ao carregar usuário')
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [id, router])

  if (!id) {
    return (
      <Container maxW="container.md" py={8}>
        <Box textAlign="center">
          <Text>Carregando...</Text>
        </Box>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container maxW="container.md" py={8}>
        <Box textAlign="center">
          <Text>Carregando...</Text>
        </Box>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container maxW="container.md" py={8}>
        <ErrorBox title="Erro">
          {error}
        </ErrorBox>
        <Button
          asChild
          colorPalette="red"
          variant="outline"
          mt={4}
        >
          <Link href="/app/users">
            Voltar para lista
          </Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      {/* Header */}
      <Box mb={6}>
        <Heading size="xl" mb={2}>
          Editar Usuário
        </Heading>
        <Text color="gray.600">
          Atualize as informações do usuário {user.name}
        </Text>
      </Box>

      {/* Formulário */}
      <Box bg="white" p={6} borderRadius="md" shadow="md" borderWidth={1}>
        <UserEditForm user={user} />
      </Box>

      {/* Voltar */}
      <Box mt={4} textAlign="center">
        <Button
          asChild
          variant="ghost"
          colorPalette="gray"
        >
          <Link href={`/app/users/${id}`}>
            ← Voltar para detalhes
          </Link>
        </Button>
      </Box>
    </Container>
  )
}