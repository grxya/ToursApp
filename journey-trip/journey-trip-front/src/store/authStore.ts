import { create } from 'zustand';
import { AuthState } from '@/interfaces'

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  authenticate: (user, token) => {
    document.cookie = `token=${token}; path=/;`;
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Данные пользователя сохранены в localStorage:', user);

    set({ isAuthenticated: true, user, token });
  },

  logout: () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem('user');
    console.log('Пользователь вышел, данные удалены');

    set({ isAuthenticated: false, user: null, token: null });
  },

  loadUserFromStorage: () => {
    const user = localStorage.getItem('user');
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];

    set((state) => {
      if (!state.isAuthenticated && user && token) {
        console.log('Данные пользователя загружены из localStorage:', JSON.parse(user));
        return { isAuthenticated: true, user: JSON.parse(user), token };
      } else {
        console.log('Пользователь не найден в localStorage');
        return state; 
      }
    });
  },
}));
