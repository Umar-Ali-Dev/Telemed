import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { refreshToken, logout as logoutApi } from '../api/auth';
import type { Role } from '../constants/roles';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;        // true while restoring session on app load
  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize synchronously from localStorage — avoids flash of unprotected content
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // On app load — try to restore session from the HttpOnly refresh token cookie.
  // If it succeeds, the access token cookie is refreshed and the user stays logged in.
  // If it fails (cookie expired/missing), user stays null → redirected to login.
  useEffect(() => {
    const restoreSession = async () => {
      try {
        await refreshToken();
        // Refresh succeeded but we don't get user info back from /auth/refresh.
        // The access token is now set in the cookie — we read the role from localStorage
        // which we set during login (non-sensitive, just for UI routing).
        const stored = localStorage.getItem('auth_user');
        if (stored) setUser(JSON.parse(stored));
      } catch {
        // No valid session — user must log in
        localStorage.removeItem('auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const handleSetUser = (u: AuthUser | null) => {
    setUser(u);
    if (u) {
      // Store non-sensitive user info for session restore (role, email)
      localStorage.setItem('auth_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('auth_user');
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      handleSetUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};