import React from 'react';
import Input from '../../../components/ui/Input.jsx';

/**
 * Step 1 — Personal Details
 * Fields: first_name, last_name, email, password, confirm_password
 *
 * Props:
 *   data    object   — form state
 *   setData fn       — state setter
 *   errors  object   — validation errors keyed by field name
 */
export default function Step1Personal({ data, setData, errors }) {
  const set = (field) => (e) =>
    setData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Input
          label="First name"
          name="first_name"
          value={data.first_name}
          onChange={set('first_name')}
          placeholder="Alex"
          error={errors.first_name}
          required
          autoComplete="given-name"
        />
        <Input
          label="Last name"
          name="last_name"
          value={data.last_name}
          onChange={set('last_name')}
          placeholder="Kimani"
          error={errors.last_name}
          required
          autoComplete="family-name"
        />
      </div>

      <Input
        label="Email address"
        name="email"
        type="email"
        value={data.email}
        onChange={set('email')}
        placeholder="you@example.com"
        error={errors.email}
        required
        autoComplete="email"
        iconLeft={<EnvIcon />}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={set('password')}
        placeholder="Min. 8 chars, 1 uppercase, 1 number"
        error={errors.password}
        required
        autoComplete="new-password"
        hint="At least 8 characters with one number and one uppercase letter."
      />

      <Input
        label="Confirm password"
        name="confirm_password"
        type="password"
        value={data.confirm_password}
        onChange={set('confirm_password')}
        placeholder="Repeat your password"
        error={errors.confirm_password}
        required
        autoComplete="new-password"
      />

      {/* Password strength meter */}
      {data.password && (
        <PasswordStrength password={data.password} />
      )}
    </div>
  );
}

/* ── Password Strength ── */
function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters',    pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number',           pass: /[0-9]/.test(password) },
    { label: 'Special char',     pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['var(--rose)', 'var(--orange)', 'var(--amber)', 'var(--emerald)'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div style={{ padding: '12px 14px', background: 'var(--surface-b)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: 'var(--text-b)' }}>Password strength</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: colors[score - 1] || 'var(--text-c)' }}>
          {score > 0 ? labels[score - 1] : 'Too weak'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 99,
            background: s <= score ? (colors[score - 1] || 'var(--border)') : 'var(--border)',
            transition: 'background 0.3s',
          }}/>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {checks.map((c) => (
          <span key={c.label} style={{ fontSize: 10, color: c.pass ? 'var(--emerald)' : 'var(--text-c)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {c.pass ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function EnvIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}