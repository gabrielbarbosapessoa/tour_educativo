// src/components/PasseioDetailModal/PasseioDetailModal.jsx
import React from 'react';
import './PasseioDetailModal.css';

const PasseioDetailModal = ({ passeio, onClose, onEdit }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="passeio-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="detail-modal-image-placeholder">
                    {/* Espaço para a imagem */}
                </div>
                <div className="detail-modal-content">
                    <div className="detail-text-container">
                        <h2 className="detail-modal-title">{passeio.nome}</h2>
                        <div className="detail-modal-info">
                            <p><strong>Descrição:</strong> {passeio.descricao}</p>
                            <p><strong>Preço:</strong> R${passeio.preco.toFixed(2)}</p>
                            <p><strong>Data do Passeio:</strong> {passeio.dataPasseio}</p>
                            <p><strong>Hora de Saída:</strong> {passeio.horaSaida}</p>
                            <p><strong>Hora de Chegada:</strong> {passeio.horaChegada}</p>
                            <p><strong>Início Recebimento:</strong> {passeio.dataInicioRecebimento}</p>
                            <p><strong>Fim Recebimento:</strong> {passeio.dataFinalRecebimento}</p>
                            <p><strong>Status:</strong> {passeio.statusPasseio}</p>
                        </div>
                    </div>
                    <button className="edit-button" onClick={onEdit}>
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasseioDetailModal;