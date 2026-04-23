import React from 'react';
import logo from '../assets/Logo_diamond.png';
import { Bell } from 'lucide-react';

const Header = ({ onNotificationsClick }) => {
  return (
    <header className="floating-header">
      <div className="header-container glass-card">
        <div style={{ width: '40px' }}></div> {/* Spacer to keep logo centered */}
        <img src={logo} alt="Diamond Crown Logo" className="header-logo" />
        <button 
          className="notification-btn" 
          onClick={onNotificationsClick}
          style={{ 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Bell size={24} color="white" />
          <span className="notification-badge" style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            background: 'var(--primary)',
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.5)'
          }}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
