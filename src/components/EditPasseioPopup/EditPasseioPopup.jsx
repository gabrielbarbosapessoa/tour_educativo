// src/components/EditPasseioPopup/EditPasseioPopup.jsx
import React, { useState } from 'react';
import './EditPasseioPopup.css'; // Certifique-se de que o CSS está no caminho correto

const EditPasseioPopup = ({ passeio, onClose, onSave }) => {
    // Inicializa os estados do formulário com os dados do passeio a ser editado
    const [name, setName] = useState(passeio.name);
    const [quantAlunos, setQuantAlunos] = useState(passeio.quantAlunos);
    const [unidade, setUnidade] = useState(passeio.unidade);
    const [local, setLocal] = useState(passeio.local);
    const [valor, setValor] = useState(passeio.valor.toFixed(2));
    const [data, setData] = useState(passeio.data);

    const handleSave = () => {
        // Cria um objeto com os dados atualizados
        const updatedPasseio = {
            ...passeio, // Mantém o ID original
            name,
            quantAlunos: parseInt(quantAlunos, 10), // Converte para número
            unidade,
            local,
            valor: parseFloat(valor), // Converte para float
            data,
        };
        // Chama a função onSave para atualizar o estado no componente pai
        onSave(updatedPasseio);
        onClose(); // Fecha o popup após salvar
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="add-passeio-popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2 className="popup-title">Editar Passeio</h2>
                    <button className="close-popup-button" onClick={onClose}>x</button>
                </div>
                <div className="popup-form">
                    <label>Nome do passeio *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Quant. de Alunos *</label>
                    <input type="number" value={quantAlunos} onChange={(e) => setQuantAlunos(e.target.value)} />
                    <label>Unidade *</label>
                    <input type="text" value={unidade} onChange={(e) => setUnidade(e.target.value)} />
                    <label>Local *</label>
                    <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
                    <label>Valor: R$ *</label>
                    <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
                    <label>Data *</label>
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
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