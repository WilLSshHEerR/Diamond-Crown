import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, LogIn, ChevronRight, AlertCircle } from 'lucide-react';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import logo from '../assets/Logo_diamond.png';

const LoginPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Usar el plugin nativo de Capacitor
      const result = await FirebaseAuthentication.signInWithGoogle();
      if (result.user) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión con Google nativo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') setError('Usuario no encontrado');
      else if (err.code === 'auth/wrong-password') setError('Contraseña incorrecta');
      else if (err.code === 'auth/email-already-in-use') setError('El correo ya está registrado');
      else setError('Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '30px',
      background: 'var(--background)',
      color: 'white'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <img src={logo} alt="Diamond Crown" style={{ width: '150px', marginBottom: '20px' }} />
        <h1 className="gold-gradient" style={{ fontSize: '28px', marginBottom: '10px' }}>Diamond Crown</h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
          {isLogin ? 'Bienvenida de nuevo a la realeza' : 'Únete a nuestra comunidad exclusiva'}
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div 
              key="name"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="input-group" 
              style={{ marginBottom: '20px' }}
            >
              <label className="form-label">Nombre Completo</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Tu nombre"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '45px' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="input-group" style={{ marginBottom: '20px' }}>
          <label className="form-label">Correo Electrónico</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="email" 
              className="form-input" 
              placeholder="tu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '45px' }}
            />
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: '25px' }}>
          <label className="form-label">Contraseña</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '45px' }}
            />
          </div>
        </div>

        {error && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            color: '#ff4444', 
            fontSize: '13px', 
            marginBottom: '20px',
            background: 'rgba(255, 68, 68, 0.1)',
            padding: '10px',
            borderRadius: '10px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button 
          disabled={loading}
          className="gold-button" 
          style={{ width: '100%', padding: '18px', fontSize: '16px', borderRadius: '16px' }}
        >
          {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', gap: '15px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase' }}>O continuar con</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '15px', 
            borderRadius: '16px', 
            background: 'white', 
            color: '#333', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            fontWeight: '600',
            fontSize: '15px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya eres miembro?'}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: 'var(--primary)', fontWeight: 'bold', marginLeft: '10px' }}
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginPage;
