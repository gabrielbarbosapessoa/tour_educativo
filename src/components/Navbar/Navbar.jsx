import React, { useState } from 'react';
import './Navbar.css'; // Importa o arquivo CSS para estilização

// Importe a imagem do logo (substitua 'caminho/para/o/logo.png' pelo caminho real)
import logoImage from '../../assets/logo.png'

const Navbar = () => {
  // Estado para controlar qual link está ativo
  const [activeLink, setActiveLink] = useState('Início');

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <ul className="nav-links">
          <li 
            className={activeLink === 'Início' ? 'active' : ''}
            onClick={() => setActiveLink('Início')}
          >
            Início
          </li>
          <li 
            className={activeLink === 'Passeios' ? 'active' : ''}
            onClick={() => setActiveLink('Passeios')}
          >
            Passeios
          </li>
          <li 
            className={activeLink === 'Avaliações' ? 'active' : ''}
            onClick={() => setActiveLink('Avaliações')}
          >
            Avaliações
          </li>
          <li 
            className={activeLink === 'Gerenciadores' ? 'active' : ''}
            onClick={() => setActiveLink('Gerenciadores')}
          >
            Gerenciadores
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <span className="logout-text">Logout</span>
        <img src={logoImage} alt="Logo da FIEB TOUR" className="fieb-logo" />
      </div>
    </nav>
  );
};

export default Navbar;