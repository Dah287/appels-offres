import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import './UserManagementCustom.css';
import useAutoLogout from './useAutoLogout';
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '', entite: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    UserService.getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur lors de la récupération des utilisateurs :", error));
  };

  const handleAddUser = () => {
    if (Object.values(newUser).some(field => !field)) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    UserService.createUser(newUser)
      .then(() => {
        setNewUser({ username: '', password: '', role: '', entite: '' });
        fetchUsers();
      })
      .catch(error => console.error("Erreur lors de l'ajout de l'utilisateur :", error));
  };

  const handleDeleteUser = (id) => {
    UserService.deleteUser(id)
      .then(fetchUsers)
      .catch(error => console.error("Erreur lors de la suppression de l'utilisateur :", error));
  };
  useAutoLogout();
  return (
    <div className="container mt-5">
      <h2>Gestion des Utilisateurs</h2>

      {/* Formulaire d'ajout utilisateur */}
      <div className="my-3">
  {/* Champ Nom d'utilisateur */}
  <div className="input-group">
    <label className="filter-label">Nom d'utilisateur</label>
    <input
     style={{
                
        borderRadius: "8px"
      
      }}
      type="text"
      placeholder="Nom d'utilisateur"
      value={newUser.username}
      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
    />
  </div>

  {/* Champ Mot de passe */}
  <div className="input-group">
    <label className="filter-label">Mot de passe</label>
    <input
     style={{
                
        borderRadius: "8px"
      
      }}
      type="password"
      placeholder="Mot de passe"
      value={newUser.password}
      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
    />
  </div>

  {/* Champ Rôle */}
  <div className="input-group">
    <label className="filter-label">Rôle</label>
    <select
     style={{
                
        borderRadius: "8px"
      
      }}
      value={newUser.role}
      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
    >
      <option value="">Sélectionner un rôle</option>
      <option value="admin">Admin</option>
      <option value="sous admin">Sous Admin</option>
      <option value="usernormale">Utilisateur Normal</option>
    </select>
  </div>

  {/* Champ Entité */}
  <div className="input-group">
    <label className="filter-label">Entité</label>
    <select
     style={{
                
        borderRadius: "8px"
      
      }}
      value={newUser.entite}
      onChange={(e) => setNewUser({ ...newUser, entite: e.target.value })}
    >
      <option value="">Sélectionner une entité</option>
      <option value="DPF">DPF</option>
      <option value="DGR">DGR</option>
      <option value="DA">DA</option>
      <option value="DDA">DDA</option>
      <option value="DRH">DRH</option>
      <option value="SAICG">SAICG</option>
      <option value="SMG">SMG</option>
    </select>
  </div>

  {/* Bouton Ajouter */}
  <div className="input-group btntt"   >
    <button onClick={handleAddUser}   style={{
                
                borderRadius: "8px"
              
              }}>Ajouter</button>
  </div>
</div>





      {/* Tableau des utilisateurs */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom Utilisateur</th>
            <th>Rôle</th>
            <th>Entité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>Aucun utilisateur ajouté</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.entite}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger" style={{ backgroundColor: "#28a745" }}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;