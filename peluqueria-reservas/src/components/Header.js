import React from 'react';
import logo from '../assets/logo.png';  

const Header = () => {
  return (
    <section className="header">
      <div className="logo">
        <img src={logo} alt="Logo Peluquería" className='logo' />
      </div>
      <h1>Peluquería para hombres</h1>
    </section>
  );
};

export default Header;