import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

const ProductDetail = ({ product, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!product || !product.images || product.images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [product]);

  if (!product) return null;

  const imagesToDisplay = product.images || [product.image];

  return (
    <div className="product-detail-page">
      {/* Botón de regreso flotante */}
      <button className="back-btn glass-btn" onClick={onBack}>
        <ArrowLeft size={24} />
      </button>

      {/* Contenedor de la Imagen (Carrusel) */}
      <div className="product-detail-image-container">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={imagesToDisplay[currentIndex]}
            alt={`${product.title} ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "linear" }}
            className="product-detail-img"
          />
        </AnimatePresence>
        
        {imagesToDisplay.length > 1 && (
          <div className="carousel-dots" style={{ bottom: '40px' }}>
            {imagesToDisplay.map((_, index) => (
              <div 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                style={{ background: index === currentIndex ? 'var(--primary)' : 'rgba(255, 255, 255, 0.5)' }}
              />
            ))}
          </div>
        )}
        <div className="image-overlay-gradient"></div>
      </div>

      {/* Contenido (Detalles) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="product-detail-content"
      >
        <div className="product-header-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">{product.price}</p>
        </div>

        <div className="product-rating">
          <Star size={16} color="var(--primary)" fill="var(--primary)" />
          <Star size={16} color="var(--primary)" fill="var(--primary)" />
          <Star size={16} color="var(--primary)" fill="var(--primary)" />
          <Star size={16} color="var(--primary)" fill="var(--primary)" />
          <Star size={16} color="var(--primary)" fill="var(--primary)" />
          <span className="rating-text">(4.9/5)</span>
        </div>

        <div className="product-description-section">
          <h3>Descripción</h3>
          <p className="product-description-text">
            {product.description || "Este es un producto premium de Diamond Crown. Formulado o diseñado con los más altos estándares de calidad para satisfacer las necesidades de nuestros clientes más exigentes."}
          </p>
        </div>

        <div className="product-features">
          <div className="feature-pill">Envío Gratis</div>
          <div className="feature-pill">Calidad Premium</div>
        </div>
      </motion.div>

      {/* Barra de acción inferior fija */}
      <div className="bottom-action-bar">
        <button className="primary-btn full-width-btn">
          <ShoppingCart size={20} />
          <span>Añadir al Carrito</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
