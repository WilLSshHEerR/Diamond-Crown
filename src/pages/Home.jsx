import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import tattoo1 from '../assets/tattoo1.png';
import tattoo2 from '../assets/tattoo2.png';
import tattoo3 from '../assets/tattoo3.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';

const images = [tattoo1, tattoo2, tattoo3];

const featuredProducts = [
  { id: 1, title: 'Aftercare Balm', price: '$25.00', image: product1, images: [product1, tattoo1, tattoo2], description: 'Bálsamo regenerador premium para el cuidado óptimo de tu nuevo tatuaje. Formulado con ingredientes naturales para acelerar la cicatrización y preservar el color.' },
  { id: 2, title: 'Crown T-Shirt', price: '$45.00', image: product2, images: [product2, tattoo3, tattoo1], description: 'Camiseta exclusiva Diamond Crown. Algodón premium de alto gramaje con diseño impreso de larga durabilidad. Representa el estilo y la elegancia de nuestro estudio.' },
  { id: 3, title: 'Tattoo Lotion', price: '$18.00', image: product1, images: [product1, tattoo2, tattoo3], description: 'Loción hidratante de uso diario para mantener la piel suave y tus tatuajes vibrantes como el primer día.' },
  { id: 4, title: 'Crown Hoodie', price: '$65.00', image: product2, images: [product2, tattoo1, tattoo2], description: 'Sudadera premium con capucha, corte oversize y el logo exclusivo de Diamond Crown en la espalda.' },
  { id: 5, title: 'Tattoo Soap', price: '$15.00', image: product1, images: [product1, tattoo3, tattoo2], description: 'Jabón neutro especializado sin fragancia, ideal para lavar tu tatuaje durante las primeras semanas de cicatrización.' },
  { id: 6, title: 'Premium Ink Set', price: '$85.00', image: product2, images: [product2, tattoo1, tattoo3], description: 'Set de tintas premium de alta fijación usadas por nuestros artistas, ahora disponibles para profesionales.' }
];

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

          {/* Título de Productos */}
          <div className="section-header">
            <h2 className="section-title">Productos Destacados</h2>
            <div className="section-divider"></div>
          </div>

          {/* Productos en carrusel horizontal */}
          <div className="products-carousel">
            {featuredProducts.slice(0, 6).map((prod) => (
              <div 
                key={prod.id}
                className="product-card" 
                onClick={() => handleProductClick(prod)}
              >
                <div className="product-image-container">
                  <img src={prod.image} alt={prod.title} className="product-img" />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{prod.title}</h3>
                  <p className="product-price">{prod.price}</p>
                  <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); console.log(`Añadido ${prod.title}`); }}>
                    <ShoppingCart size={16} />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


export default HomePage;
