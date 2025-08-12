'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export const useRequireAuth = () => {
  const router = useRouter();
  const { token, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (token === null) {
      // If not hydrated yet, we can't know. Delay 1 tick.
      const t = setTimeout(() => {
        if (!useAuthStore.getState().token) router.replace('/login');
      }, 0);
      return () => clearTimeout(t);
    }
  }, [token, router]);
};
