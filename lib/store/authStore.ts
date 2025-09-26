

// import { User } from "@/types/user";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthStore {
//     isAuthenticated: boolean;
//     user: User | null;
//     setUser: (user: User) => void;
//     clearAuth: () => void;
// }

// export const useAuthStore = create<AuthStore>()(
//     persist(
//         (set) => ({
//             isAuthenticated: false,
//             user: null,
//             setUser: (user: User) => set({ user, isAuthenticated: true }),
//             clearAuth: () => set({ isAuthenticated: false, user: null })
//         })
//         ,
//         {
//             name: "auth-store",
//             partialize: (state) => ({
//                 user: state.user,
//                 isAuthenticated: state.isAuthenticated,
//             }),
//         }
//     )
// )

import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: User) => set(() => ({ user, isAuthenticated: !!user })),
    clearIsAuthenticated: () => set(() => ({ isAuthenticated: false, user: null })),
})); 