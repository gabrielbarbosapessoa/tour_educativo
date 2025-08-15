// src/pages/Passeios.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasseioCard from '../../components/PasseioCard/PasseioCard.jsx';
import PasseioDetailModal from '../../components/PasseioDetailModal/PasseioDetailModal.jsx';
import AddPasseioPopup from '../../components/AddPasseioPopup/AddPasseioPopup.jsx';
import EditPasseioPopup from '../../components/EditPasseioPopup/EditPasseioPopup.jsx'; // Importe o novo componente
import './Passeios.css';

// Dados de exemplo com mais informações
const initialPasseiosData = [
    { 
        id: 1, 
        name: 'Passeio 1', 
        quantAlunos: 500, 
        unidade: 'Unidade 2', 
        local: 'Rua Exemplo, Nº01 - SP', 
        valor: 0.00, 
        data: '2025-12-12', // Data no formato YYYY-MM-DD para o input type="date"
        image: null 
    },
    { 
        id: 2, 
        name: 'Passeio 2', 
        quantAlunos: 300, 
        unidade: 'Unidade 1', 
        local: 'Rua Teste, Nº100 - RJ', 
        valor: 15.50, 
        data: '2026-01-10',
        image: null 
    },
];

const Passeios = () => {
    const [passeios, setPasseios] = useState(initialPasseiosData);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false); // Novo estado para o popup de edição
    const [selectedPasseio, setSelectedPasseio] = useState(null);

    const handleCreatePasseio = (newPasseioData) => {
        const newId = Math.max(...passeios.map(p => p.id), 0) + 1;
        const newPasseio = { ...newPasseioData, id: newId };
        setPasseios([...passeios, newPasseio]);
    };
    
    // Nova função para salvar as edições
    const handleSavePasseio = (updatedPasseio) => {
        setPasseios(passeios.map(p => 
            p.id === updatedPasseio.id ? updatedPasseio : p
        ));
        setSelectedPasseio(updatedPasseio); // Atualiza o modal de detalhes
        setShowEditPopup(false); // Fecha o popup de edição
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

    // Nova função para abrir o popup de edição
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

            {selectedPasseio && !showEditPopup && ( // Adicionado !showEditPopup para não mostrar os dois popups
                <PasseioDetailModal 
                    passeio={selectedPasseio} 
                    onClose={handleCloseDetailModal} 
                    onEdit={handleOpenEditPopup} // Passa a nova função para o modal
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