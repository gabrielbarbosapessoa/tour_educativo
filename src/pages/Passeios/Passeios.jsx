import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasseioCard from '../../components/PasseioCard/PasseioCard.jsx';
import PasseioDetailModal from '../../components/PasseioDetailModal/PasseioDetailModal.jsx';
import AddPasseioPopup from '../../components/AddPasseioPopup/AddPasseioPopup.jsx';
import EditPasseioPopup from '../../components/EditPasseioPopup/EditPasseioPopup.jsx';
import './Passeios.css';

const API_URL = 'http://localhost:8080/api/passeios';

const Passeios = () => {
    const [passeios, setPasseios] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedPasseio, setSelectedPasseio] = useState(null);

    // Buscar passeios do backend ao carregar
    useEffect(() => {
        fetchPasseios();
    }, []);

    const fetchPasseios = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setPasseios(data);
        } catch (error) {
            console.error('Erro ao buscar passeios:', error);
        }
    };

    // Criar passeio
    const handleCreatePasseio = async (newPasseioData) => {
        try {
            const res = await fetch(`${API_URL}/registrar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPasseioData),
            });
            const createdPasseio = await res.json();
            setPasseios([...passeios, createdPasseio]);
            setShowAddPopup(false);
        } catch (error) {
            console.error('Erro ao criar passeio:', error);
        }
    };

    // Editar passeio
    const handleSavePasseio = async (updatedPasseio) => {
        try {
            const res = await fetch(`${API_URL}/${updatedPasseio.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPasseio),
            });
            const savedPasseio = await res.json();
            setPasseios(passeios.map(p => p.id === savedPasseio.id ? savedPasseio : p));
            setSelectedPasseio(savedPasseio);
            setShowEditPopup(false);
        } catch (error) {
            console.error('Erro ao atualizar passeio:', error);
        }
    };

    // Deletar passeio
    const handleDeletePasseio = async (id) => {
        if (!window.confirm('Tem certeza que deseja deletar este passeio?')) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Erro ao deletar passeio');
            setPasseios(passeios.filter(p => p.id !== id));
            setSelectedPasseio(null);
        } catch (error) {
            console.error('Erro ao deletar passeio:', error);
            alert('Não foi possível deletar o passeio. Veja o console para detalhes.');
        }
    };

    const handleAddPasseio = () => setShowAddPopup(true);
    const handleCloseAddPopup = () => setShowAddPopup(false);
    const handleCardClick = (passeioData) => setSelectedPasseio(passeioData);
    const handleCloseDetailModal = () => setSelectedPasseio(null);
    const handleOpenEditPopup = () => setShowEditPopup(true);
    const handleCloseEditPopup = () => setShowEditPopup(false);

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
                    onDelete={handleDeletePasseio} // adiciona a função de deletar
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
