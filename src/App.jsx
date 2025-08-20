import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Inicio from './pages/Inicio/inicio.jsx';
import Passeios from './pages/Passeios/Passeios.jsx';
import Reservas from './pages/Reservas/Reservas.jsx';
import Avaliacoes from './pages/Avaliacoes/Avaliacoes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/passeios" element={<Passeios />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/avaliacoes" element={<Avaliacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;