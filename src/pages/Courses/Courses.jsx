import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import Button from '../../components/ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './Courses.css';

const ALL_COURSES = [
  { id:1, emoji:'🧮', title:'Advanced Mathematics — Calculus II', instructor:'Prof. Anderson', org:'MIT OpenCourse', tags:['Maths','Advanced'], duration:'42h', lessons:38, students:'12.4K', rating:4.9, price:'Free', color:'#F59E0B', bg:'rgba(245,158,11,0.1)' },
  { id:2, emoji:'⚗️', title:'Organic Chemistry — Reaction Mechanisms', instructor:'Dr. Patel', org:'Stanford Online', tags:['Science','Intermediate'], duration:'35h', lessons:29, students:'8.1K', rating:4.8, price:'$29', color:'#38BDF8', bg:'rgba(56,189,248,0.1)' },
  { id:3, emoji:'💻', title:'Data Structures & Algorithms', instructor:'Dr. Chen', org:'Carnegie Mellon', tags:['CS','Advanced'], duration:'56h', lessons:52, students:'24K', rating:4.9, price:'Free', color:'#A78BFA', bg:'rgba(167,139,250,0.1)' },
  { id:4, emoji:'🌍', title:'World History — Modern Era', instructor:'Dr. Okafor', org:'Oxford Online', tags:['Humanities','Beginner'], duration:'28h', lessons:24, students:'6.2K', rating:4.7, price:'$19', color:'#10B981', bg:'rgba(16,185,129,0.1)' },
  { id:5, emoji:'🧬', title:'Biology — Cell Biology & Genetics', instructor:'Dr. Nakamura', org:'Harvard Extension', tags:['Science','Intermediate'], duration:'31h', lessons:27, students:'9.8K', rating:4.8, price:'$24', color:'#F43F5E', bg:'rgba(244,63,94,0.1)' },
  { id:6, emoji:'📐', title:'Physics — Mechanics & Thermodynamics', instructor:'Prof. Williams', org:'Caltech', tags:['Science','Advanced'], duration:'48h', lessons:44, students:'11K', rating:4.9, price:'Free', color:'#F97316', bg:'rgba(249,115,22,0.1)' },
  { id:7, emoji:'✍️', title:'Essay Writing & Academic Communication', instructor:'Dr. Smith', org:'Oxford', tags:['English','Beginner'], duration:'18h', lessons:16, students:'5.4K', rating:4.6, price:'Free', color:'#38BDF8', bg:'rgba(56,189,248,0.1)' },
  { id:8, emoji:'📊', title:'Statistics & Probability', instructor:'Prof. Garcia', org:'MIT', tags:['Maths','Intermediate'], duration:'36h', lessons:32, students:'7.9K', rating:4.8, price:'$22', color:'#F59E0B', bg:'rgba(245,158,11,0.1)' },
];

const MY_COURSES = [
  { id:1, emoji:'🧮', title:'Advanced Mathematics — Calculus II', inst:'Prof. Anderson · MIT', pct:72, color:'var(--amber)', next:'Module 7 — Integration by Parts' },
  { id:2, emoji:'⚗️', title:'Organic Chemistry — Reaction Mechanisms', inst:'Dr. Patel · Stanford', pct:45, color:'var(--sky)', next:'Module 5 — Elimination Reactions' },
  { id:3, emoji:'💻', title:'Data Structures & Algorithms', inst:'Dr. Chen · CMU', pct:88, color:'var(--lavender)', next:'Module 11 — Graph Algorithms' },
  { id:4, emoji:'🌍', title:'World History — Modern Era', inst:'Dr. Okafor · Oxford', pct:30, color:'var(--emerald)', next:'Module 3 — Industrial Revolution' },
];

export default function Courses() {
  const { toast } = useToast();
  const [activeTab, setActiveTab]   = useState('browse');
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('All');
  const [enrolled, setEnrolled]     = useState(new Set([1,2,3,4]));

  const filtered = ALL_COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category === 'All' || c.tags.includes(category);
    return matchSearch && matchCat;
  });

  const handleEnroll = (course) => {
    setEnrolled(prev => {
      const next = new Set(prev);
      if (next.has(course.id)) {
        next.delete(course.id);
        toast.info('Unenrolled', `Removed from ${course.title}`);
      } else {
        next.add(course.id);
        toast.success('Enrolled!', `You're now enrolled in ${course.title} 🎉`);
      }
      return next;
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div className="courses-page">

          <div className="courses-header">
            <div className="courses-header-left">
              <h2>Courses</h2>
              <p>Browse {ALL_COURSES.length} courses or continue where you left off.</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {['browse','my courses'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding:'10px 20px', borderRadius:'var(--r-lg)', fontSize:13, fontWeight:600,
                  background: activeTab === t ? 'var(--amber-g)' : 'var(--surface)',
                  border: `1px solid ${activeTab === t ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`,
                  color: activeTab === t ? 'var(--amber)' : 'var(--text-b)',
                  cursor:'pointer', fontFamily:'var(--font-sans)', textTransform:'capitalize',
                }}>{t}</button>
              ))}
            </div>
          </div>

          {activeTab === 'browse' && (
            <>
              <div className="courses-filters">
                <div className="filter-search">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-c)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses, instructors…"/>
                </div>
                <select className="filter-select" value={category} onChange={e=>setCategory(e.target.value)}>
                  {['All','Maths','Science','CS','Humanities','English'].map(c=>(
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select className="filter-select">
                  {['All levels','Beginner','Intermediate','Advanced'].map(l=>(
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="courses-grid">
                {filtered.map((c, i) => (
                  <div key={c.id} className="course-card" style={{ animationDelay:`${i*0.06}s` }}>
                    <div className="course-card-banner" style={{ background: c.bg }}>
                      {c.emoji}
                      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at center, ${c.color}20, transparent 70%)` }}/>
                    </div>
                    <div className="course-card-body">
                      <div className="course-card-tags">
                        {c.tags.map(t => <span key={t} className="badge badge-neutral" style={{fontSize:9}}>{t}</span>)}
                        {enrolled.has(c.id) && <span className="badge badge-emerald" style={{fontSize:9}}>✓ Enrolled</span>}
                      </div>
                      <div className="course-card-title">{c.title}</div>
                      <div className="course-card-inst">{c.instructor} · {c.org}</div>
                      <div className="course-card-meta">
                        <div className="course-card-stat">📚 {c.lessons} lessons</div>
                        <div className="course-card-stat">⏱ {c.duration}</div>
                        <div className="course-card-stat">⭐ {c.rating}</div>
                        <div className="course-card-stat">👥 {c.students}</div>
                      </div>
                      <div className="course-card-footer">
                        <div className="course-card-price" style={{ color: c.price === 'Free' ? 'var(--emerald)' : 'var(--amber)' }}>
                          {c.price}
                        </div>
                        <button
                          className={`course-card-enroll ${enrolled.has(c.id) ? 'enrolled' : ''}`}
                          onClick={() => handleEnroll(c)}
                        >
                          {enrolled.has(c.id) ? '✓ Enrolled' : 'Enroll →'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'my courses' && (
            <div className="my-courses-list">
              {MY_COURSES.map((c, i) => (
                <div key={c.id} className="my-course-item" style={{ animationDelay:`${i*0.08}s` }}>
                  <div className="my-course-emoji" style={{ background:`${c.color}14` }}>{c.emoji}</div>
                  <div className="my-course-info">
                    <div className="my-course-title">{c.title}</div>
                    <div className="my-course-meta">{c.inst}</div>
                    <ProgressBar pct={c.pct} color={c.color} height={4} glow/>
                  </div>
                  <div className="my-course-right">
                    <div className="my-course-pct" style={{ color:c.color }}>{c.pct}%</div>
                    <div className="my-course-next">Next: {c.next}</div>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => toast.info('Opening Course', c.next)}>Continue →</Button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}