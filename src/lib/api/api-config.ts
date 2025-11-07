// Configurações centralizadas da API

export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    TIMEOUT: 30000, // 30 segundos

    // Headers padrão
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

    // Netflix API - configuração especial
    NETFLIX: {
        BASE_URL: 'https://api-rds-aztools.onrender.com',
        TOKEN: 'YmxzLmZlbGlwZWRhczpkaXdlZndoaXVkamlvYXNkam5lYm5lbw==',
    },

    // Endpoints
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REFRESH_TOKEN: '/auth/refresh-token',
            ME: '/auth/me', // Se você tiver este endpoint
        },
        USERS: {
            BASE: '/users',
            BY_ID: (id: string) => `/users/${id}`,
            PASSWORD: (id: string) => `/users/${id}/password`,
            PRIVILEGES: (id: string) => `/users/${id}/privileges`,
        },
        CLIENTS: {
            BASE: '/clients',
            BY_ID: (id: string) => `/clients/${id}`,
        },
        PAX_NETFLIX: {
            BASE: '/api/pax/netflix',
            BY_EMAIL: (email: string) => `/api/pax/netflix/${email}`,
        },
    },
} as const;

export default API_CONFIG;