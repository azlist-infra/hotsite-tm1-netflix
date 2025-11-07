// ========================================
// Header App - Server Component
// ========================================
// Chakra UI v3 permite uso direto em Server Components async!

import { Box, Flex } from "@chakra-ui/react"
// import { getCurrentUser } from "@/app/api/auth/auth.action"
// import { MenuApp } from "../menu/MenuApp"
// import { UserLoggedClient } from "@/components/modules/user"
import { Logo } from "@/components/ui"

/**
 * Server Component - Busca user no servidor e renderiza UI
 * Chakra UI v3 funciona diretamente em Server Components!
 * Não pisca ao navegar entre páginas
 * 
 * NOTA: Hotsite público - sem autenticação
 */
export async function HeaderApp() {
  // Hotsite público - sem autenticação
  // const user = await getCurrentUser()
  
  return (
    <Flex align="center" justify="space-between" gap={4} py={2} minW="100%" bg={"gray.100"}>
      <Box>
        <Logo variant="icon" size="md" href="/" />
      </Box>
      <Box flex="1" textAlign="center">
        {/* Menu removido - hotsite não tem menu de app */}
      </Box>
      <Box>
        {/* UserLogged removido - hotsite não tem autenticação */}
      </Box>
    </Flex>
  )
}


