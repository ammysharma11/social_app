import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="topbar">
      <nav className="layout nav" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="nav-links">
          <Link to="/">Feed</Link>
          <Link to="/create-post">New</Link>
          <Link to="/people">People</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <button onClick={logout} className="btn" style={{ marginLeft: 'auto' }}>
          Log out
        </button>
      </nav>
    </header>
  );
}
