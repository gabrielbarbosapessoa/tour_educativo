// Seu novo arquivo PasseioDetailModal.jsx
import React from 'react';
import './PasseioDetailModal.css'; // Certifique-se de que o CSS está no caminho correto

const PasseioDetailModal = ({ passeio, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="passeio-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-image-placeholder">
          {/* Espaço para a imagem */}
        </div>
        <div className="detail-modal-content">
          <h2 className="detail-modal-title">{passeio.name}</h2>
          <div className="detail-modal-info">
            <p><strong>Nome do Passeio:</strong> {passeio.name}</p>
            <p><strong>Quant. de Alunos:</strong> {passeio.quantAlunos}</p>
            <p><strong>Unidade:</strong> {passeio.unidade}</p>
            <p><strong>Local:</strong> {passeio.local}</p>
            <p><strong>Valor:</strong> R${passeio.valor.toFixed(2)}</p>
            <p><strong>Data:</strong> {passeio.data}</p>
          </div>
          <button className="edit-button">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasseioDetailModal;