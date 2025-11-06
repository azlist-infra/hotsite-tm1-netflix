// Utilitários para formatação de datas

/**
 * Formata data em português brasileiro
 */
export function formatDate(
    dateString: string,
    options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }
): string {
    return new Date(dateString).toLocaleDateString('pt-BR', options)
}

/**
 * Formata data com hora
 */
export function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

/**
 * Formata data de forma curta (DD/MM/YYYY)
 */
export function formatDateShort(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

/**
 * Formata data de forma relativa (há 2 dias, há 3 horas, etc)
 */
export function formatDateRelative(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    const diffMonth = Math.floor(diffDay / 30)
    const diffYear = Math.floor(diffDay / 365)

    if (diffYear > 0) return `há ${diffYear} ano${diffYear > 1 ? 's' : ''}`
    if (diffMonth > 0) return `há ${diffMonth} ${diffMonth > 1 ? 'meses' : 'mês'}`
    if (diffDay > 0) return `há ${diffDay} dia${diffDay > 1 ? 's' : ''}`
    if (diffHour > 0) return `há ${diffHour} hora${diffHour > 1 ? 's' : ''}`
    if (diffMin > 0) return `há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`
    return 'agora mesmo'
}

