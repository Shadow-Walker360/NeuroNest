import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthAPI } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true on first load (hydrate from token)
  const [ready, setReady]     = useState(false);

  // ── Hydrate session on mount ──────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('lv_token');
    if (!token) {
      setLoading(false);
      setReady(true);
      return;
    }
    // Validate token with backend
    AuthAPI.me()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('lv_token');
        localStorage.removeItem('lv_user');
      })
      .finally(() => {
        setLoading(false);
        setReady(true);
      });
  }, []);

  // ── LOGIN ─────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const data = await AuthAPI.login(email, password);
    localStorage.setItem('lv_token', data.access_token);
    localStorage.setItem('lv_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  // ── REGISTER ──────────────────────────────────────────
  const register = useCallback(async (formData) => {
    const data = await AuthAPI.register(formData);
    localStorage.setItem('lv_token', data.access_token);
    localStorage.setItem('lv_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  // ── LOGOUT ────────────────────────────────────────────
  const logout = useCallback(async () => {
    try { await AuthAPI.logout(); } catch (_) {}
    localStorage.removeItem('lv_token');
    localStorage.removeItem('lv_user');
    setUser(null);
  }, []);

  // ── UPDATE USER locally after profile edit ────────────
  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('lv_user', JSON.stringify(next));
      return next;
    });
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, ready, isAuthenticated, login, register, logout, updateUser }}>
      {ready ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}