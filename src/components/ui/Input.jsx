import React, { useState } from 'react';
import './ui.css';

/* ── Generic Input ── */
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  hint,
  required,
  iconLeft,
  iconRight,
  disabled,
  autoComplete,
  className = '',
  style = {},
}) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const inputType  = isPassword ? (showPwd ? 'text' : 'password') : type;

  const hasIconLeft  = !!iconLeft;
  const hasIconRight = !!iconRight || isPassword;

  return (
    <div className={`input-group ${className}`} style={style}>
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-wrap">
        {iconLeft && (
          <span className="input-icon input-icon-left">{iconLeft}</span>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={[
            'input-field',
            error        ? 'error'           : '',
            hasIconLeft  ? 'has-icon-left'   : '',
            hasIconRight ? 'has-icon-right'  : '',
          ].filter(Boolean).join(' ')}
        />
        {isPassword && (
          <span className="input-icon input-icon-right" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
        {!isPassword && iconRight && (
          <span className="input-icon input-icon-right">{iconRight}</span>
        )}
      </div>
      {error && <span className="input-error">⚠ {error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
}

/* ── Select ── */
export function Select({ label, name, value, onChange, options, error, required, hint, placeholder, disabled }) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input-select ${error ? 'error' : ''}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="input-error">⚠ {error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
}

/* ── Phone Input with dial code ── */
export function PhoneInput({ label, dialValue, dialOnChange, phoneValue, phoneOnChange, error, required, countryCodes }) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="phone-combo">
        <select
          value={dialValue}
          onChange={dialOnChange}
          className="phone-dial-select"
        >
          {countryCodes.map((c) => (
            <option key={`${c.code}-${c.country}`} value={`${c.code}|${c.country}`}>
              {c.flag} {c.code} {c.name}
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={phoneValue}
          onChange={phoneOnChange}
          placeholder="Phone number"
          className={`input-field phone-number-input ${error ? 'error' : ''}`}
        />
      </div>
      {error && <span className="input-error">⚠ {error}</span>}
    </div>
  );
}

/* ── Tiny SVG icons ── */
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}