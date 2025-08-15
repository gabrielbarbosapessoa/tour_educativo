import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importando useNavigate
import './Navbar.css'; 

import logoImage from '../../assets/logo-sidebar.png';

const Navbar = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); // Hook para navegação

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    // Redireciona para a página inicial "/"
    navigate('/');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <ul className="nav-links">
          <Link to="/inicio" className={`nav-link ${getActiveClass('/inicio')}`}>
            <li>Início</li>
          </Link>
          
          <Link to="/passeios" className={`nav-link ${getActiveClass('/passeios')}`}>
            <li>Passeios</li>
          </Link>

          <Link to="/reservas" className={`nav-link ${getActiveClass('/reservas')}`}>
            <li>Reservas</li>
          </Link>

          <Link to="/avaliacoes" className={`nav-link ${getActiveClass('/avaliacoes')}`}>
            <li>Avaliações</li>
          </Link>

          <Link to="/gerenciadores" className={`nav-link ${getActiveClass('/gerenciadores')}`}>
            <li>Gerenciadores</li>
          </Link>
        </ul>
      </div>

      <div className="navbar-right">
        <span className="logout-text" onClick={handleLogout}>
          Logout
        </span>
        <img src={logoImage} alt="Logo da FIEB TOUR" className="fieb-logo" />
      </div>
    </nav>
  );
};

export default Navbar;
