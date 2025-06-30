import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/lifescape-banner.png';
import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #eafaf1 0%, #f6f8fa 100%)',
    }}>
      <div className="auth-container" style={{
        boxShadow: '0 8px 32px rgba(33,145,80, 0.10)',
        border: '1.5px solid #e0f2e9',
        padding: 36,
        minWidth: 340,
        background: '#fff',
        borderRadius: 20,
      }}>
        <img src={banner} alt="LifeScape Banner" className="app-banner" style={{ marginBottom: 12, maxWidth: 220 }} />
        <h2 style={{ marginBottom: 18, fontWeight: 700, fontSize: '1.7rem', color: '#219150', letterSpacing: 1 }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ fontSize: 16, border: '1.5px solid #e0f2e9', background: '#f7faf7' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ fontSize: 16, border: '1.5px solid #e0f2e9', background: '#f7faf7' }}
          />
          <button type="submit" disabled={status === 'loading'} style={{ fontSize: 16, marginTop: 8, background: 'linear-gradient(90deg, #219150 60%, #6ee7b7 100%)' }}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <p style={{ marginTop: 18, fontSize: 15, color: '#444' }}>
          Don't have an account? <a href="/register" style={{ color: '#219150', fontWeight: 600 }}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 