// src/components/AddPasseioPopup/AddPasseioPopup.jsx
import React, { useState, useEffect } from 'react';
import './AddPasseioPopup.css';

const AddPasseioPopup = ({ onClose, onCreate, passeio }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [dataPasseio, setDataPasseio] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [horaChegada, setHoraChegada] = useState('');
  const [dataInicioRecebimento, setDataInicioRecebimento] = useState('');
  const [dataFinalRecebimento, setDataFinalRecebimento] = useState('');
  const [statusPasseio, setStatusPasseio] = useState('');

  // Se for edição, preencher os campos com os dados
  useEffect(() => {
    if (passeio) {
      setNome(passeio.nome || '');
      setDescricao(passeio.descricao || '');
      setPreco(passeio.preco != null ? String(passeio.preco) : '');
      setDataPasseio(passeio.dataPasseio || '');
      setHoraSaida(passeio.horaSaida || '');
      setHoraChegada(passeio.horaChegada || '');
      setDataInicioRecebimento(passeio.dataInicioRecebimento || '');
      setDataFinalRecebimento(passeio.dataFinalRecebimento || '');
      setStatusPasseio(passeio.statusPasseio || '');
    }
  }, [passeio]);

  // Apenas monta o objeto e chama o pai
  const handleSave = () => {
    if (
      !nome ||
      !descricao ||
      !preco ||
      !dataPasseio ||
      !horaSaida ||
      !horaChegada ||
      !dataInicioRecebimento ||
      !dataFinalRecebimento ||
      !statusPasseio
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const newPasseio = {
      ...passeio, // mantém id se for edição
      nome,
      descricao,
      preco: parseFloat(preco),
      dataPasseio,
      horaSaida,
      horaChegada,
      dataInicioRecebimento,
      dataFinalRecebimento,
      statusPasseio,
      foto: null,
      dataCadastro: new Date().toISOString().split('T')[0],
    };

    onCreate(newPasseio); // agora o pai decide se faz POST ou PUT
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="add-passeio-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2 className="popup-title">
            {passeio ? 'Editar Passeio' : 'Novo Passeio'}
          </h2>
          <button className="close-popup-button" onClick={onClose}>
            x
          </button>
        </div>

        <div className="popup-form">
          <label>Nome do Passeio *</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Descrição *</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            placeholder="Descreva o passeio, ponto de encontro, regras, etc."
          />

          <label>Preço: R$ *</label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <label>Data do Passeio *</label>
          <input
            type="date"
            value={dataPasseio}
            onChange={(e) => setDataPasseio(e.target.value)}
          />

          <label>Hora de Saída *</label>
          <input
            type="time"
            value={horaSaida}
            onChange={(e) => setHoraSaida(e.target.value)}
          />

          <label>Hora de Chegada *</label>
          <input
            type="time"
            value={horaChegada}
            onChange={(e) => setHoraChegada(e.target.value)}
          />

          <label>Início Recebimento *</label>
          <input
            type="date"
            value={dataInicioRecebimento}
            onChange={(e) => setDataInicioRecebimento(e.target.value)}
          />

          <label>Fim Recebimento *</label>
          <input
            type="date"
            value={dataFinalRecebimento}
            onChange={(e) => setDataFinalRecebimento(e.target.value)}
          />

          <label>Status *</label>
          <select
            value={statusPasseio}
            onChange={(e) => setStatusPasseio(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Aberto">Aberto</option>
            <option value="Fechado">Fechado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="popup-buttons">
          <button className="create-button" onClick={handleSave}>
            {passeio ? 'Salvar Alterações' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPasseioPopup;
