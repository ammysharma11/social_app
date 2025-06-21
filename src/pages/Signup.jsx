// src/pages/Signup.jsx
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/profile');
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="hero-night">
      <div className="arc"></div>
      <h1>
        Revolutionize <span className="accent">Connection</span>
      </h1>
      <p>Join the community and start sharing your thoughts.</p>

      <form onSubmit={handleSubmit} className="login-neon">
        <h3>Sign Up</h3>

        {error && <p style={{ color: 'salmon' }}>{error}</p>}

        <input
          className="input"
          placeholder="Email"
          type="email"
          ref={emailRef}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          ref={passwordRef}
          required
        />
        <button className="btn" disabled={loading}>
          Sign Up
        </button>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
