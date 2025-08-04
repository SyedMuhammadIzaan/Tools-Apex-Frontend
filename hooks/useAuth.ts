'use client';

import { useMutation } from '@tanstack/react-query';
import { login, signup } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { getApiErrorMessage } from '@/lib/error';

export function useSignup() {
  const setAuth = useAuthStore((s:any) => s.setAuth);

  return useMutation({
    mutationFn: signup,
    onSuccess: (res) => setAuth(res.token, res.user),
    onError: (err) => {
      console.error(getApiErrorMessage(err));
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((s:any) => s.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => setAuth(res.token, res.user),
    onError: (err) => {
      console.error(getApiErrorMessage(err));
    },
  });
}

export function useLogout() {
  const clear = useAuthStore((s:any) => s.clear);
  return () => clear();
}
