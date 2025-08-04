'use client';

import { create } from 'zustand';
import { storage } from '../lib/storage';
import { User } from '@/types';

type State = {
  token: string | null;
  user: User | null;
};

type Actions = {
  setAuth: (token: string, user: User) => void;
  clear: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<State & Actions>((set:any) => ({
  token: null,
  user: null,

  setAuth: (token:String, user:String) => {
    storage.set('token', token);
    storage.set('user', user);
    set({ token, user });
  },

  clear: () => {
    storage.remove('token');
    storage.remove('user');
    set({ token: null, user: null });
  },

  hydrate: () => {
    const token = storage.get<string>('token');
    const user = storage.get<User>('user');
    set({ token: token ?? null, user: user ?? null });
  },
}));
