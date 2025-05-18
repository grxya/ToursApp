'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthInitializer() {
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    loadUserFromStorage();
    
    if (!isAuthenticated) {
      console.log('User is not authenticated, default state:');
      console.log({ isAuthenticated, user: null });
    } else {
      console.log('User is authenticated, data after loading from localStorage:');
      console.log({ isAuthenticated, user });
    }
  }, [loadUserFromStorage, isAuthenticated, user]);

  return null;
}
