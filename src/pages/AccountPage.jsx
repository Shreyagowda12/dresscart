import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  RotateCcw, 
  CreditCard, 
  Settings, 
  Plus, 
  Trash2, 
  LogOut, 
  Edit3, 
  Check, 
  Moon, 
  Sun,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AccountPage() {
  const { 
    user, 
    orders, 
    returns, 
    addresses, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress,
    theme, 
    toggleTheme, 
    logout, 
    navigate,
    navParams,
    addToCart,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState(navParams.tab || 'orders'); // 'orders' | 'addresses' | 'payments' | 'settings'
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user ? user.name : 'Customer',
    type: 'Home',
    phone: user ? user.phone : '+91 98765 43210',
    addressLine1: '',
    addressLine2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    isDefault: false
  });

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine1 || !newAddr.pincode) return;
    addAddress(newAddr);
    setShowAddAddressModal(false);
    setNewAddr({ ...newAddr, addressLine1: '', addressLine2: '' });
  };

  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach(item => {
        addToCart(item, item.selectedSize, item.selectedColor, 1);
      });
      navigate('cart');
    }
  };

  if (!user) {
    return (
      <div className="app-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h3>Please Sign In</h3>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>You need to be logged in to view your profile and orders.</p>
        <button className="btn btn-primary" onClick={() => navigate('login')}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="account-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="app-container">
        {/* Profile Card Header */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img 
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'} 
              alt={user.name} 
              style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user.name}</h2>
                <span className="badge badge-gold">
                  <Sparkles size={12} /> {user.role === 'admin' ? 'Store Admin' : 'VIP Gold Tier'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {user.email} • {user.phone}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {user.role === 'admin' && (
              <button className="btn btn-outline btn-sm" onClick={() => navigate('admin')}>
                Admin Dashboard
              </button>
            )}
            <button className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }} onClick={logout}>
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Navigation Tabs & Tab Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} id="account-grid">
          {/* Account Menu */}
          <div className="card" style={{ padding: '0.75rem 0' }}>
            {[
              { id: 'orders', label: 'Order History', icon: Package, count: orders.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
              { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw, count: returns.length },
              { id: 'payments', label: 'Saved Payment Methods', icon: CreditCard },
              { id: 'settings', label: 'Account Preferences', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  className="flex-between"
                  style={{
                    padding: '0.85rem 1.25rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--primary)' : 'var(--text-body)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent'
                  }}
                  onClick={() => {
                    if (tab.id === 'returns') {
                      navigate('returns');
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} /> {tab.label}
                  </span>
                  {tab.count !== undefined && (
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {tab.count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div>
            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Orders ({orders.length})</h3>

                {orders.map(order => (
                  <div key={order.id} className="card" style={{ padding: '1.5rem' }}>
                    <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span className="badge badge-primary" style={{ marginBottom: '4px' }}>
                          {order.status}
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Order #{order.id}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Placed on {order.date} • Total: <strong>₹{order.total?.toLocaleString('en-IN')}</strong>
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleReorder(order)}
                        >
                          Reorder
                        </button>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate('order-tracking', { orderId: order.id })}
                        >
                          Track Status →
                        </button>
                      </div>
                    </div>

                    {/* Items preview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                          <img src={item.image} alt={item.name} style={{ width: '36px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Size: {item.selectedSize} • Qty: {item.quantity}
                            </div>
                          </div>
                          <strong>₹{item.price * item.quantity}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Saved Shipping Addresses</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAddAddressModal(true)}>
                    <Plus size={14} /> Add New Address
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {addresses.map(addr => (
                    <div key={addr.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                      <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <strong style={{ fontSize: '0.95rem' }}>{addr.name}</strong>
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{addr.type}</span>
                        </div>
                        {addr.isDefault && <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Default</span>}
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.4, margin: '0.5rem 0 1rem' }}>
                        {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}{addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                        <br />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Phone: {addr.phone}</span>
                      </p>

                      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                        {!addr.isDefault && (
                          <button 
                            className="btn btn-secondary btn-sm" 
                            style={{ flex: 1, fontSize: '0.75rem' }}
                            onClick={() => setDefaultAddress(addr.id)}
                          >
                            Set Default
                          </button>
                        )}
                        <button 
                          className="btn btn-ghost btn-sm" 
                          style={{ color: 'var(--danger)', padding: '0.3rem 0.5rem' }}
                          onClick={() => deleteAddress(addr.id)}
                          title="Delete address"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PAYMENT METHODS */}
            {activeTab === 'payments' && (
              <div className="card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Saved Payment Methods</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <CreditCard size={24} color="var(--primary)" />
                      <div>
                        <strong>HDFC Bank Visa Card (Ending 8821)</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expires 08/29 • Default Payment</span>
                      </div>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontWeight: 800, color: '#0284c7' }}>UPI</div>
                      <div>
                        <strong>janedoe@okaxis</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified via Google Pay</span>
                      </div>
                    </div>
                    <span className="badge badge-success">Verified</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS & PREFERENCES */}
            {activeTab === 'settings' && (
              <div className="card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Preferences & Theme</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <strong>Theme Appearance</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Currently set to {theme.toUpperCase()} mode</p>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
                      {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#f59e0b" />} Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </button>
                  </div>

                  <div className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <strong>WhatsApp Order Updates</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Receive live dispatch notifications and tracking links via WhatsApp</p>
                    </div>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                  </div>

                  <div className="flex-between">
                    <div>
                      <strong>Promotional Emails & Flash Drop Alerts</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get early access to festive collections</p>
                    </div>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="modal-backdrop" onClick={() => setShowAddAddressModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add New Shipping Address</h4>
              <button className="modal-close-btn" onClick={() => setShowAddAddressModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateAddress} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Name</label>
                <input 
                  type="text" 
                  value={newAddr.name} 
                  onChange={e => setNewAddr({ ...newAddr, name: e.target.value })} 
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Phone</label>
                <input 
                  type="text" 
                  value={newAddr.phone} 
                  onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })} 
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Address Line 1</label>
                <input 
                  type="text" 
                  value={newAddr.addressLine1} 
                  onChange={e => setNewAddr({ ...newAddr, addressLine1: e.target.value })} 
                  placeholder="Flat, Wing, Apartment"
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Street / Locality</label>
                <input 
                  type="text" 
                  value={newAddr.addressLine2} 
                  onChange={e => setNewAddr({ ...newAddr, addressLine2: e.target.value })} 
                  placeholder="Area / Landmark"
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>City</label>
                  <input 
                    type="text" 
                    value={newAddr.city} 
                    onChange={e => setNewAddr({ ...newAddr, city: e.target.value })} 
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Pincode</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    value={newAddr.pincode} 
                    onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })} 
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          #account-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
