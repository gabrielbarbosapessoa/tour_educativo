// Seu arquivo Passeios.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasseioCard from '../../components/PasseioCard/PasseioCard.jsx';
import './Passeios.css';

const initialPasseiosData = [
  { id: 1, name: 'Passeio 1', image: null },
  { id: 2, name: 'Passeio 2', image: null },
  { id: 3, name: 'Passeio 3', image: null },
];

const Passeios = () => {
  const [passeios, setPasseios] = useState(initialPasseiosData);

  const handleAddPasseio = () => {
    const newId = passeios.length > 0 ? Math.max(...passeios.map(p => p.id)) + 1 : 1;
    const newPasseio = { id: newId, name: `Passeio ${newId}`, image: null };
    setPasseios(prev => [...prev, newPasseio]);
  };

  return (
    <>
      <Navbar />
      <div className="passeios-page-container">
        <div className="cards-grid">
          {passeios.map(p => (
            <PasseioCard key={p.id} name={p.name} image={p.image} />
          ))}
        </div>
        {/* O botão precisa estar dentro desta div para ser centralizado pelo flexbox */}
        <button className="add-passeio-button" onClick={handleAddPasseio}>
          Adicionar Passeio
        </button>
      </div>
    </>
  );
};

export default Passeios;