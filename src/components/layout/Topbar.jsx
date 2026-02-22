import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../utils/formatters.js';
import './Topbar.css';

export default function Topbar({ onMobileMenu }) {
  const { user } = useAuth();
  const name = user?.first_name ? `${user.first_name}` : 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr  = new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });

  return (
    <header className="topbar">
      {/* Mobile menu toggle */}
      <button className="topbar-icon-btn topbar-mobile-menu" onClick={onMobileMenu}>
        <MenuIcon />
      </button>

      <div className="topbar-greeting">
        <div className="topbar-greeting-sub">{dateStr}</div>
        <h1 className="topbar-greeting-title">
          {greeting}, <span>{name}</span> 👋
        </h1>
      </div>

      {/* Search */}
      <div className="topbar-search">
        <SearchIcon />
        <input type="text" placeholder="Search courses, topics, tutors…" />
        <span className="topbar-search-kbd">⌘K</span>
      </div>

      {/* Notifications */}
      <button className="topbar-icon-btn" title="Notifications">
        <BellIcon />
        <span className="topbar-notif-dot" />
      </button>

      {/* Avatar */}
      <div className="topbar-avatar" title={user?.email}>
        {initials(user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email || 'U')}
      </div>
    </header>
  );
}

function SearchIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function BellIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function MenuIcon()   { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }