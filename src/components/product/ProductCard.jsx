import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist, addToCart, navigate } = useApp();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate('product-details', { productId: product.id });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const chosenColor = product.colors && product.colors[selectedColorIndex] 
      ? product.colors[selectedColorIndex].name 
      : 'Default';
    const chosenSize = product.sizes && product.sizes[0] ? product.sizes[0] : 'Free Size';

    addToCart(product, chosenSize, chosenColor, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Product Image & Badges */}
      <div className="product-card-media">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="product-badges">
          {product.discountPercent && (
            <span className="badge badge-sale">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.tags && product.tags[0] && (
            <span className={`badge ${product.tags[0] === 'Bestseller' ? 'badge-gold' : 'badge-primary'}`}>
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Floating Wishlist Heart */}
        <button 
          className={`wishlist-toggle-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Toggle Wishlist"
        >
          <Heart 
            size={18} 
            fill={isFavorited ? 'var(--primary)' : 'none'} 
            color={isFavorited ? 'var(--primary)' : 'currentColor'} 
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-card-body">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-swatches" onClick={e => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <span 
                key={color.name}
                className={`swatch ${selectedColorIndex === idx ? 'active' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => setSelectedColorIndex(idx)}
              />
            ))}
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
              {product.colors[selectedColorIndex]?.name}
            </span>
          </div>
        )}

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {product.discountPercent && (
            <span className="discount-tag">({product.discountPercent}% OFF)</span>
          )}
        </div>

        {/* Footer with Rating & Quick Add */}
        <div className="product-card-footer">
          <div className="rating-badge">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewsCount})</span>
          </div>

          <button 
            className={`btn btn-sm ${isAddedRecently ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleQuickAdd}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            title="Quick Add to Bag"
          >
            {isAddedRecently ? (
              <>
                <Check size={14} color="var(--success)" /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
