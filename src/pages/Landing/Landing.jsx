import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../../components/three/ParticleField.jsx';
import Button from '../../components/ui/Button.jsx';
import './Landing.css';

const FEATURES = [
  { icon:'🤖', color:'rgba(245,158,11,0.12)', glow:'rgba(245,158,11,0.08)', title:'AI-Powered Tutoring', desc:'Your personal AI tutor works 24/7 — generating flashcards, quizzes, and tailored study plans based on your weak areas.' },
  { icon:'🌍', color:'rgba(56,189,248,0.12)', glow:'rgba(56,189,248,0.06)', title:'Country-Tailored Learning', desc:'Education systems differ by country. We auto-detect your curriculum from your phone number and personalise every lesson to your local system.' },
  { icon:'🎥', color:'rgba(167,139,250,0.12)', glow:'rgba(167,139,250,0.06)', title:'Live Tutoring Sessions', desc:'Book 1-on-1 sessions with expert tutors or join group classes. Video, whiteboard, quizzes — all in one room.' },
  { icon:'🏆', color:'rgba(16,185,129,0.12)', glow:'rgba(16,185,129,0.06)', title:'Gamified Learning', desc:'Earn XP, badges, and climb leaderboards. Streaks, challenges, and rewards keep you motivated every single day.' },
  { icon:'📊', color:'rgba(244,63,94,0.12)', glow:'rgba(244,63,94,0.06)', title:'Deep Analytics', desc:'Track every weak area. Predictive AI estimates your exam readiness and auto-adjusts difficulty so you always improve.' },
  { icon:'🤝', color:'rgba(249,115,22,0.12)', glow:'rgba(249,115,22,0.06)', title:'Study Rooms', desc:'Create or join live study rooms with peers. Shared whiteboards, group quizzes, live polls, and real-time collaboration.' },
];

const STEPS = [
  { n:'01', title:'Sign up in 2 minutes', desc:'Register with your phone number. We auto-detect your country and education system — no manual setup.' },
  { n:'02', title:'Get your AI study plan', desc:'Our AI analyses your level, goals, and schedule, then builds a personalised weekly roadmap.' },
  { n:'03', title:'Learn, practise, repeat', desc:'Study with AI, join live rooms, book tutors. Every session makes the next one smarter.' },
  { n:'04', title:'Track & achieve', desc:'Watch your progress, earn badges, and hit your goals — from GCSE to PhD.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="landing">
      {/* Three.js background */}
      <div style={{ position:'fixed', inset:0, zIndex:0 }}>
        <ParticleField />
      </div>

      {/* Ambient orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />

      {/* ── NAVBAR ── */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => navigate('/')}>
          <div className="nav-logo-box">LV</div>
          <span className="nav-logo-name">LearnVerse</span>
        </div>
        <div className="nav-spacer" />
        <div className="nav-links">
          <button className="nav-link" onClick={() => document.getElementById('features').scrollIntoView({behavior:'smooth'})}>Features</button>
          <button className="nav-link" onClick={() => document.getElementById('how').scrollIntoView({behavior:'smooth'})}>How it works</button>
          <button className="nav-link" onClick={() => navigate('/pricing')}>Pricing</button>
        </div>
        <div className="nav-actions">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log in</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Get started →</Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="landing-hero">
        <div className="hero-badge fade-in">
          <span className="hero-badge-dot" />
          Now serving 50+ countries · 12 education systems
        </div>

        <h1 className="hero-title">
          Learn smarter with<br />
          <span className="hero-title-accent">AI that knows</span><br />
          your curriculum
        </h1>

        <p className="hero-sub fade-up delay-2">
          LearnVerse adapts to your country's education system, your grade, and your personal learning pace. From KCSE to A-Levels to university — one platform, every student.
        </p>

        <div className="hero-cta">
          <Button variant="primary" size="xl" onClick={() => navigate('/register')}>
            Start learning free →
          </Button>
          <Button variant="secondary" size="xl" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        </div>

        <div className="hero-stats">
          {[
            { num:'120K+', label:'Active Students' },
            null,
            { num:'50+',   label:'Countries' },
            null,
            { num:'4.9★',  label:'Average Rating' },
            null,
            { num:'98%',   label:'Pass Rate Improvement' },
          ].map((s, i) =>
            s === null
              ? <div key={i} className="hero-stat-div" />
              : <div key={i} className="hero-stat">
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
          )}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="landing-features" id="features">
        <div className="landing-section-label">Why LearnVerse</div>
        <h2 className="landing-section-title">Everything you need to excel at your studies</h2>
        <p className="landing-section-sub">
          Built for students from kindergarten to PhD, LearnVerse combines AI tutoring, live collaboration, and gamification into one seamless platform.
        </p>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card fade-up" style={{ '--fc-glow': f.glow, animationDelay:`${i*0.08}s` }}>
              <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="landing-how" id="how">
        <div className="how-inner">
          <div className="landing-section-label">How it works</div>
          <h2 className="landing-section-title">Up and running in minutes</h2>
          <div className="how-steps">
            {STEPS.map((s, i) => (
              <div key={i} className="how-step fade-up" style={{ animationDelay:`${i*0.1}s` }}>
                <div className="how-step-num">{s.n}</div>
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="landing-pricing" id="pricing">
        <div className="landing-section-label">Simple pricing</div>
        <h2 className="landing-section-title">Plans for every learner</h2>
        <p className="landing-section-sub">Start free. Upgrade when you need more.</p>
        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card fade-up">
            <div className="pricing-plan">Free</div>
            <div className="pricing-price">$0</div>
            <div className="pricing-period">forever</div>
            <div className="pricing-features">
              {['Personal study room','AI tutor (10 msgs/day)','3 study rooms / month','Basic analytics','Mobile app access'].map(f=>(
                <div key={f} className="pricing-feature"><span className="pricing-feature-check">✓</span>{f}</div>
              ))}
            </div>
            <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>Get started free</Button>
          </div>

          {/* Solo */}
          <div className="pricing-card featured fade-up delay-1">
            <div className="pricing-badge"><span className="badge badge-amber">Most Popular</span></div>
            <div className="pricing-plan">Solo Premium</div>
            <div className="pricing-price" style={{ color:'var(--amber)' }}>$30</div>
            <div className="pricing-period">per month · cancel anytime</div>
            <div className="pricing-features">
              {['Unlimited AI tutoring','Unlimited study rooms','1-on-1 tutor sessions ($25/ea)','Advanced analytics & predictions','Offline mode','Priority support','Personalized study plans'].map(f=>(
                <div key={f} className="pricing-feature"><span className="pricing-feature-check">✓</span>{f}</div>
              ))}
            </div>
            <Button variant="primary" fullWidth onClick={() => navigate('/register')}>Start 7-day free trial →</Button>
          </div>

          {/* Group */}
          <div className="pricing-card fade-up delay-2">
            <div className="pricing-plan">Institution</div>
            <div className="pricing-price">$50</div>
            <div className="pricing-period">per month · per school admin</div>
            <div className="pricing-features">
              {['Everything in Solo','Group / school dashboard','Admin analytics for all students','Bulk student onboarding','Custom curriculum mapping','Dedicated support manager','API access'].map(f=>(
                <div key={f} className="pricing-feature"><span className="pricing-feature-check">✓</span>{f}</div>
              ))}
            </div>
            <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>Contact sales</Button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="landing-cta">
        <div className="landing-cta-inner">
          <h2>Ready to transform how you learn?</h2>
          <p>Join 120,000+ students already learning smarter with LearnVerse. Free forever, no credit card needed.</p>
          <Button variant="primary" size="xl" onClick={() => navigate('/register')}>
            Create your free account →
          </Button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="landing-footer-left">
          <div className="nav-logo-box" style={{width:28,height:28,borderRadius:8,fontSize:11}}>LV</div>
          <span className="landing-footer-copy">© 2026 LearnVerse Inc. All rights reserved.</span>
        </div>
        <div className="landing-footer-links">
          {['Privacy','Terms','Support','Blog'].map(l => (
            <span key={l} className="landing-footer-link">{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}