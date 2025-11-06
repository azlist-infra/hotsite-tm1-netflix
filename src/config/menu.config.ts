/**
 * 🧭 Configuração de Menus do Sistema
 * 
 * Define todos os itens de menu e suas permissões de acesso
 */

import type { User } from '@/app/api/auth/auth.types'

// ========================================
// TYPES
// ========================================

export type UserRole = 'admin' | 'operador' | 'gestor' | 'assistente'

export interface MenuItem {
    /** Texto exibido no menu */
    label: string
    
    /** URL de destino (opcional se tiver children) */
    href?: string
    
    /** Submenus (opcional) */
    children?: MenuItem[]
    
    /** Roles permitidas (vazio = todos autenticados podem ver) */
    roles?: UserRole[]
    
    /** Se true, apenas administradores podem ver */
    requireAdmin?: boolean
    
    /** Ícone (opcional, para futuro) */
    icon?: string
}

// ========================================
// MENU ITEMS
// ========================================

export const menuItems: MenuItem[] = [
    {
        label: "Dashboard",
        href: "/app",
        // Sem restrição - todos podem ver
    },
    {
        label: "Eventos",
        href: "/app/event",
        // Sem restrição - todos podem ver
    },
    {
        label: "Usuários",
        href: "/app/admin/users",
        // Admin ou Gestor podem ver
        roles: ['admin', 'gestor'],
    },
    {
        label: "Admin",
        // Apenas Admin pode ver (pai e todos os filhos)
        requireAdmin: true,
        children: [
            {
                label: "Clientes",
                href: "/app/admin/clients",
            },
            // Adicione mais itens de admin aqui se necessário
            // {
            //     label: "Configurações",
            //     href: "/app/settings",
            // },
        ],
    },
]

// ========================================
// HELPERS
// ========================================

/**
 * Verifica se o usuário tem permissão para ver um item do menu
 */
export function canViewMenuItem(item: MenuItem, user: User | null): boolean {
    // Se não está logado, não pode ver nenhum menu
    if (!user) return false

    // Se requer admin, verifica se é admin
    if (item.requireAdmin) {
        return user.isAdmin
    }

    // Se tem roles específicas, verifica se o usuário tem uma delas
    if (item.roles && item.roles.length > 0) {
        return item.roles.includes(user.role as UserRole)
    }

    // Se não tem restrição, todos autenticados podem ver
    return true
}

/**
 * Filtra os itens do menu baseado nas permissões do usuário
 * Também filtra os submenus (children)
 */
export function getVisibleMenuItems(user: User | null): MenuItem[] {
    if (!user) return []
    
    return menuItems
        .filter(item => canViewMenuItem(item, user))
        .map(item => {
            // Se tem children, filtra os children também
            if (item.children) {
                const visibleChildren = item.children.filter(child => 
                    canViewMenuItem(child, user)
                )
                
                // Se não tem children visíveis, não mostra o item pai
                if (visibleChildren.length === 0) {
                    return null
                }
                
                return {
                    ...item,
                    children: visibleChildren,
                }
            }
            
            return item
        })
        .filter((item): item is MenuItem => item !== null)
}

// ========================================
// MENU SECTIONS (Opcional - para futuro)
// ========================================

/**
 * Se precisar de menus agrupados por seção:
 * 
 * export interface MenuSection {
 *     title: string
 *     items: MenuItem[]
 * }
 * 
 * export const menuSections: MenuSection[] = [
 *     {
 *         title: "Principal",
 *         items: [
 *             { label: "Dashboard", href: "/app" },
 *             { label: "Eventos", href: "/app/event" },
 *         ]
 *     },
 *     {
 *         title: "Administração",
 *         items: [
 *             { label: "Usuários", href: "/app/users", roles: ['admin', 'gestor'] },
 *             { label: "Clientes", href: "/app/clients", requireAdmin: true },
 *         ]
 *     }
 * ]
 */

