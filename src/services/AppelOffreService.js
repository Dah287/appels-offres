import axios from "axios";

const API_BASE_URL = "http://192.168.1.27:8080";
const AUTH_API_URL = `${API_BASE_URL}/auth`; // Endpoint d'authentification
const APP_API_URL = `${API_BASE_URL}/api/v1/appelOffre`; // Ton endpoint principal

class AppelOffreService {
    constructor() {
        // Vérifie s'il y a un token au chargement
        const token = localStorage.getItem('jwtToken');
        if (token) {
            this.setAuthToken(token);
        }
    }

    // Méthode pour configurer le token dans les headers d'axios
    setAuthToken(token) {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    // === 🔐 AUTHENTIFICATION ===

    login(user) {
      console.log("user:",user)
        return axios.post(`${AUTH_API_URL}/login`, user)
            .then(response => {
                const { token, username } = response.data;

                // 1. Stocker le token et le username
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('username', username);

                // 2. Configurer axios pour les futures requêtes
                this.setAuthToken(token);

                return response;
            })
            .catch(err => {
                console.error("Login failed", err);
                throw err;
            });
    }

    logout() {
        // Supprimer le token
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        // Retirer le header d'authentification
        this.setAuthToken(null);
    }

    isLoggedIn() {
        return !!localStorage.getItem('jwtToken');
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    // === 📦 FONCTIONS SUR LES APPELS D'OFFRES ===

    getAllAppelOffre(entite, typeMarche, filtre, visa) {
        let url = `${APP_API_URL}?`;

        if (entite && entite !== "ENTITE") {
            url += `entite=${entite}&`;
        }
        if (typeMarche && typeMarche !== "TYPE MARCHE") {
            url += `typeMarche=${typeMarche}&`;
        }
        if (filtre && filtre !== "Filre") {
            url += `fitre=${filtre}&`;
        }
        if (visa && visa !== "Visa") {
            url += `visa=${visa}&`;
        }

        if (url.endsWith("&")) {
            url = url.slice(0, -1);
        }

        console.log("GET All Appels d'offres:", url);
        return axios.get(url);
    }

    createAppelOffre(appelOffre) {
        return axios.post(APP_API_URL, appelOffre);
    }

    getAppelOffreById(id) {
        return axios.get(`${APP_API_URL}/${id}`);
    }

    updateAppelOffre(appelOffreId, appelOffre) {
        return axios.put(`${APP_API_URL}/${appelOffreId}`, appelOffre);
    }

    updateAppelOffreRecap(appelOffreId, appelOffre) {
        return axios.put(`${APP_API_URL}/update/${appelOffreId}`, appelOffre);
    }

    deleteAppelOffre(appelOffreId) {
        return axios.delete(`${APP_API_URL}/${appelOffreId}`);
    }

    getDashboard(entite) {
        return axios.get(`${APP_API_URL}/dashboards`, {
            params: { entite }
        });

        
          
    }

        getdashboard() {
        return axios.get(`${APP_API_URL}/dashboard`);

        
          
    }

    getDashboardGlobal() {
        return axios.get(`${APP_API_URL}/dashboard`);
    }
}

export default new AppelOffreService();