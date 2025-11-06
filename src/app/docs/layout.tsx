// aplique o <LoginLayout> em volta do conteúdo da página de login

import { LayoutDocs } from "@/layouts/layout";


export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutDocs>
            {children}
        </LayoutDocs>
    )
}
