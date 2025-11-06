import { validateInviteToken } from '@/components/modules/auth/hooks/validateToken'
import { InviteAcceptance } from './InviteAcceptance'
import { InviteInvalid } from './InviteInvalid'

interface PageProps {
  params: Promise<{
    token: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { token } = await params

  // Validação server-side do token
  const { isValid, eventName, organizerName } = await validateInviteToken(token)

  if (!isValid) {
    return <InviteInvalid />
  }

  return (
    <InviteAcceptance
      token={token}
      eventName={eventName || 'Evento'}
      organizerName={organizerName || 'Organizador'}
    />
  )
}
