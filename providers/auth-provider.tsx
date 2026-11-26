import { useAuthStore } from "@/stores/auth-store";
import React, { useEffect } from "react";

export function AuthProvider({ children, }: { children: React.ReactNode }) {
    const hydrateSession = useAuthStore(
        (state) => state.hydrateSession,
    );

    useEffect(() => {
        hydrateSession();
    }, [hydrateSession]);


    return <>{children}</>
}