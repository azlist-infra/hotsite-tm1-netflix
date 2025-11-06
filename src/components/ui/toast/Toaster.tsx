"use client"

import {
    Toaster as ChakraToaster,
    Portal,
    Spinner,
    Stack,
    Toast,
    createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
    placement: "bottom-end",
    pauseOnPageIdle: true,
})

export const Toaster = () => {
    return (
        <Portal>
            <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
                {(toast) => (
                    <Toast.Root width={{ md: "sm" }}>
                        {toast.type === "loading" ? (
                            <Spinner size="sm" color="blue.solid" />
                        ) : (
                            <Toast.Indicator />
                        )}
                        <Stack gap="1" flex="1" maxWidth="100%">
                            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                            {toast.description && (
                                <Toast.Description>{toast.description}</Toast.Description>
                            )}
                        </Stack>
                        {toast.action && (
                            <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
                        )}
                        {toast.closable && <Toast.CloseTrigger />}
                    </Toast.Root>
                )}
            </ChakraToaster>
        </Portal>
    )
}

// ✅ Wrapper genérico para usar em qualquer lugar
type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

interface ShowToastOptions {
    title: string
    description?: string
    type?: ToastType
    duration?: number
}

export const showToast = ({
    title,
    description,
    type = 'info',
    duration = 5000,
}: ShowToastOptions) => {
    return toaster.create({
        title,
        description,
        type,
        duration,
    })
}

// Atalhos convenientes
export const toast = {
    success: (title: string, description?: string) =>
        showToast({ title, description, type: 'success' }),

    error: (title: string, description?: string) =>
        showToast({ title, description, type: 'error', duration: 6000 }),

    warning: (title: string, description?: string) =>
        showToast({ title, description, type: 'warning' }),

    info: (title: string, description?: string) =>
        showToast({ title, description, type: 'info' }),

    loading: (title: string, description?: string) =>
        showToast({ title, description, type: 'loading', duration: Infinity }),
}