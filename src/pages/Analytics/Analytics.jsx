import React from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import ProgressBar, { RadialProgress } from '../../components/ui/ProgressBar.jsx';

const SUBJECTS = [
  { name:'Calculus II',      pct:72, trend:'+14%', color:'var(--amber)', sessions:24 },
  { name:'Organic Chemistry',pct:45, trend:'+8%',  color:'var(--sky)',   sessions:16 },
  { name:'Data Structures',  pct:88, trend:'+21%', color:'var(--lavender)', sessions:32 },
  { name:'World History',    pct:30, trend:'+5%',  color:'var(--emerald)',  sessions:9  },
  { name:'Physics',          pct:61, trend:'+11%', color:'var(--orange)',   sessions:18 },
];

const WEEKLY = [18, 24, 15, 28, 22, 30, 26];
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function BarChart({ data, labels, color = 'var(--amber)' }) {
  const max = Math.max(...data);
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:100 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
          <div style={{ fontSize:9, color:'var(--text-c)', fontFamily:'var(--font-mono)' }}>{v}h</div>
          <div style={{ width:'100%', height:`${(v/max)*80}px`, background:color, borderRadius:'4px 4px 0 0', transition:'height 1s cubic-bezier(0.22,1,0.36,1)', opacity: i === 6 ? 1 : 0.55 }}/>
          <div style={{ fontSize:9, color:'var(--text-c)' }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div style={{ padding:'28px 32px' }}>

          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.03em', marginBottom:4 }}>Analytics</h2>
            <p style={{ fontSize:13, color:'var(--text-b)' }}>Deep insights into your learning performance and patterns.</p>
          </div>

          {/* Top stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20 }}>
            {[
              { label:'Study Hours This Week', value:'18.5h', sub:'↑ +3h vs last week', color:'var(--amber)' },
              { label:'AI Predicted Score', value:'84%', sub:'Based on current trajectory', color:'var(--sky)' },
              { label:'Flashcard Retention', value:'73%', sub:'↑ +12% from last month', color:'var(--lavender)' },
              { label:'Exam Readiness', value:'Grade A-', sub:'Continue current pace', color:'var(--emerald)' },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding:'20px 22px' }}>
                <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-b)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>{s.label}</div>
                <div style={{ fontSize:26, fontWeight:700, fontFamily:'var(--font-mono)', color:s.color, marginBottom:4 }}>{s.value}</div>
                <div style={{ fontSize:11, color:s.color }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

            {/* Weekly hours */}
            <div className="card">
              <div className="section-head"><span className="section-title">Study Hours — This Week</span></div>
              <BarChart data={WEEKLY} labels={DAYS}/>
              <div style={{ display:'flex', gap:24, marginTop:14, paddingTop:14, borderTop:'1px solid var(--border)' }}>
                {[['18.5h','This week'],['15.2h','Last week'],['163h','This month']].map(([v,l]) => (
                  <div key={l}><div style={{ fontFamily:'var(--font-mono)', fontSize:15, fontWeight:700, color:'var(--amber)' }}>{v}</div><div style={{ fontSize:10, color:'var(--text-b)', marginTop:2 }}>{l}</div></div>
                ))}
              </div>
            </div>

            {/* Subject breakdown */}
            <div className="card">
              <div className="section-head"><span className="section-title">Subject Performance</span></div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {SUBJECTS.map(s => (
                  <div key={s.name}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:12, fontWeight:600 }}>{s.name}</span>
                      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                        <span style={{ fontSize:10, color:'var(--emerald)', fontWeight:600 }}>{s.trend}</span>
                        <span style={{ fontSize:12, fontFamily:'var(--font-mono)', fontWeight:700, color:s.color }}>{s.pct}%</span>
                      </div>
                    </div>
                    <ProgressBar pct={s.pct} color={s.color} height={5} glow/>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Exam Predictor */}
            <div className="card">
              <div className="section-head"><span className="section-title">🤖 AI Exam Predictor</span></div>
              <div style={{ display:'flex', alignItems:'center', gap:24 }}>
                <RadialProgress pct={84} size={100} strokeWidth={8} color="var(--amber)">
                  <span style={{ fontSize:22, fontWeight:800, fontFamily:'var(--font-mono)', color:'var(--amber)' }}>84</span>
                  <span style={{ fontSize:9, color:'var(--text-b)' }}>predicted</span>
                </RadialProgress>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, marginBottom:6 }}>Grade A- Predicted</div>
                  <div style={{ fontSize:12, color:'var(--text-b)', lineHeight:1.7, marginBottom:12 }}>
                    Based on 142 sessions, flashcard scores, and practice test results, our AI predicts you'll score 84% in your next major exam.
                  </div>
                  <div style={{ fontSize:11, color:'var(--amber)', fontWeight:600 }}>
                    💡 Focus on Partial Fractions and Organic Chemistry to push to 90%+
                  </div>
                </div>
              </div>
            </div>

            {/* Session heatmap summary */}
            <div className="card">
              <div className="section-head"><span className="section-title">Peak Study Times</span></div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4 }}>
                {Array.from({ length: 24 * 7 / 4 }).map((_, i) => {
                  const intensity = Math.random();
                  const alpha = intensity < 0.2 ? 0.05 : intensity < 0.5 ? 0.25 : intensity < 0.8 ? 0.55 : 1;
                  return <div key={i} style={{ height:16, borderRadius:3, background:`rgba(245,158,11,${alpha})` }}/>;
                })}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, fontSize:10, color:'var(--text-c)' }}>
                <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
              </div>
              <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid var(--border)', fontSize:12, color:'var(--text-b)', lineHeight:1.7 }}>
                🏆 <strong style={{ color:'var(--text)' }}>Peak performance window:</strong> 9am–12pm and 7pm–9pm. Your AI study plan is optimised for these slots.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}