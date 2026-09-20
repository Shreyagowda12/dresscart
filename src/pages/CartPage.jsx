import React, { useState } from 'react';
import { 
  Trash2, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COUPONS } from '../data/mockData';

export default function CartPage() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartOriginalTotal, 
    cartDiscount,
    cartCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponSavings,
    deliveryFee,
    estimatedTax,
    cartGrandTotal,
    isFreeDeliveryEligible,
    toggleWishlist,
    navigate 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const res = applyCoupon(couponInput);
      if (res.success) setCouponInput('');
    }
  };

  const handleMoveToWishlist = (item) => {
    toggleWishlist(item.id);
    removeFromCart(item.cartItemId);
  };

  // Free shipping threshold logic (Threshold: ₹999)
  const freeShippingThreshold = 999;
  const amountNeededForFreeShip = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShipProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="cart-page" style={{ padding: '4rem 0 6rem' }}>
        <div className="app-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '3.5rem 2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}>
              <ShoppingBag size={40} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Your Shopping Bag is Empty
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Looks like you haven't added anything to your cart yet. Explore our designer gowns, handcrafted sarees, and sharp tailored shirts!
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('products')}
            >
              Explore Collection Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="app-container">
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          Shopping Bag ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
        </h1>

        {/* Free Shipping Progress Alert */}
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '2rem', background: isFreeDeliveryEligible ? 'var(--success-light)' : 'var(--bg-subtle)' }}>
          <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isFreeDeliveryEligible ? '#065f46' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={16} color={isFreeDeliveryEligible ? '#059669' : 'var(--primary)'} />
              {isFreeDeliveryEligible 
                ? '🎉 Congratulations! You have unlocked FREE Express Delivery!' 
                : `Add ₹${amountNeededForFreeShip} more to qualify for FREE Express Delivery!`}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isFreeDeliveryEligible ? '#065f46' : 'var(--text-muted)' }}>
              {isFreeDeliveryEligible ? '100%' : `${freeShipProgress}%`}
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--border-main)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${freeShipProgress}%`, height: '100%', background: isFreeDeliveryEligible ? '#10b981' : 'var(--primary)', transition: 'width 0.4s ease' }}></div>
          </div>
        </div>

        {/* Two-Column Grid: Items List & Order Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'start'
        }} id="cart-grid">
          {/* Left Column: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {cart.map(item => (
              <div key={item.cartItemId} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1.25rem' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '96px', height: '124px', objectFit: 'cover', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  onClick={() => navigate('product-details', { productId: item.id })}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="flex-between">
                    <div>
                      <span className="product-brand" style={{ fontSize: '0.75rem' }}>{item.brand}</span>
                      <h4 
                        style={{ fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
                        onClick={() => navigate('product-details', { productId: item.id })}
                      >
                        {item.name}
                      </h4>
                    </div>
                    <button 
                      className="btn-icon" 
                      style={{ border: 'none', color: 'var(--text-muted)' }}
                      onClick={() => removeFromCart(item.cartItemId)}
                      title="Remove from bag"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Size & Color Tags */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Size: <strong style={{ color: 'var(--text-main)' }}>{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>Color: <strong style={{ color: 'var(--text-main)' }}>{item.selectedColor}</strong></span>
                  </div>

                  {/* Price & Quantity Adjuster */}
                  <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button 
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                        onClick={() => handleMoveToWishlist(item)}
                      >
                        <Heart size={14} /> Move to Wishlist
                      </button>

                      {/* Quantity Buttons */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                        <button 
                          className="btn-icon" 
                          style={{ border: 'none', width: '28px', height: '28px' }}
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ width: '28px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                          {item.quantity}
                        </span>
                        <button 
                          className="btn-icon" 
                          style={{ border: 'none', width: '28px', height: '28px' }}
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Coupons & Order Summary */}
          <div>
            {/* Coupon Code Card */}
            <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Tag size={16} color="var(--primary)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Coupons & Offers</h4>
              </div>

              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--success-light)',
                  border: '1px dashed #059669',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem'
                }}>
                  <div>
                    <span style={{ fontWeight: 800, color: '#065f46', fontSize: '0.9rem' }}>
                      {appliedCoupon.code} APPLIED
                    </span>
                    <p style={{ fontSize: '0.75rem', color: '#047857' }}>
                      {appliedCoupon.description} (You saved ₹{couponSavings})
                    </p>
                  </div>
                  <button 
                    className="btn btn-ghost btn-sm" 
                    style={{ color: 'var(--danger)', fontWeight: 600, padding: 0 }}
                    onClick={removeCoupon}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    style={{ flex: 1, padding: '0.5rem 0.75rem', textTransform: 'uppercase' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Apply
                  </button>
                </form>
              )}

              {/* Clickable Quick Coupons */}
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABLE PROMOS:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                  {MOCK_COUPONS.map(c => (
                    <span 
                      key={c.code}
                      className="badge badge-primary"
                      style={{ cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                      onClick={() => applyCoupon(c.code)}
                      title={c.description}
                    >
                      {c.code}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Breakdown Summary */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                Order Summary
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Bag MRP Total</span>
                  <span>₹{cartOriginalTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Catalog Discount</span>
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex-between">
                    <span style={{ color: 'var(--text-muted)' }}>Promo Coupon ({appliedCoupon.code})</span>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>- ₹{couponSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Estimated GST (5%)</span>
                  <span>₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Shipping Fee</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>

                <div style={{ borderTop: '2px dashed var(--border-main)', margin: '0.5rem 0' }}></div>

                <div className="flex-between" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  <span>Total Amount</span>
                  <span>₹{cartGrandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', marginTop: '1.5rem' }}
                onClick={() => navigate('checkout')}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="var(--success)" /> 256-Bit SSL Encrypted & 7-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
