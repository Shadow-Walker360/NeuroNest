/**
 * LearnVerse API Client
 * ─────────────────────
 * All backend communication goes through this file.
 * Backend: Python FastAPI running at http://localhost:8000
 *
 * To connect to production:
 *   Set VITE_API_URL in your .env file:
 *   VITE_API_URL=https://api.learnverse.com
 *
 * Auth: JWT tokens stored in localStorage.
 * Every request automatically attaches the Bearer token.
 */

import axios from 'axios';

// ── BASE INSTANCE ──────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ── REQUEST INTERCEPTOR — attach JWT ───────────────────────
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lv_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR — handle 401 ─────────────────────
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('lv_token');
      localStorage.removeItem('lv_user');
      window.location.href = '/login';
    }
    // Return structured error for UI consumption
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.detail || error.response?.data?.message || 'Something went wrong',
      errors: error.response?.data?.errors || {},
    });
  }
);

// ══════════════════════════════════════════════════════════
//  AUTH ENDPOINTS
//  FastAPI routes: /auth/...
// ══════════════════════════════════════════════════════════
export const AuthAPI = {
  /**
   * POST /auth/register
   * Body: { email, password, first_name, last_name, phone, country_code,
   *         country, education_system, school_type, level, grade }
   */
  register: (data) => client.post('/auth/register', data),

  /**
   * POST /auth/login
   * Body: { email, password }
   * Returns: { access_token, token_type, user }
   */
  login: (email, password) =>
    client.post('/auth/login', { email, password }),

  /**
   * POST /auth/logout
   */
  logout: () => client.post('/auth/logout'),

  /**
   * POST /auth/refresh
   * Returns new access_token
   */
  refresh: () => client.post('/auth/refresh'),

  /**
   * GET /auth/me
   * Returns current user profile
   */
  me: () => client.get('/auth/me'),

  /**
   * POST /auth/forgot-password
   * Body: { email }
   */
  forgotPassword: (email) =>
    client.post('/auth/forgot-password', { email }),

  /**
   * POST /auth/reset-password
   * Body: { token, new_password }
   */
  resetPassword: (token, newPassword) =>
    client.post('/auth/reset-password', { token, new_password: newPassword }),

  /**
   * POST /auth/verify-email
   * Body: { token }
   */
  verifyEmail: (token) =>
    client.post('/auth/verify-email', { token }),
};

// ══════════════════════════════════════════════════════════
//  USER / PROFILE ENDPOINTS
//  FastAPI routes: /users/...
// ══════════════════════════════════════════════════════════
export const UserAPI = {
  /**
   * GET /users/profile
   */
  getProfile: () => client.get('/users/profile'),

  /**
   * PATCH /users/profile
   * Body: partial user fields
   */
  updateProfile: (data) => client.patch('/users/profile', data),

  /**
   * PATCH /users/password
   * Body: { current_password, new_password }
   */
  changePassword: (data) => client.patch('/users/password', data),

  /**
   * GET /users/stats
   * Returns: { xp, streak, hours_week, rank, level }
   */
  getStats: () => client.get('/users/stats'),

  /**
   * GET /users/leaderboard
   */
  getLeaderboard: () => client.get('/users/leaderboard'),
};

// ══════════════════════════════════════════════════════════
//  COURSES ENDPOINTS
//  FastAPI routes: /courses/...
// ══════════════════════════════════════════════════════════
export const CoursesAPI = {
  /** GET /courses — list all available courses */
  list: (params) => client.get('/courses', { params }),

  /** GET /courses/my — enrolled courses */
  myCourses: () => client.get('/courses/my'),

  /** GET /courses/:id */
  get: (id) => client.get(`/courses/${id}`),

  /** POST /courses/:id/enroll */
  enroll: (id) => client.post(`/courses/${id}/enroll`),

  /** PATCH /courses/:id/progress */
  updateProgress: (id, progress) =>
    client.patch(`/courses/${id}/progress`, { progress }),

  /** GET /courses/:id/lessons */
  getLessons: (id) => client.get(`/courses/${id}/lessons`),
};

// ══════════════════════════════════════════════════════════
//  STUDY ROOMS ENDPOINTS
//  FastAPI routes: /rooms/...
// ══════════════════════════════════════════════════════════
export const RoomsAPI = {
  /** GET /rooms — live + open rooms */
  list: () => client.get('/rooms'),

  /** GET /rooms/:id */
  get: (id) => client.get(`/rooms/${id}`),

  /**
   * POST /rooms
   * Body: { name, subject, type: 'public'|'private', max_members }
   */
  create: (data) => client.post('/rooms', data),

  /** POST /rooms/:id/join */
  join: (id) => client.post(`/rooms/${id}/join`),

  /** POST /rooms/:id/leave */
  leave: (id) => client.post(`/rooms/${id}/leave`),

  /** DELETE /rooms/:id */
  delete: (id) => client.delete(`/rooms/${id}`),
};

// ══════════════════════════════════════════════════════════
//  AI TUTOR ENDPOINTS
//  FastAPI routes: /ai/...
// ══════════════════════════════════════════════════════════
export const AIAPI = {
  /**
   * POST /ai/chat
   * Body: { message, session_id, context }
   * Returns: { reply, session_id, suggestions }
   */
  chat: (message, sessionId, context) =>
    client.post('/ai/chat', { message, session_id: sessionId, context }),

  /**
   * POST /ai/flashcards
   * Body: { topic, count, difficulty }
   */
  generateFlashcards: (data) => client.post('/ai/flashcards', data),

  /**
   * POST /ai/quiz
   * Body: { topic, count, difficulty, type }
   */
  generateQuiz: (data) => client.post('/ai/quiz', data),

  /**
   * GET /ai/study-plan
   * Returns personalised weekly plan
   */
  getStudyPlan: () => client.get('/ai/study-plan'),

  /**
   * POST /ai/summarise
   * Body: { notes }
   */
  summarise: (notes) => client.post('/ai/summarise', { notes }),

  /**
   * GET /ai/weak-areas
   */
  getWeakAreas: () => client.get('/ai/weak-areas'),
};

// ══════════════════════════════════════════════════════════
//  MARKETPLACE / TUTORING ENDPOINTS
//  FastAPI routes: /marketplace/...
// ══════════════════════════════════════════════════════════
export const MarketplaceAPI = {
  /** GET /marketplace/tutors */
  listTutors: (params) => client.get('/marketplace/tutors', { params }),

  /** GET /marketplace/tutors/:id */
  getTutor: (id) => client.get(`/marketplace/tutors/${id}`),

  /**
   * POST /marketplace/sessions
   * Body: { tutor_id, type: 'one_on_one'|'group'|'hybrid', scheduled_at, subject }
   */
  bookSession: (data) => client.post('/marketplace/sessions', data),

  /** GET /marketplace/sessions/my */
  mySessions: () => client.get('/marketplace/sessions/my'),

  /** GET /marketplace/packs — premium study packs */
  listPacks: () => client.get('/marketplace/packs'),

  /** POST /marketplace/packs/:id/purchase */
  purchasePack: (id) => client.post(`/marketplace/packs/${id}/purchase`),
};

// ══════════════════════════════════════════════════════════
//  ANALYTICS ENDPOINTS
//  FastAPI routes: /analytics/...
// ══════════════════════════════════════════════════════════
export const AnalyticsAPI = {
  /** GET /analytics/overview */
  overview: () => client.get('/analytics/overview'),

  /** GET /analytics/heatmap */
  heatmap: () => client.get('/analytics/heatmap'),

  /** GET /analytics/subjects */
  subjects: () => client.get('/analytics/subjects'),

  /** GET /analytics/predictions */
  predictions: () => client.get('/analytics/predictions'),
};

// ══════════════════════════════════════════════════════════
//  LIBRARY ENDPOINTS
//  FastAPI routes: /library/...
// ══════════════════════════════════════════════════════════
export const LibraryAPI = {
  /** GET /library — all resources */
  list: (params) => client.get('/library', { params }),

  /** GET /library/saved */
  saved: () => client.get('/library/saved'),

  /** POST /library/:id/save */
  save: (id) => client.post(`/library/${id}/save`),

  /** DELETE /library/:id/save */
  unsave: (id) => client.delete(`/library/${id}/save`),
};

// ══════════════════════════════════════════════════════════
//  ACHIEVEMENTS ENDPOINTS
//  FastAPI routes: /achievements/...
// ══════════════════════════════════════════════════════════
export const AchievementsAPI = {
  /** GET /achievements */
  list: () => client.get('/achievements'),

  /** GET /achievements/my */
  mine: () => client.get('/achievements/my'),
};

// ══════════════════════════════════════════════════════════
//  PAYMENTS ENDPOINTS
//  FastAPI routes: /payments/...
//  Stripe integration on backend
// ══════════════════════════════════════════════════════════
export const PaymentsAPI = {
  /**
   * POST /payments/checkout
   * Body: { plan: 'solo'|'group', interval: 'month'|'year' }
   * Returns: { checkout_url } — redirect to Stripe
   */
  checkout: (plan, interval) =>
    client.post('/payments/checkout', { plan, interval }),

  /** GET /payments/subscription */
  subscription: () => client.get('/payments/subscription'),

  /** POST /payments/cancel */
  cancel: () => client.post('/payments/cancel'),

  /** GET /payments/history */
  history: () => client.get('/payments/history'),
};

// ══════════════════════════════════════════════════════════
//  NOTIFICATIONS ENDPOINTS
//  FastAPI routes: /notifications/...
// ══════════════════════════════════════════════════════════
export const NotificationsAPI = {
  /** GET /notifications */
  list: () => client.get('/notifications'),

  /** PATCH /notifications/:id/read */
  markRead: (id) => client.patch(`/notifications/${id}/read`),

  /** POST /notifications/read-all */
  markAllRead: () => client.post('/notifications/read-all'),
};

export default client;