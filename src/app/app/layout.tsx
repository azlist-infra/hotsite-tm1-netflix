import { LayoutApp } from "@/layouts/layout/LayoutApp"

/**
 * Layout do grupo /app
 * Server Component por padrão (permite HeaderApp async)
 */
export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutApp>
      {children}
    </LayoutApp>
  )
}


