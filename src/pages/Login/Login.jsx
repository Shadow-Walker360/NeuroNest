import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import ParticleField from '../../components/three/ParticleField.jsx';
import { validators } from '../../utils/validators.js';
import './Login.css';

const FEATURES = [
  {
    icon: '🤖',
    color: 'rgba(245,158,11,0.15)',
    title: 'AI Tutor, 24/7',
    desc: 'Get instant help on any topic, personalised to your curriculum and learning style.',
  },
  {
    icon: '🌍',
    color: 'rgba(56,189,248,0.12)',
    title: 'Your curriculum, not ours',
    desc: "We auto-map to your country's education system the moment you sign up.",
  },
  {
    icon: '🏆',
    color: 'rgba(16,185,129,0.12)',
    title: 'Gamified motivation',
    desc: 'XP, streaks, badges, and leaderboards keep you coming back every day.',
  },
];

export default function Login() {
  const navigate            = useNavigate();
  const { login, demoLogin } = useAuth();
  const { toast }           = useToast();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    const emailErr    = validators.email(form.email);
    const passwordErr = validators.required(form.password);
    if (emailErr)    errs.email    = emailErr;
    if (passwordErr) errs.password = passwordErr;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!', 'Redirecting to your dashboard…');
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Demo login — uses AuthContext.demoLogin(), no real API call
  const handleDemoLogin = async () => {
    setApiError('');
    setDemoLoading(true);
    try {
      await new Promise(r => setTimeout(r, 700)); // brief loading feel
      await demoLogin();
      toast.success('Demo account loaded! 🎮', 'Welcome, Alex Kimani.');
      navigate('/dashboard');
    } catch (err) {
      setApiError('Demo login failed. Please try again.');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT — marketing panel */}
      <div className="auth-left">
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <ParticleField />
        </div>
        <div className="auth-left-inner">
          <div className="auth-logo" onClick={() => navigate('/')}>
            <div className="auth-logo-box">LV</div>
            <span className="auth-logo-name">LearnVerse</span>
          </div>
          <h2 className="auth-headline">The smartest way to study, period.</h2>
          <p className="auth-sub">
            120,000+ students across 50 countries trust LearnVerse to get better grades.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="auth-left-feature">
                <div className="auth-left-feature-icon" style={{ background: f.color }}>
                  {f.icon}
                </div>
                <div>
                  <div className="auth-left-feature-title">{f.title}</div>
                  <div className="auth-left-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — login form */}
      <div className="auth-right">
        <div className="ambient-orb ambient-orb-1" style={{ opacity: 0.5 }} />
        <div className="auth-right-inner fade-up">

          <div className="auth-logo" onClick={() => navigate('/')}>
            <div className="auth-logo-box">LV</div>
            <span className="auth-logo-name">LearnVerse</span>
          </div>

          <div className="auth-form-title">Welcome back</div>
          <div className="auth-form-sub">Sign in to continue your learning journey.</div>

          {apiError && (
            <div className="auth-error-banner">⚠ {apiError}</div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              error={errors.email}
              required
              autoComplete="email"
              iconLeft={<EmailIcon />}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Your password"
              error={errors.password}
              required
              autoComplete="current-password"
            />

            <div style={{ textAlign: 'right', marginTop: -8 }}>
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => toast.info('Reset password', 'Check your email for a reset link.')}
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Sign in →
            </Button>
          </form>

          <div className="auth-divider" style={{ margin: '20px 0 8px' }}>or</div>

          {/* Demo button — clearly explained */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            loading={demoLoading}
            onClick={handleDemoLogin}
          >
            🎮 Try demo account
          </Button>

          <p style={{ fontSize: 11, color: 'var(--text-c)', textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
            Logs in as Alex Kimani (Kenya · Grade 12 · CBC). No signup needed.
          </p>

          <p className="auth-switch">
            Don't have an account?{' '}
            <button className="auth-switch-link" onClick={() => navigate('/register')}>
              Sign up free →
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}