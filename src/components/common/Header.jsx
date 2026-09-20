import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  MapPin, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  LogOut, 
  Package, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { 
    theme, 
    toggleTheme, 
    cartCount, 
    cartSubtotal,
    cart,
    wishlist, 
    user, 
    logout, 
    demoLogin, 
    navigate, 
    currentPage, 
    location, 
    updateLocation,
    products,
    notifications,
    markNotificationsAsRead
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const [inputPincode, setInputPincode] = useState(location.pincode);
  const [inputCity, setInputCity] = useState(location.city);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Filter products for search autocomplete
  const searchResults = searchInput.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
    p.category.toLowerCase().includes(searchInput.toLowerCase())
  ).slice(0, 5);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSelectSearchProduct = (prodId) => {
    setSearchInput('');
    navigate('product-details', { productId: prodId });
  };

  const handleApplyLocation = (e) => {
    e.preventDefault();
    if (inputPincode.trim().length >= 5) {
      updateLocation(inputCity, inputPincode);
      setShowLocationModal(false);
    }
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="top-bar">
        <div className="app-container flex-between" style={{ padding: '0.15rem 1rem' }}>
          <div className="flex-center" style={{ gap: '0.5rem', fontSize: '0.78rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span>FESTIVE SPECIAL: Free Express Delivery on orders over ₹999 + Extra 20% off with code <strong>FESTIVE20</strong></span>
          </div>
          <div className="flex-center" style={{ gap: '1.25rem', fontSize: '0.78rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('order-tracking')}>Track Order</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('returns')}>Easy Returns</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('admin')}>
              <strong style={{ color: '#fb7185' }}>Admin Portal</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="app-container header-inner">
          {/* Logo */}
          <div className="brand-logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
            <div className="logo-mark">
              <Sparkles size={20} />
            </div>
            <span>Dress<span className="accent">Cart</span></span>
          </div>

          {/* Deliver To Selector */}
          <button 
            className="location-btn"
            onClick={() => setShowLocationModal(true)}
            title="Change Delivery Location"
          >
            <MapPin size={16} color="var(--primary)" />
            <div>
              <span className="loc-label">Deliver to</span>
              <span className="loc-city">{location.city} {location.pincode}</span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {/* Search Bar with Instant Autocomplete */}
          <div className="header-search" ref={searchRef}>
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for dresses, sarees, kurtas, suits & designers..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
              {searchInput && (
                <X 
                  size={16} 
                  className="search-clear" 
                  onClick={() => setSearchInput('')}
                />
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="search-dropdown">
                <div style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Matching Styles ({searchResults.length})
                </div>
                {searchResults.map(item => (
                  <div 
                    key={item.id} 
                    className="search-item"
                    onClick={() => handleSelectSearchProduct(item.id)}
                  >
                    <img src={item.images[0]} alt={item.name} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.brand} • <strong style={{ color: 'var(--text-main)' }}>₹{item.price}</strong>
                      </div>
                    </div>
                  </div>
                ))}
                <div 
                  style={{ padding: '0.6rem 1rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => {
                    navigate('products', { search: searchInput });
                    setSearchInput('');
                  }}
                >
                  View all results for "{searchInput}" →
                </div>
              </div>
            )}
          </div>

          {/* Header Action Icons */}
          <div className="header-actions">
            {/* Theme Toggle */}
            <button 
              className="btn-icon" 
              onClick={toggleTheme} 
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#f59e0b" />}
            </button>

            {/* Notification Drawer Toggle */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button 
                className="btn-icon" 
                onClick={() => {
                  setShowNotifDrawer(!showNotifDrawer);
                  markNotificationsAsRead();
                }}
                title="Notifications"
              >
                <Bell size={18} />
                {unreadNotifs > 0 && <span className="badge-count">{unreadNotifs}</span>}
              </button>

              {showNotifDrawer && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '320px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-main)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 210,
                  padding: '1rem'
                }}>
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Notifications</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setShowNotifDrawer(false)}>Close</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', fontSize: '0.825rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.title}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>{n.desc}</div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button 
              className="header-action-btn"
              onClick={() => navigate('wishlist')}
              title="View Wishlist"
            >
              <Heart size={20} color={wishlist.length > 0 ? 'var(--primary)' : 'currentColor'} fill={wishlist.length > 0 ? 'var(--primary)' : 'none'} />
              <span>Wishlist</span>
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </button>

            {/* Cart with Hover Preview */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <button 
                className="header-action-btn"
                onClick={() => navigate('cart')}
                title="View Shopping Bag"
              >
                <ShoppingBag size={20} />
                <span>Bag</span>
                {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
              </button>

              {/* Mini Cart Hover Drawer */}
              {showCartPreview && cart.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '300px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-main)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 220,
                  padding: '1rem'
                }}>
                  <div className="flex-between" style={{ marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>My Bag ({cartCount})</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>₹{cartSubtotal}</span>
                  </div>
                  <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cart.slice(0, 3).map(item => (
                      <div key={item.cartItemId} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: '36px', height: '42px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Qty: {item.quantity} • ₹{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', fontSize: '0.825rem' }}
                    onClick={() => {
                      setShowCartPreview(false);
                      navigate('cart');
                    }}
                  >
                    View Bag & Checkout
                  </button>
                </div>
              )}
            </div>

            {/* User Account / Profile Menu */}
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <button 
                className="header-action-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {user && user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '240px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-main)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 220,
                  padding: '0.75rem 0'
                }}>
                  {user ? (
                    <>
                      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                        <span className={`badge ${user.role === 'admin' ? 'badge-sale' : 'badge-primary'}`} style={{ marginTop: '4px' }}>
                          {user.role === 'admin' ? 'Store Admin' : 'Premium Member'}
                        </span>
                      </div>
                      <div 
                        style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}
                        onClick={() => { setShowUserMenu(false); navigate('account'); }}
                      >
                        <User size={16} /> My Profile & Addresses
                      </div>
                      <div 
                        style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}
                        onClick={() => { setShowUserMenu(false); navigate('account', { tab: 'orders' }); }}
                      >
                        <Package size={16} /> Order History
                      </div>
                      <div 
                        style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}
                        onClick={() => { setShowUserMenu(false); navigate('returns'); }}
                      >
                        <RotateCcw size={16} /> Returns & Refunds
                      </div>
                      {user.role === 'admin' && (
                        <div 
                          style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}
                          onClick={() => { setShowUserMenu(false); navigate('admin'); }}
                        >
                          <Layers size={16} /> Store Admin Dashboard
                        </div>
                      )}
                      <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.5rem 0' }}></div>
                      <div 
                        style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--danger)' }}
                        onClick={() => { setShowUserMenu(false); logout(); }}
                      >
                        <LogOut size={16} /> Logout
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: '0.75rem 1rem' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Welcome to DressCart! Sign in to access your wishlist & orders.</p>
                      <button 
                        className="btn btn-primary" 
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', fontSize: '0.85rem' }}
                        onClick={() => { setShowUserMenu(false); navigate('login'); }}
                      >
                        Sign In / Register
                      </button>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ flex: 1, fontSize: '0.7rem' }}
                          onClick={() => { setShowUserMenu(false); demoLogin('customer'); }}
                        >
                          Demo User
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ flex: 1, fontSize: '0.7rem' }}
                          onClick={() => { setShowUserMenu(false); demoLogin('admin'); }}
                        >
                          Demo Admin
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Location Selector Modal */}
      {showLocationModal && (
        <div className="modal-backdrop" onClick={() => setShowLocationModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div className="flex-center" style={{ gap: '0.5rem' }}>
                <MapPin size={20} color="var(--primary)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Choose Delivery Location</h4>
              </div>
              <button className="modal-close-btn" onClick={() => setShowLocationModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleApplyLocation} className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Enter your delivery pincode to check product availability and delivery timelines.
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>City</label>
                <input 
                  type="text" 
                  value={inputCity} 
                  onChange={e => setInputCity(e.target.value)} 
                  placeholder="e.g. Mumbai, Bengaluru, Delhi"
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>6-Digit Pincode</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={inputPincode} 
                  onChange={e => setInputPincode(e.target.value)} 
                  placeholder="e.g. 560034"
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>POPULAR CITIES</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {[
                    { city: 'Bengaluru', pin: '560034' },
                    { city: 'Mumbai', pin: '400001' },
                    { city: 'New Delhi', pin: '110001' },
                    { city: 'Hyderabad', pin: '500001' },
                    { city: 'Chennai', pin: '600001' }
                  ].map(c => (
                    <span 
                      key={c.city} 
                      className="badge badge-primary" 
                      style={{ cursor: 'pointer', padding: '0.3rem 0.6rem' }}
                      onClick={() => {
                        setInputCity(c.city);
                        setInputPincode(c.pin);
                      }}
                    >
                      {c.city}
                    </span>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Set Location
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
