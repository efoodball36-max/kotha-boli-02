import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children, apiBase }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kb02_token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post(`${apiBase}/api/auth/login`, { username, password });
    setToken(res.data.token);
    localStorage.setItem('kb02_token', res.data.token);
    setUser(res.data.user);
  };

  const register = async (username, password) => {
    const res = await axios.post(`${apiBase}/api/auth/register`, { username, password });
    setToken(res.data.token);
    localStorage.setItem('kb02_token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('kb02_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
