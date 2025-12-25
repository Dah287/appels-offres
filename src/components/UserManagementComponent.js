import React, { useState, useEffect } from 'react';
import UtilisateurService from '../services/UtilisateurService';

const UserManagementComponent = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ 
        nom: '', 
        username: '', 
        password: '', 
        role: 'ROLE_USER', 
        entite: '' 
    });
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        refreshUsers();
    }, []);

    const refreshUsers = () => {
        UtilisateurService.getAllUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.error("Erreur chargement utilisateurs", err));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            UtilisateurService.updateUser(currentUserId, formData).then(() => {
                setMessage("✅ Utilisateur mis à jour !");
                resetForm();
                refreshUsers();
            });
        } else {
            UtilisateurService.createUser(formData).then(() => {
                setMessage("✅ Utilisateur créé avec succès !");
                resetForm();
                refreshUsers();
            });
        }
    };

    const handleEdit = (user) => {
        setEditMode(true);
        setCurrentUserId(user.id);
        // On remplit le formulaire avec les données existantes
        setFormData({ 
            nom: user.nom || '', 
            username: user.username, 
            password: '', 
            role: user.role, 
            entite: user.entite 
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("❗ Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            UtilisateurService.deleteUser(id).then(() => refreshUsers());
        }
    };

    const resetForm = () => {
        setFormData({ nom: '', username: '', password: '', role: 'ROLE_USER', entite: '' });
        setEditMode(false);
        setTimeout(() => setMessage(''), 3000); // Efface le message après 3s
    };

    return (
        <div className="container mt-4">
            <h2 className="text-success fw-bold mb-4">⚙️ Gestion des Utilisateurs</h2>

            {/* Formulaire d'ajout/édition */}
            <div className="card shadow-sm mb-5 border-0">
                <div className="card-header bg-success text-white fw-bold">
                    {editMode ? "📝 Modifier l'utilisateur" : "👤 Ajouter un nouvel utilisateur"}
                </div>
                <div className="card-body bg-light">
                    <form onSubmit={handleSubmit} className="row g-2">
                        <div className="col-md-2">
                            <label className="small fw-bold">Nom Complet</label>
                            <input type="text" name="nom" placeholder="Ex: " className="form-control" 
                                   value={formData.nom} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-2">
                            <label className="small fw-bold">Username</label>
                            <input type="text" name="username" placeholder="Login" className="form-control" 
                                   value={formData.username} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-2">
                            <label className="small fw-bold">Mot de passe</label>
                            <input type="password" name="password" 
                                   placeholder={editMode ? "Laisser vide" : "Mot de passe"} 
                                   className="form-control" value={formData.password} 
                                   onChange={handleInputChange} required={!editMode} />
                        </div>
                        <div className="col-md-2">
                            <label className="small fw-bold">Rôle</label>
                            <select name="role" className="form-select" value={formData.role} onChange={handleInputChange}>
                                <option value="ROLE_USER">SOUS ADMIN</option>
                                <option value="ROLE_ADMIN">ADMIN</option>
                                <option value="ROLE_SI">SERVICE SI</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="small fw-bold">Entité</label>
                            <input type="text" name="entite" placeholder="Ex: DPF" className="form-control" 
                                   value={formData.entite} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-2 d-flex align-items-end gap-1">
                            <button type="submit" className="btn btn-primary flex-grow-1">
                                {editMode ? "Mettre à jour" : "Ajouter"}
                            </button>
                            {editMode && <button type="button" className="btn btn-secondary" onClick={resetForm}>X</button>}
                        </div>
                    </form>
                    {message && <div className="alert alert-info mt-3 py-1 mb-0">{message}</div>}
                </div>
            </div>

            {/* Tableau des utilisateurs */}
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th className="fw-bold text-primary">ID</th>
                            <th className="fw-bold text-primary">Nom Complet</th>
                            <th className="fw-bold text-primary">Username</th>
                            <th className="fw-bold text-primary">Rôle</th>
                            <th className="fw-bold text-primary">Entité</th>
                            <th className="text-center fw-bold text-primary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td className="fw-bold text-dark">{u.nom}</td>
                                <td className="text-primary">{u.username}</td>
                                <td>
                                    <span className={`badge ${u.role === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-info text-dark'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td>{u.entite}</td>
                                <td className="text-center">
                                    <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleEdit(u)} title="Modifier">✏️</button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(u.id)} title="Supprimer">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementComponent;