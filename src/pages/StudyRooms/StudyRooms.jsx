import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import Modal   from '../../components/ui/Modal.jsx';
import Button  from '../../components/ui/Button.jsx';
import Input, { Select } from '../../components/ui/Input.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import './StudyRooms.css';

const ROOMS = [
  { id:1, emoji:'📐', subject:'Calculus II', topic:'Integration by Parts — Chapter 7', host:'Sarah K.', members:7, max:10, colors:['#38BDF8','#A78BFA','#10B981','#F59E0B'], live:true, subject_color:'var(--amber)' },
  { id:2, emoji:'⚗️', subject:'Organic Chemistry', topic:'Nucleophilic Substitution Reactions', host:'Marcus T.', members:3, max:8, colors:['#10B981','#F43F5E','#38BDF8'], live:true, subject_color:'var(--sky)' },
  { id:3, emoji:'🌐', subject:'CS — Data Structures', topic:'Graph Traversal: BFS & DFS', host:'Dr. Chen', members:12, max:15, colors:['#A78BFA','#38BDF8'], live:false, subject_color:'var(--lavender)' },
  { id:4, emoji:'🌍', subject:'World History', topic:'Causes of World War I — Essay Prep', host:'Jenna P.', members:5, max:8, colors:['#10B981','#F59E0B'], live:false, subject_color:'var(--emerald)' },
  { id:5, emoji:'🧬', subject:'Biology', topic:'CRISPR & Gene Editing — Modern Techniques', host:'Aiko N.', members:4, max:6, colors:['#F43F5E','#A78BFA'], live:false, subject_color:'var(--rose)' },
  { id:6, emoji:'📊', subject:'Statistics', topic:'Regression Analysis — Practice Problems', host:'Paulo G.', members:8, max:10, colors:['#F97316','#38BDF8','#10B981'], live:true, subject_color:'var(--orange)' },
];

export default function StudyRooms() {
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [joining, setJoining]       = useState(null);
  const [filter, setFilter]         = useState('all');
  const [newRoom, setNewRoom]        = useState({ name:'', subject:'', type:'public', max_members:'10' });

  const filtered = ROOMS.filter(r => {
    if (filter === 'live') return r.live;
    if (filter === 'open') return !r.live;
    return true;
  });

  const handleJoin = (room) => {
    setJoining(room.id);
    setTimeout(() => {
      setJoining(null);
      toast.success('Joined Room!', `Welcome to ${room.subject} — ${room.topic} 🎉`);
    }, 1000);
  };

  const handleCreate = () => {
    if (!newRoom.name || !newRoom.subject) {
      toast.error('Missing fields', 'Please fill in room name and subject.');
      return;
    }
    toast.success('Room Created!', `"${newRoom.name}" is now live. Share the link!`);
    setShowCreate(false);
    setNewRoom({ name:'', subject:'', type:'public', max_members:'10' });
  };

  const set = (f) => (e) => setNewRoom(p => ({ ...p, [f]: e.target.value }));

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div className="study-rooms-page">

          <div className="rooms-page-header">
            <div>
              <h2>Study Rooms</h2>
              <p>{ROOMS.filter(r=>r.live).length} rooms live now · {ROOMS.reduce((a,r)=>a+r.members,0)} students studying</p>
            </div>
            <Button variant="primary" onClick={() => setShowCreate(true)}>+ Create Room</Button>
          </div>

          {/* Filters */}
          <div style={{ display:'flex', gap:8, marginBottom:24 }}>
            {['all','live','open'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding:'8px 18px', borderRadius:'var(--r-lg)', fontSize:12, fontWeight:600,
                background: filter === f ? 'var(--amber-g)' : 'var(--surface)',
                border: `1px solid ${filter === f ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`,
                color: filter === f ? 'var(--amber)' : 'var(--text-b)',
                cursor:'pointer', fontFamily:'var(--font-sans)', textTransform:'capitalize',
              }}>{f === 'all' ? 'All Rooms' : f === 'live' ? '🔴 Live' : '🟢 Open'}</button>
            ))}
          </div>

          <div className="rooms-big-grid">
            {filtered.map((r, i) => (
              <div key={r.id} className={`room-big-card ${r.live ? 'live-card' : ''}`} style={{ animationDelay:`${i*0.07}s` }}>
                <div className="rbc-top">
                  <span className="rbc-emoji">{r.emoji}</span>
                  {r.live
                    ? <span className="badge badge-rose" style={{ display:'flex',alignItems:'center',gap:5,fontSize:10 }}>
                        <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--rose)',animation:'pulse 1.5s infinite',display:'block' }}/> LIVE
                      </span>
                    : <span className="badge badge-emerald" style={{ fontSize:10 }}>OPEN</span>
                  }
                </div>
                <div className="rbc-title">{r.subject}</div>
                <div className="rbc-topic">{r.topic}</div>

                {/* Members */}
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <div style={{ display:'flex' }}>
                    {r.colors.map((c, j) => (
                      <div key={j} style={{ width:24,height:24,borderRadius:'50%',background:c,marginLeft:j===0?0:-8,border:'2px solid var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff' }}>
                        {String.fromCharCode(65+j)}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize:11,color:'var(--text-b)' }}>{r.members}/{r.max} members</span>
                </div>

                {/* Progress bar for capacity */}
                <div style={{ height:3,background:'var(--surface-c)',borderRadius:99,overflow:'hidden',marginBottom:14 }}>
                  <div style={{ height:'100%',width:`${(r.members/r.max)*100}%`,background:r.subject_color,borderRadius:99,transition:'width 1s ease' }}/>
                </div>

                <div className="rbc-meta">
                  <span className="rbc-host">🎓 Hosted by {r.host}</span>
                  <button
                    className={`rbc-join ${r.members >= r.max ? 'ghost' : ''}`}
                    onClick={() => r.members < r.max && handleJoin(r)}
                    disabled={joining === r.id}
                  >
                    {joining === r.id ? '⏳ Joining…' : r.members >= r.max ? 'Full' : 'Join →'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CREATE ROOM MODAL */}
          <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create a Study Room">
            <p style={{ fontSize:13,color:'var(--text-b)',marginBottom:20,lineHeight:1.7 }}>
              Create a live study room and invite peers. Choose a subject and set a capacity limit.
            </p>
            <div className="create-room-form">
              <Input label="Room name" name="name" value={newRoom.name} onChange={set('name')} placeholder="e.g. Calculus Legends 🧮" required/>
              <Input label="Subject / Topic" name="subject" value={newRoom.subject} onChange={set('subject')} placeholder="e.g. Integration by Parts" required/>
              <Select label="Room type" name="type" value={newRoom.type} onChange={set('type')} options={[{ value:'public',label:'Public — anyone can join' },{ value:'private',label:'Private — invite only' }]}/>
              <Select label="Max members" name="max_members" value={newRoom.max_members} onChange={set('max_members')} options={['3','5','8','10','15','20'].map(v=>({ value:v,label:`${v} members` }))}/>
              <div style={{ display:'flex',gap:10,paddingTop:8 }}>
                <Button variant="secondary" fullWidth onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button variant="primary" fullWidth onClick={handleCreate}>🚀 Create Room</Button>
              </div>
            </div>
          </Modal>

        </div>
      </div>
    </div>
  );
}