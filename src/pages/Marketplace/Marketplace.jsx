import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import Modal   from '../../components/ui/Modal.jsx';
import Button  from '../../components/ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './Marketplace.css';

const TUTORS = [
  { id:1, initials:'SK', name:'Dr. Sarah Kamau', title:'Mathematics PhD · University of Nairobi', rating:4.97, reviews:214, students:1840, sessions:3200, subjects:['Calculus','Linear Algebra','Statistics'], price:25, type:'1-on-1', color:'#F59E0B', bg:'linear-gradient(135deg,#F59E0B,#F97316)' },
  { id:2, initials:'MT', name:'Marcus Thompson', title:'BSc Computer Science · MIT', rating:4.95, reviews:187, students:2100, sessions:4100, subjects:['Algorithms','Data Structures','Python'], price:30, type:'1-on-1', color:'#A78BFA', bg:'linear-gradient(135deg,#A78BFA,#7C3AED)' },
  { id:3, initials:'AP', name:'Dr. Anita Patel', title:'Organic Chemistry · IIT Delhi', rating:4.92, reviews:156, students:1200, sessions:2800, subjects:['Organic Chem','Biochemistry','NEET Prep'], price:20, type:'1-on-1', color:'#38BDF8', bg:'linear-gradient(135deg,#38BDF8,#0284C7)' },
  { id:4, initials:'JO', name:'James Okonkwo', title:'WAEC/JAMB Expert · Lagos University', rating:4.88, reviews:302, students:3400, sessions:6100, subjects:['Physics','Maths','JAMB Prep'], price:15, type:'1-on-1', color:'#10B981', bg:'linear-gradient(135deg,#10B981,#059669)' },
  { id:5, initials:'YN', name:'Yuki Nakamura', title:'Biology & Medicine · Tokyo University', rating:4.93, reviews:128, students:980, sessions:1900, subjects:['Biology','Chemistry','Medicine'], price:28, type:'1-on-1', color:'#F43F5E', bg:'linear-gradient(135deg,#F43F5E,#BE123C)' },
  { id:6, initials:'EG', name:'Elena García', title:'History & Social Sciences · Oxford', rating:4.85, reviews:95, students:760, sessions:1400, subjects:['World History','Economics','GCSE'], price:22, type:'1-on-1', color:'#F97316', bg:'linear-gradient(135deg,#F97316,#EA580C)' },
];

const PACKS = [
  { id:1, emoji:'🧮', title:'KCSE Mathematics Ultimate Pack', desc:'Complete KCSE Maths prep: past papers (2015–2024), video solutions, formula sheets, and AI mock exams. Mapped to CBC.', items:['250+ Past Paper Questions','40 Video Solutions','AI Mock Exam x5','Formula Sheets'], price:29, color:'var(--amber)', bg:'rgba(245,158,11,0.12)' },
  { id:2, emoji:'⚗️', title:'A-Level Chemistry Master Bundle', desc:'Full A-Level Chemistry course: organic, inorganic, physical chemistry with exam technique guides and mark schemes.', items:['180 Exam Questions','30 Worked Examples','3 Full Papers','Periodic Table Pack'], price:24, color:'var(--sky)', bg:'rgba(56,189,248,0.12)' },
  { id:3, emoji:'💻', title:'Coding Interview Bootcamp', desc:'Land your tech job with 300+ LeetCode-style problems, system design guides, and mock interview sessions.', items:['300+ Coding Problems','System Design Guide','5 Mock Interviews','Career Coaching PDF'], price:49, color:'var(--lavender)', bg:'rgba(167,139,250,0.12)' },
  { id:4, emoji:'🌍', title:'WAEC/JAMB Mega Pack', desc:'All-in-one WAEC and JAMB preparation: past questions, CBT practice, video explanations across 8 subjects.', items:['500+ WAEC Questions','CBT Practice Mode','8 Subjects Covered','2024 Predictions'], price:19, color:'var(--emerald)', bg:'rgba(16,185,129,0.12)' },
];

export default function Marketplace() {
  const { toast } = useToast();
  const [activeTab, setActiveTab]   = useState('tutors');
  const [selected, setSelected]     = useState(null);
  const [bookLoading, setBookLoading] = useState(false);

  const handleBook = (tutor) => {
    setBookLoading(true);
    setTimeout(() => {
      setBookLoading(false);
      setSelected(null);
      toast.success('Session Booked! 🎉', `Your 1-on-1 session with ${tutor.name} has been booked. Check your email for the Zoom link.`);
    }, 1500);
  };

  const handleBuyPack = (pack) => {
    toast.success('Pack Added! 🛒', `${pack.title} has been added to your library.`);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div className="marketplace-page">

          <div className="mp-header">
            <div>
              <h2>Marketplace</h2>
              <p>Book expert tutors or get premium study packs tailored to your curriculum.</p>
            </div>
          </div>

          <div className="mp-tabs">
            {[
              { id:'tutors', label:'👩‍🏫 Expert Tutors' },
              { id:'packs',  label:'📦 Study Packs' },
              { id:'sessions', label:'📅 My Sessions' },
            ].map(t => (
              <button key={t.id} className={`mp-tab ${activeTab === t.id ? 'active' : 'inactive'}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* TUTORS */}
          {activeTab === 'tutors' && (
            <div className="tutors-grid">
              {TUTORS.map((t, i) => (
                <div key={t.id} className="tutor-card" style={{ animationDelay:`${i*0.07}s` }}>
                  <div className="tutor-card-top">
                    <div className="tutor-avatar-lg" style={{ background: t.bg, color:'#000' }}>{t.initials}</div>
                    <div>
                      <div className="tutor-name">{t.name}</div>
                      <div className="tutor-title">{t.title}</div>
                      <div className="tutor-rating">
                        <span style={{ color:'var(--amber)' }}>★</span>
                        <span style={{ fontWeight:700 }}>{t.rating}</span>
                        <span style={{ color:'var(--text-c)' }}>({t.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="tutor-subjects">
                    {t.subjects.map(s => <span key={s} className="badge badge-neutral" style={{ fontSize:10 }}>{s}</span>)}
                  </div>
                  <div className="tutor-stats">
                    <div className="tutor-stat-box"><div className="tutor-stat-val">{(t.students/1000).toFixed(1)}K</div><div className="tutor-stat-lbl">Students</div></div>
                    <div className="tutor-stat-box"><div className="tutor-stat-val">{(t.sessions/1000).toFixed(1)}K</div><div className="tutor-stat-lbl">Sessions</div></div>
                    <div className="tutor-stat-box"><div className="tutor-stat-val">{t.rating}</div><div className="tutor-stat-lbl">Rating</div></div>
                  </div>
                  <div className="tutor-price">
                    <div>
                      <div className="tutor-price-val">${t.price}</div>
                      <div className="tutor-price-type">per 1-hour session</div>
                    </div>
                    <button className="book-btn" onClick={() => setSelected(t)}>Book Now →</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PACKS */}
          {activeTab === 'packs' && (
            <div className="packs-grid">
              {PACKS.map((p, i) => (
                <div key={p.id} className="pack-card" style={{ animationDelay:`${i*0.08}s` }}>
                  <div className="pack-banner" style={{ background: p.bg }}>{p.emoji}</div>
                  <div className="pack-body">
                    <div className="pack-title">{p.title}</div>
                    <div className="pack-desc">{p.desc}</div>
                    <div className="pack-items">
                      {p.items.map(item => <div key={item} className="pack-item"><span style={{ color:'var(--emerald)' }}>✓</span>{item}</div>)}
                    </div>
                    <div className="pack-footer">
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:22, fontWeight:800, color: p.color }}>${p.price}</div>
                      <button className="book-btn" onClick={() => handleBuyPack(p)}>Get Pack →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SESSIONS */}
          {activeTab === 'sessions' && (
            <div style={{ textAlign:'center', padding:'80px 20px' }}>
              <div style={{ fontSize:60, marginBottom:16 }}>📅</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>No sessions booked yet</h3>
              <p style={{ color:'var(--text-b)', marginBottom:24, fontSize:14 }}>Book a session with an expert tutor to get started.</p>
              <Button variant="primary" onClick={() => setActiveTab('tutors')}>Browse Tutors →</Button>
            </div>
          )}

          {/* BOOK MODAL */}
          {selected && (
            <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Book a session with ${selected.name}`}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
                <div className="tutor-avatar-lg" style={{ background: selected.bg, color:'#000', width:52, height:52, fontSize:20, borderRadius:13 }}>{selected.initials}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15 }}>{selected.name}</div>
                  <div style={{ fontSize:12, color:'var(--text-b)' }}>{selected.title}</div>
                  <div style={{ fontSize:12, color:'var(--amber)', fontWeight:600, marginTop:4 }}>★ {selected.rating} · ${selected.price}/hour</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div>
                  <div className="input-label" style={{ marginBottom:8 }}>Session type</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                    {[{t:'1-on-1',p:`$${selected.price}`},{t:'Group',p:`$${Math.round(selected.price*0.4)}`},{t:'AI+Human',p:`$${Math.round(selected.price*0.6)}`}].map(s=>(
                      <div key={s.t} style={{ background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'12px 10px', textAlign:'center', cursor:'pointer', transition:'all 0.18s' }}
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--amber)'; e.currentTarget.style.background='var(--amber-g)'; }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--surface-b)'; }}
                      >
                        <div style={{ fontSize:12, fontWeight:700, marginBottom:3 }}>{s.t}</div>
                        <div style={{ fontSize:11, color:'var(--amber)' }}>{s.p}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="input-label" style={{ marginBottom:8 }}>Subject</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {selected.subjects.map(s => <span key={s} className="badge badge-neutral" style={{ cursor:'pointer', fontSize:11 }}>{s}</span>)}
                  </div>
                </div>
                <div style={{ background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'12px 16px', fontSize:12, color:'var(--text-b)', lineHeight:1.6 }}>
                  📅 Available slots: <strong style={{ color:'var(--text)' }}>Today 3pm, 5pm · Tomorrow 10am, 2pm, 6pm</strong>
                </div>
                <Button variant="primary" fullWidth loading={bookLoading} onClick={() => handleBook(selected)}>
                  💳 Confirm Booking — ${selected.price}
                </Button>
              </div>
            </Modal>
          )}

        </div>
      </div>
    </div>
  );
}