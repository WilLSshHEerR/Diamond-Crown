import React from 'react';
import { ShoppingCart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Asumimos que podemos reutilizar las imágenes genéricas para la demostración
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import tattoo1 from '../assets/tattoo1.png';
import tattoo2 from '../assets/tattoo2.png';

const tattooProducts = [
  { id: 't1', title: 'Healing Balm', price: '$25.00', image: product1, images: [product1, tattoo1], description: 'Bálsamo curativo especializado para la regeneración rápida de la piel tatuada.' },
  { id: 't2', title: 'Antibacterial Soap', price: '$15.00', image: product1, images: [product1, tattoo2], description: 'Jabón neutro sin perfume, ideal para mantener la zona del tatuaje limpia.' },
  { id: 't3', title: 'Premium Ink Set', price: '$85.00', image: product2, images: [product2, tattoo1], description: 'Set de tintas negras intensas de uso profesional.' },
  { id: 't4', title: 'Tattoo Lotion', price: '$18.00', image: product1, images: [product1, tattoo2], description: 'Loción hidratante para uso diario una vez curado el tatuaje.' }
];

const piercingProducts = [
  { id: 'p1', title: 'Saline Spray', price: '$12.00', image: product2, images: [product2, tattoo1], description: 'Spray de solución salina estéril para limpiar perforaciones nuevas.' },
  { id: 'p2', title: 'Titanium Ring', price: '$35.00', image: product2, images: [product2, tattoo2], description: 'Aro de titanio grado implante, hipoalergénico y seguro.' },
  { id: 'p3', title: 'Aftercare Swabs', price: '$8.00', image: product1, images: [product1, tattoo1], description: 'Hisopos esterilizados para limpieza precisa de piercings.' },
  { id: 'p4', title: 'Gold Stud 14k', price: '$120.00', image: product2, images: [product2, tattoo2], description: 'Pieza de oro sólido de 14 quilates, elegante y segura.' }
];

const ShopPage = ({ onProductClick, onBookAppointment }) => {
  const handleProductClick = (productData) => {
    if (onProductClick) {
      onProductClick(productData);
    }
  };

  const renderProductGrid = (products) => (
    <div className="shop-grid">
      {products.map((prod) => (
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
  );

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
        <h2 className="section-title">Para Tatuajes</h2>
        <div className="section-divider"></div>
      </div>
      {renderProductGrid(tattooProducts)}

      {/* Categoría: Piercings */}
      <div className="section-header">
        <h2 className="section-title">Para Piercings</h2>
        <div className="section-divider"></div>
      </div>
      {renderProductGrid(piercingProducts)}

    </div>
  );
};

export default ShopPage;
