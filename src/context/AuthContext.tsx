import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { AuthContext } from './authContext';

const STORAGE_KEY = 'auth_user';

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(loadUser);

  function login(user: User) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
