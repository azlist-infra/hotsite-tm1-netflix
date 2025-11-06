// aplique o <LoginLayout> em volta do conteúdo da página de login

import { LayoutAuth } from "@/layouts/layout";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutAuth>
            {children}
        </LayoutAuth>
    )
}
