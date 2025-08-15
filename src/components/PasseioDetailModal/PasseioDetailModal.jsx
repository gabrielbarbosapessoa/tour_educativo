// src/components/PasseioDetailModal/PasseioDetailModal.jsx
import React from 'react';
import './PasseioDetailModal.css';

// Adicione a prop 'onEdit'
const PasseioDetailModal = ({ passeio, onClose, onEdit }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="passeio-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="detail-modal-image-placeholder">
                    {/* Espaço para a imagem */}
                </div>
                <div className="detail-modal-content">
                    <div className="detail-text-container">
                        <h2 className="detail-modal-title">{passeio.name}</h2>
                        <div className="detail-modal-info">
                            <p><strong>Nome do Passeio:</strong> {passeio.name}</p>
                            <p><strong>Quant. de Alunos:</strong> {passeio.quantAlunos}</p>
                            <p><strong>Unidade:</strong> {passeio.unidade}</p>
                            <p><strong>Local:</strong> {passeio.local}</p>
                            <p><strong>Valor:</strong> R${passeio.valor.toFixed(2)}</p>
                            <p><strong>Data:</strong> {passeio.data}</p>
                        </div>
                    </div>
                    <button className="edit-button" onClick={onEdit}> {/* Adicione o onClick */}
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasseioDetailModal;