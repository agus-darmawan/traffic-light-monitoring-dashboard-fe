import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthState {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
  getToken: () => string;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      token: '',
      setToken: (token: string) => set({ token }),
      removeToken: () => {
        set({ token: '' });
        localStorage.removeItem('auth.__token');
      },
      getToken: () => get().token
    }),
    {
      name: 'auth.__token'
    }
  )
);

export default useAuthStore;
