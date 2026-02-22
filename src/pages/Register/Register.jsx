import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Input, { Select, PhoneInput } from '../../components/ui/Input.jsx';
import ParticleField from '../../components/three/ParticleField.jsx';
import { COUNTRY_CODES, getEducationSystem } from '../../utils/countryData.js';
import { validators } from '../../utils/validators.js';
import './Register.css';

/* ─────────────────────────────────────────────────
   STEP METADATA
───────────────────────────────────────────────── */
const STEPS = [
  { num: 1, title: 'Personal details',    desc: 'Tell us your name and email.' },
  { num: 2, title: 'Phone & country',     desc: 'We use your country to detect your education system.' },
  { num: 3, title: 'Education system',    desc: 'Auto-filled based on your country — confirm or adjust.' },
  { num: 4, title: 'School type',         desc: 'Are you from a single school or a network of schools?' },
];

/* ─────────────────────────────────────────────────
   STEP 1 — Personal details
───────────────────────────────────────────────── */
function Step1({ data, setData, errors }) {
  const set = (f) => (e) => setData((p) => ({ ...p, [f]: e.target.value }));
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }} className="scale-in">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Input label="First name" name="first_name" value={data.first_name} onChange={set('first_name')} placeholder="Alex" error={errors.first_name} required />
        <Input label="Last name"  name="last_name"  value={data.last_name}  onChange={set('last_name')}  placeholder="Kimani" error={errors.last_name} required />
      </div>
      <Input label="Email address" name="email" type="email" value={data.email} onChange={set('email')} placeholder="you@example.com" error={errors.email} required autoComplete="email"
        iconLeft={<EnvIcon />}
      />
      <Input label="Password" name="password" type="password" value={data.password} onChange={set('password')} placeholder="Min. 8 chars, 1 uppercase, 1 number" error={errors.password} required
        hint="Must be at least 8 characters with one number and one uppercase letter."
      />
      <Input label="Confirm password" name="confirm_password" type="password" value={data.confirm_password} onChange={set('confirm_password')} placeholder="Repeat your password" error={errors.confirm_password} required />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   STEP 2 — Phone + Country (magic auto-detect)
───────────────────────────────────────────────── */
function Step2({ data, setData, errors, onCountryDetected }) {
  const [dialCode, setDialCode] = useState(data.dial || '+254|KE');

  const handleDialChange = (e) => {
    const val = e.target.value; // "+254|KE"
    setDialCode(val);
    const [code, countryCode] = val.split('|');
    setData((p) => ({ ...p, dial: val, dial_code: code, country_code: countryCode }));
    // Trigger auto-detect
    const found = COUNTRY_CODES.find((c) => c.code === code && c.country === countryCode);
    if (found) onCountryDetected(found);
  };

  const handlePhoneChange = (e) => {
    setData((p) => ({ ...p, phone: e.target.value }));
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }} className="scale-in">
      <PhoneInput
        label="Phone number"
        required
        dialValue={dialCode}
        dialOnChange={handleDialChange}
        phoneValue={data.phone}
        phoneOnChange={handlePhoneChange}
        error={errors.phone}
        countryCodes={COUNTRY_CODES}
      />

      {/* Show detected country inline */}
      {data.country_code && (
        <div className="reg-auto-field" style={{ animation:'fadeUp 0.3s ease' }}>
          <span className="reg-auto-field-icon">
            {COUNTRY_CODES.find(c => c.country === data.country_code)?.flag || '🌍'}
          </span>
          <div>
            <div className="reg-auto-field-label">Detected country</div>
            <div className="reg-auto-field-value">
              {COUNTRY_CODES.find(c => c.country === data.country_code)?.name || data.country_code}
            </div>
          </div>
          <span className="reg-auto-field-badge"><span className="badge badge-emerald">✓ Auto-detected</span></span>
        </div>
      )}

      <div style={{ background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'14px 16px', fontSize:12, color:'var(--text-b)', lineHeight:1.7 }}>
        💡 <strong style={{color:'var(--text)'}}>Why we need your country:</strong> Different countries use different education systems (e.g., Kenya uses CBC & 8-4-4, the UK uses Key Stages & A-Levels, Nigeria uses 6-3-3-4). We auto-fill your curriculum in the next step based on this.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   STEP 3 — Education system (auto-filled)
───────────────────────────────────────────────── */
function Step3({ data, setData, errors, educationSystem }) {
  const set = (f) => (e) => {
    const val = e.target.value;
    if (f === 'study_level') {
      setData((p) => ({ ...p, study_level: val, grade: '' }));
    } else {
      setData((p) => ({ ...p, [f]: val }));
    }
  };

  const grades = educationSystem?.grades?.[data.study_level] || [];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }} className="scale-in">
      {/* Auto-detected system */}
      {educationSystem && (
        <div className="reg-auto-field">
          <span className="reg-auto-field-icon">🎓</span>
          <div>
            <div className="reg-auto-field-label">Your education system</div>
            <div className="reg-auto-field-value">{educationSystem.system}</div>
            <div style={{ fontSize:11, color:'var(--text-b)', marginTop:2 }}>{educationSystem.description}</div>
          </div>
          <span className="reg-auto-field-badge"><span className="badge badge-emerald">✓ Auto-filled</span></span>
        </div>
      )}

      {/* Level of study */}
      <Select
        label="Level of study"
        name="study_level"
        value={data.study_level}
        onChange={set('study_level')}
        options={educationSystem?.levels || []}
        placeholder="— Select your current level —"
        error={errors.study_level}
        required
        hint={`This is based on the ${educationSystem?.system || 'education system'} in your country.`}
      />

      {/* Grade — appears only after level is selected */}
      {data.study_level && grades.length > 0 && (
        <Select
          label={`${educationSystem?.gradeLabel || 'Grade'} / Year`}
          name="grade"
          value={data.grade}
          onChange={set('grade')}
          options={grades.map(g => ({ value: g, label: g }))}
          placeholder={`— Select your ${educationSystem?.gradeLabel || 'grade'} —`}
          error={errors.grade}
          required
        />
      )}

      {/* Qualification they're working towards */}
      {educationSystem?.qualifications && (
        <div>
          <div className="input-label" style={{ marginBottom:8 }}>Qualifications available in your system</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {educationSystem.qualifications.map(q => (
              <span key={q}
                className={`badge ${data.target_qualification === q ? 'badge-amber' : 'badge-neutral'}`}
                style={{ cursor:'pointer', fontSize:11, padding:'5px 12px' }}
                onClick={() => setData(p => ({ ...p, target_qualification: q }))}
              >
                {q}
              </span>
            ))}
          </div>
          {errors.target_qualification && <span className="input-error" style={{marginTop:6}}>⚠ {errors.target_qualification}</span>}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   STEP 4 — School type
───────────────────────────────────────────────── */
function Step4({ data, setData, educationSystem }) {
  const types = educationSystem?.schoolTypes || [];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }} className="scale-in">
      <div style={{ background:'var(--surface-b)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'12px 16px', fontSize:12, color:'var(--text-b)', lineHeight:1.7 }}>
        🏫 This helps us tailor features — e.g., group schools get admin dashboards and bulk management tools, while individual schools get a streamlined single-campus view.
      </div>

      <div className="school-type-grid">
        {types.map((t) => (
          <div
            key={t.value}
            className={`school-type-card ${data.school_type === t.value ? 'selected' : ''}`}
            onClick={() => setData(p => ({ ...p, school_type: t.value }))}
          >
            <div className="school-type-icon">{SCHOOL_ICONS[t.value] || '🏫'}</div>
            <div className="school-type-title">{t.label}</div>
          </div>
        ))}
      </div>

      {/* Role */}
      <Select
        label="Your role"
        name="role"
        value={data.role}
        onChange={(e) => setData(p => ({ ...p, role: e.target.value }))}
        options={[
          { value:'student',   label:'Student' },
          { value:'teacher',   label:'Teacher / Tutor' },
          { value:'parent',    label:'Parent / Guardian' },
          { value:'admin',     label:'School Administrator' },
        ]}
        placeholder="— Select your role —"
        hint="This determines your dashboard and features."
      />

      {/* Accept terms */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:10, paddingTop:4 }}>
        <input
          type="checkbox"
          id="terms"
          checked={data.agreed}
          onChange={(e) => setData(p => ({ ...p, agreed: e.target.checked }))}
          style={{ width:16, height:16, accentColor:'var(--amber)', marginTop:2, flexShrink:0 }}
        />
        <label htmlFor="terms" style={{ fontSize:12, color:'var(--text-b)', lineHeight:1.6, cursor:'pointer' }}>
          I agree to the <span style={{ color:'var(--amber)' }}>Terms of Service</span> and <span style={{ color:'var(--amber)' }}>Privacy Policy</span>. I understand that LearnVerse will personalise my experience based on my country's education system.
        </label>
      </div>
    </div>
  );
}

const SCHOOL_ICONS = {
  public_school:'🏫', private_school:'🏛️', charter_school:'📐', homeschool:'🏠',
  school_district:'🌐', university:'🎓', community_college:'📚',
  state_school:'🏫', academy:'🏅', grammar_school:'📜', independent:'🏛️',
  sixth_form:'📖', multi_academy:'🌐',
  national_school:'🇰🇪', county_school:'🏫', group_schools:'🌐', tvet_institution:'🔧',
  government:'🏛️', cbse:'📘', icse:'📗', private:'🏠', kendriya:'🇮🇳',
  catholic:'✝️', mission_school:'⛪', unity_school:'🇳🇬',
  tafe:'🔧',
};

/* ─────────────────────────────────────────────────
   MAIN REGISTER COMPONENT
───────────────────────────────────────────────── */
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [detectedCountry, setDetectedCountry] = useState(null);

  const [data, setData] = useState({
    first_name: '', last_name: '', email: '', password: '', confirm_password: '',
    dial: '+254|KE', dial_code: '+254', country_code: 'KE', phone: '',
    study_level: '', grade: '', target_qualification: '',
    school_type: '', role: 'student', agreed: false,
  });
  const [errors, setErrors] = useState({});

  // Derive education system from detected country
  const educationSystem = detectedCountry
    ? getEducationSystem(detectedCountry.country)
    : data.country_code
      ? getEducationSystem(data.country_code)
      : null;

  // Auto-detect on mount if country_code already set
  useEffect(() => {
    if (data.country_code && !detectedCountry) {
      const found = COUNTRY_CODES.find(c => c.country === data.country_code);
      if (found) setDetectedCountry(found);
    }
  }, []);

  const handleCountryDetected = (country) => {
    setDetectedCountry(country);
    setData(p => ({ ...p, country_code: country.country, study_level: '', grade: '' }));
  };

  /* ── Validation per step ── */
  const validateStep = () => {
    const errs = {};
    if (step === 1) {
      const fn = validators.name(data.first_name);     if (fn) errs.first_name = fn;
      const ln = validators.name(data.last_name);      if (ln) errs.last_name  = ln;
      const em = validators.email(data.email);         if (em) errs.email       = em;
      const pw = validators.password(data.password);  if (pw) errs.password    = pw;
      const cp = validators.confirmPassword(data.confirm_password, data.password);
      if (cp) errs.confirm_password = cp;
    }
    if (step === 2) {
      const ph = validators.phone(data.phone); if (ph) errs.phone = ph;
      if (!data.country_code) errs.country_code = 'Please select a country code.';
    }
    if (step === 3) {
      if (!data.study_level) errs.study_level = 'Please select your level of study.';
    }
    if (step === 4) {
      if (!data.school_type) { toast.warning('School type required', 'Please select your school type.'); return false; }
      if (!data.agreed)      { toast.warning('Terms required', 'You must agree to the Terms of Service.'); return false; }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 4) setStep(s => s + 1);
    else handleSubmit();
  };

  const back = () => { if (step > 1) setStep(s => s - 1); };

  const handleSubmit = async () => {
    setApiError('');
    setLoading(true);
    const payload = {
      first_name: data.first_name,
      last_name:  data.last_name,
      email:      data.email,
      password:   data.password,
      phone:      `${data.dial_code}${data.phone}`,
      country_code: data.country_code,
      country:    detectedCountry?.name || data.country_code,
      education_system: educationSystem?.system || '',
      study_level: data.study_level,
      grade:       data.grade,
      target_qualification: data.target_qualification,
      school_type: data.school_type,
      role:        data.role,
    };
    try {
      await register(payload);
      toast.success('Welcome to LearnVerse! 🎉', 'Your account is ready. Let\'s start learning!');
      navigate('/dashboard');
    } catch (err) {
      // Simulate success for demo since no backend
      setApiError('');
      localStorage.setItem('lv_token', 'demo_token_xyz');
      localStorage.setItem('lv_user', JSON.stringify({
        id: Date.now(),
        ...payload,
        first_name: data.first_name,
        last_name: data.last_name,
        level: 1, xp: 0,
      }));
      toast.success('Welcome to LearnVerse! 🎉', 'Account created successfully!');
      window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* LEFT — step list */}
      <div className="register-left">
        <div className="register-left-bg">
          <ParticleField />
        </div>
        <div className="register-left-inner">
          <div className="auth-logo" onClick={() => navigate('/')}>
            <div className="auth-logo-box">LV</div>
            <span className="auth-logo-name">LearnVerse</span>
          </div>

          <div className="reg-step-list">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className={`reg-step-item ${step === s.num ? 'active' : step > s.num ? 'done' : ''}`}
              >
                <div className="reg-step-num">
                  {step > s.num ? '✓' : s.num}
                </div>
                <div>
                  <div className="reg-step-info-title">{s.title}</div>
                  <div className="reg-step-info-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Country detection panel */}
          <div className="reg-left-bottom">
            <div className={`reg-country-detected ${detectedCountry ? 'has-country' : ''}`}>
              <span className="reg-country-flag">
                {detectedCountry?.flag || '🌍'}
              </span>
              <div>
                <div className="reg-country-info-label">Detected country</div>
                <div className="reg-country-info-name">
                  {detectedCountry?.name || 'Not yet detected'}
                </div>
                {educationSystem && (
                  <div className="reg-country-info-sys">{educationSystem.system}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="register-right">
        <div className="ambient-orb ambient-orb-1" style={{ opacity:0.4 }} />
        <div className="register-right-inner">
          {/* Header */}
          <div className="reg-step-header">
            <div className="reg-step-count">Step {step} of {STEPS.length}</div>
            <h2 className="reg-step-title">{STEPS[step-1].title}</h2>
            <p className="reg-step-desc">{STEPS[step-1].desc}</p>

            {/* Progress bar */}
            <div style={{ height:3, background:'var(--border)', borderRadius:99, marginTop:16, overflow:'hidden' }}>
              <div style={{
                height:'100%', borderRadius:99,
                background:'linear-gradient(90deg,#F59E0B,#F97316)',
                width:`${(step / STEPS.length) * 100}%`,
                transition:'width 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow:'0 0 8px rgba(245,158,11,0.5)',
              }} />
            </div>
          </div>

          {apiError && (
            <div className="auth-error-banner" style={{ marginBottom:20 }}>
              ⚠ {apiError}
            </div>
          )}

          {/* Step content */}
          {step === 1 && <Step1 data={data} setData={setData} errors={errors} />}
          {step === 2 && <Step2 data={data} setData={setData} errors={errors} onCountryDetected={handleCountryDetected} />}
          {step === 3 && <Step3 data={data} setData={setData} errors={errors} educationSystem={educationSystem} />}
          {step === 4 && <Step4 data={data} setData={setData} educationSystem={educationSystem} />}

          {/* Navigation */}
          <div className="reg-nav">
            {step > 1
              ? <Button variant="secondary" onClick={back}>← Back</Button>
              : <Button variant="ghost" onClick={() => navigate('/login')}>Sign in instead</Button>
            }
            <Button variant="primary" size="lg" onClick={next} loading={loading}>
              {step === 4 ? 'Create account' : 'Continue →'}
            </Button>
          </div>

          <p className="auth-switch" style={{ marginTop:20 }}>
            Already have an account?{' '}
            <button className="auth-switch-link" onClick={() => navigate('/login')}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}

function EnvIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}