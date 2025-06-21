// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [pw,    setPw]    = useState('');
  const [err,   setErr]   = useState('');
  const [busy,  setBusy]  = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await login(email, pw);
      nav('/');
    } catch {
      setErr('Invalid credentials'); 
    } finally { setBusy(false); }
  };

  return (
    <div className="hero-night">
      <div className="arc"></div>

      <h1>
        Revolutionize <span className="accent">Connection</span>
      </h1>
      <p>Sign in to start sharing your thoughts with the community.</p>

      <form className="login-neon" onSubmit={handleSubmit}>
        <h3>Log&nbsp;In</h3>

        {err && <p style={{ color:'#ff6b6b', marginBottom:12 }}>{err}</p>}

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e=>setPw(e.target.value)}
          required
        />

        <button className="btn" style={{ width:'100%' }} disabled={busy}>
          {busy ? <Loader /> : 'Log In'}
        </button>

        <p style={{ marginTop:18,fontSize:14 }}>
          New here? <Link to="/signup" style={{ color: 'var(--clr-accent)' }}>Create an account</Link>
        </p>
      </form>
    </div>
  );
}
