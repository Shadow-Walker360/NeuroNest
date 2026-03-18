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

// ── DEMO MODE FLAG ────────────────────────────────────────
const isDemo = import.meta.env.PROD;

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

// ── RESPONSE INTERCEPTOR — DEMO MODE + ERROR HANDLING ─────
client.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const url = error.config?.url || "";

    // 🎭 DEMO MODE MOCKS
    if (isDemo) {
      console.log("🎭 Demo mode:", url);

      // AUTH
      if (url.includes("/auth/login")) {
        return {
          access_token: "demo-token",
          user: { name: "Demo User", email: "demo@learnverse.com" },
        };
      }

      if (url.includes("/auth/me")) {
        return {
          name: "Demo User",
          email: "demo@learnverse.com",
        };
      }

      // USER
      if (url.includes("/users/profile")) {
        return {
          name: "Demo User",
          level: "Advanced",
          xp: 1450,
          streak: 7,
        };
      }

      if (url.includes("/users/stats")) {
        return {
          xp: 1450,
          streak: 7,
          hours_week: 12,
          rank: 5,
          level: "Advanced",
        };
      }

      // COURSES
      if (url.includes("/courses")) {
        return [
          { id: 1, title: "AI Fundamentals", progress: 70 },
          { id: 2, title: "React Mastery", progress: 45 },
        ];
      }

      // AI
      if (url.includes("/ai/chat")) {
        return {
          reply: "This is a demo AI tutor response.",
          suggestions: ["Explain more", "Give examples"],
        };
      }

      if (url.includes("/ai/quiz")) {
        return {
          questions: [
            { q: "What is React?", a: "A JavaScript library" },
          ],
        };
      }

      // ROOMS
      if (url.includes("/rooms")) {
        return [
          { id: 1, name: "Math Study Group" },
          { id: 2, name: "Physics Revision" },
        ];
      }

      // DEFAULT FALLBACK
      return {
        message: "Demo mode active",
      };
    }

    // 🔐 REAL ERROR HANDLING (DEV / BACKEND MODE)
    if (error.response?.status === 401) {
      localStorage.removeItem('lv_token');
      localStorage.removeItem('lv_user');
      window.location.href = '/login';
    }

    return Promise.reject({
      status: error.response?.status,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Something went wrong',
      errors: error.response?.data?.errors || {},
    });
  }
);

// ══════════════════════════════════════════════════════════
// EXPORTS (UNCHANGED)
// ══════════════════════════════════════════════════════════

export const AuthAPI = {
  register: (data) => client.post('/auth/register', data),
  login: (email, password) => client.post('/auth/login', { email, password }),
  logout: () => client.post('/auth/logout'),
  refresh: () => client.post('/auth/refresh'),
  me: () => client.get('/auth/me'),
  forgotPassword: (email) =>
    client.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) =>
    client.post('/auth/reset-password', { token, new_password: newPassword }),
  verifyEmail: (token) =>
    client.post('/auth/verify-email', { token }),
};

export const UserAPI = {
  getProfile: () => client.get('/users/profile'),
  updateProfile: (data) => client.patch('/users/profile', data),
  changePassword: (data) => client.patch('/users/password', data),
  getStats: () => client.get('/users/stats'),
  getLeaderboard: () => client.get('/users/leaderboard'),
};

export const CoursesAPI = {
  list: (params) => client.get('/courses', { params }),
  myCourses: () => client.get('/courses/my'),
  get: (id) => client.get(`/courses/${id}`),
  enroll: (id) => client.post(`/courses/${id}/enroll`),
  updateProgress: (id, progress) =>
    client.patch(`/courses/${id}/progress`, { progress }),
  getLessons: (id) => client.get(`/courses/${id}/lessons`),
};

export const RoomsAPI = {
  list: () => client.get('/rooms'),
  get: (id) => client.get(`/rooms/${id}`),
  create: (data) => client.post('/rooms', data),
  join: (id) => client.post(`/rooms/${id}/join`),
  leave: (id) => client.post(`/rooms/${id}/leave`),
  delete: (id) => client.delete(`/rooms/${id}`),
};

export const AIAPI = {
  chat: (message, sessionId, context) =>
    client.post('/ai/chat', { message, session_id: sessionId, context }),
  generateFlashcards: (data) => client.post('/ai/flashcards', data),
  generateQuiz: (data) => client.post('/ai/quiz', data),
  getStudyPlan: () => client.get('/ai/study-plan'),
  summarise: (notes) => client.post('/ai/summarise', { notes }),
  getWeakAreas: () => client.get('/ai/weak-areas'),
};

export default client;