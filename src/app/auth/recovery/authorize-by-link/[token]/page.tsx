import { validateResetToken } from '@/components/modules/auth/hooks/validateToken'
import { ResetPasswordForm } from './ResetPasswordForm'

interface PageProps {
  params: Promise<{
    token: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { token } = await params

  // Validação server-side do token
  const { isValid, userName } = await validateResetToken(token)

  if (!isValid) {
    // O redirect já acontece no validateResetToken
    return null
  }

  return <ResetPasswordForm token={token} userName={userName || 'Usuário'} />
}
