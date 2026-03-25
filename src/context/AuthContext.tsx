import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'

// AuthContext holder login-state på tværs af hele appen.
// Uden context skulle vi sende user som prop igennem hvert niveau — "prop drilling".
// Termen: "prop drilling" — at sende props ned igennem mange lag der ikke selv bruger dem.

interface AuthContextValue {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

// createContext opretter konteksten med en default-værdi.
// null her betyder: "ingen provider er endnu monteret" — en fejl vi vil opdage hurtigt.
// Termen: "context" / "createContext"
const AuthContext = createContext<AuthContextValue | null>(null)

// Provider-komponenten wrapper den del af appen der skal have adgang til auth-state.
// Termen: "provider" / "consumer pattern"
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  function login(user: User) {
    setUser(user)
  }

  function logout() {
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook der giver adgang til AuthContext.
// Vi eksponerer ALDRIG AuthContext direkte — al adgang går via useAuth().
// Det sikrer at vi fejler med en klar besked hvis nogen glemmer AuthProvider.
// Termen: "custom context hook"
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth skal bruges inde i en AuthProvider')
  }

  return context
}
