'use server';

// Server Actions para operações de usuários
// Executa no servidor, mais seguro

import { revalidatePath } from 'next/cache';
import { serverApi, ServerApiError } from '@/lib/api/server-api';
import API_CONFIG from '@/lib/api/api-config';
import type {
    User,
    CreateUserDto,
    UpdateUserDto,
    ChangePasswordDto,
    UpdatePrivilegesDto,
    UserActionResponse,
    ListUsersResponse,
    GetUserResponse,
    CreateUserResponse,
    UpdateUserResponse,
    ChangePasswordResponse,
    UpdatePrivilegesResponse,
} from './users.types';

// ==========================================
// GET - Listar Usuários
// ==========================================

/**
 * Lista todos os usuários (filtrado por permissões)
 * Admin: todos os usuários
 * Manager: apenas do próprio cliente
 */
export async function getUsersAction(): Promise<UserActionResponse<User[]>> {
    try {
        const response = await serverApi.get<ListUsersResponse>(
            API_CONFIG.ENDPOINTS.USERS.BASE,
            { requireAuth: true }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao buscar usuários',
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Get users error:', error);

        if (error instanceof ServerApiError) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Erro ao buscar usuários',
        };
    }
}

// ==========================================
// GET - Buscar Usuário por ID
// ==========================================

/**
 * Busca um usuário específico por ID
 */
export async function getUserByIdAction(
    id: string
): Promise<UserActionResponse<User>> {
    try {
        const response = await serverApi.get<GetUserResponse>(
            API_CONFIG.ENDPOINTS.USERS.BY_ID(id),
            { requireAuth: true }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Usuário não encontrado',
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Get user by ID error:', error);

        if (error instanceof ServerApiError) {
            const apiError = error.data;

            if (apiError?.errors?.[0]?.code === 'invalid_user_not_found') {
                return {
                    success: false,
                    error: 'Usuário não encontrado',
                };
            }

            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Erro ao buscar usuário',
        };
    }
}

// ==========================================
// POST - Criar Usuário
// ==========================================

/**
 * Cria um novo usuário
 * NOTA: Apenas roles 'company' e 'user' são permitidos
 */
export async function createUserAction(
    data: CreateUserDto
): Promise<UserActionResponse<User>> {
    try {
        // Validação básica
        if (!data.email || !data.password || !data.name || !data.clientId) {
            return {
                success: false,
                error: 'Todos os campos são obrigatórios',
            };
        }

        const response = await serverApi.post<CreateUserResponse>(
            API_CONFIG.ENDPOINTS.USERS.BASE,
            {
                body: data,
                requireAuth: true,
            }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao criar usuário',
            };
        }

        // Revalida as páginas relacionadas
        revalidatePath('/app/users');

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Create user error:', error);

        if (error instanceof ServerApiError) {
            const apiError = error.data;

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0];

                // Mapeia erros comuns
                const errorMessages: Record<string, string> = {
                    'invalid_email_exists': 'Este email já está cadastrado',
                    'invalid_client_not_found': 'Cliente não encontrado ou inativo',
                    'invalid_role': 'Role inválido. Apenas "company" e "user" são permitidos na criação',
                    'invalid_forbidden': 'Não é possível criar usuários admin diretamente',
                };

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao criar usuário',
                };
            }

            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Erro ao criar usuário',
        };
    }
}

// ==========================================
// PUT - Atualizar Usuário
// ==========================================

/**
 * Atualiza dados de um usuário
 */
export async function updateUserAction(
    id: string,
    data: UpdateUserDto
): Promise<UserActionResponse<User>> {
    try {
        const response = await serverApi.put<UpdateUserResponse>(
            API_CONFIG.ENDPOINTS.USERS.BY_ID(id),
            {
                body: data,
                requireAuth: true,
            }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao atualizar usuário',
            };
        }

        // Revalida as páginas relacionadas
        revalidatePath('/app/users');
        revalidatePath(`/app/users/${id}`);
        revalidatePath('/app/profile');

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Update user error:', error);

        if (error instanceof ServerApiError) {
            const apiError = error.data;

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0];

                const errorMessages: Record<string, string> = {
                    'invalid_email_exists': 'Este email já está em uso',
                    'invalid_forbidden_admin_change': 'Apenas administradores podem alterar status de admin',
                    'invalid_forbidden_self_deactivation': 'Você não pode desativar sua própria conta',
                    'invalid_forbidden_user_access': 'Você não tem permissão para atualizar este usuário',
                };

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao atualizar usuário',
                };
            }

            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Erro ao atualizar usuário',
        };
    }
}

// ==========================================
// PATCH - Alterar Senha
// ==========================================

/**
 * Altera a senha de um usuário
 * Próprio usuário: precisa senha atual
 * Admin: não precisa senha atual
 */
export async function changePasswordAction(
    id: string,
    data: ChangePasswordDto
): Promise<UserActionResponse<{ userId: string; passwordChangedAt: string }>> {
    try {
        // Validação básica
        if (!data.newPassword || !data.confirmPassword) {
            return {
                success: false,
                error: 'Nova senha e confirmação são obrigatórias',
            };
        }

        if (data.newPassword !== data.confirmPassword) {
            return {
                success: false,
                error: 'Nova senha e confirmação não coincidem',
            };
        }

        const response = await serverApi.patch<ChangePasswordResponse>(
            API_CONFIG.ENDPOINTS.USERS.PASSWORD(id),
            {
                body: data,
                requireAuth: true,
            }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao alterar senha',
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Change password error:', error);

        if (error instanceof ServerApiError) {
            const apiError = error.data;

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0];

                const errorMessages: Record<string, string> = {
                    'invalid_current_password_required': 'Senha atual é obrigatória',
                    'invalid_current_password': 'Senha atual está incorreta',
                    'invalid_same_password': 'A nova senha deve ser diferente da atual',
                    'invalid_password_mismatch': 'Nova senha e confirmação não coincidem',
                    'invalid_forbidden_password_change': 'Você não tem permissão para alterar esta senha',
                };

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao alterar senha',
                };
            }

            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Erro ao alterar senha',
        };
    }
}

// ==========================================
// PATCH - Atualizar Privilégios
// ==========================================

/**
 * Atualiza privilégios de um usuário (role e isAdmin)
 * APENAS para administradores
 */
export async function updatePrivilegesAction(
    id: string,
    data: UpdatePrivilegesDto
): Promise<UserActionResponse<User>> {
    try {
        // Validação básica
        if (!data.role && data.isAdmin === undefined) {
            return {
                success: false,
                error: 'Pelo menos um campo (role ou isAdmin) deve ser fornecido',
            };
        }

        const response = await serverApi.patch<UpdatePrivilegesResponse>(
            API_CONFIG.ENDPOINTS.USERS.PRIVILEGES(id),
            {
                body: data,
                requireAuth: true,
            }
        );

        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Erro ao atualizar privilégios',
            };
        }

        // Revalida as páginas relacionadas
        revalidatePath('/app/users');
        revalidatePath(`/app/users/${id}`);

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Update privileges error:', error);

        if (error instanceof ServerApiError) {
            const apiError = error.data;

            if (apiError?.errors && Array.isArray(apiError.errors)) {
                const firstError = apiError.errors[0];

                const errorMessages: Record<string, string> = {
                    'invalid_forbidden_admin_required': 'Apenas administradores podem alterar privilégios',
                    'invalid_forbidden_self_demotion': 'Você não pode remover seus próprios privilégios de administrador',
                    'invalid_no_privileges_specified': 'Pelo menos um campo deve ser fornecido',
                };

                return {
                    success: false,
                    error: errorMessages[firstError.code] || firstError.description || 'Erro ao atualizar privilégios',
                };
            }

            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Erro ao atualizar privilégios',
        };
    }
}