import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  QrCode, 
  Lock, 
  ArrowLeft,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CheckoutPage() {
  const { 
    cart, 
    cartSubtotal, 
    couponSavings, 
    appliedCoupon, 
    deliveryFee, 
    estimatedTax, 
    cartGrandTotal, 
    addresses, 
    addAddress,
    placeOrder, 
    navigate,
    showToast 
  } = useApp();

  // 3-Step Stepper: 1: Address -> 2: Shipping -> 3: Payment
  const [step, setStep] = useState(1);

  // Step 1: Selected Address
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find(a => a.isDefault)?.id || (addresses[0] ? addresses[0].id : null)
  );
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [newAddrForm, setNewAddrForm] = useState({
    name: 'Jane Doe',
    type: 'Home',
    phone: '+91 98765 43210',
    addressLine1: '',
    addressLine2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    isDefault: false
  });

  // Step 2: Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' (₹0/₹99) | 'express' (+₹150)

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'netbanking' | 'cod'
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    name: 'Jane Doe',
    expiry: '08/29',
    cvv: '•••'
  });
  const [upiId, setUpiId] = useState('janedoe@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  // Recalculate delivery fee based on shipping option
  const effectiveDeliveryFee = shippingMethod === 'express' ? 150 : deliveryFee;
  const finalTotal = Math.max(0, cartSubtotal - couponSavings + effectiveDeliveryFee + estimatedTax);

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddrForm.addressLine1 || !newAddrForm.pincode) {
      showToast('Please fill in required address fields', 'error');
      return;
    }
    addAddress(newAddrForm);
    setShowNewAddressModal(false);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address', 'error');
      setStep(1);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      let paymentLabel = 'Credit Card';
      if (paymentMethod === 'upi') paymentLabel = `UPI (${upiId})`;
      if (paymentMethod === 'netbanking') paymentLabel = `Net Banking (${selectedBank})`;
      if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery';

      const createdOrder = placeOrder({
        address: selectedAddress,
        paymentMethod: paymentLabel,
        customDeliveryFee: effectiveDeliveryFee
      });

      setIsProcessing(false);
      navigate('order-confirmation', { orderId: createdOrder.id });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="app-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h3>Your shopping cart is empty</h3>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('products')}>
          Go to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ padding: '2rem 0 5rem' }}>
      <div className="app-container">
        {/* Stepper Header */}
        <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <div className="stepper">
            <div className="stepper-line">
              <div 
                className="stepper-line-fill" 
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              />
            </div>

            <div className={`step-node ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>
              <div className="step-circle">1</div>
              <span className="step-label">Delivery Address</span>
            </div>

            <div className={`step-node ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>
              <div className="step-circle">2</div>
              <span className="step-label">Shipping Method</span>
            </div>

            <div className={`step-node ${step === 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span className="step-label">Payment</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Checkout Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'start'
        }} id="checkout-grid">
          {/* Left Column: Multi-Step Forms */}
          <div>
            {/* STEP 1: DELIVERY ADDRESS */}
            {step === 1 && (
              <div className="card" style={{ padding: '1.75rem' }}>
                <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--primary)" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Select Delivery Address</h3>
                  </div>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowNewAddressModal(true)}
                  >
                    <Plus size={14} /> Add New Address
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {addresses.map(addr => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        style={{
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-main)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <input 
                          type="radio" 
                          name="checkout-address" 
                          checked={isSelected} 
                          onChange={() => setSelectedAddressId(addr.id)} 
                          style={{ marginTop: '3px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <strong style={{ fontSize: '0.95rem' }}>{addr.name}</strong>
                            <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{addr.type}</span>
                            {addr.isDefault && <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Default</span>}
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.4 }}>
                            {addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                          </p>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mobile: {addr.phone}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  onClick={() => setStep(2)}
                >
                  Deliver to this Address →
                </button>
              </div>
            )}

            {/* STEP 2: SHIPPING METHOD */}
            {step === 2 && (
              <div className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Truck size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Choose Shipping Speed</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* Standard Delivery */}
                  <div
                    onClick={() => setShippingMethod('standard')}
                    style={{
                      border: shippingMethod === 'standard' ? '2px solid var(--primary)' : '1px solid var(--border-main)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      background: shippingMethod === 'standard' ? 'var(--primary-light)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="shipping-method" 
                      checked={shippingMethod === 'standard'} 
                      onChange={() => setShippingMethod('standard')} 
                    />
                    <div style={{ flex: 1 }}>
                      <div className="flex-between">
                        <strong>Standard Surface Shipping (3-4 Business Days)</strong>
                        <span style={{ fontWeight: 700, color: deliveryFee === 0 ? 'var(--success)' : 'inherit' }}>
                          {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Reliable ground courier with full doorstep tracking
                      </p>
                    </div>
                  </div>

                  {/* Express Priority Air Delivery */}
                  <div
                    onClick={() => setShippingMethod('express')}
                    style={{
                      border: shippingMethod === 'express' ? '2px solid var(--primary)' : '1px solid var(--border-main)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      background: shippingMethod === 'express' ? 'var(--primary-light)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="shipping-method" 
                      checked={shippingMethod === 'express'} 
                      onChange={() => setShippingMethod('express')} 
                    />
                    <div style={{ flex: 1 }}>
                      <div className="flex-between">
                        <div>
                          <strong>Express Priority Air (Next Day Guaranteed)</strong>
                          <span className="badge badge-sale" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>Super Fast</span>
                        </div>
                        <span style={{ fontWeight: 700 }}>₹150</span>
                      </div>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Priority air cargo dispatch within 6 hours. Guaranteed tomorrow by 8 PM.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button 
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                    onClick={() => setStep(3)}
                  >
                    Proceed to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <CreditCard size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Payment Options</h3>
                </div>

                {/* Payment Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[
                    { id: 'card', label: 'Credit/Debit Card' },
                    { id: 'upi', label: 'UPI / QR Code' },
                    { id: 'netbanking', label: 'Net Banking' },
                    { id: 'cod', label: 'Cash on Delivery' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      className={`btn btn-sm ${paymentMethod === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.5rem 0.25rem', fontSize: '0.78rem', textAlign: 'center' }}
                      onClick={() => setPaymentMethod(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sub-form 1: Credit/Debit Card */}
                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Realistic Virtual Credit Card Preview */}
                    <div style={{
                      background: 'linear-gradient(135deg, #1e1b4b 0%, #4c0519 100%)',
                      color: 'white',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      boxShadow: 'var(--shadow-lg)',
                      maxWidth: '360px',
                      margin: '0 auto 0.5rem',
                      width: '100%'
                    }}>
                      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>DRESSCART PLATINUM</span>
                        <Lock size={16} />
                      </div>
                      <div style={{ fontSize: '1.25rem', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1.5rem' }}>
                        {cardDetails.number}
                      </div>
                      <div className="flex-between">
                        <div>
                          <div style={{ fontSize: '0.65rem', color: '#cbd5e1' }}>CARD HOLDER</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cardDetails.name}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: '#cbd5e1' }}>EXPIRES</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cardDetails.expiry}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Card Number</label>
                      <input 
                        type="text" 
                        value={cardDetails.number} 
                        onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem' }} 
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Expiry Date</label>
                        <input 
                          type="text" 
                          value={cardDetails.expiry} 
                          onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem' }} 
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>CVV</label>
                        <input 
                          type="password" 
                          maxLength={4}
                          value={cardDetails.cvv} 
                          onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem' }} 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-form 2: UPI */}
                {paymentMethod === 'upi' && (
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: 'var(--bg-subtle)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-main)',
                      marginBottom: '1rem'
                    }}>
                      <QrCode size={120} color="var(--text-main)" />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Scan with GPay, PhonePe or Paytm</span>
                    </div>

                    <div style={{ maxWidth: '340px', margin: '0 auto', textAlign: 'left' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Or Enter UPI ID</label>
                      <input 
                        type="text" 
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="username@okhdfcbank"
                        style={{ width: '100%', padding: '0.65rem 0.85rem' }} 
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form 3: Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div style={{ padding: '1rem 0' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Select Bank</label>
                    <select 
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem' }}
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {/* Sub-form 4: COD */}
                {paymentMethod === 'cod' && (
                  <div style={{ padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', margin: '1rem 0' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cash on Delivery Available</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                      You can pay via cash, UPI, or card machine to our delivery associate when your parcel reaches your doorstep. Please keep exact change ready.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>

                  <button 
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Confirming Order...' : `Pay ₹${finalTotal.toLocaleString('en-IN')} & Place Order`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Recap */}
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Bag Summary ({cart.length} items)
            </h4>

            {/* Compact Cart Items Strip */}
            <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
              {cart.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1, minWidth: 0, fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{item.selectedSize} • Qty: {item.quantity}</div>
                  </div>
                  <strong style={{ fontSize: '0.85rem' }}>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Coupon ({appliedCoupon.code})</span>
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>- ₹{couponSavings}</span>
                </div>
              )}
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Shipping ({shippingMethod})</span>
                <span>{effectiveDeliveryFee === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `₹${effectiveDeliveryFee}`}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-muted)' }}>Taxes (5% GST)</span>
                <span>₹{estimatedTax}</span>
              </div>
              <div style={{ borderTop: '1px dashed var(--border-main)', margin: '0.4rem 0' }}></div>
              <div className="flex-between" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--success)" />
              <span>Safe & Secure 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Modal */}
      {showNewAddressModal && (
        <div className="modal-backdrop" onClick={() => setShowNewAddressModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add New Delivery Address</h4>
              <button className="modal-close-btn" onClick={() => setShowNewAddressModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveNewAddress} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
                <input 
                  type="text" 
                  value={newAddrForm.name} 
                  onChange={e => setNewAddrForm({ ...newAddrForm, name: e.target.value })} 
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Phone Number</label>
                <input 
                  type="text" 
                  value={newAddrForm.phone} 
                  onChange={e => setNewAddrForm({ ...newAddrForm, phone: e.target.value })} 
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>House / Flat / Block No.</label>
                <input 
                  type="text" 
                  value={newAddrForm.addressLine1} 
                  onChange={e => setNewAddrForm({ ...newAddrForm, addressLine1: e.target.value })} 
                  placeholder="e.g. Flat 304, Emerald Heights"
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Street / Locality</label>
                <input 
                  type="text" 
                  value={newAddrForm.addressLine2} 
                  onChange={e => setNewAddrForm({ ...newAddrForm, addressLine2: e.target.value })} 
                  placeholder="e.g. 100ft Road, Indiranagar"
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>City</label>
                  <input 
                    type="text" 
                    value={newAddrForm.city} 
                    onChange={e => setNewAddrForm({ ...newAddrForm, city: e.target.value })} 
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Pincode</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    value={newAddrForm.pincode} 
                    onChange={e => setNewAddrForm({ ...newAddrForm, pincode: e.target.value })} 
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Save & Use Address
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          #checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
