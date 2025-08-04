import { isBrowser } from '@/lib/isBrowser';

export const storage = {
  get<T = unknown>(key: string): T | null {
    if (!isBrowser) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  },
  set(key: string, value: unknown) {
    if (!isBrowser) return;
    const payload = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, payload);
  },
  remove(key: string) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  },
};
