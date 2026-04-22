import React from 'react';
import logo from '../assets/Logo_diamond.png';

const Header = () => {
  return (
    <header className="floating-header">
      <div className="header-container glass-card">
        <img src={logo} alt="Diamond Crown Logo" className="header-logo" />
      </div>
    </header>
  );
};

export default Header;
