import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Ruler, 
  MapPin, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Share2, 
  Plus, 
  Minus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import SizeChartModal from '../components/product/SizeChartModal';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetailsPage() {
  const { 
    products, 
    navParams, 
    navigate, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    location,
    showToast 
  } = useApp();

  const productId = navParams.productId || 'prod-1';
  const product = products.find(p => p.id === productId) || products[0];

  // Component states
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Free Size');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.name : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [pincodeCheck, setPincodeCheck] = useState(location.pincode);
  const [pincodeResult, setPincodeResult] = useState({ checked: true, deliveryDate: '23 Sep 2026', free: true });
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(product.reviews || []);

  const isFavorited = isInWishlist(product.id);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincodeCheck.trim().length === 6) {
      setPincodeResult({
        checked: true,
        deliveryDate: '2-3 Business Days',
        free: true
      });
      showToast(`Pincode ${pincodeCheck} is eligible for Express Delivery!`, 'success');
    } else {
      showToast('Please enter a valid 6-digit postal pincode', 'error');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    } else {
      showToast('Sharing not supported on this browser', 'info');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      user: 'You (Verified Buyer)',
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle,
      comment: reviewComment
    };

    setLocalReviews([newRev, ...localReviews]);
    setShowReviewForm(false);
    setReviewTitle('');
    setReviewComment('');
    showToast('Your review was posted successfully!', 'success');
  };

  // Similar products
  const similarProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="product-details-page" style={{ padding: '2rem 0 5rem' }}>
      <div className="app-container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('home')}>Home</span> / 
          <span style={{ cursor: 'pointer', margin: '0 4px' }} onClick={() => navigate('products', { category: product.category })}>
            {product.category.toUpperCase()}
          </span> / 
          <span style={{ color: 'var(--text-main)', fontWeight: 600, marginLeft: '4px' }}>{product.name}</span>
        </div>

        {/* Product Main Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '3.5rem',
          alignItems: 'start'
        }} id="pdp-grid">
          {/* Left Column: Image Gallery */}
          <div>
            {/* Main Active Image with Zoom Frame */}
            <div style={{
              width: '100%',
              paddingTop: '125%',
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img 
                src={product.images[selectedImageIndex] || product.images[0]} 
                alt={product.name} 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
              />

              {/* Wishlist Floating Button */}
              <button 
                className={`wishlist-toggle-btn ${isFavorited ? 'active' : ''}`}
                style={{ top: '1.25rem', right: '1.25rem', width: '42px', height: '42px' }}
                onClick={() => toggleWishlist(product)}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isFavorited ? 'var(--primary)' : 'none'} color={isFavorited ? 'var(--primary)' : 'currentColor'} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', overflowX: 'auto' }}>
                {product.images.map((img, idx) => (
                  <div 
                    key={idx}
                    style={{
                      width: '72px',
                      height: '84px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImageIndex === idx ? '2.5px solid var(--primary)' : '1px solid var(--border-main)',
                      opacity: selectedImageIndex === idx ? 1 : 0.7,
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setSelectedImageIndex(idx)}
                  >
                    <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Sizes, CTAs */}
          <div>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span className="product-brand" style={{ fontSize: '0.85rem' }}>{product.brand}</span>
              <button className="btn btn-ghost btn-sm" onClick={handleShare} title="Share Link">
                <Share2 size={16} /> Share
              </button>
            </div>

            <h1 className="font-serif" style={{ fontSize: '2.1rem', marginBottom: '0.75rem' }}>
              {product.name}
            </h1>

            {/* Rating pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="rating-badge" style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>{product.rating}</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {localReviews.length} Verified Reviews & Ratings
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                • In Stock ({product.stock} units available)
              </span>
            </div>

            {/* Pricing Section */}
            <div style={{
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.15rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="badge badge-sale" style={{ fontSize: '0.85rem' }}>
                    SAVE {product.discountPercent}% OFF
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Inclusive of all taxes. Free shipping on this item.
              </p>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Select Color: <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{selectedColor}</span>
                </label>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {product.colors.map(col => (
                    <div 
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      style={{
                        padding: '4px',
                        borderRadius: 'var(--radius-full)',
                        border: selectedColor === col.name ? '2px solid var(--primary)' : '2px solid transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <div 
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: col.hex,
                          border: '1px solid var(--border-main)'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Selection with Interactive Size Guide */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  Select Size
                </label>
                <button 
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--primary)', fontWeight: 600, padding: 0 }}
                  onClick={() => setIsSizeModalOpen(true)}
                >
                  <Ruler size={14} /> Size Guide & Measurements
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.sizes ? product.sizes.map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ minWidth: '48px', padding: '0.5rem 0.85rem' }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  );
                }) : (
                  <span className="badge badge-primary">One Size</span>
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '0.5rem' }}>
                ⚡ Fast Selling: Only a few pieces remaining in your size!
              </p>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Quantity
              </label>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <button 
                  className="btn-icon" 
                  style={{ border: 'none', width: '36px', height: '36px' }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                  {quantity}
                </span>
                <button 
                  className="btn-icon" 
                  style={{ border: 'none', width: '36px', height: '36px' }}
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Primary CTAs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} /> Add to Bag
              </button>

              <button 
                className="btn btn-primary btn-lg"
                onClick={handleBuyNow}
              >
                Buy Now (Express)
              </button>
            </div>

            {/* Pincode & Delivery Checker */}
            <div className="card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <MapPin size={18} color="var(--primary)" />
                <h4 style={{ fontSize: '0.925rem', fontWeight: 700 }}>Delivery Options & Pincode Checker</h4>
              </div>
              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  maxLength={6}
                  value={pincodeCheck} 
                  onChange={e => setPincodeCheck(e.target.value)}
                  placeholder="Enter 6-digit postal code"
                  style={{ flex: 1, padding: '0.5rem 0.85rem' }}
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Check
                </button>
              </form>

              {pincodeResult.checked && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', fontWeight: 600 }}>
                    <Truck size={15} /> Expected Delivery by {pincodeResult.deliveryDate}
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>
                    ✅ Cash on Delivery Available • 7-Day Hassle-Free Doorstep Returns
                  </div>
                </div>
              )}
            </div>

            {/* Product Highlights / Specifications */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Product Overview</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
                {product.description}
              </p>

              {product.details && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-muted)' }}>Fabric: </strong>
                    <span>{product.details.fabric}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-muted)' }}>Fit: </strong>
                    <span>{product.details.fit}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-muted)' }}>Neckline: </strong>
                    <span>{product.details.neckline}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-muted)' }}>Care: </strong>
                    <span>{product.details.care}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section style={{ marginTop: '4.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '3rem' }}>
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h3 className="font-serif" style={{ fontSize: '1.75rem' }}>Customer Reviews & Ratings</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Verified feedback from genuine DressCart patrons</p>
            </div>
            <button 
              className="btn btn-outline"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Close Form' : 'Write a Review'}
            </button>
          </div>

          {/* Write a review collapsible form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="card" style={{ padding: '1.75rem', marginBottom: '2rem', maxWidth: '640px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Rate & Review this Dress</h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Overall Rating</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star}
                      size={24}
                      fill={star <= reviewRating ? '#f59e0b' : 'none'}
                      color={star <= reviewRating ? '#f59e0b' : 'var(--text-muted)'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setReviewRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Review Headline</label>
                <input 
                  type="text" 
                  placeholder="e.g. Gorgeous fit and fabric!"
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Your Detailed Experience</label>
                <textarea 
                  rows={4}
                  placeholder="Share details regarding sizing, fabric comfort, delivery speed, and styling tips..."
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {localReviews.map(r => (
              <div key={r.id} className="card" style={{ padding: '1.25rem' }}>
                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</span>
                </div>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>{r.title}</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {r.comment}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  By {r.user}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar Styles Carousel */}
        {similarProducts.length > 0 && (
          <section style={{ marginTop: '4.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '3rem' }}>
            <h3 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
              Similar Styles You Might Love
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {similarProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal 
        isOpen={isSizeModalOpen} 
        onClose={() => setIsSizeModalOpen(false)} 
      />

      <style>{`
        @media (max-width: 860px) {
          #pdp-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
