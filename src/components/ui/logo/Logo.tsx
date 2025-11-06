// ========================================
// Logo Server Component
// ========================================
// Versão simplificada do Logo para uso em Server Components
// Sem memo/useMemo = funciona em async Server Components

import NextImage from "next/image"
import NextLink from "next/link"
import { Link } from "@chakra-ui/react"

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  variant?: 'main' | 'icon'
  alt?: string
  priority?: boolean
}

const SIZES = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 80,
  xl: 120,
} as const

const LOGO_PATHS = {
  main: "/assets/logo/logo_azlist.svg",
  icon: "/assets/logo/logo_azlist_short.svg",
} as const

/**
 * Logo Component para Server Components
 * Sem hooks = funciona em async components
 */
export function Logo({
  size = 'md',
  href = '/',
  variant = 'main',
  alt,
  priority = false,
}: LogoProps) {
  const dimension = SIZES[size]
  const src = LOGO_PATHS[variant]
  const logoAlt = alt || `AZ Staff ${variant === 'icon' ? 'Icon' : 'Logo'}`

  const imageElement = (
    <NextImage
      src={src}
      alt={logoAlt}
      width={dimension}
      height={dimension}
      priority={priority}
      style={{ objectFit: 'contain' }}
    />
  )

  if (href) {
    return (
      <Link asChild>
        <NextLink href={href}>
          {imageElement}
        </NextLink>
      </Link>
    )
  }

  return imageElement
}

// Convenience exports
Logo.Main = function LogoMain(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="main" {...props} />
}

Logo.Icon = function LogoIcon(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="icon" {...props} />
}

