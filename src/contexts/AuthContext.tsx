import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, setAuthenticated, logout as authLogout, verifyCode, initializeAuth } from '@/lib/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inizializza l'autenticazione e controlla lo stato
    const init = async () => {
      await initializeAuth();
      setIsLoggedIn(isAuthenticated());
      setIsLoading(false);
    };
    init();
  }, []);

  const login = async (code: string): Promise<boolean> => {
    const isValid = await verifyCode(code);
    if (isValid) {
      setAuthenticated(true);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    authLogout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
