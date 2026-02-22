import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const RESOURCES = [
  { id:1, type:'PDF', emoji:'📄', title:'Calculus II — Complete Study Guide', subject:'Mathematics', size:'2.4 MB', downloads:8420, saved:true, color:'var(--amber)' },
  { id:2, type:'Video', emoji:'🎥', title:'Organic Chemistry Reactions — Full Series', subject:'Chemistry', duration:'4h 20m', views:'12K', saved:false, color:'var(--sky)' },
  { id:3, type:'Flashcard', emoji:'🃏', title:'Data Structures & Algorithms Deck (300 cards)', subject:'Computer Science', cards:300, saved:true, color:'var(--lavender)' },
  { id:4, type:'Past Paper', emoji:'📝', title:'KCSE Mathematics 2024 Past Paper + Answers', subject:'Mathematics', year:2024, saved:false, color:'var(--emerald)' },
  { id:5, type:'PDF', emoji:'📄', title:'Physics Mechanics Formula Sheet', subject:'Physics', size:'0.8 MB', downloads:5210, saved:true, color:'var(--orange)' },
  { id:6, type:'Video', emoji:'🎥', title:'Graph Theory — Beginner to Advanced', subject:'Computer Science', duration:'2h 45m', views:'6.8K', saved:false, color:'var(--lavender)' },
  { id:7, type:'Flashcard', emoji:'🃏', title:'WAEC Biology Definitions Deck', subject:'Biology', cards:180, saved:false, color:'var(--rose)' },
  { id:8, type:'Past Paper', emoji:'📝', title:'A-Level Chemistry Papers 2019–2023', subject:'Chemistry', year:'2019–2023', saved:true, color:'var(--sky)' },
];

const TYPE_COLORS = { PDF:'badge-amber', Video:'badge-sky', Flashcard:'badge-lavender', 'Past Paper':'badge-emerald' };

export default function Library() {
  const { toast } = useToast();
  const [saved, setSaved]     = useState(new Set(RESOURCES.filter(r=>r.saved).map(r=>r.id)));
  const [filter, setFilter]   = useState('All');
  const [search, setSearch]   = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  const toggleSave = (r) => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(r.id)) { next.delete(r.id); toast.info('Removed', `${r.title} removed from library`); }
      else { next.add(r.id); toast.success('Saved!', `${r.title} saved to your library`); }
      return next;
    });
  };

  const types = ['All', 'PDF', 'Video', 'Flashcard', 'Past Paper'];
  const filtered = RESOURCES.filter(r => {
    const matchType   = filter === 'All' || r.type === filter;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.subject.toLowerCase().includes(search.toLowerCase());
    const matchTab    = activeTab === 'browse' || (activeTab === 'saved' && saved.has(r.id));
    return matchType && matchSearch && matchTab;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div style={{ padding:'28px 32px' }}>

          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.03em', marginBottom:4 }}>Library</h2>
            <p style={{ fontSize:13, color:'var(--text-b)' }}>Study materials, past papers, flashcard decks, and video lessons.</p>
          </div>

          {/* Tabs + search */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
            <div style={{ display:'flex', gap:6 }}>
              {['browse','saved'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding:'9px 18px', borderRadius:'var(--r-lg)', fontSize:12, fontWeight:600,
                  background: activeTab === t ? 'var(--amber-g)' : 'var(--surface)',
                  border: `1px solid ${activeTab === t ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`,
                  color: activeTab === t ? 'var(--amber)' : 'var(--text-b)',
                  cursor:'pointer', fontFamily:'var(--font-sans)', textTransform:'capitalize',
                }}>{t === 'saved' ? `📌 Saved (${saved.size})` : '🔍 Browse All'}</button>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'9px 14px', flex:1, maxWidth:320, transition:'border-color 0.2s' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-c)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search resources…" style={{ background:'none', border:'none', outline:'none', color:'var(--text)', fontSize:12, fontFamily:'var(--font-sans)', width:'100%' }}/>
            </div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {types.map(t => (
                <button key={t} onClick={() => setFilter(t)} style={{
                  padding:'7px 14px', borderRadius:'var(--r-full)', fontSize:11, fontWeight:600,
                  background: filter === t ? 'var(--surface-c)' : 'transparent',
                  border: `1px solid ${filter === t ? 'var(--border-h)' : 'var(--border)'}`,
                  color: filter === t ? 'var(--text)' : 'var(--text-c)',
                  cursor:'pointer', fontFamily:'var(--font-sans)',
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
            {filtered.map((r, i) => (
              <div key={r.id} className="card card-hover fade-up" style={{ animationDelay:`${i*0.06}s`, cursor:'default' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${r.color}14`, border:`1px solid ${r.color}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{r.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', gap:6, marginBottom:6 }}>
                      <span className={`badge ${TYPE_COLORS[r.type]}`} style={{ fontSize:9 }}>{r.type}</span>
                      <span className="badge badge-neutral" style={{ fontSize:9 }}>{r.subject}</span>
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, lineHeight:1.4, marginBottom:4 }}>{r.title}</div>
                    <div style={{ fontSize:11, color:'var(--text-c)' }}>
                      {r.size && `📁 ${r.size} · 📥 ${r.downloads} downloads`}
                      {r.duration && `⏱ ${r.duration} · 👁 ${r.views} views`}
                      {r.cards && `🃏 ${r.cards} cards`}
                      {r.year && `📅 ${r.year}`}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, marginTop:14, paddingTop:14, borderTop:'1px solid var(--border)' }}>
                  <button onClick={() => toast.info('Opening…', r.title)} style={{ flex:1, padding:'8px', borderRadius:'var(--r-md)', background:'linear-gradient(135deg,#F59E0B,#F97316)', border:'none', color:'#000', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)' }}>
                    {r.type === 'Video' ? '▶ Watch' : r.type === 'Flashcard' ? '🃏 Study' : '📥 Open'}
                  </button>
                  <button onClick={() => toggleSave(r)} style={{ width:38, height:38, borderRadius:'var(--r-md)', background: saved.has(r.id) ? 'var(--amber-g)' : 'var(--surface-c)', border: `1px solid ${saved.has(r.id) ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`, color: saved.has(r.id) ? 'var(--amber)' : 'var(--text-b)', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {saved.has(r.id) ? '📌' : '🔖'}
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'80px 20px', color:'var(--text-b)', fontSize:14 }}>
                No resources found. Try adjusting your filters.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}