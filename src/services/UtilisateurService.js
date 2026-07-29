import axios from 'axios';

const USER_API_URL = "http://192.168.1.107:8080/api/utilisateurs";

class UtilisateurService {
    // Récupérer tous les utilisateurs
    getAllUsers() {
        return axios.get(USER_API_URL);
    }

    // Créer un utilisateur (Register est aussi dans Auth, mais ici c'est pour l'admin)
    createUser(user) {
        return axios.post(USER_API_URL, user);
    }

    // Modifier un utilisateur
    updateUser(id, user) {
        return axios.put(`${USER_API_URL}/${id}`, user);
    }

    // Supprimer un utilisateur
    deleteUser(id) {
        return axios.delete(`${USER_API_URL}/${id}`);
    }
}

export default new UtilisateurService();