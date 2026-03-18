import React from 'react';
import { PhoneInput } from '../../../components/ui/Input.jsx';
import { COUNTRY_CODES } from '../../../utils/countryData.js';

/**
 * Step 2 — Phone Number & Country
 *
 * Key behaviour:
 *   - User picks a country dial code FIRST (flag + code + country name)
 *   - Country is auto-detected from the dial code selection
 *   - Detection triggers education system auto-fill in Step 3
 *
 * Props:
 *   data               object   — form state
 *   setData            fn       — state setter
 *   errors             object   — validation errors
 *   onCountryDetected  fn(country) — called when country changes
 */
export default function Step2Phone({ data, setData, errors, onCountryDetected }) {

  const handleDialChange = (e) => {
    const val = e.target.value;                    // "+254|KE"
    const [code, countryCode] = val.split('|');
    setData((prev) => ({ ...prev, dial: val, dial_code: code, country_code: countryCode }));
    const found = COUNTRY_CODES.find(
      (c) => c.code === code && c.country === countryCode
    );
    if (found) onCountryDetected(found);
  };

  const handlePhoneChange = (e) => {
    setData((prev) => ({ ...prev, phone: e.target.value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Phone combo — country code selector FIRST, then number */}
      <PhoneInput
        label="Phone number"
        required
        dialValue={data.dial || '+254|KE'}
        dialOnChange={handleDialChange}
        phoneValue={data.phone}
        phoneOnChange={handlePhoneChange}
        error={errors.phone}
        countryCodes={COUNTRY_CODES}
      />

      {/* Auto-detected country badge */}
      {data.country_code && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'rgba(16,185,129,0.07)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 'var(--r-lg)', padding: '14px 16px',
          animation: 'fadeUp 0.3s ease',
        }}>
          <span style={{ fontSize: 26 }}>
            {COUNTRY_CODES.find(c => c.country === data.country_code)?.flag || '🌍'}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--text-c)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
              Detected country
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {COUNTRY_CODES.find(c => c.country === data.country_code)?.name || data.country_code}
            </div>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: 9 }}>✓ Auto-detected</span>
        </div>
      )}

      {/* Explainer */}
      <div style={{
        background: 'var(--surface-b)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: '14px 16px',
        fontSize: 12, color: 'var(--text-b)', lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--text)' }}>💡 Why we need your country:</strong>{' '}
        Different countries use different education systems — Kenya uses CBC &amp; 8-4-4,
        the UK uses Key Stages &amp; A-Levels, Nigeria uses 6-3-3-4, and so on.
        We use your country to auto-fill your curriculum in the next step so you don't
        have to configure anything manually.
      </div>
    </div>
  );
}