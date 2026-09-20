import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_PRODUCTS, 
  MOCK_COUPONS, 
  INITIAL_ADDRESSES, 
  INITIAL_ORDERS, 
  INITIAL_RETURNS 
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Navigation state
  const [currentPage, setCurrentPage] = useState('home');
  const [navParams, setNavParams] = useState({});

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Theme state (Light / Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dresscart_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dresscart_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. User & Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dresscart_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+91 98765 43210',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    };
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('dresscart_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dresscart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dresscart_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dresscart_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const login = (email, password) => {
    const newUser = {
      name: email.split('@')[0] || 'User',
      email,
      phone: '+91 98888 12345',
      role: email.includes('admin') ? 'admin' : 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
    navigate(newUser.role === 'admin' ? 'admin' : 'home');
  };

  const demoLogin = (role = 'customer') => {
    if (role === 'admin') {
      const adminUser = {
        name: 'Store Manager (Admin)',
        email: 'admin@dresscart.com',
        phone: '+91 99999 00000',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      };
      setUser(adminUser);
      showToast('Logged in as Store Administrator', 'info');
      navigate('admin');
    } else {
      const customerUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+91 98765 43210',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      };
      setUser(customerUser);
      showToast('Logged in as Jane Doe', 'success');
      navigate('home');
    }
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out', 'info');
    navigate('home');
  };

  const addAddress = (newAddr) => {
    const item = { ...newAddr, id: `addr-${Date.now()}` };
    if (item.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(item));
    } else {
      setAddresses(prev => [...prev, item]);
    }
    showToast('New shipping address saved', 'success');
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    showToast('Default delivery address updated', 'success');
  };

  // 4. Products Catalog (Editable for Admin)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dresscart_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('dresscart_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd) => {
    const product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: 4.8,
      reviewsCount: 1,
      reviews: []
    };
    setProducts(prev => [product, ...prev]);
    showToast('New product added to catalog', 'success');
  };

  const updateProductStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Number(newStock) } : p));
    showToast('Inventory updated', 'info');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  // 5. Cart Management
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dresscart_cart');
    return saved ? JSON.parse(saved) : [
      {
        cartItemId: 'item-1',
        id: 'prod-1',
        name: 'Aurelia Floral Tiered Chiffon Maxi Dress',
        brand: 'Noir & Silk',
        price: 1899,
        originalPrice: 3499,
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Blush Rose',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dresscart_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size = 'M', color = null, quantity = 1) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Free Size';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === chosenSize && item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          cartItemId: `cart-${Date.now()}-${Math.random()}`,
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          image: product.images ? product.images[0] : ''
        }
      ];
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to your bag!`, 'success');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from your bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const cartDiscount = cartOriginalTotal - cartSubtotal;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 6. Wishlist Management
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('dresscart_wishlist');
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-4'];
  });

  useEffect(() => {
    localStorage.setItem('dresscart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const prodId = typeof product === 'string' ? product : product.id;
    setWishlist(prev => {
      const exists = prev.includes(prodId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter(id => id !== prodId);
      } else {
        showToast('Saved to your wishlist ❤️', 'success');
        return [...prev, prodId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const moveWishlistToCart = (product, size = 'M') => {
    addToCart(product, size);
    toggleWishlist(product);
  };

  // 7. Coupons & Discounts
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCoupon = (codeStr) => {
    const code = codeStr.trim().toUpperCase();
    const found = MOCK_COUPONS.find(c => c.code === code);

    if (!found) {
      showToast('Invalid coupon code. Try WELCOME10 or FLAT500', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    if (cartSubtotal < found.minOrder) {
      const msg = `Order subtotal must be at least ₹${found.minOrder} to use this coupon`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  let couponSavings = 0;
  if (appliedCoupon) {
    if (appliedCoupon.flatAmount) {
      couponSavings = appliedCoupon.flatAmount;
    } else if (appliedCoupon.discountPercent) {
      couponSavings = Math.min(
        Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100),
        appliedCoupon.maxDiscount || 9999
      );
    }
  }

  // Delivery fee logic
  const isFreeDeliveryEligible = cartSubtotal >= 999 || (appliedCoupon && appliedCoupon.freeShipping);
  const deliveryFee = cart.length === 0 ? 0 : isFreeDeliveryEligible ? 0 : 99;
  const estimatedTax = Math.round(cartSubtotal * 0.05); // 5% GST on apparel
  const cartGrandTotal = Math.max(0, cartSubtotal - couponSavings + deliveryFee + estimatedTax);

  // 8. Orders & Tracking
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dresscart_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('dresscart_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = ({ address, paymentMethod, customDeliveryFee }) => {
    const newOrderId = `DC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Order Placed',
      trackingNumber: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'DressCart Prime Express',
      estimatedDelivery: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      paymentMethod,
      address,
      subtotal: cartSubtotal,
      discount: couponSavings,
      deliveryFee: customDeliveryFee !== undefined ? customDeliveryFee : deliveryFee,
      tax: estimatedTax,
      total: cartSubtotal - couponSavings + (customDeliveryFee !== undefined ? customDeliveryFee : deliveryFee) + estimatedTax,
      items: [...cart],
      timeline: [
        { step: 'Order Placed', time: 'Just Now', done: true },
        { step: 'Order Confirmed', time: 'Pending', done: false },
        { step: 'Packed & Dispatched', time: 'Pending', done: false },
        { step: 'In Transit', time: 'Pending', done: false },
        { step: 'Out for Delivery', time: 'Pending', done: false },
        { step: 'Delivered', time: 'Pending', done: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${newOrderId} placed successfully!`, 'success');
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'Cancelled',
          timeline: [...order.timeline, { step: 'Order Cancelled', time: 'Just now', done: true }]
        };
      }
      return order;
    }));
    showToast(`Order #${orderId} has been cancelled`, 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        // Update timeline
        const updatedTimeline = order.timeline.map(t => {
          if (t.step.toLowerCase().includes(newStatus.toLowerCase())) {
            return { ...t, done: true, time: 'Updated by Admin' };
          }
          return t;
        });
        return { ...order, status: newStatus, timeline: updatedTimeline };
      }
      return order;
    }));
    showToast(`Order #${orderId} status updated to ${newStatus}`, 'info');
  };

  // 9. Returns & Refunds
  const [returns, setReturns] = useState(() => {
    const saved = localStorage.getItem('dresscart_returns');
    return saved ? JSON.parse(saved) : INITIAL_RETURNS;
  });

  useEffect(() => {
    localStorage.setItem('dresscart_returns', JSON.stringify(returns));
  }, [returns]);

  const requestReturn = ({ orderId, itemId, reason, refundMethod, pickupSlot }) => {
    const order = orders.find(o => o.id === orderId);
    const item = order ? order.items.find(i => i.id === itemId) : null;

    const newReturnId = `RET-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReturn = {
      id: newReturnId,
      orderId,
      itemId,
      itemName: item ? item.name : 'Fashion Garment',
      itemImage: item ? item.image : '',
      reason,
      refundAmount: item ? item.price * (item.quantity || 1) : 1999,
      refundMethod,
      requestDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      pickupScheduled: pickupSlot || 'Tomorrow (10 AM - 1 PM)',
      status: 'Return Requested',
      timeline: [
        { label: 'Return Requested', date: 'Just now', done: true },
        { label: 'Pickup Scheduled', date: 'In 24-48 Hours', done: false },
        { label: 'Quality Check', date: 'Upon Arrival', done: false },
        { label: 'Refund Credited', date: 'Within 2 Hours of Pickup', done: false }
      ]
    };

    setReturns(prev => [newReturn, ...prev]);
    showToast(`Return request #${newReturnId} submitted!`, 'success');
    return newReturn;
  };

  const updateReturnStatus = (returnId, newStatus) => {
    setReturns(prev => prev.map(ret => {
      if (ret.id === returnId) {
        return { ...ret, status: newStatus };
      }
      return ret;
    }));
    showToast(`Return #${returnId} status updated to ${newStatus}`, 'info');
  };

  // 10. Location / Delivery Pincode Checker
  const [location, setLocation] = useState({
    city: 'Bengaluru',
    pincode: '560034'
  });

  const updateLocation = (city, pincode) => {
    setLocation({ city, pincode });
    showToast(`Delivery location set to ${city} (${pincode})`, 'info');
  };

  // 11. Live Search & Category filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 12. Toasts & Notifications
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Flash Deal Active! 🔥', desc: 'Get extra 20% off with coupon FESTIVE20', read: false, time: '10m ago' },
    { id: 'n2', title: 'Order Dispatched', desc: 'Your order #DC-918230 is in transit', read: false, time: '1h ago' }
  ]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        // Navigation
        currentPage,
        navParams,
        navigate,

        // Theme
        theme,
        toggleTheme,

        // User & Auth
        user,
        isLoggedIn: !!user,
        login,
        demoLogin,
        logout,
        addresses,
        addAddress,
        deleteAddress,
        setDefaultAddress,

        // Catalog
        products,
        addProduct,
        updateProductStock,
        deleteProduct,

        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartOriginalTotal,
        cartDiscount,
        cartCount,
        deliveryFee,
        estimatedTax,
        cartGrandTotal,
        isFreeDeliveryEligible,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,

        // Coupons
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponSavings,

        // Orders
        orders,
        placeOrder,
        cancelOrder,
        updateOrderStatus,

        // Returns
        returns,
        requestReturn,
        updateReturnStatus,

        // Location
        location,
        updateLocation,

        // Filter state
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,

        // Alerts & Toasts
        toasts,
        showToast,
        removeToast,
        notifications,
        markNotificationsAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
