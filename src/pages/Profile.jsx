import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Calendar, 
  History, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  ChevronLeft,
  Clock,
  Package,
  MapPin,
  CheckCircle
} from 'lucide-react';

import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchMyBookings = async () => {
        setLoading(true);
        try {
          const q = query(
            collection(db, 'bookings'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const bookings = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMyBookings(bookings);
        } catch (error) {
          console.error("Error fetching my bookings:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMyBookings();
    }
  }, [user]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const menuItems = [
    { id: 'appointments', icon: Calendar, label: 'Mis Citas' },
    { id: 'history', icon: History, label: 'Historial de Compras' },
    { id: 'payments', icon: CreditCard, label: 'Métodos de Pago' },
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'appointments':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <button onClick={() => setActiveSection(null)} style={{ color: 'white' }}><ChevronLeft size={24} /></button>
              <h2 style={{ margin: 0, fontSize: '20px', color: 'white' }}>Mis Citas</h2>
            </div>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: '30px', height: '30px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto' }} />
              </div>
            ) : myBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                <Calendar size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
                <p>Aún no tienes citas agendadas.</p>
              </div>
            ) : myBookings.map((booking) => (
              <div key={booking.id} className="glass-card" style={{ padding: '20px', borderRadius: '20px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ 
                    background: booking.status === 'confirmed' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)', 
                    color: booking.status === 'confirmed' ? '#4CAF50' : '#FF9800',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: '12px' }}>#{booking.id.slice(0, 6).toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar color="white" size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'white', fontSize: '16px' }}>{booking.artist}</h4>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                      {booking.date} • {booking.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      case 'history':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <button onClick={() => setActiveSection(null)} style={{ color: 'white' }}><ChevronLeft size={24} /></button>
              <h2 style={{ margin: 0, fontSize: '20px', color: 'white' }}>Historial</h2>
            </div>
            
            {['Aftercare Balm', 'T-Shirt Diamond Crown', 'E-Gift Card'].map((product, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package color="var(--primary)" size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, color: 'white', fontSize: '14px' }}>{product}</h4>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--muted)', fontSize: '12px' }}>Completado • 12 Abr</p>
                </div>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>${(idx + 1) * 25}.00</span>
              </div>
            ))}
          </motion.div>
        );
      case 'payments':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <button onClick={() => setActiveSection(null)} style={{ color: 'white' }}><ChevronLeft size={24} /></button>
              <h2 style={{ margin: 0, fontSize: '20px', color: 'white' }}>Pagos</h2>
            </div>
            
            <div style={{ 
              width: '100%', 
              height: '180px', 
              background: 'linear-gradient(135deg, #881d1d 0%, #330000 100%)',
              borderRadius: '24px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(136, 29, 29, 0.3)',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '45px', height: '30px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px' }}></div>
                <h3 style={{ color: 'white', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>VISA</h3>
              </div>
              <div>
                <p style={{ color: 'white', letterSpacing: '4px', fontSize: '18px', margin: '0 0 15px 0' }}>•••• •••• •••• 4829</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', margin: 0, textTransform: 'uppercase' }}>Titular</p>
                    <p style={{ color: 'white', fontSize: '14px', margin: 0 }}>DIANNA CROWN</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', margin: 0, textTransform: 'uppercase' }}>Expira</p>
                    <p style={{ color: 'white', fontSize: '14px', margin: 0 }}>12/28</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="gold-button" style={{ width: '100%' }}>
              Agregar Nuevo Método
            </button>
          </motion.div>
        );
      default:
        return (
          <div className="profile-page-content">
            {/* Header del Perfil */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="profile-header glass-card"
            >
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  <User size={50} color="white" />
                </div>
                <button className="edit-avatar-btn">
                  <Settings size={14} color="#333" />
                </button>
              </div>
              
              <h2 className="profile-name">{user?.email === 'admin@diamondcrown.com' ? 'Super Administrador' : (user?.displayName || 'Usuario')}</h2>
              <p className="profile-membership">{user?.email === 'admin@diamondcrown.com' ? 'Acceso Total • Diamond Crown' : (user?.email || 'Miembro Premium')}</p>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <p>12</p>
                  <p>Citas</p>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div className="stat-item">
                  <p>850</p>
                  <p>Puntos</p>
                </div>
              </div>
            </motion.div>

            {/* Menú de Opciones */}
            <div className="profile-menu">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="menu-item glass-card"
                >
                  <div className="menu-item-left">
                    <div className="menu-icon-wrapper">
                      <item.icon size={22} color="var(--primary)" />
                    </div>
                    <span className="menu-label">{item.label}</span>
                  </div>
                  <ChevronRight size={18} color="var(--muted)" />
                </motion.button>
              ))}
            </div>

            {/* Botón de Cerrar Sesión */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Cerrar Sesión
            </motion.button>
          </div>
        );
    }
  };

  return (
    <div className="profile-page" style={{ paddingBottom: '100px' }}>
      <AnimatePresence mode="wait">
        <div key={activeSection || 'main'}>
          {renderSection()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
