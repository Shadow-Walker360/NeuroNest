import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthAPI } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady]     = useState(false);

  // ── Hydrate session on mount ──────────────────────────
  useEffect(() => {
    const token     = localStorage.getItem('lv_token');
    const cachedRaw = localStorage.getItem('lv_user');

    if (!token) {
      setLoading(false);
      setReady(true);
      return;
    }

    // Demo token — skip network entirely, trust localStorage
    if (token.startsWith('demo_')) {
      try { setUser(JSON.parse(cachedRaw)); } catch (_) {}
      setLoading(false);
      setReady(true);
      return;
    }

    // Real token — hydrate from cache immediately so UI is not blank,
    // then silently validate with backend in the background.
    if (cachedRaw) {
      try { setUser(JSON.parse(cachedRaw)); } catch (_) {}
    }

    AuthAPI.me()
      .then((data) => {
        setUser(data);
        localStorage.setItem('lv_user', JSON.stringify(data));
      })
      .catch(() => {
        // Only wipe session if we have no local cache to fall back on
        if (!cachedRaw) {
          localStorage.removeItem('lv_token');
          localStorage.removeItem('lv_user');
          setUser(null);
        }
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

  // ── Demo login — bypasses the real API entirely ───────
  const demoLogin = useCallback(async () => {
    const demoUser = {
      id: 1,
      email: 'demo@learnverse.com',
      first_name: 'Alex',
      last_name: 'Kimani',
      country: 'KE',
      country_code: 'KE',
      level: 24,
      xp: 4820,
      education_system: 'Kenya CBC & 8-4-4 Systems',
      study_level: 'Senior Secondary',
      grade: 'Grade 12',
      school_type: 'national_school',
      target_qualification: 'KCSE',
      role: 'student',
    };
    localStorage.setItem('lv_token', 'demo_token_learnverse');
    localStorage.setItem('lv_user', JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user, loading, ready, isAuthenticated,
      login, register, logout, updateUser, demoLogin,
    }}>
      {ready ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}