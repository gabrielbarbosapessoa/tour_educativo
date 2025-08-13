import React from 'react';
import './PasseioCard.css';

const PasseioCard = ({ name, image }) => {
  return (
    <div className="passeio-card">
      <div className="card-image-placeholder">
        {image && <img src={image} alt={name} className="card-image" />}
      </div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default PasseioCard;
