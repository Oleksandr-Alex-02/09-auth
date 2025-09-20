

import { User } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
    isAuthenticated: boolean,
    user: User | null,
    setUser: (user: User) => void,
    clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            setUser: (user: User) => set({ user, isAuthenticated: true }),
            clearAuth: () => set({ isAuthenticated: false, user: null })
        })
        ,
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)