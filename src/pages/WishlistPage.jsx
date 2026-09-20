import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart, navigate, showToast } = useApp();
  const [sizePickerForId, setSizePickerForId] = useState(null);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (product, size) => {
    addToCart(product, size);
    toggleWishlist(product);
    setSizePickerForId(null);
  };

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach(product => {
      const defaultSize = product.sizes ? product.sizes[0] : 'Free Size';
      addToCart(product, defaultSize);
      toggleWishlist(product);
    });
    showToast('All items moved to your shopping bag!', 'success');
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="wishlist-page" style={{ padding: '4rem 0 6rem' }}>
        <div className="app-container" style={{ maxWidth: '580px', textAlign: 'center' }}>
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
              <Heart size={40} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Tap the heart on any dress, gown, or kurta you love while browsing to save your dream silhouettes here!
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('products')}
            >
              Discover Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="app-container">
        <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="font-serif" style={{ fontSize: '2rem' }}>
              My Wishlist ({wishlistProducts.length})
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Saved styles reserved in your personal closet
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-secondary"
              onClick={handleMoveAllToCart}
            >
              <ShoppingBag size={16} /> Move All to Bag
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {wishlistProducts.map(product => (
            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Product Media */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '125%', overflow: 'hidden' }}>
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => navigate('product-details', { productId: product.id })}
                />
                <button 
                  className="wishlist-toggle-btn active"
                  style={{ top: '0.75rem', right: '0.75rem' }}
                  onClick={() => toggleWishlist(product)}
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} color="var(--danger)" />
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="product-brand">{product.brand}</span>
                <h4 
                  style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0.25rem 0 0.5rem', cursor: 'pointer' }}
                  onClick={() => navigate('product-details', { productId: product.id })}
                >
                  {product.name}
                </h4>

                <div className="product-price-row" style={{ marginTop: 'auto', marginBottom: '0.75rem' }}>
                  <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* Move to Cart with Quick Size Selector */}
                {sizePickerForId === product.id ? (
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>Select Size:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {product.sizes ? product.sizes.map(size => (
                        <button
                          key={size}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => handleMoveToCart(product, size)}
                        >
                          {size}
                        </button>
                      )) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleMoveToCart(product, 'Free Size')}
                        >
                          Confirm
                        </button>
                      )}
                      <button 
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                        onClick={() => setSizePickerForId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                    onClick={() => setSizePickerForId(product.id)}
                  >
                    <ShoppingBag size={15} /> Move to Bag
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
