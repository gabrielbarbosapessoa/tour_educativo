import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Reservas.css';

// Dados de exemplo para a tabela
const initialReservas = [
  { id: 1, nome: 'Ana Souza', email: 'ana.souza@email.com', passeio: 'Trilha da Cachoeira', status: 'pago' },
  { id: 2, nome: 'João Silva', email: 'joao.silva@email.com', passeio: 'Canyon do Pôr do Sol', status: 'nao-pago' },
  { id: 3, nome: 'Maria Oliveira', email: 'maria.o@email.com', passeio: 'Trilha da Cachoeira', status: 'pago' },
  { id: 4, nome: 'Pedro Santos', email: 'pedro.s@email.com', passeio: 'Caiaque no Rio', status: 'nao-pago' },
];

function Reservas() {
  const [reservas, setReservas] = useState(initialReservas);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos'); // Novo estado para o filtro de status
  const [editingReserva, setEditingReserva] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Lógica de filtragem combinada
  const filteredReservas = reservas.filter(reserva => {
    // Primeiro, filtra pela barra de pesquisa
    const matchesSearch =
      reserva.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.passeio.toLowerCase().includes(searchTerm.toLowerCase());

    // Depois, filtra pelo status (pago, não pago ou todos)
    const matchesStatus =
      filterStatus === 'todos' || reserva.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Abre o pop-up com os dados da reserva para edição
  const handleEditClick = (reserva) => {
    setEditingReserva(reserva);
    setIsPopupOpen(true);
  };

  // Deleta uma reserva da tabela
  const handleDeleteClick = (id) => {
    setReservas(reservas.filter(reserva => reserva.id !== id));
  };

  // Salva as alterações feitas no pop-up
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setReservas(reservas.map(reserva =>
      reserva.id === editingReserva.id ? editingReserva : reserva
    ));
    setIsPopupOpen(false);
  };

  // Manipula as mudanças nos campos do formulário de edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingReserva({ ...editingReserva, [name]: value });
  };

  return (
    <div className="reservas-container">
      <Navbar />
      <h1 className="reservas-title">Reservas</h1>

      <div className="filters-container">
        {/* Barra de pesquisa */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por nome, email ou passeio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botão de seleção de status */}
        <div className="status-filter">
          <label htmlFor="status-select">Filtrar por Status:</label>
          <select
            id="status-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todos">Todos os Status</option>
            <option value="pago">Pago</option>
            <option value="nao-pago">Não Pago</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Passeio</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.nome}</td>
                <td>{reserva.email}</td>
                <td>{reserva.passeio}</td>
                <td>
                  <div className="status-cell">
                    <span className={`status-circle ${reserva.status}`}></span>
                    {reserva.status === 'pago' ? 'Pago' : 'Não Pago'}
                  </div>
                </td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => handleEditClick(reserva)}>Alterar</button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(reserva.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopupOpen && editingReserva && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Alterar Reserva</h2>
            <form onSubmit={handleSaveChanges}>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={editingReserva.nome}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editingReserva.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Passeio:</label>
                <input
                  type="text"
                  name="passeio"
                  value={editingReserva.passeio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select name="status" value={editingReserva.status} onChange={handleInputChange}>
                  <option value="pago">Pago</option>
                  <option value="nao-pago">Não Pago</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Salvar</button>
                <button type="button" className="cancel-btn" onClick={() => setIsPopupOpen(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservas;