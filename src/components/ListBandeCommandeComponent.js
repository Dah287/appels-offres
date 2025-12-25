import React, { useState, useEffect } from 'react';
import BandeCommandeService from '../services/BandeCommandeService';
import { Link, useHistory } from 'react-router-dom';
import './FilterComponent.css';
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Icône pour l'export Excel
import * as XLSX from 'xlsx';
import useAutoLogout from './useAutoLogout';

const ListBandeCommandeComponent = () => {
    const [entiteF, setEntiteF] = useState('');
    const [typeMarcheF, setTypeMarcheF] = useState('');
    const [filter, setFilter] = useState('');
    const [bandeCommandes, setBandeCommandes] = useState([]);
    const [totals, setTotals] = useState({
        totalBandeCommandes: 0,
        estimationTotal: 0,
        totalTransmisCommission: 0,
        totalJuges: 0,
        totalLances: 0,
        totalEnCours: 0,

    });
    const currentYear = sessionStorage.getItem("exercice");;
    const history = useHistory();

    useEffect(() => {
        getAllBandeCommandes(entiteF, typeMarcheF, filter);
    }, [entiteF, typeMarcheF, filter]);

    const getAllBandeCommandes = (entiteF, typeMarcheF, filter) => {
        BandeCommandeService.getAllBandeCommandes(entiteF, typeMarcheF, filter)
            .then((response) => {
                // Appliquer le filtre principal
                const filteredData = response.data.filter(bc => 
                    !(bc.dateJugement !== null && bc.anne < currentYear)
                );
                setBandeCommandes(filteredData);
                
                // Calculer les totaux basés sur les données filtrées
                calculateTotals(filteredData);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const calculateTotals = (data) => {
        const newTotals = {
            totalBandeCommandes: data.length,
            estimationTotal: data.reduce((sum, bc) => sum + (bc.montantBC || 0), 0),
            estimationLances: data
                .filter(bc => bc.dateOuvertureReelle)
                .reduce((sum, bc) => sum + (bc.montantBC || 0), 0),
            estimationJuges: data
                .filter(bc => bc.dateJugement)
                .reduce((sum, bc) => sum + (bc.montantBC || 0), 0),
            totalTransmisCommission: data.filter(bc => bc.transmisCommission).length,
            totalJuges: data.filter(bc => bc.dateJugement).length,
            totalLances: data.filter(bc => bc.dateOuvertureReelle).length,
            totalEnCours: data.filter(bc => !bc.dateJugement && !bc.dateOuvertureReelle).length
        };
        setTotals(newTotals);
    };
    

    const deleteBandeCommande = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette bande de commande ?")) {
            BandeCommandeService.deleteBandeCommande(id)
                .then(() => {
                    getAllBandeCommandes(entiteF, typeMarcheF, filter);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const formatToMDH = (value) => {
        return value ? (value / 1_000_000).toFixed(2) + " MDH" : "0 MDH";
    };

    const getStatusColor = (bc) => {
        if (bc.observations === "Infructueux") return "#FF6B6B"; // Rouge pour Infructueux
        if (bc.dateJugement) return "#CD853F"; // Marron pour jugé
        if (bc.dateOuvertureReelle) return "#50C878"; // Vert pour lancé
       
        if (bc.transmisCommission) return "#FFFF00"; // Jaune pour transmis
        return "white"; // Blanc pour en cours
    };


    const exportToExcel = () => {
        const dataToExport = bandeCommandes.map(appel => ({
          'Entité': appel.entite,
          'Objet': appel.objet,
          'Année': appel.anne,
          'Date Réception Devis': appel.dateOuvertureReelle,
          'Heure': appel.heure,
          'Publication Prev': appel.nbrdevis,
          'Date Jugement': appel.dateJugement,
          'Montant BC': appel.montantBC,
          'Attributaire': appel.attributaire,
          'Observations': appel.observations
        }));
      
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "AppelsOffres");
        XLSX.writeFile(wb, `Liste_bons_commande_${new Date().toISOString().slice(0,10)}.xlsx`);
      };
      
     

 const [showFilters, setShowFilters] = useState(false); // État pour gérer l'affichage des filtres
 useAutoLogout();
    return (
        <div className="container-fluid">
            <h2 className="filter-section-title text-center">
                Liste des bons de commande ({currentYear})
            </h2>

                        {/* Bouton pour afficher/masquer les filtres */}
                        <div className="row my-2">
  <div className="col-12 text-end mb-3">
    <button 
      className="btn btn-outline-primary me-2"
      onClick={() => setShowFilters(!showFilters)}
    >
      {showFilters ? '▲ Masquer les filtres' : '▼ Afficher les filtres'}
    </button>

    <button
      className="btn btn-success"
      onClick={exportToExcel}
    >
      <FileDownloadIcon style={{ verticalAlign: 'middle' }} /> Export Excel
    </button>
  </div>
</div>

            


                {/* Filtres - conditionnellement affichés */}
                {showFilters && (
            <div className="row my-2">
                <div className="col-12 col-md-3 mb-3">
                    <div className="filter-card">
                        <label className="filter-label">Entité</label>
                        <select 
                            className="form-select filter-select" 
                            value={entiteF} 
                            onChange={(e) => setEntiteF(e.target.value)}
                        >
                            <option value="">Toutes les entités</option>
                            <option value="DPF">DPF</option>
                            <option value="DGR">DGR</option>
                            <option value="DA">DA</option>
                            <option value="DDA">DDA</option>
                            <option value="DRH">DRH</option>
                            <option value="SAICG">SAICG</option>
                                                                    <option value="SMG">SMG</option>
                                        <option value="BJC">BJC</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 col-md-3 mb-3">
                    <div className="filter-card">
                        <label className="filter-label">Statut</label>
                        <select 
                            className="form-select filter-select" 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="">Tous les statuts</option>
                            <option value="transmis">Transmis à la Commission</option>
                            <option value="ouv">Lancé</option>
                            <option value="juge">Jugé</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-3">
                    <div className="stats-card">
                        <p>
                            <strong>Total BC : </strong>
                            <span className="stat-value">{totals.totalBandeCommandes}</span>
                            <strong> (Montant : </strong>
                            <span className="stat-value">{formatToMDH(totals.estimationTotal)}</span>)
                        </p>
                        {/* <p>
                            <strong>Transmis : </strong>
                            <span className="stat-value">{totals.totalTransmisCommission}</span>
                        </p> */}
                        <p>
                            <strong>BC. Lancés : </strong>
                            <span className="stat-value">{totals.totalLances}</span>
                            <strong> (Montant : </strong>
                                <span className="stat-value">{formatToMDH(totals.estimationLances)}</span>)
                        </p>
                        <p>
                            <strong>BC. Jugés : </strong>
                            <span className="stat-value">{totals.totalJuges}</span>
                            <strong> (Montant : </strong>
                                <span className="stat-value">{formatToMDH(totals.estimationJuges)}</span>)

                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-2 text-end mb-3">
                    <Link to="/add-bandecommande" className="btn btn-primary">
                        Ajouter BC
                    </Link>
                </div>
            </div>

)}

            {/* Tableau */}
            <div className="table-responsive" style={{ maxHeight: 'calc(110vh - 300px)' }}>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Entité</th>
                            <th style={{ textAlign: "center", width: "600px" }}>Objet</th>
                            <th style={{ textAlign: "center" }}>Année</th>
                            <th style={{ textAlign: "center" }}>N° BC</th>
                            {/* <th style={{ textAlign: "center" }}>Transmis Commission</th> */}
                            <th style={{ textAlign: "center", width: "180px" }}>
                                <div>Date Réception Devis</div>
                                <div style={{ borderTop: "1px solid black", paddingTop: "2px", marginTop: "2px" }}>Heure</div>
                            </th>
                            <th style={{ textAlign: "center" }}>Devis Recus</th>
                            <th style={{ textAlign: "center" }}>Date Jugement</th>
                            <th style={{ textAlign: "center" }}>Montant BC</th>
                            <th style={{ textAlign: "center" }}>Attributaire</th>
                          
                            <th style={{ textAlign: "center" }}>Observations</th>
                            <th className='numero-colonne' style={{width: "200px"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                          {bandeCommandes.length === 0 ? (
    <tr>
      <td colSpan="11" style={{ textAlign: "center", fontWeight: "bold" }}>
        Aucun bon de commande trouvé
      </td>
    </tr>
  ) : (
                        
                        bandeCommandes
                            .sort((a, b) => {
                                if (a.dateJugement && !b.dateJugement) return -1;
                                if (!a.dateJugement && b.dateJugement) return 1;
                                if (a.dateJugement && b.dateJugement) {
                                    return new Date(b.dateJugement) - new Date(a.dateJugement);
                                }
                                return 0;
                            })
                            .map((bc) => (
                                <tr key={bc.id} style={{ backgroundColor: getStatusColor(bc) }}>
                                    <td>{bc.entite}</td>
                                    <td>{bc.objet}</td>
                                    <td style={{ textAlign: "center" }}>{bc.anne}</td>
                                    <td style={{ textAlign: "center" }}>{bc.numeroBC}</td>
                                    {/* <td style={{ textAlign: "center" }}>{bc.transmisCommission || '-'}</td> */}
                                    <td style={{ textAlign: "center" }}>
                                        <div>{bc.dateOuvertureReelle || '-'}</div>
                                        {bc.heureOuverture && (
                                            <div style={{ borderTop: "1px solid #ddd", paddingTop: "2px", marginTop: "2px" }}>
                                                {bc.heureOuverture}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ textAlign: "center" }}>{bc.nbrdevis || '-'}</td>
                                    <td style={{ textAlign: "center" }}>
                                        {bc.dateJugement || 
                                            (bc.dateOuvertureReelle ? "En cours" : "-")}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {bc.montantBC?.toLocaleString('fr-MA') || '-'}
                                    </td>
                                    <td style={{ textAlign: "center" }}>{bc.attributaire || '-'}</td>
                    
                                    <td style={{ textAlign: "center" }}>{bc.observations || '-'}</td>
                                    <td className='numero-colonne'>
                                        <Link 
                                            to={`/edit-bandecommande/${bc.id}`} 
                                            className="btn btn-info btn-sm"
                                                          style={{                
                                                            fontSize: "14px",
                                                            width: "70px",
                                                            paddingLeft : "1px",
                                                            paddingRight:"1px"
                                                        
                                                        }}
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => deleteBandeCommande(bc.id)}
                                            className="btn btn-danger btn-sm ms-2"
                                                          style={{
                
                                                        fontSize: "14px",
                                                        width: "80px",
                                                        paddingLeft : "1px",
                                                        paddingRight:"1px"
                                                    
                                                    }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListBandeCommandeComponent;