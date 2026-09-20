import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Search, 
  AlertCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderTrackingPage() {
  const { orders, navParams, navigate, cancelOrder, showToast } = useApp();

  const [searchId, setSearchId] = useState(navParams.orderId || '');
  const [activeOrderId, setActiveOrderId] = useState(
    navParams.orderId || (orders[0] ? orders[0].id : '')
  );

  const currentOrder = orders.find(o => o.id.toLowerCase() === activeOrderId.toLowerCase()) || orders[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setActiveOrderId(found.id);
      showToast(`Found details for order #${found.id}`, 'success');
    } else {
      showToast(`Order ID "${searchId}" not found in your records`, 'error');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(currentOrder.id);
    }
  };

  return (
    <div className="order-tracking-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="app-container" style={{ maxWidth: '840px' }}>
        {/* Header & Order Lookup */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Live Order Tracking
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Follow your parcel from our tailoring atelier right to your doorstep in real time
          </p>

          {/* Search Order Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', maxWidth: '480px' }}>
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. DC-892401)"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              style={{ flex: 1, padding: '0.65rem 0.85rem' }}
            />
            <button type="submit" className="btn btn-primary">
              <Search size={16} /> Track
            </button>
          </form>
        </div>

        {/* Orders Quick Switch Tabs */}
        {orders.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            {orders.map(o => (
              <button
                key={o.id}
                className={`btn btn-sm ${activeOrderId === o.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                onClick={() => {
                  setActiveOrderId(o.id);
                  setSearchId(o.id);
                }}
              >
                #{o.id} ({o.status})
              </button>
            ))}
          </div>
        )}

        {!currentOrder ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <AlertCircle size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3>No orders found</h3>
            <p style={{ color: 'var(--text-muted)' }}>You have not placed any orders yet.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('products')}>
              Shop Now
            </button>
          </div>
        ) : (
          <div>
            {/* Tracking Status Card */}
            <div className="card" style={{ padding: '2rem', marginBottom: '1.75rem' }}>
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '4px' }}>
                    {currentOrder.status}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Order #{currentOrder.id}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Placed on {currentOrder.date}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Expected Delivery</span>
                  <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>
                    {currentOrder.estimatedDelivery}
                  </strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Carrier: {currentOrder.carrier} ({currentOrder.trackingNumber})
                  </div>
                </div>
              </div>

              {/* Step-by-Step Interactive Timeline */}
              <div style={{ margin: '2.5rem 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                  {/* Vertical Progress Bar */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    bottom: '16px',
                    left: '19px',
                    width: '3px',
                    background: 'var(--border-main)',
                    zIndex: 1
                  }}></div>

                  {currentOrder.timeline ? currentOrder.timeline.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative', zIndex: 2 }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: item.done ? 'var(--primary)' : 'var(--bg-surface)',
                        border: item.done ? '2px solid var(--primary)' : '2px solid var(--border-main)',
                        color: item.done ? 'white' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: item.done ? '0 0 12px var(--primary-glow)' : 'none'
                      }}>
                        {item.done ? <CheckCircle2 size={20} /> : <Clock size={18} />}
                      </div>

                      <div style={{ flex: 1, paddingTop: '0.2rem' }}>
                        <div className="flex-between">
                          <h4 style={{ fontSize: '0.975rem', fontWeight: item.done ? 700 : 500, color: item.done ? 'var(--text-main)' : 'var(--text-muted)' }}>
                            {item.step}
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: item.done ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                            {item.time}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.done ? 'Completed successfully and verified.' : 'Scheduled in logistics pipeline.'}
                        </p>
                      </div>
                    </div>
                  )) : (
                    <p>Timeline data unavailable</p>
                  )}
                </div>
              </div>

              {/* Items in this Order */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Items in this Parcel</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentOrder.items && currentOrder.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1, minWidth: 0, fontSize: '0.85rem' }}>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                        </div>
                      </div>
                      <strong style={{ fontSize: '0.9rem' }}>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions Footer */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '1.5rem', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                {currentOrder.status === 'Delivered' ? (
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('returns', { orderId: currentOrder.id })}
                  >
                    <RotateCcw size={16} /> Request Return or Exchange
                  </button>
                ) : currentOrder.status !== 'Cancelled' ? (
                  <button 
                    className="btn btn-outline"
                    style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
                    onClick={handleCancel}
                  >
                    <XCircle size={16} /> Cancel Order
                  </button>
                ) : (
                  <span className="badge badge-sale">This order was cancelled</span>
                )}

                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('account', { tab: 'orders' })}
                >
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
