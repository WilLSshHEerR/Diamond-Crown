import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

const ProductDetail = ({ product, onBack }) => {
  if (!product) return null;

  return (
    <div className="product-detail-page">
      {/* Botón de regreso flotante */}
      <button className="back-btn glass-btn" onClick={onBack}>
        <ArrowLeft size={24} />
      </button>

      {/* Contenedor de la Imagen */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="product-detail-image-container"
      >
        <img src={product.image} alt={product.title} className="product-detail-img" />
        <div className="image-overlay-gradient"></div>
      </motion.div>

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
