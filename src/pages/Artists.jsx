import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Globe, Mail } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artists'));
        const artistsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArtists(artistsData);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

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
    <div className="artists-page" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px', marginTop: '20px' }}>
        <h2 className="gold-gradient" style={{ fontSize: '24px' }}>Artistas</h2>
        <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Conoce a los creadores detrás de la tinta.</p>
      </header>

      <div style={{ display: 'grid', gap: '25px' }}>
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
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
                border: '2px solid var(--primary)',
                backgroundImage: artist.image ? `url(${artist.image})` : 'none',
                backgroundSize: 'cover'
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
