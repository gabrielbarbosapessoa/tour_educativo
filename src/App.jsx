import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Inicio from './pages/Inicio/inicio.jsx';
import Passeios from './pages/Passeios/Passeios.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/passeios" element={<Passeios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;