import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Star, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Heart, 
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';
import { MOCK_CATEGORIES } from '../data/mockData';

export default function HomePage() {
  const { products, navigate, setSelectedCategory } = useApp();
  const [activeTab, setActiveTab] = useState('trending'); // 'trending' | 'bestsellers' | 'new'

  // Deal of the Day Countdown Timer (e.g. 10 hours 45 mins)
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products by active showcase tab
  const getShowcaseProducts = () => {
    if (activeTab === 'bestsellers') {
      return products.filter(p => p.tags && p.tags.includes('Bestseller')).slice(0, 8);
    } else if (activeTab === 'new') {
      return products.filter(p => p.tags && p.tags.includes('New Arrival')).slice(0, 8);
    }
    // Default trending
    return products.filter(p => p.rating >= 4.7).slice(0, 8);
  };

  const dealProducts = products.filter(p => p.discountPercent && p.discountPercent >= 50).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. Hero Showcase Banner */}
      <section style={{
        position: 'relative',
        minHeight: '520px',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #4c0519 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '3.5rem 0'
      }}>
        {/* Decorative ambient orbs */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}></div>

        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center'
          }} id="hero-grid">
            {/* Hero Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Sparkles size={16} color="#fb7185" />
                <span>NEW FESTIVE AUTUMN COLLECTION 2026</span>
              </div>

              <h1 className="font-serif" style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                lineHeight: 1.15,
                fontWeight: 700,
                marginBottom: '1.25rem',
                color: '#ffffff'
              }}>
                Where Haute Couture <br />
                <span style={{
                  background: 'linear-gradient(90deg, #f43f5e 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Meets Everyday Grace
                </span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: '#cbd5e1',
                lineHeight: 1.6,
                maxWidth: '520px',
                marginBottom: '2rem'
              }}>
                Discover handwoven Banarasi silks, fluid French chiffon gowns, and master-tailored blazers curated for unforgettable occasions.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    setSelectedCategory('all');
                    navigate('products');
                  }}
                >
                  Explore Collection <ArrowRight size={18} />
                </button>

                <button 
                  className="btn btn-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onClick={() => {
                    setSelectedCategory('sale');
                    navigate('products', { category: 'sale' });
                  }}
                >
                  <Flame size={18} color="#fb923c" /> Flash Deals (Up to 60% Off)
                </button>
              </div>

              {/* Trust Indicators */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>50,000+</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Happy Customers</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>4.9 ★</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Trustpilot Rating</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>24H</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fast Dispatch</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Stack */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80" 
                  alt="Fashion Model Showcase"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />

                {/* Floating Card Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span className="badge badge-sale" style={{ marginBottom: '4px' }}>Limited Edition</span>
                    <h4 style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700 }}>Aurelia Tiered Chiffon Maxi</h4>
                    <span style={{ fontSize: '0.85rem', color: '#fb7185', fontWeight: 700 }}>₹1,899 <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.75rem' }}>₹3,499</span></span>
                  </div>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate('product-details', { productId: 'prod-1' })}
                  >
                    View Style
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          #hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* 2. Shop By Category Visual Cards */}
      <section style={{ padding: '4rem 0 2rem' }}>
        <div className="app-container">
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Curated Aesthetics
              </span>
              <h2 className="font-serif" style={{ fontSize: '2rem', marginTop: '0.25rem' }}>
                Shop by Style & Occasion
              </h2>
            </div>
            <button 
              className="btn btn-ghost"
              onClick={() => {
                setSelectedCategory('all');
                navigate('products');
              }}
            >
              Explore All <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { id: 'women', name: "Women's Dresses", img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80', count: '12 Styles' },
              { id: 'ethnic', name: 'Festive & Sarees', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', count: '6 Styles' },
              { id: 'men', name: "Men's Sartorial", img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', count: '8 Styles' },
              { id: 'party', name: 'Evening & Galas', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80', count: '5 Styles' },
              { id: 'western', name: 'Chic Daily Wear', img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80', count: '7 Styles' },
            ].map(item => (
              <div 
                key={item.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '260px'
                }}
                onClick={() => {
                  setSelectedCategory(item.id);
                  navigate('products', { category: item.id });
                }}
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem'
                }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700 }}>{item.name}</h4>
                  <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deal of the Day with Live Countdown */}
      <section style={{
        background: 'var(--bg-subtle)',
        padding: '3.5rem 0',
        margin: '2rem 0',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="app-container">
          <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-sale">
                  <Flame size={13} fill="#dc2626" /> Limited Flash Drop
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Up to 56% Instant Discount</span>
              </div>
              <h2 className="font-serif" style={{ fontSize: '2rem' }}>Deals of the Day</h2>
            </div>

            {/* Countdown Clock */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.6rem 1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Clock size={20} color="var(--primary)" />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Ends in:</span>
              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                <span style={{ background: 'var(--bg-subtle)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                :
                <span style={{ background: 'var(--bg-subtle)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                :
                <span style={{ background: 'var(--bg-subtle)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--primary)' }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Flash Deals Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {dealProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tabbed Product Showcases (Trending / Bestsellers / New) */}
      <section style={{ padding: '3rem 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Handcrafted Perfection
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.25rem', marginTop: '0.25rem' }}>
              Featured Wardrobe Highlights
            </h2>

            {/* Showcase Tabs */}
            <div style={{
              display: 'inline-flex',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-full)',
              padding: '4px',
              marginTop: '1.5rem'
            }}>
              {[
                { id: 'trending', label: '🔥 Trending Now' },
                { id: 'bestsellers', label: '👑 Bestsellers' },
                { id: 'new', label: '✨ New Arrivals' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1.25rem' }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {getShowcaseProducts().map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => {
                setSelectedCategory('all');
                navigate('products');
              }}
            >
              View Full Fashion Catalog ({products.length} Designs) →
            </button>
          </div>
        </div>
      </section>

      {/* 5. Customer Love & Testimonials */}
      <section style={{
        background: 'var(--bg-subtle)',
        padding: '4rem 0',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Real Buyer Experiences
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.25rem', marginTop: '0.25rem' }}>
              Loved by Fashion Lovers Across India
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                name: 'Ananya Sharma',
                city: 'Bengaluru',
                role: 'Fashion Blogger',
                comment: 'The Aurelia Chiffon Maxi was delivered in 2 days. The craftsmanship and fabric weight feel like something straight out of an upscale Parisian boutique!',
                rating: 5,
                product: 'Aurelia Chiffon Maxi'
              },
              {
                name: 'Rohan Kapoor',
                city: 'Mumbai',
                role: 'Creative Director',
                comment: 'Finding a linen blazer that balances breathability with structured tailoring is tough. Sartoria Milano exceeded my expectations. 10/10 fit.',
                rating: 5,
                product: 'Slim-Fit Linen Blazer'
              },
              {
                name: 'Divya Ravichandran',
                city: 'Chennai',
                role: 'Architect',
                comment: 'The Varanasi silk saree was the highlight of our family wedding. The antique zari sheen is authentic and the doorstep return policy gives great peace of mind.',
                rating: 5,
                product: 'Banarasi Silk Saree'
              }
            ].map((t, idx) => (
              <div key={idx} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  "{t.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.city} • {t.role}</span>
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
