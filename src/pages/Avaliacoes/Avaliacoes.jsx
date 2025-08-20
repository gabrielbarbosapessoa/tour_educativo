import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Avaliacoes.css';

// Sample data for the review cards
const initialAvaliacoes = [
  {
    id: 'rm90987',
    passeio: 'Passeio 1',
    organizacao: 4,
    valorEducacional: 5,
    cooperacaoAlunos: 3,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm90987. A organização foi muito boa, e o valor educacional superou as expectativas. A cooperação dos alunos poderia ter sido melhor. ',
  },
  {
    id: 'rm80623',
    passeio: 'Passeio 2',
    organizacao: 5,
    valorEducacional: 4,
    cooperacaoAlunos: 4,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm80623. O passeio foi excelente, e a organização estava impecável. O valor educacional foi alto e a cooperação dos alunos foi boa. ',
  },
  {
    id: 'rm90276',
    passeio: 'Passeio 1',
    organizacao: 4,
    valorEducacional: 5,
    cooperacaoAlunos: 3,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm90276. Outra ótima experiência no Passeio 1. A avaliação é similar à anterior, mostrando consistência na qualidade. ',
  },
  {
    id: 'rm95678',
    passeio: 'Passeio 1',
    organizacao: 4,
    valorEducacional: 5,
    cooperacaoAlunos: 3,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm95678. O Passeio 1 continua a ser uma experiência educacional de alta qualidade, com ótimo valor para os alunos. ',
  },
  {
    id: 'rm90353',
    passeio: 'Passeio 3',
    organizacao: 3,
    valorEducacional: 4,
    cooperacaoAlunos: 4,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm90353. O Passeio 3 foi interessante. A organização foi razoável, mas a cooperação dos alunos e o valor educacional foram pontos fortes. ',
  },
  {
    id: 'rm90209',
    passeio: 'Passeio 1',
    organizacao: 5,
    valorEducacional: 4,
    cooperacaoAlunos: 5,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm90209. Experiência fantástica no Passeio 1. Organização, valor educacional e cooperação dos alunos foram excelentes. ',
  },
  {
    id: 'rm92688',
    passeio: 'Passeio 2',
    organizacao: 4,
    valorEducacional: 4,
    cooperacaoAlunos: 5,
    conteudoCompleto: 'Este é o conteúdo completo da avaliação rm92688. O Passeio 2 foi muito bem avaliado, com destaque para a cooperação dos alunos, que foi exemplar. ',
  },
  {
    id: 'rm94773',
    passeio: 'Passeio 3',
    organizacao: 4,
    valorEducacional: 5,
    cooperacaoAlunos: 4,
    conteudoCompleto: 'Uma avaliação positiva para o Passeio 3, com uma alta pontuação em valor educacional e cooperação dos alunos. ',
  },
];

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
  const [selectedAvaliacao, setSelectedAvaliacao] = useState(null);
  const [selectedPasseio, setSelectedPasseio] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');

  // Lógica para obter a lista única de passeios e usuários
  const uniquePasseios = [...new Set(initialAvaliacoes.map(item => item.passeio))];
  const uniqueUsuarios = [...new Set(initialAvaliacoes.map(item => item.id))];

  // Filtra as avaliações com base nos estados dos select
  const filteredAvaliacoes = initialAvaliacoes.filter(avaliacao => {
    const matchesPasseio = selectedPasseio === '' || avaliacao.passeio === selectedPasseio;
    const matchesUsuario = selectedUsuario === '' || avaliacao.id === selectedUsuario;
    return matchesPasseio && matchesUsuario;
  });

  const handleVerMaisClick = (avaliacao) => {
    setSelectedAvaliacao(avaliacao);
  };

  const handleClosePopup = () => {
    setSelectedAvaliacao(null);
  };

  return (
    <div className="avaliacoes-page">
      <Navbar />
      <div className="avaliacoes-container">
        
        {/* Container de Filtros */}
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
                <option key={passeio} value={passeio}>
                  {passeio}
                </option>
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
                <option key={usuario} value={usuario}>
                  {usuario}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="avaliacoes-grid">
          {filteredAvaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="avaliacao-card">
              <div className="card-header">
                <h3>{avaliacao.id}</h3>
              </div>
              <div className="card-content">
                <p>
                  <strong>Passeio:</strong> {avaliacao.passeio}
                </p>
                <div className="rating-row">
                  <p>
                    <strong>Organização:</strong>
                  </p>
                  <StarRating rating={avaliacao.organizacao} />
                </div>
                <div className="rating-row">
                  <p>
                    <strong>Valor Educacional:</strong>
                  </p>
                  <StarRating rating={avaliacao.valorEducacional} />
                </div>
                <div className="rating-row">
                  <p>
                    <strong>Cooperação dos Alunos:</strong>
                  </p>
                  <StarRating rating={avaliacao.cooperacaoAlunos} />
                </div>
              </div>
              <div
                className="ver-mais"
                onClick={() => handleVerMaisClick(avaliacao)}
              >
                Ver mais...
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAvaliacao && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={handleClosePopup}>&times;</button>
            <div className="popup-header">
                <h3>Avaliação: {selectedAvaliacao.id}</h3>
            </div>
            <div className="popup-body">
              <div className="popup-info-row">
                <p>
                  <strong>Passeio:</strong> {selectedAvaliacao.passeio}
                </p>
              </div>
              <div className="popup-rating">
                <p>
                  <strong>Organização:</strong>
                </p>
                <StarRating rating={selectedAvaliacao.organizacao} />
              </div>
              <div className="popup-rating">
                <p>
                  <strong>Valor Educacional:</strong>
                </p>
                <StarRating rating={selectedAvaliacao.valorEducacional} />
              </div>
              <div className="popup-rating">
                <p>
                  <strong>Cooperação dos Alunos:</strong>
                </p>
                <StarRating rating={selectedAvaliacao.cooperacaoAlunos} />
              </div>
              <div className="description-box">
                <p className="popup-description">
                  {selectedAvaliacao.conteudoCompleto}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avaliacoes;