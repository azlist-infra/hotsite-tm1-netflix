/**
 * Barrel export para componentes Netflix
 * 
 * Centraliza as exportações de todos os componentes relacionados ao Netflix
 */

// Componentes visuais
export { NetflixLogo } from './NetflixLogo'
export { CustomImage } from './CustomImage'
export { TitleBase } from './TitleBase'

// Modal
export { NetflixModal, NetflixModalCloseButton } from './NetflixModal'

// Links e interações
export { ContactLink } from './ContactLink'

// Componentes de inscrição
export { LocationSection } from './inscricao/LocationSection'
export { FAQAccordion } from './inscricao/FAQAccordion'
export { PaxNotRegisteredForm } from './inscricao/PaxNotRegisteredForm'
export { PaxAlreadyRegistered } from './inscricao/PaxAlreadyRegistered'
export { faqData, type FAQItem } from './inscricao/faq.tsx'

// Hooks
export { useHomeForm } from './home'
export { useInscricaoForm } from './inscricao/hooks'
export { useUnsubscribeForm } from './unsubscribe'

