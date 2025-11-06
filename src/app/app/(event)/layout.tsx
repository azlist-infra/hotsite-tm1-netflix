'use client'

import { LayoutAppEvent } from "@/layouts/layout"
import { SidebarEvent } from "@/layouts/sidebar/SidebarEvent"

export default function AppEventGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutAppEvent sidebar={<SidebarEvent />} >
      {children}
    </LayoutAppEvent>
  )
}


