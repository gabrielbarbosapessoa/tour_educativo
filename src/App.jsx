import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Inicio from './pages/Inicio/inicio.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        {/* Você pode adicionar mais rotas aqui, como para a página de dashboard, etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;