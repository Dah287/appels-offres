// src/services/UserService.js
import axios from 'axios';

const API_BASE_URL = "http://192.168.1.107:8080/api/utilisateurs";

class UserService {
  // Récupérer la liste des utilisateurs
  getAllUsers() {
    return axios.get(API_BASE_URL);
  }

  // Ajouter un utilisateur
  createUser(user) {
    return axios.post(API_BASE_URL, user);
  }

  // Mettre à jour un utilisateur
  updateUser(id, user) {
    return axios.put(`${API_BASE_URL}/${id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}

export default new UserService();