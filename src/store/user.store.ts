import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {}

interface UserStore {
  user: User | null;
  login: (userData:  User ) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      login: (userData: User) => set({ user: userData }),
      logout: async () => {
        try {
          set({ user: null });
        window.location.href = '/'
        } catch (error) {
          console.error('Error logging out:', error);
        }
      },
      updateUser: (updatedData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null,
        })),
    }),
    {
      name: `user-storage`,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version !== 0) return persistedState;
        return persistedState as UserStore;
      },
    }
  )
);