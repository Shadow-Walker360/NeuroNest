import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const PLANS = [
  {
    id:'free', name:'Free', price:{ monthly:0, yearly:0 }, tag:null,
    color:'var(--text-b)', glow:'',
    features:[
      '✓ Personal study dashboard',
      '✓ AI tutor (10 messages/day)',
      '✓ 3 study rooms/month',
      '✓ Basic analytics',
      '✓ Mobile app access',
      '✓ Community forums',
      '✗ 1-on-1 tutor sessions',
      '✗ Advanced analytics & predictions',
      '✗ Offline mode',
      '✗ Premium study packs',
    ],
    cta:'Get started free',
  },
  {
    id:'solo', name:'Solo Premium', price:{ monthly:30, yearly:25 }, tag:'Most Popular',
    color:'var(--amber)', glow:'0 0 40px rgba(245,158,11,0.15)',
    features:[
      '✓ Everything in Free',
      '✓ Unlimited AI tutoring',
      '✓ Unlimited study rooms',
      '✓ 1-on-1 tutors ($25/session)',
      '✓ Advanced analytics & AI predictor',
      '✓ Offline mode',
      '✓ Priority support',
      '✓ Personalised study plans',
      '✓ Premium study packs included',
      '✓ Ad-free experience',
    ],
    cta:'Start 7-day free trial',
  },
  {
    id:'institution', name:'Institution', price:{ monthly:50, yearly:40 }, tag:'For Schools',
    color:'var(--sky)', glow:'',
    features:[
      '✓ Everything in Solo',
      '✓ Group / school admin dashboard',
      '✓ Analytics for all students',
      '✓ Bulk student onboarding',
      '✓ Custom curriculum mapping',
      '✓ Group study room management',
      '✓ Dedicated support manager',
      '✓ API access',
      '✓ White-label options',
      '✓ Invoice/PO billing',
    ],
    cta:'Contact sales',
  },
];

const FAQS = [
  { q:'Can I cancel anytime?', a:'Yes. Cancel with one click from your settings. No questions asked, no fees.' },
  { q:'Is there a student discount?', a:'Yes — students with a valid .edu or .ac email get 30% off Solo Premium.' },
  { q:'How does the AI tutor work?', a:'Our AI is trained on curriculum content from 50+ countries. It detects your weak areas, generates quizzes, explains concepts, and adapts to your learning style in real time.' },
  { q:'What education systems are supported?', a:'Kenya (CBC & 8-4-4), Nigeria (6-3-3-4), Ghana (JHS/SHS), South Africa (CAPS), UK (Key Stages/A-Level), USA (K-12), India (CBSE/ICSE/NEP), Australia (ACARA), UAE (MOE), Germany, and more.' },
  { q:'Can my school use LearnVerse?', a:'Absolutely. The Institution plan gives your school an admin dashboard, bulk onboarding, and analytics across all students. Contact sales@learnverse.com.' },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const handleCTA = (plan) => {
    if (plan.id === 'free') { navigate('/register'); return; }
    if (plan.id === 'institution') { toast.info('Sales Team', 'We\'ll reach out within 24h. Email: sales@learnverse.com'); return; }
    navigate('/register');
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Nav */}
      <nav style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 48px', background:'rgba(8,8,10,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:300 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#F59E0B,#F97316)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-mono)',fontWeight:700,fontSize:14,color:'#000' }}>LV</div>
          <span style={{ fontWeight:800, fontSize:17, letterSpacing:'-0.03em' }}>LearnVerse</span>
        </div>
        <div style={{ flex:1 }}/>
        <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log in</Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Get started →</Button>
      </nav>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'80px 24px' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--amber)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:14 }}>Simple Pricing</div>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:16 }}>Plans for every learner</h1>
          <p style={{ fontSize:17, color:'var(--text-b)', maxWidth:500, margin:'0 auto 32px', lineHeight:1.7 }}>Start free. Upgrade when you're ready. Cancel anytime.</p>

          {/* Billing toggle */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:12, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-full)', padding:'6px 8px' }}>
            {['monthly','yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{
                padding:'8px 20px', borderRadius:'var(--r-full)', fontSize:12, fontWeight:600,
                background: billing === b ? 'linear-gradient(135deg,#F59E0B,#F97316)' : 'transparent',
                border:'none', color: billing === b ? '#000' : 'var(--text-b)', cursor:'pointer',
                fontFamily:'var(--font-sans)', transition:'all 0.2s', textTransform:'capitalize',
              }}>{b} {b === 'yearly' ? '(Save 17%)' : ''}</button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:80 }}>
          {PLANS.map((plan, i) => (
            <div key={plan.id} style={{
              background:'var(--surface)',
              border: `1px solid ${plan.id === 'solo' ? 'rgba(245,158,11,0.45)' : 'var(--border)'}`,
              borderRadius:'var(--r-2xl)', padding:'32px',
              position:'relative', overflow:'hidden',
              transition:'all 0.25s',
              boxShadow: plan.glow,
              animation:`fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both ${i*0.1}s`,
            }}>
              {plan.id === 'solo' && (
                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at top left,rgba(245,158,11,0.08),transparent 60%)', pointerEvents:'none', borderRadius:'inherit' }}/>
              )}
              {plan.tag && (
                <div style={{ position:'absolute', top:20, right:20 }}>
                  <span className="badge badge-amber" style={{ fontSize:9 }}>{plan.tag}</span>
                </div>
              )}
              <div style={{ fontSize:11, fontWeight:700, color:'var(--text-b)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>{plan.name}</div>
              <div style={{ fontSize:46, fontWeight:900, fontFamily:'var(--font-mono)', letterSpacing:'-0.03em', color:plan.color, marginBottom:4 }}>
                ${billing === 'yearly' ? plan.price.yearly : plan.price.monthly}
              </div>
              <div style={{ fontSize:13, color:'var(--text-b)', marginBottom:28 }}>
                {plan.price.monthly === 0 ? 'forever free' : `per month${billing === 'yearly' ? ', billed annually' : ', cancel anytime'}`}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ fontSize:12, color:f.startsWith('✗') ? 'var(--text-d)' : 'var(--text-b)', display:'flex', alignItems:'flex-start', gap:5, lineHeight:1.5 }}>
                    <span style={{ color:f.startsWith('✓') ? 'var(--emerald)' : 'var(--text-d)', flexShrink:0, marginTop:1 }}>{f[0]}</span>
                    {f.slice(2)}
                  </div>
                ))}
              </div>
              <Button
                variant={plan.id === 'solo' ? 'primary' : 'secondary'}
                fullWidth
                onClick={() => handleCTA(plan)}
              >{plan.cta}</Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, letterSpacing:'-0.02em', marginBottom:32, textAlign:'center' }}>Frequently Asked Questions</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-xl)', overflow:'hidden', transition:'border-color 0.2s', borderColor: openFaq === i ? 'var(--border-h)' : 'var(--border)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width:'100%', padding:'18px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'none', border:'none', cursor:'pointer', color:'var(--text)', fontFamily:'var(--font-sans)', fontSize:14, fontWeight:600, textAlign:'left', gap:12 }}>
                  {faq.q}
                  <span style={{ color:'var(--amber)', flexShrink:0, transition:'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'none', fontSize:16 }}>▼</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding:'0 20px 18px', fontSize:13, color:'var(--text-b)', lineHeight:1.7, animation:'fadeDown 0.2s ease' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}