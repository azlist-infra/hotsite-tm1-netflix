/**
 * 🔍 Sistema de Filtros Genérico
 * 
 * Aplica filtros de forma declarativa e reutilizável
 */

// ========================================
// TYPES
// ========================================

export interface FilterConfig<T> {
    /** Campos que devem ser buscados pelo filtro de search */
    searchFields?: (keyof T)[]
    /** Campo de status ativo/inativo */
    statusField?: keyof T
    /** Filtros customizados */
    customFilters?: {
        [key: string]: (item: T, value: string) => boolean
    }
}

export interface FilterParams {
    search?: string
    status?: string
    [key: string]: string | undefined
}

// ========================================
// HELPERS
// ========================================

/**
 * Normaliza string para busca (remove acentos, lowercase)
 */
function normalizeString(str: string): string {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
}

/**
 * Verifica se uma string contém outra (busca normalizada)
 */
function matchesSearch(text: string, search: string): boolean {
    return normalizeString(text).includes(normalizeString(search))
}

// ========================================
// MAIN FUNCTION
// ========================================

/**
 * Aplica filtros genéricos a um array de dados
 * 
 * @param data - Array de dados a serem filtrados
 * @param params - Parâmetros de filtro da URL
 * @param config - Configuração de quais campos filtrar
 * @returns Array filtrado
 * 
 * @example
 * // Clientes
 * const filteredClients = applyFilters(clients, params, {
 *   searchFields: ['name', 'email'],
 *   statusField: 'isActive',
 * })
 * 
 * @example
 * // Usuários com filtro custom
 * const filteredUsers = applyFilters(users, params, {
 *   searchFields: ['name', 'email'],
 *   statusField: 'isActive',
 *   customFilters: {
 *     role: (user, value) => user.role === value,
 *   }
 * })
 */
export function applyFilters<T>(
    data: T[],
    params: FilterParams,
    config: FilterConfig<T>
): T[] {
    let filtered = [...data]

    // ========================================
    // 1. Filtro de Busca (Search)
    // ========================================
    if (params.search && config.searchFields && config.searchFields.length > 0) {
        const searchTerm = params.search

        filtered = filtered.filter(item => {
            return config.searchFields!.some(field => {
                const value = item[field]
                
                // Se o campo é string, faz busca normalizada
                if (typeof value === 'string') {
                    return matchesSearch(value, searchTerm)
                }
                
                // Se for número, converte para string e busca
                if (typeof value === 'number') {
                    return value.toString().includes(searchTerm)
                }
                
                return false
            })
        })
    }

    // ========================================
    // 2. Filtro de Status (Ativo/Inativo)
    // ========================================
    if (params.status && config.statusField) {
        const isActive = params.status === 'true'
        
        filtered = filtered.filter(item => {
            const value = item[config.statusField!]
            return value === isActive
        })
    }

    // ========================================
    // 3. Filtros Customizados
    // ========================================
    if (config.customFilters) {
        Object.entries(config.customFilters).forEach(([paramKey, filterFn]) => {
            const paramValue = params[paramKey]
            
            if (paramValue) {
                filtered = filtered.filter(item => filterFn(item, paramValue))
            }
        })
    }

    return filtered
}

// ========================================
// CONVENIENCE FUNCTIONS
// ========================================

/**
 * Cria um config de filtros apenas com search e status (caso mais comum)
 */
export function createBasicFilterConfig<T>(
    searchFields: (keyof T)[],
    statusField: keyof T
): FilterConfig<T> {
    return {
        searchFields,
        statusField,
    }
}

/**
 * Verifica se há filtros ativos nos params
 */
export function hasActiveFilters(params: FilterParams): boolean {
    return Object.values(params).some(value => value !== undefined && value !== '')
}

/**
 * Conta quantos filtros estão ativos
 */
export function countActiveFilters(params: FilterParams): number {
    return Object.values(params).filter(value => value !== undefined && value !== '').length
}

