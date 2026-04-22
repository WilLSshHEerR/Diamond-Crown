import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import tattoo1 from '../assets/tattoo1.png';
import tattoo2 from '../assets/tattoo2.png';
import tattoo3 from '../assets/tattoo3.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';

const images = [tattoo1, tattoo2, tattoo3];

const HomePage = ({ onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleProductClick = (productData) => {
    if (onProductClick) {
      onProductClick(productData);
    }
  };

  return (
    <div className="home-page">
      {/* Buscador Fijo */}
      <div className="fixed-search-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="search-container glass-card"
        >
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
          />
        </motion.div>
      </div>

      <section className="hero">
        <div className="hero-overlay" style={{ background: 'transparent', justifyContent: 'flex-start', paddingTop: '10px' }}>

          {/* Carrusel */}
          <div className="carousel-wrapper">
            <div className="carousel-container">
              <AnimatePresence>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="carousel-image"
                  alt={`Tattoo ${currentIndex + 1}`}
                />
              </AnimatePresence>
              
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Productos en cuadrícula */}
          <div className="products-grid">
            <div 
              className="product-card" 
              onClick={() => handleProductClick({ title: 'Aftercare Balm', price: '$25.00', image: product1, description: 'Bálsamo regenerador premium para el cuidado óptimo de tu nuevo tatuaje. Formulado con ingredientes naturales para acelerar la cicatrización y preservar el color.' })}
            >
              <div className="product-image-container">
                <img src={product1} alt="Aftercare Cream" className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-title">Aftercare Balm</h3>
                <p className="product-price">$25.00</p>
                <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); console.log('Añadido'); }}>
                  <ShoppingCart size={16} />
                  <span>Añadir</span>
                </button>
              </div>
            </div>

            <div 
              className="product-card"
              onClick={() => handleProductClick({ title: 'Crown T-Shirt', price: '$45.00', image: product2, description: 'Camiseta exclusiva Diamond Crown. Algodón premium de alto gramaje con diseño impreso de larga durabilidad. Representa el estilo y la elegancia de nuestro estudio.' })}
            >
              <div className="product-image-container">
                <img src={product2} alt="Luxury T-Shirt" className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-title">Crown T-Shirt</h3>
                <p className="product-price">$45.00</p>
                <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); console.log('Añadido'); }}>
                  <ShoppingCart size={16} />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default HomePage;
