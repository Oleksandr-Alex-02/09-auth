
'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore(state => state.setUser);
    const clearAuth = useAuthStore(state => state.clearAuth);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await checkSession();

                if (session?.success) {
                    const user = await getMe();
                    if (user && typeof user === 'object') {
                        setUser(user);
                    } else {
                        clearAuth();
                    }
                } else {
                    clearAuth();
                }
            } catch (error) {
                console.error('AuthProvider error:', error);
                clearAuth();
            }
        };

        fetchUser();
    }, [setUser, clearAuth]);

    return children;
};

export default AuthProvider;