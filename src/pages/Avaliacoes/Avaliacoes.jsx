import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from 'axios';
import './Avaliacoes.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState(null);
  const [selectedPasseio, setSelectedPasseio] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');

  // Busca avaliações do backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/avaliacoes') // URL do seu backend
      .then(res => setAvaliacoes(res.data))
      .catch(err => console.error('Erro ao buscar avaliações:', err));
  }, []);

  // Lista única de passeios e usuários
  const uniquePasseios = [...new Set(avaliacoes.map(a => a.passeioId))];
  const uniqueUsuarios = [...new Set(avaliacoes.map(a => a.alunoId))];

  // Filtra as avaliações
  const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
    const matchesPasseio = selectedPasseio === '' || avaliacao.passeioId.toString() === selectedPasseio;
    const matchesUsuario = selectedUsuario === '' || avaliacao.alunoId.toString() === selectedUsuario;
    return matchesPasseio && matchesUsuario;
  });

  const handleVerMaisClick = (avaliacao) => setSelectedAvaliacao(avaliacao);
  const handleClosePopup = () => setSelectedAvaliacao(null);

  return (
    <div className="avaliacoes-page">
      <Navbar />
      <div className="avaliacoes-container">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="passeio-filter">Filtrar por Passeio:</label>
            <select
              id="passeio-filter"
              value={selectedPasseio}
              onChange={(e) => setSelectedPasseio(e.target.value)}
            >
              <option value="">Todos</option>
              {uniquePasseios.map(passeio => (
                <option key={passeio} value={passeio}>{passeio}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="usuario-filter">Filtrar por Usuário:</label>
            <select
              id="usuario-filter"
              value={selectedUsuario}
              onChange={(e) => setSelectedUsuario(e.target.value)}
            >
              <option value="">Todos</option>
              {uniqueUsuarios.map(usuario => (
                <option key={usuario} value={usuario}>{usuario}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="avaliacoes-grid">
          {filteredAvaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="avaliacao-card">
              <div className="card-header"><h3>{avaliacao.id}</h3></div>
              <div className="card-content">
                <p><strong>Passeio:</strong> {avaliacao.passeioId}</p>
                <div className="rating-row"><p><strong>Nota:</strong></p><StarRating rating={avaliacao.nota} /></div>
                {avaliacao.comentario && <p>{avaliacao.comentario}</p>}
              </div>
              <div className="ver-mais" onClick={() => handleVerMaisClick(avaliacao)}>Ver mais...</div>
            </div>
          ))}
        </div>
      </div>

      {selectedAvaliacao && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="close-popup" onClick={handleClosePopup}>&times;</button>
            <h3>Avaliação: {selectedAvaliacao.id}</h3>
            <p><strong>Passeio:</strong> {selectedAvaliacao.passeioId}</p>
            <p><strong>Aluno:</strong> {selectedAvaliacao.alunoId}</p>
            <p><strong>Nota:</strong> <StarRating rating={selectedAvaliacao.nota} /></p>
            <p>{selectedAvaliacao.comentario}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avaliacoes;
