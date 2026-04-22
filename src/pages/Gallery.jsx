import React from 'react';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  const images = [
    { id: 1, src: '/src/assets/work1.png', category: 'Realismo' },
    { id: 2, src: '/src/assets/work2.png', category: 'Fine Line' },
    { id: 3, src: '/src/assets/hero.png', category: 'Estudio' },
    { id: 4, src: '/src/assets/work1.png', category: 'Sleeve' },
  ];

  return (
    <div className="gallery-page" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px', marginTop: '20px' }}>
        <h2 className="gold-gradient" style={{ fontSize: '24px' }}>Nuestra Obra</h2>
        <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Explora el portafolio de nuestros maestros.</p>
      </header>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="gallery-item"
          >
            <img src={img.src} alt={img.category} className="gallery-img" />
            <div className="item-overlay">
              <span>{img.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
