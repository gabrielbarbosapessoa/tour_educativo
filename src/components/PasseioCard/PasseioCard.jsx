// Seu arquivo PasseioCard.jsx
import React from 'react';
import './PasseioCard.css'; // Certifique-se de que o CSS está no caminho correto

const PasseioCard = ({ passeio, onClick }) => {
  return (
    // Adicione a função de clique na div principal do card
    <div className="passeio-card" onClick={() => onClick(passeio)}>
      <div className="card-image-placeholder">
        {/* Aqui você pode renderizar a imagem se tiver */}
      </div>
      <div className="card-name">{passeio.name}</div>
    </div>
  );
};

export default PasseioCard;