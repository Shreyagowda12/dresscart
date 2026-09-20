import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  User, 
  Grid, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X 
} from 'lucide-react';
import { useApp } from './context/AppContext';

// Common Components
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ReturnsPage from './pages/ReturnsPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const { 
    currentPage, 
    navigate, 
    cartCount, 
    wishlist, 
    toasts, 
    removeToast 
  } = useApp();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductListPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'account':
        return <AccountPage />;
      case 'login':
        return <LoginPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-shell">
      {/* Global Header & Nav */}
      <Header />
      <Navbar />

      {/* Dynamic Viewport */}
      <main className="main-content">
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Dynamic Toasts */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className="toast">
              {toast.type === 'success' && <CheckCircle2 size={18} color="var(--success)" />}
              {toast.type === 'error' && <AlertCircle size={18} color="var(--danger)" />}
              {toast.type === 'info' && <Info size={18} color="var(--secondary)" />}
              <div style={{ flex: 1 }}>{toast.message}</div>
              <button 
                onClick={() => removeToast(toast.id)}
                style={{ color: 'var(--text-muted)', display: 'flex' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <div 
          className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => navigate('home')}
        >
          <Home size={20} />
          <span>Home</span>
        </div>

        <div 
          className={`mobile-nav-item ${currentPage === 'products' ? 'active' : ''}`}
          onClick={() => navigate('products')}
        >
          <Grid size={20} />
          <span>Shop</span>
        </div>

        <div 
          className={`mobile-nav-item ${currentPage === 'wishlist' ? 'active' : ''}`}
          onClick={() => navigate('wishlist')}
        >
          <Heart size={20} />
          <span>Wishlist</span>
          {wishlist.length > 0 && (
            <span className="badge-count" style={{ top: '4px', right: '18px' }}>
              {wishlist.length}
            </span>
          )}
        </div>

        <div 
          className={`mobile-nav-item ${currentPage === 'cart' ? 'active' : ''}`}
          onClick={() => navigate('cart')}
        >
          <ShoppingBag size={20} />
          <span>Bag</span>
          {cartCount > 0 && (
            <span className="badge-count" style={{ top: '4px', right: '18px' }}>
              {cartCount}
            </span>
          )}
        </div>

        <div 
          className={`mobile-nav-item ${currentPage === 'account' || currentPage === 'login' ? 'active' : ''}`}
          onClick={() => navigate('account')}
        >
          <User size={20} />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
}
