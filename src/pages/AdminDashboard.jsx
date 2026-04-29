import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Package,
  UserRound,
  TrendingUp,
  Settings,
  Bell,
  Clock,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [stats, setStats] = useState({
    bookings: 0,
    products: 0,
    artists: 0
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [bookingsSnap, productsSnap, artistsSnap] = await Promise.all([
        getDocs(collection(db, 'bookings')),
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'artists'))
      ]);

      setStats({
        bookings: bookingsSnap.size,
        products: productsSnap.size,
        artists: artistsSnap.size
      });

      // Fetch all bookings for the management tab
      const allBookings = bookingsSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setBookings(allBookings);
      setRecentBookings(allBookings.slice(0, 5));

    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
      fetchStats();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'bookings', id));
        fetchStats();
      } catch (err) {
        console.error("Error deleting booking:", err);
      }
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const menuItems = [
    { id: 'overview', icon: TrendingUp, label: 'Resumen' },
    { id: 'bookings', icon: Calendar, label: 'Citas' },
    { id: 'artists', icon: UserRound, label: 'Artistas' },
    { id: 'products', icon: Package, label: 'Productos' },
  ];

  const renderBookings = () => {
    const filteredBookings = bookings.filter(b => 
      bookingFilter === 'all' ? true : b.status === bookingFilter
    );

    return (
      <div className="admin-bookings">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
          {['all', 'pending', 'confirmed'].map(filter => (
            <button 
              key={filter}
              onClick={() => setBookingFilter(filter)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: bookingFilter === filter ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: bookingFilter === filter ? 'black' : 'white',
                border: 'none',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', borderRadius: '20px' }}>
            <p style={{ color: 'var(--muted)' }}>No hay citas en esta categoría.</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking.id} className="glass-card" style={{ padding: '20px', borderRadius: '20px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'white' }}>{booking.customerName}</h4>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>{booking.customerPhone}</p>
                </div>
                <span style={{ 
                  fontSize: '10px', 
                  padding: '4px 10px', 
                  borderRadius: '10px', 
                  background: booking.status === 'confirmed' ? 'rgba(76,175,80,0.1)' : 'rgba(212,175,55,0.1)',
                  color: booking.status === 'confirmed' ? '#4CAF50' : 'var(--primary)',
                  fontWeight: 'bold'
                }}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', marginBottom: '10px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: 'white' }}><strong>Artista:</strong> {booking.artist}</p>
                <p style={{ margin: 0, fontSize: '13px', color: 'white' }}><strong>Fecha:</strong> {booking.date} • {booking.time}</p>
              </div>

              {booking.description && (
                <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>
                  "{booking.description}"
                </p>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => deleteBooking(booking.id)}
                  style={{ background: 'rgba(255,77,77,0.1)', color: '#ff4d4d', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}
                >
                  Eliminar
                </button>
                {booking.status === 'pending' && (
                  <button 
                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                    style={{ background: 'var(--primary)', color: 'black', border: 'none', padding: '8px 15px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderOverview = () => (
    <div className="admin-overview">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <Calendar color="#4CAF50" size={24} style={{ marginBottom: '10px' }} />
          <h3 style={{ margin: 0, fontSize: '24px', color: 'white' }}>{stats.bookings}</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>Citas totales</p>
        </div>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <Package color="#2196F3" size={24} style={{ marginBottom: '10px' }} />
          <h3 style={{ margin: 0, fontSize: '24px', color: 'white' }}>{stats.products}</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>Productos</p>
        </div>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
          <UserRound color="#9C27B0" size={24} style={{ marginBottom: '10px' }} />
          <h3 style={{ margin: 0, fontSize: '24px', color: 'white' }}>{stats.artists}</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>Artistas</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', marginBottom: '30px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'white' }}>Citas Recientes</h4>
        {recentBookings.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: '14px', textAlign: 'center' }}>No hay citas registradas.</p>
        ) : (
          recentBookings.map((booking) => (
            <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <p style={{ margin: 0, color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{booking.customerName || 'Cliente'}</p>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px' }}>{booking.artist} • {booking.time}</p>
              </div>
              <span style={{
                fontSize: '11px',
                color: booking.status === 'confirmed' ? '#4CAF50' : '#FF9800',
                background: booking.status === 'confirmed' ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)',
                padding: '4px 8px',
                borderRadius: '10px',
                fontWeight: 'bold'
              }}>
                {booking.date}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );

  return (
    <div className="admin-dashboard" style={{
      minHeight: '100vh',
      padding: '20px',
      paddingTop: 'calc(20px + env(safe-area-inset-top))',
      paddingBottom: 'calc(40px + env(safe-area-inset-bottom))',
      background: 'var(--background)',
      color: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }} className="gold-gradient">Superadmin</h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Panel de Control</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={fetchStats} className="glass-card" style={{ padding: '10px', borderRadius: '12px' }}>
            <RefreshCw size={20} className={loading ? 'spin' : ''} />
          </button>
          <button onClick={handleLogout} className="glass-card" style={{ padding: '10px', borderRadius: '12px', color: '#ff4d4d' }}>
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '20px',
        marginBottom: '10px',
        scrollbarWidth: 'none'
      }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '30px',
              background: activeTab === item.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: activeTab === item.id ? 'white' : 'var(--muted)',
              border: 'none',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab !== 'overview' && activeTab !== 'bookings' && (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <p style={{ color: 'var(--muted)' }}>Módulo de {activeTab} en desarrollo...</p>
          </div>
        )}
      </div>

      <style>{`
        /* Estilos base del dashboard */
      `}</style>
    </div>
  );
};

export default AdminDashboard;
