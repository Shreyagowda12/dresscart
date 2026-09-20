import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Grid3X3, 
  LayoutList, 
  Star, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';
import { MOCK_CATEGORIES } from '../data/mockData';

export default function ProductListPage() {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    navParams, 
    navigate 
  } = useApp();

  // Filters state
  const [activeCategory, setActiveCategory] = useState(navParams.category || selectedCategory || 'all');
  const [maxPrice, setMaxPrice] = useState(8000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price-low', 'price-high', 'rating', 'newest'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const searchKeyword = navParams.search || '';

  // All available filter options
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [
    { name: 'Rose', hex: '#f43f5e' },
    { name: 'Crimson', hex: '#991b1b' },
    { name: 'Navy', hex: '#1e293b' },
    { name: 'Gold', hex: '#eab308' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Charcoal', hex: '#334155' }
  ];

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorName) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSelectedCategory('all');
    setMaxPrice(8000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinRating(0);
    setMinDiscount(0);
    setSortBy('recommended');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'sale') {
          if (!product.discountPercent || product.discountPercent < 40) return false;
        } else if (product.category !== activeCategory) {
          return false;
        }
      }

      // Search keyword filter
      if (searchKeyword.trim() !== '') {
        const query = searchKeyword.toLowerCase();
        const match = product.name.toLowerCase().includes(query) ||
                      product.brand.toLowerCase().includes(query) ||
                      product.description.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Price filter
      if (product.price > maxPrice) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      // Discount filter
      if (minDiscount > 0 && (!product.discountPercent || product.discountPercent < minDiscount)) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes && product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors && product.colors.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.tags?.includes('New Arrival') ? 1 : 0) - (a.tags?.includes('New Arrival') ? 1 : 0);
      return 0; // recommended
    });
  }, [products, activeCategory, searchKeyword, maxPrice, minRating, minDiscount, selectedSizes, selectedColors, sortBy]);

  const activeFiltersCount = (activeCategory !== 'all' ? 1 : 0) +
    (maxPrice < 8000 ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (minRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0);

  return (
    <div className="product-list-page" style={{ padding: '2rem 0 4rem' }}>
      <div className="app-container">
        {/* Breadcrumb & Title Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('home')}>Home</span> / <span>Catalog</span>
            {searchKeyword && <span> / Results for "{searchKeyword}"</span>}
          </div>

          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="font-serif" style={{ fontSize: '2rem' }}>
                {searchKeyword ? `Search: "${searchKeyword}"` : activeCategory === 'all' ? 'All Collections' : MOCK_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Fashion Catalog'}
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Showing <strong>{filteredProducts.length}</strong> styles crafted with premium fabrics
              </p>
            </div>

            {/* Sorting & View Mode Controls */}
            <div className="flex-center" style={{ gap: '0.75rem' }}>
              {/* Mobile Filter Trigger */}
              <button 
                className="btn btn-secondary btn-sm"
                id="mobile-filter-btn"
                onClick={() => setMobileFilterOpen(true)}
                style={{ display: 'none' }}
              >
                <SlidersHorizontal size={15} /> Filters ({activeFiltersCount})
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
                >
                  <option value="recommended">Curated / Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* View Grid/List toggle */}
              <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-main)', padding: '2px' }}>
                <button 
                  className={`btn-icon ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid3X3 size={16} />
                </button>
                <button 
                  className={`btn-icon ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACTIVE FILTERS:</span>
              {activeCategory !== 'all' && (
                <span className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('all')}>
                  Category: {activeCategory} <X size={12} />
                </span>
              )}
              {maxPrice < 8000 && (
                <span className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => setMaxPrice(8000)}>
                  Under ₹{maxPrice} <X size={12} />
                </span>
              )}
              {selectedSizes.map(s => (
                <span key={s} className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => handleSizeToggle(s)}>
                  Size: {s} <X size={12} />
                </span>
              ))}
              {selectedColors.map(c => (
                <span key={c} className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => handleColorToggle(c)}>
                  Color: {c} <X size={12} />
                </span>
              ))}
              {minRating > 0 && (
                <span className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => setMinRating(0)}>
                  {minRating}★ & Above <X size={12} />
                </span>
              )}
              <button 
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', color: 'var(--danger)', padding: '0.2rem 0.5rem' }}
                onClick={resetAllFilters}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Content: Sidebar + Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2rem',
          alignItems: 'start'
        }} id="catalog-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="card" id="desktop-sidebar" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={18} /> Filters
              </h4>
              {activeFiltersCount > 0 && (
                <span 
                  style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
                  onClick={resetAllFilters}
                >
                  Reset
                </span>
              )}
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Category
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {MOCK_CATEGORIES.map(cat => (
                  <label 
                    key={cat.id} 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    <input 
                      type="radio" 
                      name="catalog-cat"
                      checked={activeCategory === cat.id}
                      onChange={() => {
                        setActiveCategory(cat.id);
                        setSelectedCategory(cat.id);
                      }}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Max Price
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="8000" 
                step="250"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>₹1,000</span>
                <span>₹8,000+</span>
              </div>
            </div>

            {/* Sizes Filter */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Sizes
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {allSizes.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', minWidth: '36px' }}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Filter */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Color Shade
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {allColors.map(c => {
                  const isSelected = selectedColors.includes(c.name);
                  return (
                    <span 
                      key={c.name}
                      onClick={() => handleColorToggle(c.name)}
                      className={`swatch ${isSelected ? 'active' : ''}`}
                      style={{
                        backgroundColor: c.hex,
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 0 0 3px var(--primary)' : 'none'
                      }}
                      title={c.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Customer Rating Filter */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Rating
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[4.5, 4.0, 3.5].map(rating => (
                  <label key={rating} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="rating-filter" 
                      checked={minRating === rating} 
                      onChange={() => setMinRating(minRating === rating ? 0 : rating)} 
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span>{rating}★ & above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Items Display */}
          <main>
            {filteredProducts.length === 0 ? (
              <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
                <Sparkles size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No matching styles found</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  We couldn't find any products matching your specific combination of filters. Try widening your price range or resetting filters.
                </p>
                <button className="btn btn-primary" onClick={resetAllFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(250px, 1fr))' : '1fr',
                gap: '1.5rem'
              }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #catalog-layout {
            grid-template-columns: 1fr !important;
          }
          #desktop-sidebar {
            display: none !important;
          }
          #mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
