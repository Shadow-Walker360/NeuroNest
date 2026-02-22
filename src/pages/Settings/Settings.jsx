import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Topbar  from '../../components/layout/Topbar.jsx';
import Button  from '../../components/ui/Button.jsx';
import Input   from '../../components/ui/Input.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

const SETTING_TABS = ['Profile','Education','Notifications','Security','Billing','Appearance'];

export default function Settings() {
  const { user, updateUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('Profile');
  const [saving, setSaving]       = useState(false);

  const [profile, setProfile] = useState({
    first_name: user?.first_name || '',
    last_name:  user?.last_name  || '',
    email:      user?.email      || '',
    bio:        user?.bio        || '',
  });

  const [notifs, setNotifs] = useState({
    study_reminders: true, achievement_alerts: true, room_invites: true,
    tutor_updates: true, weekly_report: true, marketing: false,
  });

  const [appearance, setAppearance] = useState({ theme:'dark', accent:'amber', font:'sora' });

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser(profile);
    toast.success('Saved!', 'Your profile has been updated.');
    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    toast.success('Logged out', 'See you soon!');
  };

  const set = (f) => (e) => setProfile(p => ({ ...p, [f]: e.target.value }));

  return (
    <div className="dashboard-layout">
      <Sidebar/>
      <div className="dashboard-content">
        <Topbar/>
        <div style={{ padding:'28px 32px', display:'grid', gridTemplateColumns:'220px 1fr', gap:24, maxWidth:1000 }}>

          {/* Settings Sidebar */}
          <div>
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', padding:'8px', position:'sticky', top:96 }}>
              {SETTING_TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  width:'100%', padding:'11px 14px', borderRadius:'var(--r-lg)',
                  background: activeTab === tab ? 'var(--amber-g)' : 'transparent',
                  border: activeTab === tab ? '1px solid rgba(245,158,11,0.3)' : '1px solid transparent',
                  color: activeTab === tab ? 'var(--amber)' : 'var(--text-b)',
                  cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:13, fontWeight:500,
                  textAlign:'left', transition:'all 0.18s', marginBottom:2,
                }}>{tab}</button>
              ))}
              <div style={{ borderTop:'1px solid var(--border)', marginTop:8, paddingTop:8 }}>
                <button onClick={handleLogout} style={{ width:'100%', padding:'11px 14px', borderRadius:'var(--r-lg)', background:'transparent', border:'1px solid transparent', color:'var(--rose)', cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:13, fontWeight:500, textAlign:'left', transition:'all 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(244,63,94,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* PROFILE */}
            {activeTab === 'Profile' && (
              <div className="card fade-up">
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>Profile</h3>
                <p style={{ fontSize:13, color:'var(--text-b)', marginBottom:24 }}>Update your name, email, and personal bio.</p>

                {/* Avatar */}
                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28, padding:'18px', background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)' }}>
                  <div style={{ width:64, height:64, borderRadius:16, background:'linear-gradient(135deg,#F59E0B,#F97316)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:24, color:'#000', fontFamily:'var(--font-mono)' }}>
                    {(user?.first_name?.[0] || 'U')}{(user?.last_name?.[0] || '')}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Profile Photo</div>
                    <div style={{ fontSize:12, color:'var(--text-b)', marginBottom:10 }}>Your initials are used as your avatar. Photo upload coming soon.</div>
                    <Button variant="secondary" size="sm">Upload Photo</Button>
                  </div>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <Input label="First name" name="first_name" value={profile.first_name} onChange={set('first_name')} placeholder="Alex"/>
                    <Input label="Last name"  name="last_name"  value={profile.last_name}  onChange={set('last_name')}  placeholder="Kimani"/>
                  </div>
                  <Input label="Email address" name="email" type="email" value={profile.email} onChange={set('email')} placeholder="you@example.com"/>
                  <div className="input-group">
                    <label className="input-label">Bio</label>
                    <textarea value={profile.bio} onChange={e => setProfile(p=>({...p,bio:e.target.value}))} placeholder="Tell other learners about yourself…" style={{ width:'100%', background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'12px 16px', color:'var(--text)', fontSize:13, fontFamily:'var(--font-sans)', outline:'none', resize:'vertical', minHeight:80, transition:'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor='var(--border-f)'}
                      onBlur={e  => e.target.style.borderColor='var(--border)'}
                    />
                  </div>
                  <Button variant="primary" onClick={handleSaveProfile} loading={saving} style={{ alignSelf:'flex-start' }}>Save Changes</Button>
                </div>
              </div>
            )}

            {/* EDUCATION */}
            {activeTab === 'Education' && (
              <div className="card fade-up">
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>Education Settings</h3>
                <p style={{ fontSize:13, color:'var(--text-b)', marginBottom:24 }}>Your curriculum and level determine how we personalise your AI tutor, study plans, and content.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    ['Country', user?.country || 'Kenya', '🇰🇪'],
                    ['Education System', user?.education_system || 'Kenya CBC & 8-4-4', '🎓'],
                    ['Study Level', user?.study_level || 'Senior Secondary (Grades 10–12)', '📚'],
                    ['Current Grade', user?.grade || 'Grade 12', '📐'],
                    ['School Type', user?.school_type?.replace(/_/g,' ') || 'Public School', '🏫'],
                    ['Target Qualification', user?.target_qualification || 'KCSE', '🏆'],
                  ].map(([label, value, icon]) => (
                    <div key={label} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)' }}>
                      <span style={{ fontSize:22 }}>{icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:10, color:'var(--text-c)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:3 }}>{label}</div>
                        <div style={{ fontSize:14, fontWeight:600 }}>{value}</div>
                      </div>
                      <button style={{ fontSize:11, color:'var(--amber)', background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-sans)', fontWeight:600 }}
                        onClick={() => toast.info('Update', `To update your ${label}, please contact support or re-register.`)}
                      >Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === 'Notifications' && (
              <div className="card fade-up">
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>Notifications</h3>
                <p style={{ fontSize:13, color:'var(--text-b)', marginBottom:24 }}>Choose what you want to hear about.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                  {Object.entries(notifs).map(([key, val]) => (
                    <div key={key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{key.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</div>
                        <div style={{ fontSize:11, color:'var(--text-b)' }}>
                          {key === 'study_reminders' && 'Daily study reminders based on your schedule'}
                          {key === 'achievement_alerts' && 'Get notified when you unlock badges or milestones'}
                          {key === 'room_invites' && 'Invitations to join live study rooms'}
                          {key === 'tutor_updates' && 'Updates from booked tutors and session reminders'}
                          {key === 'weekly_report' && 'Weekly summary of your learning progress'}
                          {key === 'marketing' && 'Product news, tips, and special offers'}
                        </div>
                      </div>
                      <div onClick={() => setNotifs(p => ({ ...p, [key]: !val }))} style={{ width:42, height:24, borderRadius:12, background: val ? 'var(--amber)' : 'var(--surface-c)', cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left: val ? 21 : 3, transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}/>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="primary" style={{ marginTop:20, alignSelf:'flex-start' }} onClick={() => toast.success('Saved!', 'Notification preferences updated.')}>Save Preferences</Button>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === 'Security' && (
              <div className="card fade-up">
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>Security</h3>
                <p style={{ fontSize:13, color:'var(--text-b)', marginBottom:24 }}>Manage your password and account security.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <Input label="Current password" name="current_password" type="password" placeholder="Enter current password"/>
                  <Input label="New password"      name="new_password"     type="password" placeholder="Min. 8 chars, 1 uppercase, 1 number"/>
                  <Input label="Confirm new password" name="confirm_password" type="password" placeholder="Repeat new password"/>
                  <Button variant="primary" style={{ alignSelf:'flex-start' }} onClick={() => toast.success('Password changed!', 'Your password has been updated successfully.')}>Update Password</Button>
                </div>
                <div style={{ marginTop:28, paddingTop:24, borderTop:'1px solid var(--border)' }}>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:6, color:'var(--rose)' }}>Danger Zone</div>
                  <p style={{ fontSize:12, color:'var(--text-b)', marginBottom:14 }}>Deleting your account is irreversible. All data will be permanently removed.</p>
                  <button onClick={() => toast.error('Account Deletion', 'Please contact support@learnverse.com to delete your account.')} style={{ padding:'10px 20px', borderRadius:'var(--r-lg)', background:'rgba(244,63,94,0.12)', border:'1px solid rgba(244,63,94,0.35)', color:'var(--rose)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-sans)', transition:'all 0.2s' }}>
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* BILLING */}
            {activeTab === 'Billing' && (
              <div className="card fade-up">
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>Billing</h3>
                <p style={{ fontSize:13, color:'var(--text-b)', marginBottom:24 }}>Manage your subscription and payment methods.</p>
                <div style={{ background:'var(--amber-g)', border:'1px solid rgba(245,158,11,0.35)', borderRadius:'var(--r-xl)', padding:'20px', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                  <div>
                    <div style={{ fontSize:10, color:'var(--amber)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'var(--font-mono)', marginBottom:6 }}>Current Plan</div>
                    <div style={{ fontSize:20, fontWeight:800, letterSpacing:'-0.02em' }}>Free Plan</div>
                    <div style={{ fontSize:12, color:'var(--text-b)', marginTop:4 }}>Upgrade to unlock AI tutoring, sessions, and more.</div>
                  </div>
                  <Button variant="primary" onClick={() => navigate('/pricing')}>Upgrade to Solo →</Button>
                </div>
                <div style={{ fontSize:13, color:'var(--text-b)', textAlign:'center', padding:'40px', border:'1px dashed var(--border)', borderRadius:'var(--r-xl)' }}>
                  No billing history yet. Upgrade to see invoices here.
                </div>
              </div>
            )}

            {/* APPEARANCE */}
            {activeTab === 'Appearance' && (
              <div className="card fade-up">
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>Appearance</h3>
                <p style={{ fontSize:13, color:'var(--text-b)', marginBottom:24 }}>Customise how LearnVerse looks for you.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                  <div>
                    <div className="input-label" style={{ marginBottom:10 }}>Theme</div>
                    <div style={{ display:'flex', gap:10 }}>
                      {['dark','light','system'].map(t => (
                        <button key={t} onClick={() => { setAppearance(p=>({...p,theme:t})); if(t!=='dark') toast.info('Coming Soon', `${t.charAt(0).toUpperCase()+t.slice(1)} mode is coming in a future update.`); }} style={{
                          padding:'10px 18px', borderRadius:'var(--r-lg)', fontSize:12, fontWeight:600,
                          background: appearance.theme === t ? 'var(--amber-g)' : 'var(--surface-b)',
                          border: `1px solid ${appearance.theme === t ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`,
                          color: appearance.theme === t ? 'var(--amber)' : 'var(--text-b)',
                          cursor:'pointer', fontFamily:'var(--font-sans)', textTransform:'capitalize',
                        }}>{t === 'dark' ? '🌑' : t === 'light' ? '☀️' : '🖥️'} {t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="input-label" style={{ marginBottom:10 }}>Accent Color</div>
                    <div style={{ display:'flex', gap:10 }}>
                      {[['amber','#F59E0B'],['sky','#38BDF8'],['emerald','#10B981'],['rose','#F43F5E'],['lavender','#A78BFA']].map(([name,hex]) => (
                        <div key={name} onClick={() => { setAppearance(p=>({...p,accent:name})); toast.info('Accent Updated', `Switched to ${name} accent.`); }} style={{ width:36, height:36, borderRadius:'50%', background:hex, cursor:'pointer', border:`3px solid ${appearance.accent === name ? '#fff' : 'transparent'}`, transition:'transform 0.2s, border-color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.transform='scale(1.15)'}
                          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}