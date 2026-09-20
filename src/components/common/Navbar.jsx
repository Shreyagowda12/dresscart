import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Flame, 
  ShoppingBag, 
  Heart, 
  User, 
  Package, 
  RotateCcw, 
  Layers, 
  MapPin, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_CATEGORIES } from '../../data/mockData';

export default function Navbar() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    navigate, 
    currentPage, 
    user, 
    logout, 
    demoLogin, 
    cartCount, 
    wishlist 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigate('products', { category: catId });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="app-container flex-between" style={{ height: 'var(--nav-height)' }}>
          {/* Mobile Hamburger Button */}
          <button 
            className="btn-ghost" 
            style={{ display: 'none', padding: '0.4rem' }}
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Categories */}
          <ul className="nav-links">
            {MOCK_CATEGORIES.map((cat) => {
              const isActive = currentPage === 'products' && selectedCategory === cat.id;
              return (
                <li
                  key={cat.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.id === 'sale' ? (
                    <span className="nav-deal-tag">
                      <Flame size={12} fill="white" /> {cat.name}
                    </span>
                  ) : (
                    cat.name
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Right Highlights */}
          <div className="flex-center" style={{ gap: '1rem', display: 'none' }} id="nav-quick-perks">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              🚚 Express 24H Dispatch
            </span>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn {
            display: inline-flex !important;
          }
          .nav-links {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          #nav-quick-perks {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="modal-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '82%',
              maxWidth: '320px',
              background: 'var(--bg-surface)',
              zIndex: 1050,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
              animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex-between" style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="brand-logo" style={{ fontSize: '1.25rem' }}>
                <div className="logo-mark" style={{ width: '32px', height: '32px' }}>
                  <Sparkles size={16} />
                </div>
                <span>Dress<span className="accent">Cart</span></span>
              </div>
              <button className="modal-close-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* User Quick Info */}
            <div style={{ padding: '1rem 1.25rem', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Welcome to DressCart</p>
                  <button 
                    className="btn btn-primary btn-sm" 
                    style={{ width: '100%' }}
                    onClick={() => { setMobileMenuOpen(false); navigate('login'); }}
                  >
                    Sign In or Create Account
                  </button>
                </div>
              )}
            </div>

            {/* Categories List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
              <div style={{ padding: '0 1.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Shop by Category
              </div>
              {MOCK_CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  className="flex-between"
                  style={{
                    padding: '0.75rem 1.25rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--text-main)',
                    borderLeft: selectedCategory === cat.id ? '3px solid var(--primary)' : '3px solid transparent'
                  }}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <span>{cat.name}</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              ))}

              <div style={{ margin: '1rem 0', borderTop: '1px solid var(--border-subtle)' }}></div>

              <div style={{ padding: '0 1.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Quick Links
              </div>
              <div 
                className="flex-between" 
                style={{ padding: '0.65rem 1.25rem', cursor: 'pointer', fontSize: '0.875rem' }}
                onClick={() => { setMobileMenuOpen(false); navigate('order-tracking'); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={16} /> Track Orders
                </span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
              <div 
                className="flex-between" 
                style={{ padding: '0.65rem 1.25rem', cursor: 'pointer', fontSize: '0.875rem' }}
                onClick={() => { setMobileMenuOpen(false); navigate('returns'); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RotateCcw size={16} /> Return Requests
                </span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
              <div 
                className="flex-between" 
                style={{ padding: '0.65rem 1.25rem', cursor: 'pointer', fontSize: '0.875rem' }}
                onClick={() => { setMobileMenuOpen(false); navigate('account'); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={16} /> My Account
                </span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
              <div 
                className="flex-between" 
                style={{ padding: '0.65rem 1.25rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--primary)' }}
                onClick={() => { setMobileMenuOpen(false); navigate('admin'); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={16} /> Store Admin Dashboard
                </span>
                <ChevronRight size={16} color="var(--primary)" />
              </div>
            </div>

            {/* Drawer Footer */}
            {user && (
              <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  style={{ width: '100%', color: 'var(--danger)' }}
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
