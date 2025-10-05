import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>🚀 API Tester</h2>
        </div>
        <div className="navbar-subtitle">
          <p>AI Model Performance Testing</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
