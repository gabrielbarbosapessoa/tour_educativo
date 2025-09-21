import React from 'react';
import './PasseioCard.css';

const PasseioCard = ({ passeio, onClick }) => {
    // Gera uma imagem aleatória só com base no ID (assim cada passeio tem uma fixa)
    const randomImage = `https://picsum.photos/seed/${passeio.id}/300/200`;

    return (
        <div className="passeio-card" onClick={() => onClick(passeio)}>
            <div className="card-image-placeholder">
                <img src={randomImage} alt={passeio.nome} className="card-image" />
            </div>
            <div className="card-name">{passeio.nome}</div>
        </div>
    );
};

export default PasseioCard;
