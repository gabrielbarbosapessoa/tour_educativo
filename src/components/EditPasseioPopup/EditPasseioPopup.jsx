import React, { useState } from 'react';
import './EditPasseioPopup.css';

const EditPasseioPopup = ({ passeio, onClose, onSave }) => {
    const [nome, setNome] = useState(passeio.nome);
    const [descricao, setDescricao] = useState(passeio.descricao);
    const [preco, setPreco] = useState(passeio.preco.toFixed(2));
    const [dataPasseio, setDataPasseio] = useState(passeio.dataPasseio);
    const [horaSaida, setHoraSaida] = useState(passeio.horaSaida);
    const [horaChegada, setHoraChegada] = useState(passeio.horaChegada);
    const [dataInicioRecebimento, setDataInicioRecebimento] = useState(passeio.dataInicioRecebimento);
    const [dataFinalRecebimento, setDataFinalRecebimento] = useState(passeio.dataFinalRecebimento);
    const [statusPasseio, setStatusPasseio] = useState(passeio.statusPasseio);

    const handleSave = () => {
        const updatedPasseio = {
            ...passeio,
            nome,
            descricao,
            preco: parseFloat(preco),
            dataPasseio,
            horaSaida,
            horaChegada,
            dataInicioRecebimento,
            dataFinalRecebimento,
            statusPasseio,
        };
        onSave(updatedPasseio);
        onClose();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="add-passeio-popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2 className="popup-title">Editar Passeio</h2>
                    <button className="close-popup-button" onClick={onClose}>x</button>
                </div>
                <div className="popup-form">
                    <label>Nome *</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    
                    <label>Descrição *</label>
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="4" />
                    
                    <label>Preço *</label>
                    <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />

                    <label>Data do Passeio *</label>
                    <input type="date" value={dataPasseio} onChange={(e) => setDataPasseio(e.target.value)} />
                    
                    <label>Hora de Saída *</label>
                    <input type="text" value={horaSaida} onChange={(e) => setHoraSaida(e.target.value)} placeholder="HH:MM" />
                    
                    <label>Hora de Chegada *</label>
                    <input type="text" value={horaChegada} onChange={(e) => setHoraChegada(e.target.value)} placeholder="HH:MM" />
                    
                    <label>Início do Recebimento *</label>
                    <input type="date" value={dataInicioRecebimento} onChange={(e) => setDataInicioRecebimento(e.target.value)} />
                    
                    <label>Fim do Recebimento *</label>
                    <input type="date" value={dataFinalRecebimento} onChange={(e) => setDataFinalRecebimento(e.target.value)} />

                    <label>Status do Passeio *</label>
                    <select value={statusPasseio} onChange={(e) => setStatusPasseio(e.target.value)}>
                        <option value="ATIVO">Ativo</option>
                        <option value="DISPONIVEL">Disponível</option>
                        <option value="CANCELADO">Cancelado</option>
                        <option value="EXPIRADO">Expirado</option>
                    </select>

                </div>
                
                <div className="popup-buttons">
                    <button className="create-button" onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPasseioPopup;