import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    role: null, // 'guest', 'driver', 'admin'
    isAuthenticated: false,
  });

  const login = useCallback((role, credentials) => {
    // Simulated authentication
    setAuth({
      user: {
        id: `${role}-${Date.now()}`,
        role,
        ...credentials,
      },
      role,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    setAuth({
      user: null,
      role: null,
      isAuthenticated: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
