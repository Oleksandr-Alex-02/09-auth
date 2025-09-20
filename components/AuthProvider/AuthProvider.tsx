
'use client';

import { checkSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const { setUser, clearAuth } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const isAuthenticated = await checkSession();
                if (isAuthenticated) {
                    const user = await getUser();
                    if (user) {
                        setUser(user);
                    } else {
                        clearAuth();
                        router.replace("/sign-in");
                    }
                } else {
                    clearAuth();
                    router.replace("/sign-in");
                }
            } catch (error) {
                console.error("Session check failed:", error);
                clearAuth();
                router.replace("/sign-in");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [setUser, clearAuth]);

    return loading ? <p>Loading...</p> : children;
}