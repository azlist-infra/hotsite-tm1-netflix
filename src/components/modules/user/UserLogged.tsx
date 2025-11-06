'use client'

import {  Menu, Avatar, Portal } from "@chakra-ui/react";
import { MenuUser } from "@/layouts/menu";

interface UserLoggedProps {
    userName?: string
    userEmail?: string
    avatarUrl?: string
}

export function UserLogged({ userName, userEmail, avatarUrl }: UserLoggedProps) {
    const displayName = userName || userEmail || 'Usuário'
    
    return (
        <Menu.Root positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger rounded="full" focusRing="none">
                <Avatar.Root size="sm">
                    <Avatar.Fallback name={displayName} />
                    {avatarUrl && <Avatar.Image src={avatarUrl} />}
                </Avatar.Root>
            </Menu.Trigger>
            <Portal>
                <MenuUser userName={displayName} userEmail={userEmail} />
            </Portal>
        </Menu.Root>
    )
}
