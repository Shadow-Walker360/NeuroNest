import React from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import ProgressBar, { RadialProgress } from '../../components/ui/ProgressBar.jsx';

const BADGES = [
  { icon:'🏅', name:'First Steps', desc:'Complete your first lesson', unlocked:true, date:'Jan 5, 2026' },
  { icon:'🔥', name:'7-Day Streak', desc:'Study 7 days in a row', unlocked:true, date:'Jan 12, 2026' },
  { icon:'🧠', name:'Quiz Master', desc:'Complete 50 quizzes', unlocked:true, date:'Jan 28, 2026' },
  { icon:'🤝', name:'Team Player', desc:'Join 10 study rooms', unlocked:true, date:'Feb 3, 2026' },
  { icon:'⚡', name:'Speed Learner', desc:'Finish a course in under 7 days', unlocked:true, date:'Feb 10, 2026' },
  { icon:'🎯', name:'Sharp Shooter', desc:'Score 90%+ on 5 quizzes', unlocked:true, date:'Feb 15, 2026' },
  { icon:'🌟', name:'Star Student', desc:'Rank in top 10 globally', unlocked:false, progress:72, target:100 },
  { icon:'💎', name:'Diamond Learner', desc:'Complete 10 full courses', unlocked:false, progress:4, target:10 },
  { icon:'🚀', name:'Rocket Scholar', desc:'Earn 10,000 XP', unlocked:false, progress:4820, target:10000 },
  { icon:'👑', name:'LearnVerse Legend', desc:'Reach Level 50', unlocked:false, progress:24, target:50 },
  { icon:'📚', name:'Bookworm', desc:'Save 50 library resources', unlocked:false, progress:12, target:50 },
  { icon:'🌍', name:'Global Citizen', desc:'Study with peers from 5 countries', unlocked:false, progress:2, target:5 },
];

const MILESTONES = [
  { label:'XP Earned', value:'4,820', icon:'⚡', color:'var(--amber)' },
  { label:'Sessions', value:'142', icon:'📚', color:'var(--sky)' },
  { label:'Streak Record', value:'14 days', icon:'🔥', color:'var(--rose)' },
  { label:'Courses Done', value:'4', icon:'🎓', color:'var(--emerald)' },
  { label:'Quizzes', value:'67', icon:'📝', color:'var(--lavender)' },
  { label:'Hours Studied', value:'183h', icon:'⏱️', color:'var(--orange)' },
];

export default function Achievements() {
  const unlocked = BADGES.filter(b => b.unlocked).length;

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div style={{ padding:'28px 32px' }}>

          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.03em', marginBottom:4 }}>Achievements</h2>
            <p style={{ fontSize:13, color:'var(--text-b)' }}>Track your milestones and unlock badges for your learning journey.</p>
          </div>

          {/* Summary */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
            <div className="card" style={{ display:'flex', alignItems:'center', gap:24 }}>
              <RadialProgress pct={Math.round(unlocked/BADGES.length*100)} size={90} strokeWidth={7} color="var(--amber)">
                <span style={{ fontSize:20, fontWeight:800, fontFamily:'var(--font-mono)', color:'var(--amber)' }}>{unlocked}</span>
                <span style={{ fontSize:9, color:'var(--text-b)' }}>of {BADGES.length}</span>
              </RadialProgress>
              <div>
                <div style={{ fontSize:18, fontWeight:800, marginBottom:6 }}>Badges Collected</div>
                <div style={{ fontSize:13, color:'var(--text-b)', lineHeight:1.7 }}>{BADGES.length - unlocked} badges still locked. Keep learning to unlock them all!</div>
              </div>
            </div>
            <div className="card">
              <div style={{ fontSize:11, fontWeight:600, color:'var(--text-b)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'var(--font-mono)', marginBottom:12 }}>Your Stats</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                {MILESTONES.map(m => (
                  <div key={m.label} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:18 }}>{m.icon}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:14, fontWeight:700, color:m.color, marginTop:4 }}>{m.value}</div>
                    <div style={{ fontSize:10, color:'var(--text-c)', marginTop:2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unlocked badges */}
          <div className="card" style={{ marginBottom:20 }}>
            <div className="section-head"><span className="section-title">🏆 Unlocked Badges ({unlocked})</span></div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:14 }}>
              {BADGES.filter(b => b.unlocked).map(b => (
                <div key={b.name} style={{ background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'18px', textAlign:'center', transition:'all 0.2s', cursor:'default' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='var(--border)'; }}
                >
                  <div style={{ fontSize:40, marginBottom:10 }}>{b.icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{b.name}</div>
                  <div style={{ fontSize:11, color:'var(--text-b)', marginBottom:8, lineHeight:1.5 }}>{b.desc}</div>
                  <span className="badge badge-emerald" style={{ fontSize:9 }}>✓ {b.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Locked badges */}
          <div className="card">
            <div className="section-head"><span className="section-title">🔒 Locked Badges ({BADGES.length - unlocked})</span></div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
              {BADGES.filter(b => !b.unlocked).map(b => (
                <div key={b.name} style={{ background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'18px', opacity:0.75 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                    <div style={{ fontSize:32, filter:'grayscale(1) brightness(0.4)' }}>{b.icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700 }}>{b.name}</div>
                      <div style={{ fontSize:11, color:'var(--text-c)' }}>{b.desc}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:10, color:'var(--text-c)' }}>Progress</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-b)' }}>{b.progress} / {b.target}</span>
                  </div>
                  <ProgressBar pct={Math.round(b.progress/b.target*100)} color="var(--amber)" height={4}/>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}