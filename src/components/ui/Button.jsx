import React from 'react';
import './ui.css';

export default function Button({
  children,
  variant = 'primary',  // primary | secondary | ghost | danger
  size = 'md',          // sm | md | lg | xl
  loading = false,
  disabled = false,
  fullWidth = false,
  iconOnly = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
}) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    fullWidth ? 'btn-full' : '',
    iconOnly ? 'btn-icon' : '',
    loading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? (
        <>
          <div className="btn-spinner" />
          {children}
        </>
      ) : children}
    </button>
  );
}