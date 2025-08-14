import React, { useState } from 'react';
import './AddPasseioPopup.css'; // Certifique-se de que o CSS está no caminho correto

const AddPasseioPopup = ({ onClose, onCreate }) => {
    // Adicionamos estados para cada campo do formulário
    const [name, setName] = useState('');
    const [quantAlunos, setQuantAlunos] = useState('');
    const [unidade, setUnidade] = useState('');
    const [local, setLocal] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');

    const handleCreate = () => {
        // Crie um objeto com os dados do novo passeio
        const newPasseio = {
            name,
            quantAlunos,
            unidade,
            local,
            valor: parseFloat(valor),
            data,
            image: null
        };
        // Chame a função onCreate que foi passada como prop
        onCreate(newPasseio);
        // Feche o popup
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="add-passeio-popup">
                <div className="popup-header">
                    <h2 className="popup-title">Passeio</h2>
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
                    <button className="add-image-button">
                        <span className="add-image-icon">+</span>
                        <span>Adicionar imagem</span>
                    </button>
                </div>
                <div className="popup-buttons">
                    <button className="create-button" onClick={handleCreate}>
                        Criar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPasseioPopup;