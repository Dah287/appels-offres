import axios from 'axios';

const BANDE_COMMANDE_BASE_REST_API_URL = "http://192.168.1.80:8080/api/v1/bande-commande";

// --- CONFIGURATION DE L'INTERCEPTEUR JWT ---
axios.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        const exercice = sessionStorage.getItem("exercice");

        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }

        // ✅ Envoi de l'année sélectionnée
        if (exercice) {
            config.headers["X-EXERCICE"] = exercice;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

class BandeCommandeService {
    
    // Récupère toutes les bandes de commande avec filtres optionnels
    getAllBandeCommandes(entite, typeMarche, fitre) {
        let url = BANDE_COMMANDE_BASE_REST_API_URL + '?';
        
        if (entite && entite !== "ENTITE") {
            url += `entite=${encodeURIComponent(entite)}&`;
        }
        
        if (typeMarche && typeMarche !== "TYPE MARCHE") {
            url += `typeMarche=${encodeURIComponent(typeMarche)}&`;
        }
        
        if (fitre && fitre !== "Filre") {
            url += `fitre=${encodeURIComponent(fitre)}&`;
        }

        if (url.endsWith("&")) {
            url = url.slice(0, -1);
        }

        console.log("URL appelée avec Token:", url);
        return axios.get(url);
    }

    // Crée une nouvelle bande de commande
    createBandeCommande(bandeCommande) {
        return axios.post(BANDE_COMMANDE_BASE_REST_API_URL, bandeCommande);
    }

    // Récupère une bande de commande par son ID
    getBandeCommandeById(bandeCommandeId) {
        return axios.get(BANDE_COMMANDE_BASE_REST_API_URL + '/' + bandeCommandeId);
    }

    // Met à jour une bande de commande
    updateBandeCommande(bandeCommandeId, bandeCommande) {
        return axios.put(
            BANDE_COMMANDE_BASE_REST_API_URL + '/' + bandeCommandeId, 
            bandeCommande
        );
    }

    // Met à jour l'exécution
    updateEX(appelOffreId, appelOffre){
        return axios.put(BANDE_COMMANDE_BASE_REST_API_URL + '/update-excution/' + appelOffreId, appelOffre);
    }

    // Supprime une bande de commande
    deleteBandeCommande(bandeCommandeId) {
        return axios.delete(BANDE_COMMANDE_BASE_REST_API_URL + '/' + bandeCommandeId);
    }

    // Récupère les données du dashboard
    getDashboard(entite) {
        let url = BANDE_COMMANDE_BASE_REST_API_URL + '/dashboard';
        
        // Utilisation de params Axios pour une gestion propre
        return axios.get(url, {
            params: entite && entite !== "ENTITE" ? { entite } : {}
        });
    }
}

export default new BandeCommandeService();