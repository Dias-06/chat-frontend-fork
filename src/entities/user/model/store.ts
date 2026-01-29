import {create} from "zustand"

interface UserStore {
    currentUser: any | null
    isAuth: boolean
    setUser: (user: any) => void 
    logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    isAuth: false,
    setUser: (user) => set({
        isAuth: true,
        currentUser: user
    }),
    logout: () => set({
        isAuth: false,
        currentUser: null
    })
}))