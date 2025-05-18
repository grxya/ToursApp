'use client';

import UserAccount from '@/components/account/UserAccount';
import { useAuthStore } from '@/store/authStore';

export default function Azerbaijan() {
  const user = useAuthStore(state => state.user);

  if (!user) return <p>Loading...</p>;

  return <UserAccount user={user} />;
}
