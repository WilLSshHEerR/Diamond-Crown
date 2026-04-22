import React from 'react';
import { motion } from 'framer-motion';

const BookingPage = () => {
  return (
    <div className="booking-page" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px', marginTop: '20px' }}>
        <h2 className="gold-gradient" style={{ fontSize: '24px' }}>Agenda tu Cita</h2>
        <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Inicia tu viaje hacia una obra de arte eterna.</p>
      </header>

      <form className="booking-form">
        <div className="input-group">
          <label>Nombre Completo</label>
          <input type="text" placeholder="Ej. Juan Pérez" />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" />
        </div>
        <div className="input-group">
          <label>Idea del Tatuaje</label>
          <textarea placeholder="Describe tu idea, tamaño y ubicación..." rows="4"></textarea>
        </div>
        <div className="input-group">
          <label>Artista Preferido</label>
          <select>
            <option>Cualquier Artista</option>
            <option>Marcus Aurelio</option>
            <option>Elena Vence</option>
          </select>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          className="gold-button"
          style={{ width: '100%', marginTop: '10px' }}
        >
          Enviar Solicitud
        </motion.button>
      </form>
    </div>
  );
};

export default BookingPage;
