import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Reservas.css';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [editingReserva, setEditingReserva] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = 'http://localhost:8080/api';

 useEffect(() => {
  const fetchReservas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/reservas');
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();

      if (!Array.isArray(data)) throw new Error("Resposta inválida do servidor");

      const formattedData = data.map(r => ({
        id: r.id,
        nome: r.nome,
        turma: r.turma,
        passeio: r.passeio,
        status: r.status || 'nao-pago',
      }));

      setReservas(formattedData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  fetchReservas();
}, []);

  // ========================
  // FILTRAGEM
  // ========================
  const filteredReservas = reservas.filter(reserva => {
    const matchesSearch =
      reserva.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.turma.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.passeio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'todos' || reserva.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // ========================
  // EDIÇÃO E DELETE
  // ========================
  const handleEditClick = (reserva) => {
    setEditingReserva(reserva);
    setIsPopupOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/reservas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar reserva');

      setReservas(reservas.filter(reserva => reserva.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveChanges = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${baseUrl}/reservas/${editingReserva.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: editingReserva.status,
        passeio: editingReserva.passeio, // necessário
      }),
    });

    if (!response.ok) throw new Error('Erro ao salvar alterações');

    const updatedReserva = await response.json();
    setReservas(reservas.map(r =>
      r.id === updatedReserva.id ? updatedReserva : r
    ));
    setIsPopupOpen(false);
  } catch (err) {
    alert(err.message);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingReserva({ ...editingReserva, [name]: value });
  };

  if (loading) return <div className="reservas-container"><p>Carregando reservas...</p></div>;
  if (error) return <div className="reservas-container"><p>Erro: {error}</p></div>;

  return (
    <div className="reservas-container">
      <Navbar />
      <h1 className="reservas-title">Reservas</h1>

      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por nome, turma ou passeio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
              <th>Turma</th>
              <th>Passeio</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.nome}</td>
                <td>{reserva.turma}</td>
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
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Turma:</label>
                <input
                  type="text"
                  name="turma"
                  value={editingReserva.turma}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Passeio:</label>
                <input
                  type="text"
                  name="passeio"
                  value={editingReserva.passeio}
                  onChange={handleInputChange}
                  disabled
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
