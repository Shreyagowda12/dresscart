import React, { useState } from 'react';
import { 
  Layers, 
  Package, 
  DollarSign, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Search, 
  Sparkles,
  TrendingUp,
  Boxes,
  ExternalLink,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { 
    orders, 
    updateOrderStatus, 
    products, 
    addProduct, 
    updateProductStock, 
    deleteProduct, 
    returns, 
    updateReturnStatus,
    navigate,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory' | 'returns'
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Noir & Silk',
    category: 'women',
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'],
    description: 'Bespoke couture garment with high-density fabric composition.'
  });

  // Calculate high-level KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const pendingReturns = returns.filter(r => r.status !== 'Refund Credited').length;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name.trim()) {
      showToast('Product name is required', 'error');
      return;
    }
    addProduct(newProd);
    setShowAddProductModal(false);
    setNewProd({
      ...newProd,
      name: '',
      price: 1999,
      stock: 20
    });
  };

  return (
    <div className="admin-dashboard-page" style={{ padding: '2.5rem 0 5rem', background: 'var(--bg-subtle)' }}>
      <div className="app-container">
        {/* Admin Header */}
        <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-sale">STORE ADMINISTRATOR PORTAL</span>
            </div>
            <h1 className="font-serif" style={{ fontSize: '2.2rem' }}>
              DressCart Operations Center
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Manage inventory catalogs, live order fulfillment workflows, and return requests
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('home')}
            >
              <ExternalLink size={16} /> View Storefront
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddProductModal(true)}
            >
              <Plus size={16} /> Add New Catalog Item
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL REVENUE</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>+18.4% from last week</span>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACTIVE ORDERS</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{orders.length}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pendingOrders} in active fulfillment</span>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>CATALOG STYLES</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Boxes size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{products.length}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across 6 design categories</span>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>RETURN REQUESTS</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--warning-light)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RotateCcw size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{returns.length}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 600 }}>{pendingReturns} awaiting resolution</span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-main)',
          borderRadius: 'var(--radius-lg)',
          padding: '4px',
          marginBottom: '1.5rem'
        }}>
          {[
            { id: 'orders', label: `Orders Fulfillment (${orders.length})` },
            { id: 'inventory', label: `Inventory Management (${products.length})` },
            { id: 'returns', label: `Returns & QC (${returns.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--radius-md)', padding: '0.5rem 1.25rem' }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ORDERS FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Customer Orders Pipeline</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Changing status here immediately cascades to customer tracking and notifications
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-main)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Order ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Customer & Destination</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Payment</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status Control</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--primary)' }}>
                        #{order.id}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <strong>{order.address?.name || 'Customer'}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {order.address?.city} ({order.address?.pincode})
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                        {order.date}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                        ₹{order.total?.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {order.paymentMethod}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.8rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600,
                            borderColor: order.status === 'Delivered' ? 'var(--success)' : 'var(--border-main)'
                          }}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed & Dispatched">Packed & Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <button 
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => navigate('order-tracking', { orderId: order.id })}
                        >
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & CATALOG */}
        {activeTab === 'inventory' && (
          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="flex-between" style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Catalog Inventory Management</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Adjust available stock units or add new styles</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddProductModal(true)}>
                <Plus size={14} /> Add Product
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-main)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Item</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Price</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Stock Units</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Rating</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={p.images[0]} alt={p.name} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ maxWidth: '240px' }}>
                          <strong style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.name}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.brand}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textTransform: 'capitalize' }}>
                        {p.category}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <input 
                          type="number" 
                          defaultValue={p.stock}
                          onBlur={e => updateProductStock(p.id, e.target.value)}
                          style={{ width: '70px', padding: '0.25rem 0.5rem', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        ★ {p.rating} ({p.reviewsCount})
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn btn-ghost btn-sm"
                            onClick={() => navigate('product-details', { productId: p.id })}
                            title="View Product"
                          >
                            <ExternalLink size={14} />
                          </button>
                          <button 
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--danger)' }}
                            onClick={() => deleteProduct(p.id)}
                            title="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RETURNS & QC MANAGEMENT */}
        {activeTab === 'returns' && (
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Return Requests & Quality Control</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Review customer reasons, schedule pickup or authorize instant wallet refund</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-main)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Return ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Item & Reason</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Refund Due</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Decision Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map(ret => (
                    <tr key={ret.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--primary)' }}>
                        #{ret.id}
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order #{ret.orderId}</div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <strong>{ret.itemName}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Reason: {ret.reason}
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--success)' }}>
                        ₹{ret.refundAmount?.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className="badge badge-primary">{ret.status}</span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn btn-sm btn-primary"
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                            onClick={() => updateReturnStatus(ret.id, 'Refund Credited')}
                          >
                            Approve & Refund
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', color: 'var(--danger)' }}
                            onClick={() => updateReturnStatus(ret.id, 'Rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="modal-backdrop" onClick={() => setShowAddProductModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Add New Dress / Fashion Item</h3>
              <button className="modal-close-btn" onClick={() => setShowAddProductModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Product Title</label>
                <input 
                  type="text" 
                  value={newProd.name} 
                  onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Celestial Velvet Evening Maxi Gown"
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Brand</label>
                  <input 
                    type="text" 
                    value={newProd.brand} 
                    onChange={e => setNewProd({ ...newProd, brand: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Category</label>
                  <select 
                    value={newProd.category}
                    onChange={e => setNewProd({ ...newProd, category: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }}
                  >
                    <option value="women">Women's Fashion</option>
                    <option value="ethnic">Ethnic & Festive</option>
                    <option value="men">Men's Apparel</option>
                    <option value="western">Western & Chic</option>
                    <option value="party">Party & Evening</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Selling Price (₹)</label>
                  <input 
                    type="number" 
                    value={newProd.price} 
                    onChange={e => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>MRP (₹)</label>
                  <input 
                    type="number" 
                    value={newProd.originalPrice} 
                    onChange={e => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Initial Stock</label>
                  <input 
                    type="number" 
                    value={newProd.stock} 
                    onChange={e => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                    required 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Image URL</label>
                <input 
                  type="url" 
                  value={newProd.images[0]} 
                  onChange={e => setNewProd({ ...newProd, images: [e.target.value] })}
                  style={{ width: '100%', padding: '0.55rem 0.75rem' }} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Save & Publish to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
