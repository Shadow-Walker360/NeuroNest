import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import ProgressBar, { RadialProgress } from '../../components/ui/ProgressBar.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './Dashboard.css';

/* ══════════════════════════════════════
   SPARKLINE
══════════════════════════════════════ */
function Sparkline({ data = [], color = 'var(--amber)', width = 88, height = 34 }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 3;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ══════════════════════════════════════
   STAT CARD
══════════════════════════════════════ */
function StatCard({ label, value, sub, color, glow, icon, spark, delay = 0 }) {
  return (
    <div
      className="stat-card"
      style={{ '--glow': glow, animationDelay: `${delay}s` }}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-sub"   style={{ color }}>{sub}</div>
      <div className="stat-icon"  style={{ background: `${color}18` }}>{icon}</div>
      {spark && (
        <div className="stat-spark">
          <Sparkline data={spark} color={color} />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   HEATMAP
══════════════════════════════════════ */
const HEAT_LEVELS = [
  'transparent',
  'rgba(245,158,11,0.18)',
  'rgba(245,158,11,0.42)',
  'rgba(245,158,11,0.72)',
  '#F59E0B',
];

function Heatmap() {
  // Stable random data — useMemo so it doesn't re-randomise on every render
  const cells = useMemo(
    () => Array.from({ length: 15 * 7 }, () => Math.random()),
    []
  );

  return (
    <div>
      <div className="heatmap-grid">
        {Array.from({ length: 15 }).map((_, w) => (
          <div key={w} className="heatmap-col">
            {Array.from({ length: 7 }).map((_, d) => {
              const v = cells[w * 7 + d];
              const l = v < 0.28 ? 0 : v < 0.5 ? 1 : v < 0.7 ? 2 : v < 0.9 ? 3 : 4;
              return (
                <div
                  key={d}
                  className="heatmap-cell"
                  style={{
                    background: HEAT_LEVELS[l],
                    border: l === 0 ? '1px solid var(--border)' : 'none',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        {HEAT_LEVELS.map((c, i) => (
          <div
            key={i}
            style={{
              width: 10, height: 10, borderRadius: 2,
              background: c,
              border: i === 0 ? '1px solid var(--border)' : 'none',
            }}
          />
        ))}
        <span>More</span>
      </div>

      <div className="heatmap-stats">
        {[
          ['142', 'Total Sessions', 'var(--amber)'],
          ['2.3h', 'Avg / Day',     'var(--sky)'],
          ['6.1h', 'Best Day',      'var(--emerald)'],
        ].map(([val, lbl, c]) => (
          <div key={lbl}>
            <div className="h-stat-val"   style={{ color: c }}>{val}</div>
            <div className="h-stat-label">{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   AI CHAT  (mini)
══════════════════════════════════════ */
const AI_REPLIES = [
  "Based on your last 3 sessions your weakest area is Partial Fractions. Want me to generate 10 targeted practice questions? 🎯",
  "Integration by parts: ∫u·dv = uv − ∫v·du. Choose u as the term that simplifies when differentiated.",
  "Your flashcard retention improved 31% this week. Peak focus window: 9–11 am ⚡",
  "You're 88% done with Data Structures! I've prepped 5 Graph Traversal problems for you.",
];
let _aiIdx = 0;

function AiChat() {
  const [msgs,   setMsgs]   = useState([{
    role: 'ai',
    text: "Hey! I've analysed your last session. You're 23% stronger in Calculus this week. Ready to tackle integration by parts? 🎯",
  }]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { role: 'user', text: input }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { role: 'ai', text: AI_REPLIES[_aiIdx++ % AI_REPLIES.length] }]);
    }, 1400);
  };

  return (
    <>
      <div className="ai-chat-window">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div
              className="msg-av"
              style={{
                background: m.role === 'ai'
                  ? 'linear-gradient(135deg,#F59E0B,#F97316)'
                  : 'var(--surface-c)',
                border: m.role === 'user' ? '1px solid var(--border)' : 'none',
              }}
            >
              {m.role === 'ai' ? 'AI' : 'Me'}
            </div>
            <div className="msg-bubble">{m.text}</div>
          </div>
        ))}

        {typing && (
          <div className="msg ai">
            <div
              className="msg-av"
              style={{ background: 'linear-gradient(135deg,#F59E0B,#F97316)' }}
            >
              AI
            </div>
            <div className="typing-dots">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-inp"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask your AI tutor…"
        />
        <button className="chat-send" onClick={send} aria-label="Send">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   STATIC DATA
══════════════════════════════════════ */
const COURSES = [
  { emoji: '🧮', name: 'Advanced Mathematics — Calculus II',      inst: 'Prof. Anderson · MIT OpenCourse', pct: 72, color: 'var(--amber)',   bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.22)'  },
  { emoji: '⚗️', name: 'Organic Chemistry — Reaction Mechanisms', inst: 'Dr. Patel · Stanford',           pct: 45, color: 'var(--sky)',     bg: 'rgba(56,189,248,0.1)',  border: 'rgba(56,189,248,0.22)'  },
  { emoji: '💻', name: 'Data Structures & Algorithms',            inst: 'Dr. Chen · CMU',                 pct: 88, color: 'var(--lavender)',bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.22)' },
  { emoji: '🌍', name: 'World History — Modern Era',              inst: 'Dr. Okafor · Oxford',            pct: 30, color: 'var(--emerald)', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.22)'  },
];

const ROOMS = [
  { emoji: '📐', subject: 'Calculus',   topic: 'Integration by Parts',  members: 7,  colors: ['#38BDF8','#A78BFA','#10B981','#F59E0B'], live: true  },
  { emoji: '⚗️', subject: 'Chemistry',  topic: 'Organic Reactions',     members: 3,  colors: ['#10B981','#F43F5E','#38BDF8'],           live: true  },
  { emoji: '🌐', subject: 'CS — DSA',   topic: 'Graph Traversal',       members: 12, colors: ['#A78BFA','#38BDF8'],                     live: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Sarah K.',  pts: '6,240', color: '#F59E0B', isMe: false },
  { rank: 2, name: 'Marcus T.', pts: '5,910', color: '#94A3B8', isMe: false },
  { rank: 3, name: 'Jenna P.',  pts: '5,340', color: '#92400E', isMe: false },
  { rank: 4, name: 'You 🎯',   pts: '4,820', color: '#F59E0B', isMe: true  },
];

const BADGES  = ['🏅','🔥','🧠','🤝','⚡','🎯','🌟','💎'];
const UNLOCKED = 6; // first N badges are unlocked

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */
export default function Dashboard() {
  const { toast }  = useToast();
  const navigate   = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab,  setActiveTab]  = useState('in progress');

  // Fire welcome toasts after mount
  useEffect(() => {
    const queue = [
      () => toast.info('AI Insight', '⚡ Your Calculus score improved 23% this week!'),
      () => toast.success('14-Day Streak! 🔥', 'You\'ve studied every day for 2 weeks.'),
      () => toast.info('Achievement Unlocked 🏆', 'Quiz Master — 50 quizzes completed!'),
    ];
    let i = 0;
    const t = setTimeout(() => {
      queue[i++]();
      const iv = setInterval(() => {
        if (i < queue.length) queue[i++]();
        else clearInterval(iv);
      }, 9000);
      return () => clearInterval(iv);
    }, 2500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar mobileOpen={mobileOpen} />
      <div className="dashboard-content">
        <Topbar onMobileMenu={() => setMobileOpen(o => !o)} />

        <div className="dashboard-body">

          {/* ── STAT CARDS ── */}
          <div className="stat-grid">
            <StatCard
              label="XP Points"    value="4,820"   sub="↑ +340 this week"
              color="var(--amber)"   glow="rgba(245,158,11,0.12)"  icon="⚡"
              spark={[30,45,38,60,55,72,68,85,79,92]} delay={0.05}
            />
            <StatCard
              label="Study Streak" value="14 days" sub="🔥 Personal best"
              color="var(--emerald)" glow="rgba(16,185,129,0.09)"  icon="🏆"
              spark={[5,8,12,10,14,13,14,14,14,14]} delay={0.1}
            />
            <StatCard
              label="Hours / Week" value="18.5h"   sub="↑ +3h vs last week"
              color="var(--sky)"    glow="rgba(56,189,248,0.08)"   icon="⏱️"
              spark={[12,14,15,16,14,17,16,18,17,18]} delay={0.15}
            />
            <StatCard
              label="Global Rank"  value="#4"      sub="Top 5% globally"
              color="var(--lavender)" glow="rgba(167,139,250,0.08)" icon="🌐"
              delay={0.2}
            />
          </div>

          {/* ── MAIN GRID ── */}
          <div className="main-grid">

            {/* LEFT COLUMN */}
            <div className="left-col">

              {/* Active Courses */}
              <div className="card fade-up" style={{ animationDelay: '0.12s' }}>
                <div className="section-head">
                  <span className="section-title">Active Courses</span>
                  <button className="section-action" onClick={() => navigate('/courses')}>
                    View all →
                  </button>
                </div>

                <div className="course-tabs">
                  {['In Progress', 'Completed', 'Saved'].map(t => (
                    <button
                      key={t}
                      className={`course-tab ${activeTab === t.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setActiveTab(t.toLowerCase())}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {COURSES.map((c, i) => (
                  <div key={i} className="course-row" onClick={() => navigate('/courses')}>
                    <div
                      className="course-emoji"
                      style={{ background: c.bg, border: `1px solid ${c.border}` }}
                    >
                      {c.emoji}
                    </div>
                    <div className="course-info">
                      <div className="course-name">{c.name}</div>
                      <div className="course-inst">{c.inst}</div>
                      <ProgressBar pct={c.pct} color={c.color} height={3} glow />
                    </div>
                    <div className="course-right">
                      <div className="course-pct" style={{ color: c.color }}>{c.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Heatmap */}
              <div className="card fade-up" style={{ animationDelay: '0.18s' }}>
                <div className="section-head">
                  <span className="section-title">Study Activity — Last 15 Weeks</span>
                </div>
                <Heatmap />
              </div>

              {/* Live Rooms */}
              <div className="card fade-up" style={{ animationDelay: '0.24s' }}>
                <div className="section-head">
                  <span className="section-title">Live Study Rooms</span>
                  <button className="section-action" onClick={() => navigate('/study-rooms')}>
                    + Create
                  </button>
                </div>

                <div className="rooms-grid">
                  {ROOMS.map((r, i) => (
                    <div
                      key={i}
                      className={`room-card ${r.live ? 'live' : ''}`}
                      onClick={() => navigate('/study-rooms')}
                    >
                      <div className="room-card-top">
                        <span className="room-emoji">{r.emoji}</span>
                        {r.live ? (
                          <span className="room-live-badge">
                            <span className="room-live-dot" />
                            LIVE
                          </span>
                        ) : (
                          <span className="room-open-badge">OPEN</span>
                        )}
                      </div>
                      <div className="room-subject">{r.subject}</div>
                      <div className="room-topic">{r.topic}</div>
                      <div className="room-footer">
                        <div className="room-avatars">
                          {r.colors.map((c, j) => (
                            <div
                              key={j}
                              className="room-av"
                              style={{
                                background: c,
                                marginLeft: j === 0 ? 0 : -7,
                                border: '2px solid var(--surface-b)',
                              }}
                            >
                              {String.fromCharCode(65 + j)}
                            </div>
                          ))}
                        </div>
                        <span className="room-count">{r.members} members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="right-col">

              {/* XP / Level */}
              <div className="card fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="xp-row">
                  <RadialProgress pct={87} size={72} strokeWidth={5} color="var(--amber)">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, lineHeight: 1 }}>24</span>
                    <span style={{ fontSize: 9, color: 'var(--text-b)' }}>LVL</span>
                  </RadialProgress>
                  <div className="xp-text">
                    <div className="xp-title">Expert Learner</div>
                    <div className="xp-sub">4,820 / 5,500 XP to Level 25</div>
                    <ProgressBar pct={87} color="var(--amber)" height={5} glow />
                  </div>
                </div>

                <div className="badges-divider">
                  <div className="badges-label">Badges</div>
                  <div className="badges-row">
                    {BADGES.map((b, i) => (
                      <div
                        key={i}
                        className={`badge-icon ${i >= UNLOCKED ? 'locked' : ''}`}
                        title={i >= UNLOCKED ? 'Locked' : b}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Tutor mini */}
              <div className="card fade-up" style={{ animationDelay: '0.18s' }}>
                <div className="section-head">
                  <span className="section-title">🤖 AI Tutor</span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 10, fontWeight: 700, color: 'var(--emerald)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)', display: 'block' }} />
                    ONLINE
                  </span>
                </div>
                <AiChat />
              </div>

              {/* Leaderboard */}
              <div className="card fade-up" style={{ animationDelay: '0.26s' }}>
                <div className="section-head">
                  <span className="section-title">🏆 Leaderboard</span>
                  <button className="section-action">This Week</button>
                </div>

                <div className="lb-list">
                  {LEADERBOARD.map(p => (
                    <div key={p.rank} className={`lb-item ${p.isMe ? 'me' : ''}`}>
                      <div className="lb-rank" style={{ color: p.color }}>{p.rank}</div>
                      <div
                        className="lb-av"
                        style={{
                          background: `${p.color}1A`,
                          border: `1px solid ${p.color}35`,
                          color: p.color,
                        }}
                      >
                        {p.name[0]}
                      </div>
                      <div
                        className="lb-name"
                        style={{
                          fontWeight: p.isMe ? 700 : 500,
                          color: p.isMe ? 'var(--amber)' : 'var(--text)',
                        }}
                      >
                        {p.name}
                      </div>
                      <div className="lb-pts" style={{ color: p.color }}>{p.pts}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}