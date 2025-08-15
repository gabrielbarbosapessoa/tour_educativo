// src/components/PasseioCard/PasseioCard.jsx
import React from 'react';
import './PasseioCard.css';

const PasseioCard = ({ passeio, onClick }) => {
    return (
        <div className="passeio-card" onClick={() => onClick(passeio)}>
            <div className="card-image-placeholder">
                {/* Aqui você pode renderizar a imagem se tiver */}
            </div>
            <div className="card-name">{passeio.nome}</div>
        </div>
    );
};

export default PasseioCard;