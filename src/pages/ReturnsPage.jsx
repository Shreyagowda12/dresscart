import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Wallet, 
  Calendar, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReturnsPage() {
  const { orders, returns, requestReturn, navParams, navigate, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('request'); // 'request' | 'tracker'

  // Eligible delivered orders
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  // Return request form states
  const [selectedOrderId, setSelectedOrderId] = useState(
    navParams.orderId || (deliveredOrders[0] ? deliveredOrders[0].id : '')
  );
  const currentOrder = deliveredOrders.find(o => o.id === selectedOrderId) || deliveredOrders[0];

  const [selectedItemId, setSelectedItemId] = useState(
    currentOrder && currentOrder.items[0] ? currentOrder.items[0].id : ''
  );
  const [returnReason, setReturnReason] = useState('Size does not fit comfortably');
  const [refundMethod, setRefundMethod] = useState('DressCart Wallet (+5% bonus)');
  const [pickupSlot, setPickupSlot] = useState('Tomorrow, 10:00 AM - 01:00 PM');

  const handleSubmitReturn = (e) => {
    e.preventDefault();
    if (!currentOrder || !selectedItemId) {
      showToast('Please select an order and item to return', 'error');
      return;
    }

    requestReturn({
      orderId: currentOrder.id,
      itemId: selectedItemId,
      reason: returnReason,
      refundMethod,
      pickupSlot
    });

    setActiveTab('tracker');
  };

  return (
    <div className="returns-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="app-container" style={{ maxWidth: '820px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Hassle-Free Returns & Exchanges
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Enjoy 7-day doorstep pickup and instant refund crediting with zero questions asked
          </p>

          {/* Sub Tabs */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-main)',
            borderRadius: 'var(--radius-full)',
            padding: '4px',
            marginTop: '1.25rem'
          }}>
            <button
              className={`btn btn-sm ${activeTab === 'request' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1.25rem' }}
              onClick={() => setActiveTab('request')}
            >
              Request New Return
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'tracker' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1.25rem' }}
              onClick={() => setActiveTab('tracker')}
            >
              My Return Requests ({returns.length})
            </button>
          </div>
        </div>

        {/* TAB 1: REQUEST RETURN FORM */}
        {activeTab === 'request' && (
          <div className="card" style={{ padding: '2rem' }}>
            {deliveredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <PackageCheck size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Delivered Orders Available for Return</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '440px', margin: '0.5rem auto 1.5rem' }}>
                  Returns can only be requested for orders that have been marked as "Delivered" within the last 7 days.
                </p>
                <button className="btn btn-primary" onClick={() => navigate('order-tracking')}>
                  Check Ongoing Orders
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReturn} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* 1. Select Delivered Order */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    1. Select Delivered Order
                  </label>
                  <select 
                    value={selectedOrderId} 
                    onChange={e => {
                      setSelectedOrderId(e.target.value);
                      const o = deliveredOrders.find(ord => ord.id === e.target.value);
                      if (o && o.items[0]) setSelectedItemId(o.items[0].id);
                    }}
                    style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  >
                    {deliveredOrders.map(o => (
                      <option key={o.id} value={o.id}>
                        Order #{o.id} - Delivered on {o.date} (₹{o.total})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Select Item */}
                {currentOrder && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      2. Choose Item to Return
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {currentOrder.items.map(item => (
                        <label 
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem',
                            border: selectedItemId === item.id ? '2px solid var(--primary)' : '1px solid var(--border-main)',
                            borderRadius: 'var(--radius-md)',
                            background: selectedItemId === item.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                            cursor: 'pointer'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="return-item" 
                            checked={selectedItemId === item.id} 
                            onChange={() => setSelectedItemId(item.id)} 
                          />
                          <img src={item.image} alt={item.name} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Size: {item.selectedSize} • Color: {item.selectedColor} • Price: ₹{item.price}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Reason for Return */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    3. Reason for Return
                  </label>
                  <select 
                    value={returnReason} 
                    onChange={e => setReturnReason(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  >
                    <option value="Size too small / tight fit">Size too small / tight fit</option>
                    <option value="Size too large / loose fit">Size too large / loose fit</option>
                    <option value="Fabric or color differed from website photos">Fabric or color differed from website photos</option>
                    <option value="Defective stitching or damaged zipper">Defective stitching or damaged zipper</option>
                    <option value="Arrived late after scheduled occasion">Arrived late after scheduled occasion</option>
                    <option value="Changed mind / Don't like silhouette">Changed mind / Don't like silhouette</option>
                  </select>
                </div>

                {/* 4. Refund Destination */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    4. Refund Preference
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div 
                      onClick={() => setRefundMethod('DressCart Wallet (+5% bonus)')}
                      style={{
                        padding: '1rem',
                        border: refundMethod.includes('Wallet') ? '2px solid var(--primary)' : '1px solid var(--border-main)',
                        borderRadius: 'var(--radius-md)',
                        background: refundMethod.includes('Wallet') ? 'var(--primary-light)' : 'var(--bg-surface)',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="flex-between">
                        <strong style={{ fontSize: '0.9rem' }}>Store Credit Wallet</strong>
                        <span className="badge badge-sale" style={{ fontSize: '0.65rem' }}>+5% Bonus</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Instant credit immediately upon pickup handover
                      </p>
                    </div>

                    <div 
                      onClick={() => setRefundMethod('Original Payment Source')}
                      style={{
                        padding: '1rem',
                        border: refundMethod.includes('Original') ? '2px solid var(--primary)' : '1px solid var(--border-main)',
                        borderRadius: 'var(--radius-md)',
                        background: refundMethod.includes('Original') ? 'var(--primary-light)' : 'var(--bg-surface)',
                        cursor: 'pointer'
                      }}
                    >
                      <strong style={{ fontSize: '0.9rem' }}>Original Payment Method</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Credited back to bank/card within 24-48 business hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Pickup Date & Time Slot */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    5. Choose Doorstep Pickup Slot
                  </label>
                  <select 
                    value={pickupSlot} 
                    onChange={e => setPickupSlot(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  >
                    <option value="Tomorrow, 10:00 AM - 01:00 PM">Tomorrow, 10:00 AM - 01:00 PM</option>
                    <option value="Tomorrow, 02:00 PM - 06:00 PM">Tomorrow, 02:00 PM - 06:00 PM</option>
                    <option value="Day After, 10:00 AM - 01:00 PM">Day After, 10:00 AM - 01:00 PM</option>
                    <option value="Day After, 02:00 PM - 06:00 PM">Day After, 02:00 PM - 06:00 PM</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem' }}>
                  Confirm Return Request →
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: MY RETURN REQUESTS & TRACKER */}
        {activeTab === 'tracker' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {returns.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>You have no active return requests.</p>
              </div>
            ) : (
              returns.map(ret => (
                <div key={ret.id} className="card" style={{ padding: '1.75rem' }}>
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span className="badge badge-primary" style={{ marginBottom: '4px' }}>
                        {ret.status}
                      </span>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Return Ticket #{ret.id}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Linked to Order #{ret.orderId} • Requested on {ret.requestDate}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Refund Amount</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)' }}>
                        ₹{ret.refundAmount?.toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Via {ret.refundMethod}</span>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                    {ret.itemImage && (
                      <img src={ret.itemImage} alt={ret.itemName} style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ret.itemName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Reason: <strong>{ret.reason}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Scheduled Pickup: <strong>{ret.pickupScheduled}</strong>
                      </div>
                    </div>
                  </div>

                  {/* 4-Stage Return Stepper */}
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>Return Progress Status</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                      {ret.timeline ? ret.timeline.map((step, idx) => (
                        <div key={idx} style={{ padding: '0.5rem', background: step.done ? 'var(--primary-light)' : 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: step.done ? '1px solid var(--primary)' : '1px solid var(--border-main)' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: step.done ? 'var(--primary)' : 'var(--text-muted)' }}>
                            {step.label}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {step.date}
                          </div>
                        </div>
                      )) : (
                        <div>Status timeline active</div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
