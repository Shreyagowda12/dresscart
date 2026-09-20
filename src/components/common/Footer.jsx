import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard,
  Send,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { navigate, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      showToast('Thank you for subscribing! Check your inbox for 15% discount code 🎉', 'success');
      setEmailInput('');
    } else {
      showToast('Please enter a valid email address', 'error');
    }
  };

  return (
    <footer className="footer">
      {/* Top Value Propositions */}
      <div style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
        <div className="app-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Truck size={24} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Free Express Delivery</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>On all orders above ₹999</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <RotateCcw size={24} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>7-Day Easy Returns</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Doorstep pickup & instant refunds</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>100% Authentic Quality</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Handpicked designer collections</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <CreditCard size={24} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Secure Payments</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UPI, Cards, NetBanking & COD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="footer-top">
        <div className="app-container">
          <div className="footer-grid">
            {/* Col 1: About & Contact */}
            <div className="footer-column">
              <div className="brand-logo" style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => navigate('home')}>
                <div className="logo-mark" style={{ width: '32px', height: '32px' }}>
                  <Sparkles size={16} />
                </div>
                <span>Dress<span className="accent">Cart</span></span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                DressCart is India's premier fashion destination bringing runway silhouettes, handcrafted ethnic weaves, and contemporary western wear straight to your wardrobe.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={15} color="var(--primary)" />
                  <span>+91 (800) 425-3737 (Toll Free)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={15} color="var(--primary)" />
                  <span>care@dresscart.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={15} color="var(--primary)" />
                  <span>Fashion Boulevard, Indiranagar, Bengaluru</span>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home Showcase</a></li>
                <li><a href="#products" onClick={(e) => { e.preventDefault(); navigate('products'); }}>All Catalog Styles</a></li>
                <li><a href="#sale" onClick={(e) => { e.preventDefault(); navigate('products', { category: 'sale' }); }}>Flash Deals & Offers</a></li>
                <li><a href="#track" onClick={(e) => { e.preventDefault(); navigate('order-tracking'); }}>Track My Delivery</a></li>
                <li><a href="#returns" onClick={(e) => { e.preventDefault(); navigate('returns'); }}>Returns & Exchange Portal</a></li>
                <li><a href="#account" onClick={(e) => { e.preventDefault(); navigate('account'); }}>Customer Account</a></li>
              </ul>
            </div>

            {/* Col 3: Customer Care & Policies */}
            <div className="footer-column">
              <h4>Customer Care</h4>
              <ul className="footer-links">
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); showToast('FAQ: Orders are dispatched within 24 business hours!', 'info'); }}>Shipping & Delivery FAQs</a></li>
                <li><a href="#returns-policy" onClick={(e) => { e.preventDefault(); navigate('returns'); }}>7-Day Returns Policy</a></li>
                <li><a href="#size-guide" onClick={(e) => { e.preventDefault(); navigate('products'); }}>Size Chart & Fit Guide</a></li>
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('DressCart complies with 256-bit ISO security standards.', 'info'); }}>Privacy & Cookie Policy</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service updated for 2026.', 'info'); }}>Terms & Conditions</a></li>
                <li><a href="#admin" onClick={(e) => { e.preventDefault(); navigate('admin'); }} style={{ color: 'var(--primary)', fontWeight: 600 }}>Store Admin Portal</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter Signup */}
            <div className="footer-column">
              <h4>Insider VIP Club</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Be the first to hear about secret flash drops, runway previews, and exclusive VIP discount codes.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  aria-label="Email for newsletter"
                  required
                />
                <button type="submit" className="btn btn-primary" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </form>
              <span style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                🔒 Zero spam. Unsubscribe anytime with 1 click.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="footer-bottom">
        <div className="app-container flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            © {new Date().getFullYear()} DressCart Retail Pvt Ltd. Handcrafted with <Heart size={12} color="var(--primary)" fill="var(--primary)" style={{ display: 'inline', verticalAlign: 'middle' }} /> for fashion enthusiasts.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Accepted Payments:</span>
            {['UPI / QR', 'Visa', 'Mastercard', 'RuPay', 'NetBanking', 'COD'].map(badge => (
              <span 
                key={badge}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-main)',
                  color: 'var(--text-body)'
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
