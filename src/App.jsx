import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, ShoppingCart, User } from 'lucide-react';
import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import ProfilePage from './pages/Profile';
import NotificationsModal from './components/NotificationsModal';
import BookingModal from './components/BookingModal';

import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import LoginPage from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
  };


  const navItems = [
    { id: 'shop', icon: ShoppingCart, label: 'Tienda' },
    { id: 'home', icon: HomeIcon, label: 'Inicio', isMain: true },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  const handleNavClick = (id) => {
    if (id === 'booking') {
      setIsBookingOpen(true);
    } else {
      setActiveTab(id);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}
        />
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLoginSuccess={() => {}} />;
  }

  return (
    <div className="app-container">
      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      <Header onNotificationsClick={() => setIsNotificationsOpen(true)} />
      <div className="content-scroll">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <HomePage onProductClick={handleProductSelect} />}
            {activeTab === 'product-detail' && <ProductDetail product={selectedProduct} onBack={() => setActiveTab('home')} />}
            {activeTab === 'shop' && <ShopPage onProductClick={handleProductSelect} onBookAppointment={() => setIsBookingOpen(true)} />}
            {activeTab === 'profile' && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.isMain ? 'main-nav-item' : ''}`}
          >
            <div className={`icon-wrapper ${item.isMain ? 'main-icon' : ''}`}>
              <item.icon size={item.isMain ? 32 : 24} color={activeTab === item.id ? 'var(--primary)' : 'var(--muted)'} />
            </div>
            <span className="nav-label">
              {item.label}
            </span>
            {activeTab === item.id && !item.isMain && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="active-indicator"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
