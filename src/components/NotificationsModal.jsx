import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Package, Calendar, Tag } from 'lucide-react';

const NotificationsModal = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: 'Cita Confirmada',
      message: 'Tu cita con el artista Alex para mañana a las 10:00 AM ha sido confirmada.',
      time: 'Hace 2 horas',
      icon: Calendar,
      color: '#881d1d',
      unread: true
    },
    {
      id: 2,
      title: 'Pedido Enviado',
      message: 'Tu Aftercare Balm está en camino. Rastrea tu pedido aquí.',
      time: 'Hace 5 horas',
      icon: Package,
      color: '#d4af37',
      unread: true
    },
    {
      id: 3,
      title: 'Nueva Promoción',
      message: 'Obtén un 20% de descuento en tu próximo tatuaje durante el mes de mayo.',
      time: 'Ayer',
      icon: Tag,
      color: '#881d1d',
      unread: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(5px)',
              zIndex: 20000
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '100px',
              left: '5%',
              right: '5%',
              maxHeight: '70vh',
              background: 'rgba(20, 20, 20, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '20px',
              zIndex: 20001,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell size={20} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: '18px', color: 'white' }}>Notificaciones</h3>
              </div>
              <button onClick={onClose} style={{ color: 'var(--muted)' }}>
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  style={{
                    padding: '15px',
                    borderRadius: '16px',
                    background: notif.unread ? 'rgba(136, 29, 29, 0.05)' : 'transparent',
                    border: notif.unread ? '1px solid rgba(136, 29, 29, 0.2)' : '1px solid transparent',
                    marginBottom: '10px',
                    display: 'flex',
                    gap: '15px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <notif.icon size={20} color={notif.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'white', marginBottom: '4px' }}>{notif.title}</h4>
                      {notif.unread && <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>}
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.4' }}>{notif.message}</p>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', display: 'block' }}>{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button style={{
              marginTop: '15px',
              padding: '12px',
              textAlign: 'center',
              color: 'var(--primary)',
              fontSize: '14px',
              fontWeight: '600',
              width: '100%'
            }}>
              Marcar todas como leídas
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsModal;
