'use client';

// Provider do TanStack Query para usar no client-side quando necessário

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Configurações padrão para queries
                        staleTime: 1000 * 60 * 5, // 5 minutos
                        gcTime: 1000 * 60 * 10, // 10 minutos (antes era cacheTime)
                        retry: 1,
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        // Configurações padrão para mutations
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools só aparece em desenvolvimento */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" />
            )}
        </QueryClientProvider>
    );
}