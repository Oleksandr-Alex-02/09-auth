
'use client';

import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
    const { user, clearAuth } = useAuthStore();

    if (!user) return null;

    return (
        <>
            <li>
                <span>Welcome, {user.username}</span>
            </li>
            <li>
                <button onClick={clearAuth}>Logout</button>
            </li>
        </>
    );
}