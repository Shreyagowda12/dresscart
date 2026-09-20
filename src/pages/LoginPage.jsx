import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login, demoLogin, navigate, showToast } = useApp();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }
    login(email, password);
  };

  return (
    <div className="login-page" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="app-container" style={{ maxWidth: '480px' }}>
        {/* Brand Monogram */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="brand-logo" style={{ justifyContent: 'center', fontSize: '1.75rem', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('home')}>
            <div className="logo-mark" style={{ width: '40px', height: '40px' }}>
              <Sparkles size={20} />
            </div>
            <span>Dress<span className="accent">Cart</span></span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isSignUp ? 'Create your bespoke fashion account' : 'Welcome back to your curated closet'}
          </p>
        </div>

        {/* Card Form */}
        <div className="card" style={{ padding: '2rem' }}>
          {/* Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '1.75rem'
          }}>
            <button
              className={`btn btn-sm ${!isSignUp ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--radius-sm)' }}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button
              className={`btn btn-sm ${isSignUp ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--radius-sm)' }}
              onClick={() => setIsSignUp(true)}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Login Box */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px dashed var(--border-main)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              ⚡ INSTANT ONE-CLICK TEST ACCOUNTS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.65rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => demoLogin('customer')}
                title="Log in as Jane Doe with existing order history"
              >
                👤 Customer Demo
              </button>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                style={{ borderColor: '#f43f5e', color: '#f43f5e' }}
                onClick={() => demoLogin('admin')}
                title="Log in as Store Admin to access Admin Dashboard"
              >
                🛠️ Admin Demo
              </button>
            </div>
          </div>

          {/* Main Credentials Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isSignUp && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                />
              </div>
            )}

            <div>
              <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Password</label>
                {!isSignUp && (
                  <span 
                    style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }}
                    onClick={() => showToast('Password reset link sent to registered email', 'info')}
                  >
                    Forgot Password?
                  </span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 2.5rem 0.65rem 0.85rem' }}
                  required
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem' }}>
              {isSignUp ? 'Create My Account' : 'Sign In to DressCart'} <ArrowRight size={18} />
            </button>
          </form>

          {/* Social Sign In Simulation */}
          <div style={{ textAlign: 'center', margin: '1.5rem 0 1rem', position: 'relative' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '0 0.5rem', position: 'relative', zIndex: 2 }}>
              OR CONTINUE WITH
            </span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-main)', zIndex: 1 }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button 
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => demoLogin('customer')}
            >
              Google
            </button>
            <button 
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => demoLogin('customer')}
            >
              Apple ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
