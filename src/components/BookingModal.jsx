import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, MessageSquare, CheckCircle, ChevronRight, ChevronLeft, Clock, Image as ImageIcon, Trash2, Upload } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    artist: '',
    date: '',
    time: '',
    description: '',
    name: '',
    phone: '',
    images: []
  });

  const artists = [
    { id: 1, name: 'Marcus Aurelio', specialty: 'Realismo / Black & Grey' },
    { id: 2, name: 'Elena Vence', specialty: 'Minimalista / Fine Line' },
    { id: 3, name: 'Cualquier Artista', specialty: 'Asignación automática' }
  ];

  const timeSlots = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const days = ["D", "L", "M", "M", "J", "V", "S"];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Guardar en Firestore
      await addDoc(collection(db, "appointments"), {
        artist: formData.artist,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        customerName: formData.name,
        customerPhone: formData.phone,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      setStep(4); // Ir al paso de éxito
    } catch (error) {
      console.error("Error al guardar la cita: ", error);
      alert("Hubo un error al agendar tu cita. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(new Date(year, month, i));
    }
    return calendarDays;
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + offset)));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 style={{ marginBottom: '20px', color: 'white' }}>Selecciona tu Artista</h3>
            {artists.map((artist) => (
              <button 
                key={artist.id}
                onClick={() => { setFormData({...formData, artist: artist.name}); handleNext(); }}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: formData.artist === artist.name ? 'rgba(136, 29, 29, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: formData.artist === artist.name ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  textAlign: 'left'
                }}
              >
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User color="white" size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: 'white' }}>{artist.name}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>{artist.specialty}</p>
                </div>
                <ChevronRight size={18} color="var(--muted)" />
              </button>
            ))}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 style={{ marginBottom: '20px', color: 'white' }}>Fecha y Hora</h3>
            
            {/* Custom Calendar */}
            <div className="custom-calendar" style={{ 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '20px', 
              padding: '15px', 
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <button onClick={() => changeMonth(-1)} style={{ color: 'white' }}><ChevronLeft size={20} /></button>
                <span style={{ color: 'white', fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={() => changeMonth(1)} style={{ color: 'white' }}><ChevronRight size={20} /></button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center' }}>
                {days.map(d => <span key={d} style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>{d}</span>)}
                {generateCalendarDays().map((date, index) => (
                  <button
                    key={index}
                    disabled={!date}
                    onClick={() => date && setFormData({...formData, date: date.toISOString().split('T')[0]})}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '10px',
                      fontSize: '14px',
                      color: date ? 'white' : 'transparent',
                      background: isSameDay(date, formData.date) ? 'var(--primary)' : 'transparent',
                      border: isSameDay(date, formData.date) ? 'none' : 'none',
                      opacity: date && date < new Date().setHours(0,0,0,0) ? 0.3 : 1,
                      pointerEvents: date && date < new Date().setHours(0,0,0,0) ? 'none' : 'auto'
                    }}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                ))}
              </div>
            </div>

            <label className="form-label">Horarios disponibles</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setFormData({...formData, time})}
                  style={{
                    padding: '15px',
                    background: formData.time === time ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                    border: formData.time === time ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: formData.time === time ? 'bold' : 'normal',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button onClick={handleBack} className="glass-card" style={{ padding: '15px', borderRadius: '12px', color: 'white', flex: 1 }}>Atrás</button>
              <button onClick={handleNext} className="gold-button" style={{ flex: 2 }} disabled={!formData.date || !formData.time}>Continuar</button>
            </div>
          </motion.div>
        );
      case 3:
        const handleImageUpload = (e) => {
          const files = Array.from(e.target.files);
          const newImages = files.map(file => URL.createObjectURL(file));
          setFormData({...formData, images: [...formData.images, ...newImages]});
        };

        const removeImage = (index) => {
          const updatedImages = formData.images.filter((_, i) => i !== index);
          setFormData({...formData, images: updatedImages});
        };

        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 style={{ marginBottom: '20px', color: 'white' }}>Detalles y Contacto</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Imágenes de Referencia</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {formData.images.map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={img} alt="Reference" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      onClick={() => removeImage(idx)}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '5px' }}
                    >
                      <Trash2 size={14} color="white" />
                    </button>
                  </div>
                ))}
                <label style={{ 
                  aspectRatio: '1', 
                  border: '2px dashed rgba(255,255,255,0.1)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  gap: '5px'
                }}>
                  <Upload size={24} color="var(--primary)" />
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Subir</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="form-label">Tu Idea</label>
              <textarea 
                className="form-input"
                placeholder="Cuéntanos tu idea (estilo, tamaño, zona)..."
                style={{ minHeight: '100px' }}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label className="form-label">Nombre</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Nombre completo"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label className="form-label">Teléfono</label>
              <input 
                type="tel" 
                className="form-input"
                placeholder="Ej. +52 123 456 7890"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button onClick={handleBack} className="glass-card" style={{ padding: '15px', borderRadius: '12px', color: 'white', flex: 1 }}>Atrás</button>
              <button 
                onClick={handleSubmit} 
                className="gold-button" 
                style={{ flex: 2 }}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Confirmar Cita'}
              </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            style={{ textAlign: 'center', padding: '40px 20px' }}
          >
            <CheckCircle size={80} color="#4CAF50" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: 'white', marginBottom: '10px' }}>¡Solicitud Enviada!</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
              Hemos recibido tu solicitud para el día <strong>{formData.date}</strong> a las <strong>{formData.time}</strong> con <strong>{formData.artist}</strong>.
            </p>
            <p style={{ color: 'var(--muted)', marginTop: '10px' }}>Te contactaremos pronto para confirmar.</p>
            <button 
              onClick={onClose} 
              className="gold-button" 
              style={{ marginTop: '30px', width: '100%' }}
            >
              Cerrar
            </button>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 30000
            }}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '85vh',
              background: 'var(--background)',
              borderTopLeftRadius: '32px',
              borderTopRightRadius: '32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '25px',
              zIndex: 30001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ width: '40px', height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', margin: '0 auto 20px auto' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={24} color="var(--primary)" />
                <h2 style={{ margin: 0, fontSize: '20px', color: 'white' }}>Agenda tu Cita</h2>
              </div>
              <button onClick={onClose} style={{ color: 'white' }}>
                <X size={28} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {renderStep()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
