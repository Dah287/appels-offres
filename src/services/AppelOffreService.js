import axios from "axios";

const AppelOffre_BASE_REST_API_URL = "http://192.168.1.107:8080/api/v1/appelOffre";
const LOGIN_BASE_REST_API_URL = "http://192.168.1.107:8080";

// --- CONFIGURATION DE L'INTERCEPTEUR ---
// Cet intercepteur s'exécute avant chaque requête envoyée par Axios
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    const exercice = sessionStorage.getItem("exercice");

    // 1. Ajouter le Token JWT (Bearer)
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    // 2. Ajouter l'exercice s'il existe (évite de le répéter dans chaque fonction)
    if (exercice) {
      config.headers["exercice"] = exercice;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AppelOffreService {

  getAllAppelOffre(entite, typeMarche, fitre, visa) {
    let url = AppelOffre_BASE_REST_API_URL + '?';

    if (entite && entite !== "ENTITE") {
      url += `entite=${encodeURIComponent(entite)}&`;
    }
    if (typeMarche && typeMarche !== "TYPE MARCHE") {
      url += `typeMarche=${encodeURIComponent(typeMarche)}&`;
    }
    if (fitre && fitre !== "Filre") {
      url += `fitre=${encodeURIComponent(fitre)}&`;
    }
    if (visa && visa !== "Visa") {
      url += `visa=${encodeURIComponent(visa)}&`;
    }

    if (url.endsWith("&")) {
      url = url.slice(0, -1);
    }

    console.log("Appel API:", url);
    return axios.get(url); // Plus besoin de passer les headers ici, l'intercepteur s'en occupe
  }

  createAppelOffre(appelOffre) {
    return axios.post(AppelOffre_BASE_REST_API_URL, appelOffre);
  }

  getappelOffreById(appelOffre) {
    return axios.get(AppelOffre_BASE_REST_API_URL + '/' + appelOffre);
  }

  updateappelOffre(appelOffreId, appelOffre) {
    return axios.put(AppelOffre_BASE_REST_API_URL + '/' + appelOffreId, appelOffre);
  }

  updateappelOffrerecapp(appelOffreId, appelOffre) {
    return axios.put(AppelOffre_BASE_REST_API_URL + '/update/' + appelOffreId, appelOffre);
  }

  deleteappelOffre(appelOffreId) {
    return axios.delete(AppelOffre_BASE_REST_API_URL + '/' + appelOffreId);
  }

// Dans AppelOffreService.js
getDashboard(entite, situation, typeMarche) {
    return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboards', {
        params: { 
            entite: entite,
            situation: situation, // Ajouté
            typeMarche: typeMarche // Ajouté
        }
    });
}
getDashboardPourVisa(entite, situation, typeMarche) {
    return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboardsPourVisa', {
        params: { 
            entite: entite,
            situation: situation, // Ajouté
            typeMarche: typeMarche // Ajouté
        }
    });
}

  getDashboard1(entite) {
    return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboards/annules-infructueux', {
      params: { entite }
    });
  }

  getdashboard() {
    return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboard');
  }

  // --- Authentification ---
  login(user) {
    // Note: L'intercepteur ajoutera un token vide lors du premier login, 
    // ce qui n'est pas gênant pour le backend.
    return axios.post(LOGIN_BASE_REST_API_URL + '/api/auth/login', user);
  }
}

export default new AppelOffreService();