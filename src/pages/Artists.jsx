import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Globe, Mail } from 'lucide-react';

const ArtistsPage = () => {
  const artists = [
    { name: 'Marcus Aurelio', specialty: 'Black & Grey Realism', bio: 'Maestro del detalle con 15 años de experiencia.' },
    { name: 'Elena Vence', specialty: 'Fine Line & Floral', bio: 'Especialista en trazos delicados y composición botánica.' },
  ];

  return (
    <div className="artists-page" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px', marginTop: '20px' }}>
        <h2 className="gold-gradient" style={{ fontSize: '24px' }}>Artistas</h2>
        <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Conoce a los creadores detrás de la tinta.</p>
      </header>

      <div style={{ display: 'grid', gap: '25px' }}>
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="glass-card"
            style={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--accent)',
                border: '2px solid var(--primary)'
              }} />
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--primary)' }}>{artist.name}</h3>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '1px' }}>{artist.specialty}</p>
              </div>
            </div>
            <p style={{ marginTop: '15px', fontSize: '13px', color: '#ccc', lineHeight: '1.5' }}>{artist.bio}</p>
            <div style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
              <Camera size={18} color="var(--muted)" />
              <Globe size={18} color="var(--muted)" />
              <Mail size={18} color="var(--muted)" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
