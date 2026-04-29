import React from 'react';
import { ShoppingCart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Placeholder images for when real images are not yet available in the DB
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';

const ShopPage = ({ onProductClick, onBookAppointment }) => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productData) => {
    if (onProductClick) {
      onProductClick(productData);
    }
  };

  const tattooProducts = products.filter(p => p.category === 'tattoos');
  const piercingProducts = products.filter(p => p.category === 'piercings');

  const renderProductGrid = (items) => (
    <div className="shop-grid">
      {items.map((prod) => (
        <div
          key={prod.id}
          className="product-card"
          onClick={() => handleProductClick(prod)}
        >
          <div className="product-image-container">
            <img 
              src={prod.image || (prod.category === 'tattoos' ? product1 : product2)} 
              alt={prod.title} 
              className="product-img" 
            />
          </div>
          <div className="product-info">
            <h3 className="product-title">{prod.title}</h3>
            <p className="product-price">${prod.price}</p>
            <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); console.log(`Añadido ${prod.title}`); }}>
              <ShoppingCart size={16} />
              <span>Añadir</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ width: '30px', height: '30px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}
        />
      </div>
    );
  }

  return (
    <div className="shop-page" style={{ padding: '20px', paddingTop: '10px' }}>

      {/* Botón Especial de Citas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="booking-special-banner"
        onClick={onBookAppointment}
      >
        <div className="banner-content">
          <h3>¿Listo para tu nueva obra de arte?</h3>
          <p>Agenda tu cita de tatuaje con nuestros artistas expertos.</p>
          <button className="primary-btn">
            <Calendar size={18} />
            Agendar Cita
          </button>
        </div>
      </motion.div>

      {/* Categoría: Tatuajes */}
      <div className="section-header" style={{ marginTop: '25px' }}>
        <h2 className="section-title">Tatuajes</h2>
        <div className="section-divider"></div>
      </div>
      {renderProductGrid(tattooProducts)}

      {/* Categoría: Piercings */}
      <div className="section-header">
        <h2 className="section-title">Piercings</h2>
        <div className="section-divider"></div>
      </div>
      {renderProductGrid(piercingProducts)}

    </div>
  );
};

export default ShopPage;
