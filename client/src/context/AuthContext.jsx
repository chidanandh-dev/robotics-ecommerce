import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService.js';

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem('robotics_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(localStorage.getItem('robotics_token'));

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('robotics_user', JSON.stringify(user));
      localStorage.setItem('robotics_token', token);
    } else {
      localStorage.removeItem('robotics_user');
      localStorage.removeItem('robotics_token');
    }
  }, [user, token]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(user && token), login, register, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
