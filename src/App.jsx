import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import Toast from './components/ui/Toast.jsx';
import PWABanner from './components/ui/PWABanner.jsx';
import ProtectedRoute from './components/ui/ProtectedRoute.jsx';

// Pages
import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Courses from './pages/Courses/Courses.jsx';
import StudyRooms from './pages/StudyRooms/StudyRooms.jsx';
import AITutor from './pages/AITutor/AITutor.jsx';
import Marketplace from './pages/Marketplace/Marketplace.jsx';
import Analytics from './pages/Analytics/Analytics.jsx';
import Library from './pages/Library/Library.jsx';
import Achievements from './pages/Achievements/Achievements.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Settings from './pages/Settings/Settings.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected routes — require login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/study-rooms" element={<StudyRooms />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/library" element={<Library />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global UI overlays */}
        <Toast />
        <PWABanner />
      </ToastProvider>
    </AuthProvider>
  );
}