import React, { useEffect } from 'react';
import { 
  CheckCircle, 
  Package, 
  MapPin, 
  CreditCard, 
  Download, 
  ArrowRight, 
  Sparkles,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function OrderConfirmationPage() {
  const { orders, navParams, navigate, showToast } = useApp();

  const orderId = navParams.orderId || (orders[0] ? orders[0].id : 'DC-992140');
  const order = orders.find(o => o.id === orderId) || orders[0];

  useEffect(() => {
    // Fire confetti cannon for delightful order celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      /* fallback if canvas-confetti is not loaded */
    }
  }, []);

  const handleDownloadInvoice = () => {
    showToast(`Simulated Tax Invoice for #${orderId} generated and downloaded!`, 'success');
  };

  if (!order) {
    return (
      <div className="app-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h3>Order not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('home')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page" style={{ padding: '3rem 0 6rem' }}>
      <div className="app-container" style={{ maxWidth: '780px' }}>
        {/* Celebration Header */}
        <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', marginBottom: '2rem', background: 'var(--bg-card)' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <CheckCircle size={44} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Payment Successful</span>
          <h1 className="font-serif" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Thank You for Your Order!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Your wardrobe upgrade is locked in. We have sent an email confirmation with full receipt details to your registered address.
          </p>

          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-main)',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 1.5rem',
            gap: '1.5rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Order Number</span>
              <strong style={{ color: 'var(--primary)' }}>#{order.id}</strong>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-main)' }}></div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Estimated Arrival</span>
              <strong style={{ color: 'var(--text-main)' }}>{order.estimatedDelivery}</strong>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} color="var(--primary)" /> Itemized Order Details
            </h3>
            <button className="btn btn-outline btn-sm" onClick={handleDownloadInvoice}>
              <Download size={15} /> Download Invoice
            </button>
          </div>

          {/* Ordered Products List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            {order.items && order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Logistics & Delivery Snapshot */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <MapPin size={14} /> SHIPPING ADDRESS
              </div>
              {order.address && (
                <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                  <strong>{order.address.name}</strong> ({order.address.type})<br />
                  {order.address.addressLine1}, {order.address.city}, {order.address.state} - {order.address.pincode}<br />
                  Phone: {order.address.phone}
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <CreditCard size={14} /> PAYMENT & CARRIER
              </div>
              <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                <strong>Method:</strong> {order.paymentMethod}<br />
                <strong>Carrier:</strong> {order.carrier || 'Express Prime'}<br />
                <strong>Tracking:</strong> {order.trackingNumber || 'Pending Generation'}
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div className="flex-between">
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Discount Savings</span>
                <span style={{ color: 'var(--success)' }}>- ₹{order.discount?.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex-between">
              <span style={{ color: 'var(--text-muted)' }}>Delivery Charge</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div style={{ borderTop: '2px dashed var(--border-main)', margin: '0.4rem 0' }}></div>
            <div className="flex-between" style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--primary)' }}>₹{order.total?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('order-tracking', { orderId: order.id })}
          >
            Track Live Delivery Progress <ArrowRight size={18} />
          </button>
          <button 
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('home')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
