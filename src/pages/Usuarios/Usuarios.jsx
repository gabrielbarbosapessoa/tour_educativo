import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Usuarios.css';

function Usuarios() {
  const [mostrarTabela, setMostrarTabela] = useState('alunos'); // alunos ou gerenciadores
  const [alunos, setAlunos] = useState([]);
  const [gerenciadores, setGerenciadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const apiUrl = 'http://localhost:8080/api'; // ajuste se necessário

  // ======== FETCH ALUNOS ========
  const fetchAlunos = async () => {
    try {
      const res = await fetch(`${apiUrl}/alunos`);
      if (!res.ok) throw new Error('Erro ao carregar alunos');
      const data = await res.json();
      setAlunos(data);
    } catch (err) {
      console.error(err);
      setAlunos([]); // garante que seja array mesmo em erro
    }
  };

  // ======== FETCH GERENCIADORES ========
  const fetchGerenciadores = async () => {
    try {
      const res = await fetch(`${apiUrl}/gerenciadores`);
      if (!res.ok) throw new Error('Erro ao carregar gerenciadores');
      const data = await res.json();
      setGerenciadores(data);
    } catch (err) {
      console.error(err);
      setGerenciadores([]); // garante array
    }
  };

  useEffect(() => {
    fetchAlunos();
    fetchGerenciadores();
  }, []);

  // ======== FILTRO DE PESQUISA ========
  const filteredAlunos = alunos.filter(a =>
    a.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.rm?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGerenciadores = gerenciadores.filter(g =>
    g.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.unidade?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ======== ABRIR POP-UP ========
  const openPopup = (item = null) => {
    setEditingItem(item || (mostrarTabela === 'alunos'
      ? { rm: '', nome: '', turma: '', numeroChamada: '', senhaBase64: '' }
      : { nome: '', senhaBase64: '', unidade: '' }
    ));
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  // ======== SALVAR ITEM ========
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (mostrarTabela === 'alunos') {
        const method = editingItem.id ? 'PUT' : 'POST';
        const endpoint = editingItem.id ? `${apiUrl}/alunos/${editingItem.id}` : `${apiUrl}/alunos/registrar`;
        const res = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingItem)
        });
        if (!res.ok) throw new Error('Erro ao salvar aluno');
        await fetchAlunos();
      } else {
        const method = editingItem.id ? 'PUT' : 'POST';
        const endpoint = editingItem.id ? `${apiUrl}/gerenciadores/${editingItem.id}` : `${apiUrl}/gerenciadores/registrar`;
        const res = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingItem)
        });
        if (!res.ok) throw new Error('Erro ao salvar gerenciador');
        await fetchGerenciadores();
      }
      setIsPopupOpen(false);
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar. Veja o console para detalhes.');
    }
  };

  // ======== DELETAR ITEM ========
  const handleDelete = async (id) => {
    try {
      if (mostrarTabela === 'alunos') {
        const res = await fetch(`${apiUrl}/alunos/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao deletar aluno');
        await fetchAlunos();
      } else {
        const res = await fetch(`${apiUrl}/gerenciadores/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao deletar gerenciador');
        await fetchGerenciadores();
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar. Veja o console.');
    }
  };

  return (
    <div className="usuarios-container">
      <Navbar />
      <h1 className="usuarios-title">Usuários</h1>

      {/* Botões para alternar tabela */}
      <div className="switch-buttons">
        <button className={mostrarTabela === 'alunos' ? 'active' : ''} onClick={() => setMostrarTabela('alunos')}>Alunos</button>
        <button className={mostrarTabela === 'gerenciadores' ? 'active' : ''} onClick={() => setMostrarTabela('gerenciadores')}>Gerenciadores</button>
      </div>

      {/* Barra de pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <div className="table-container">
        {mostrarTabela === 'alunos' && (
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>RM</th>
                <th>Nome</th>
                <th>Turma</th>
                <th>Número Chamada</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlunos.map(aluno => (
                <tr key={aluno.id}>
                  <td>{aluno.rm}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.turma}</td>
                  <td>{aluno.numeroChamada}</td>
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => openPopup(aluno)}>Alterar</button>
                    <button className="delete-btn" onClick={() => handleDelete(aluno.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {mostrarTabela === 'gerenciadores' && (
  <table className="usuarios-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Unidade</th>
        <th>Email</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {filteredGerenciadores.map(g => (
        <tr key={g.id}>
          <td>{g.nome}</td>
          <td>{g.unidade}</td>
          <td>{g.email}</td>
          <td className="actions-cell">
            <button className="edit-btn" onClick={() => openPopup(g)}>Alterar</button>
            <button className="delete-btn" onClick={() => handleDelete(g.id)}>Deletar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </div>

      {/* Botões de cadastro */}
      <div className="buttons-container">
        {mostrarTabela === 'alunos' && <button className="add-btn" onClick={() => openPopup()}>Cadastrar Aluno</button>}
        {mostrarTabela === 'gerenciadores' && <button className="add-btn" onClick={() => openPopup()}>Adicionar Gerenciador</button>}
      </div>

      {/* Pop-up */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{editingItem.id ? 'Alterar' : 'Cadastrar'} {mostrarTabela === 'alunos' ? 'Aluno' : 'Gerenciador'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Nome:</label>
                <input type="text" name="nome" value={editingItem.nome} onChange={handleInputChange} required />
              </div>

              {mostrarTabela === 'alunos' && (
                <>
                  <div className="form-group">
                    <label>RM:</label>
                    <input type="text" name="rm" value={editingItem.rm} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Turma:</label>
                    <input type="text" name="turma" value={editingItem.turma} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Número Chamada:</label>
                    <input type="number" name="numeroChamada" value={editingItem.numeroChamada} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" name="senhaBase64" value={editingItem.senhaBase64} onChange={handleInputChange} required />
                  </div>
                </>
              )}

             {mostrarTabela === 'gerenciadores' && (
  <>
    <div className="form-group">
      <label>Unidade:</label>
      <input type="text" name="unidade" value={editingItem.unidade} onChange={handleInputChange} required />
    </div>
    <div className="form-group">
      <label>Email:</label>
      <input type="email" name="email" value={editingItem.email} onChange={handleInputChange} required />
    </div>
    <div className="form-group">
      <label>Senha:</label>
      <input type="password" name="senhaBase64" value={editingItem.senhaBase64} onChange={handleInputChange} required />
    </div>
  </>
)}


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

export default Usuarios;
