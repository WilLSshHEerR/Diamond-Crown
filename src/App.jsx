import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, ShoppingCart, User } from 'lucide-react';
import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import BookingPage from './pages/Booking';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage onProductClick={handleProductSelect} />;
      case 'product-detail': return <ProductDetail product={selectedProduct} onBack={() => setActiveTab('home')} />;
      case 'shop': return <ShopPage onProductClick={handleProductSelect} onBookAppointment={() => setActiveTab('booking')} />;
      case 'booking': return <BookingPage onBack={() => setActiveTab('home')} />;
      case 'profile': return <div style={{ padding: '20px' }}><h2>Perfil</h2><p>Configuración de usuario</p></div>;
      default: return <HomePage onProductClick={handleProductSelect} />;
    }
  };

  const navItems = [
    { id: 'shop', icon: ShoppingCart, label: 'Tienda' },
    { id: 'home', icon: HomeIcon, label: 'Inicio', isMain: true },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="app-container">
      <Header />
      <div className="content-scroll">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
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
