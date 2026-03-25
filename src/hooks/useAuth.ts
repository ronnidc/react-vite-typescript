import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import type { AuthContextValue } from '../context/authContext';

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth skal bruges inde i en AuthProvider');
  }

  return context;
}
