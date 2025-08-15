// src/pages/Passeios.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasseioCard from '../../components/PasseioCard/PasseioCard.jsx';
import PasseioDetailModal from '../../components/PasseioDetailModal/PasseioDetailModal.jsx';
import AddPasseioPopup from '../../components/AddPasseioPopup/AddPasseioPopup.jsx';
import EditPasseioPopup from '../../components/EditPasseioPopup/EditPasseioPopup.jsx';
import './Passeios.css';

// Dados de exemplo com a nova estrutura padronizada
const initialPasseiosData = [
    { 
        id: 1, 
        nome: 'Passeio Histórico', 
        descricao: 'Visita guiada ao centro histórico da cidade.',
        foto: null,
        preco: 50.00,
        dataPasseio: '2025-12-12',
        horaSaida: '08:00',
        horaChegada: '17:00',
        dataInicioRecebimento: '2025-11-01',
        dataFinalRecebimento: '2025-12-05',
        dataCadastro: '2025-10-20T10:00:00',
        statusPasseio: 'ATIVO',
    },
    { 
        id: 2, 
        nome: 'Aventura na Floresta',
        descricao: 'Trilha em mata fechada, com observação de fauna e flora.',
        foto: null,
        preco: 75.50,
        dataPasseio: '2026-01-10',
        horaSaida: '09:30',
        horaChegada: '15:30',
        dataInicioRecebimento: '2025-12-20',
        dataFinalRecebimento: '2026-01-05',
        dataCadastro: '2025-10-21T10:00:00',
        statusPasseio: 'DISPONIVEL',
    },
];

const Passeios = () => {
    const [passeios, setPasseios] = useState(initialPasseiosData);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedPasseio, setSelectedPasseio] = useState(null);

    const handleCreatePasseio = (newPasseioData) => {
        const newId = Math.max(...passeios.map(p => p.id), 0) + 1;
        const newPasseio = { 
            ...newPasseioData, 
            id: newId,
            dataCadastro: new Date().toISOString().slice(0, 19).replace('T', ' '),
            foto: null, // Assegura que a foto é nula por padrão
        };
        setPasseios([...passeios, newPasseio]);
    };
    
    const handleSavePasseio = (updatedPasseio) => {
        setPasseios(passeios.map(p => 
            p.id === updatedPasseio.id ? updatedPasseio : p
        ));
        setSelectedPasseio(updatedPasseio);
        setShowEditPopup(false);
    };

    const handleAddPasseio = () => {
        setShowAddPopup(true);
    };

    const handleCloseAddPopup = () => {
        setShowAddPopup(false);
    };

    const handleCardClick = (passeioData) => {
        setSelectedPasseio(passeioData);
    };

    const handleCloseDetailModal = () => {
        setSelectedPasseio(null);
    };

    const handleOpenEditPopup = () => {
        setShowEditPopup(true);
    };

    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
    };

    return (
        <>
            <Navbar />
            <div className="passeios-page-container">
                <div className="cards-grid">
                    {passeios.map(p => (
                        <PasseioCard key={p.id} passeio={p} onClick={handleCardClick} />
                    ))}
                </div>
                <div className="add-passeio-button-container">
                    <button className="add-passeio-button" onClick={handleAddPasseio}>
                        Adicionar Passeio
                    </button>
                </div>
            </div>
            
            {showAddPopup && (
                <AddPasseioPopup 
                    onClose={handleCloseAddPopup} 
                    onCreate={handleCreatePasseio} 
                />
            )}

            {selectedPasseio && !showEditPopup && (
                <PasseioDetailModal 
                    passeio={selectedPasseio} 
                    onClose={handleCloseDetailModal} 
                    onEdit={handleOpenEditPopup}
                />
            )}

            {showEditPopup && (
                <EditPasseioPopup
                    passeio={selectedPasseio}
                    onClose={handleCloseEditPopup}
                    onSave={handleSavePasseio}
                />
            )}
        </>
    );
};

export default Passeios;