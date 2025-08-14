import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasseioCard from '../../components/PasseioCard/PasseioCard.jsx';
import PasseioDetailModal from '../../components/PasseioDetailModal/PasseioDetailModal.jsx';
import AddPasseioPopup from '../../components/AddPasseioPopup/AddPasseioPopup.jsx';
import './Passeios.css'; // Certifique-se de que o CSS está no caminho correto

// Dados de exemplo com mais informações
const initialPasseiosData = [
    { 
        id: 1, 
        name: 'Passeio 1', 
        quantAlunos: 500, 
        unidade: 'Unidade 2', 
        local: 'Rua Exemplo, Nº01 - SP', 
        valor: 0.00, 
        data: '12/12/2025', 
        image: null 
    },
    { 
        id: 2, 
        name: 'Passeio 2', 
        quantAlunos: 300, 
        unidade: 'Unidade 1', 
        local: 'Rua Teste, Nº100 - RJ', 
        valor: 15.50, 
        data: '10/01/2026', 
        image: null 
    },
];

const Passeios = () => {
    const [passeios, setPasseios] = useState(initialPasseiosData);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [selectedPasseio, setSelectedPasseio] = useState(null);

    const handleCreatePasseio = (newPasseioData) => {
        // Encontre o maior ID existente para criar um novo ID único
        const newId = Math.max(...passeios.map(p => p.id), 0) + 1;
        const newPasseio = { ...newPasseioData, id: newId };
        
        // Adicione o novo passeio ao array existente
        setPasseios([...passeios, newPasseio]);
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

            {selectedPasseio && (
                <PasseioDetailModal passeio={selectedPasseio} onClose={handleCloseDetailModal} />
            )}
        </>
    );
};

export default Passeios;