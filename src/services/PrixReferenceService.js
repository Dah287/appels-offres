import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.107:8080/api/tenders';

const PrixReferenceService = {
    // Calcul simple (sans persistance)
    calculatePrice: (tenderData) => axios.post(`${API_BASE_URL}/calculate`, tenderData),
    
    // Sauvegarde d’une analyse
    saveTender: (tenderData) => axios.post(`${API_BASE_URL}/save`, tenderData),
    updateTender: (id, tenderData) => axios.put(`${API_BASE_URL}/${id}`, tenderData), // nouvelle mé
    
    // Liste des analyses sauvegardées
    getAllTenders: () => axios.get(`${API_BASE_URL}`),
    
    // Récupération du résultat calculé pour un tender existant
    getTenderResult: (id) => axios.get(`${API_BASE_URL}/${id}/result`),
    
    // Récupération des données brutes du tender (pour pré-remplir le formulaire)
    getTenderData: (id) => axios.get(`${API_BASE_URL}/${id}`)
};

export default PrixReferenceService;