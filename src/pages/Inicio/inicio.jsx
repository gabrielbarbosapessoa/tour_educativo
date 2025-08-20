import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Inicio.css';

// Dados de exemplo para o dashboard
const dashboardData = {
  totalReservas: 154,
  reservasNaoPagas: 23,
  totalAvaliacoes: 45,
  avaliacaoMedia: 4.5
};

function Inicio() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <h1 className="welcome-title">Bem-vindo ao Painel de Controle!</h1>
        <p className="subtitle">Visão geral das reservas e avaliações dos passeios.</p>

        {/* Seção de Cartões de Resumo */}
        <section className="summary-cards-section">
          <div className="summary-card">
            <h2 className="card-title">Total de Reservas</h2>
            <p className="card-number">{dashboardData.totalReservas}</p>
          </div>
          <div className="summary-card">
            <h2 className="card-title">Reservas Não Pagas</h2>
            <p className="card-number">{dashboardData.reservasNaoPagas}</p>
          </div>
          <div className="summary-card">
            <h2 className="card-title">Total de Avaliações</h2>
            <p className="card-number">{dashboardData.totalAvaliacoes}</p>
          </div>
          <div className="summary-card">
            <h2 className="card-title">Avaliação Média</h2>
            <p className="card-number">{dashboardData.avaliacaoMedia}</p>
          </div>
        </section>

        {/* Seção de Ações Rápidas */}
        <section className="quick-actions-section">
          <h2 className="section-title">Ações Rápidas</h2>
          <div className="quick-actions-grid">
            <a href="/reservas" className="action-button">
              Ver Todas as Reservas
            </a>
            <a href="/avaliacoes" className="action-button">
              Ver Todas as Avaliações
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Inicio;