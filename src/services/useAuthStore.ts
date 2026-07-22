import { create } from 'zustand';


interface UserState {
  user: { firstName?: string; lastName?: string; image?: string; username?: string } | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));