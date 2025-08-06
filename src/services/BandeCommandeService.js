import axios from 'axios';

const BANDE_COMMANDE_BASE_REST_API_URL = "http://192.168.1.27:8080/api/v1/bande-commande";

class BandeCommandeService {
    // Récupère toutes les bandes de commande avec filtres optionnels
    getAllBandeCommandes(entite, typeMarche, fitre) {
        let url = BANDE_COMMANDE_BASE_REST_API_URL + '?';
        
        if (entite && entite !== "ENTITE") {
            url += `entite=${entite}&`;
        }
        
        if (typeMarche && typeMarche !== "TYPE MARCHE") {
            url += `typeMarche=${typeMarche}&`;
        }
        
        if (fitre && fitre !== "Filre") {
            url += `fitre=${fitre}&`;
          }

        // Supprime le dernier "&" de l'URL si présent
        if (url.endsWith("&")) {
            url = url.slice(0, -1);
        }

        console.log("URL appelée:", url);
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

    updateEX(appelOffreId, appelOffre){
        return axios.put(BANDE_COMMANDE_BASE_REST_API_URL + '/update-excution/' +appelOffreId, appelOffre);
      }

    // Supprime une bande de commande
    deleteBandeCommande(bandeCommandeId) {
        return axios.delete(BANDE_COMMANDE_BASE_REST_API_URL + '/' + bandeCommandeId);
    }

    // Récupère les données du dashboard avec filtre optionnel par entité
    getDashboard(entite) {
        let url = BANDE_COMMANDE_BASE_REST_API_URL + '/dashboard';
        
        if (entite && entite !== "ENTITE") {
            url += `?entite=${entite}`;
        }

        return axios.get(url);
    }
}

export default new BandeCommandeService();