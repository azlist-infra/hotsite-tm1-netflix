/**
 * Exportações dos ícones customizados
 */

import { DefaultIcons } from './IconsDefault'
import { CustomIcons } from './IconsCustom'

// Exportações individuais
export { DefaultIcons } from './IconsDefault'
export { CustomIcons } from './IconsCustom'

// Objeto unificado com todos os ícones
export const Icons = {
    ...DefaultIcons,
    ...CustomIcons,
}

