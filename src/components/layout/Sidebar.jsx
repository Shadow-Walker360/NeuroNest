import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../utils/formatters.js';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/dashboard',    icon: <GridIcon />,      label: 'Dashboard' },
  { to: '/courses',      icon: <BookIcon />,       label: 'Courses' },
  { to: '/study-rooms',  icon: <UsersIcon />,      label: 'Study Rooms',  badge: 2 },
  { to: '/ai-tutor',     icon: <CpuIcon />,        label: 'AI Tutor' },
  { to: '/marketplace',  icon: <ShopIcon />,       label: 'Marketplace' },
  { to: '/analytics',    icon: <ChartIcon />,      label: 'Analytics' },
  { to: '/library',      icon: <LibraryIcon />,    label: 'Library' },
  { to: '/achievements', icon: <TrophyIcon />,     label: 'Achievements' },
];

export default function Sidebar({ mobileOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-box">LV</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">LearnVerse</span>
          <span className="sidebar-logo-version">v2.1 · Pro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span className="sidebar-item-label">{item.label}</span>
            {item.badge && (
              <span className="sidebar-item-badge">{item.badge}</span>
            )}
          </NavLink>
        ))}

        <div className="sidebar-divider" />

        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
        >
          <span className="sidebar-item-icon"><SettingsIcon /></span>
          <span className="sidebar-item-label">Settings</span>
        </NavLink>
      </nav>

      {/* User */}
      <div className="sidebar-divider" />
      <div className="sidebar-user" onClick={handleLogout} title="Click to logout">
        <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#F59E0B,#F97316)', color: '#000' }}>
          {initials(user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email || 'U')}
        </div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">
            {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email}
          </div>
          <div className="sidebar-user-level">Level {user?.level || 1} · Log out</div>
        </div>
      </div>
    </aside>
  );
}

/* ── Icons ── */
function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>; }
function BookIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>; }
function UsersIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function CpuIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>; }
function ShopIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>; }
function ChartIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>; }
function LibraryIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>; }
function TrophyIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>; }
function SettingsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>; }