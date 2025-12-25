import React, { useState, useEffect } from 'react';
import BandeCommandeService from '../services/BandeCommandeService';
import { Link, useHistory } from 'react-router-dom';
import useAutoLogout from './useAutoLogout';


import './FilterComponent.css';
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Icône pour l'export Excel
import * as XLSX from 'xlsx';
const ListBandeCommandeExcutionComponent = () => {
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
        totalOrdonnances: 0,
        totalPaiements: 0,
        estimationPaiements: 0,
        estimationOrdonnances: 0
    });

    const [totalss, setTotalss] = useState({
        totalBandeCommandes: 0
    });

    const history = useHistory();
    const ent = "no";

    useEffect(() => {
        getAllBandeCommandes(entiteF, typeMarcheF, filter);
        getDashboardData(entiteF);
    }, [entiteF, typeMarcheF, filter]);

    const getAllBandeCommandes = (entiteF, typeMarcheF, filter) => {
        BandeCommandeService.getAllBandeCommandes(entiteF, typeMarcheF, filter)
            .then((response) => {
                const filteredData = response.data.filter(bc => bc.dateJugement !== null);
                setBandeCommandes(filteredData);
                calculateTotals(filteredData);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getDashboardData = (entite) => {
        BandeCommandeService.getDashboard(entite)
            .then((response) => {
                const data = response.data;
                if (data.length > 0) {
                    const entityData = entite 
                        ? data.find(row => row.entite === entite) 
                        : data.find(row => row.entite === "Total");
                    
                    if (entityData) {
                        setTotals({
                            totalBandeCommandes: entityData.totalBandeCommandes || 0,
                            estimationTotal: entityData.estimationTotal || 0,
                            totalTransmisCommission: entityData.totalTransmisCommission || 0,
                            totalJuges: entityData.totalJuges || 0,
                            totalLances: entityData.totalLances || 0,
                            totalEnCours: entityData.totalEnCours || 0,
                            totalPaiements: entityData.totalPaiements || 0,
                            totalOrdonnances: entityData.totalOrdonnances || 0
                        });
                    }
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données:", error);
            });
    };

    const calculateTotals = (data) => {
        const estimationTotal = data.reduce((sum, bc) => sum + (bc.montantBC || 0), 0);
        const estimationPaiements = data
            .filter(bc => bc.datePaiement)
            .reduce((sum, bc) => sum + (bc.montantBC || 0), 0);
        const estimationOrdonnances = data
            .filter(bc => bc.dateOrdonn)
            .reduce((sum, bc) => sum + (bc.montantBC || 0), 0);
    
        const newTotals = {
            totalBandeCommandes: data.length,
            estimationTotal,
            estimationPaiements,
            estimationOrdonnances
        };
    
        setTotalss(newTotals);
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



        const exportToExcel = () => {
            const dataToExport = bandeCommandes.map(appel => ({
              'Entité': appel.entite,
              'Objet': appel.objet,
              'Année': appel.anne,
              'N° BC': appel.numeroBC,
              'Date Jugement': appel.dateJugement,
              'Attributaire': appel.attributaire,
              'Montant BC': appel.montantBC,
              'Date Paiement': appel.datePaiement,
              'Observations': appel.observations
            }));
          
            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "AppelsOffres");
            XLSX.writeFile(wb, `Liste_bons_commande_Exécution${new Date().toISOString().slice(0,10)}.xlsx`);
          };
    const [showFilters, setShowFilters] = useState(false); // État pour gérer l'affichage des filtres

    useAutoLogout();
    return (
        <div className="container-fluid">
            <h2 className="filter-section-title text-center">Liste (Exécution) des bons de commande</h2>


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
                                <option value="juge">Paiements</option>
                                <option value="juge">Ordonnances</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <div className="stats-card">
                            <p>
                                <strong>Total des BC : </strong>
                                <span className="stat-value">{totalss.totalBandeCommandes}</span>
                                <strong> (Estimation : </strong>
                                <span className="stat-value">{formatToMDH(totalss.estimationTotal)}</span>)
                            </p>
                            <p>
                                <strong>BC. Paiements : </strong>
                                <span className="stat-value">{totals.totalPaiements}</span>
                                <strong> (Estimation : </strong>
                                <span className="stat-value">{formatToMDH(totalss.estimationPaiements)}</span>)
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tableau */}
            <div className="table-responsive" style={{ maxHeight: 'calc(110vh - 300px)' }}>
                <table className="table table-bordered table-striped">
                    <thead style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
                        <tr>
                            <th>Entité</th>
                            <th style={{ textAlign: "center", width: "600px" }}>Objet</th>
                            <th style={{ textAlign: "center" }}>Annee</th>
                            <th style={{ textAlign: "center" }}>N° BC</th>
                            <th style={{ textAlign: "center" }}>Montant TTC (BC)</th>
                            <th style={{ textAlign: "center" }}>Attributaire</th>
                            <th style={{ textAlign: "center" }}>Date Jugement</th>
                            <th style={{ textAlign: "center" }}>Date Paiement</th>
                            <th style={{ textAlign: "center" }}>Observations</th>
                            <th className='numero-colonne' style={{ width: "240px"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {bandeCommandes.length === 0 ? (
    <tr>
      <td colSpan="10" style={{ textAlign: "center", fontWeight: "bold" }}>
        Aucun bon de commande trouvé
      </td>
    </tr>
  ) : (
    (() => {
        // Séparer les BC en quatre catégories
        const bcWithPayment = bandeCommandes.filter(bc => bc.datePaiement);
        const bcWithoutPayment = bandeCommandes.filter(bc => 
            !bc.datePaiement && bc.observations !== "Infructueux" && bc.observations !== "Annulé"
        );
        const bcInfructueux = bandeCommandes.filter(bc => 
            !bc.datePaiement && bc.observations === "Infructueux"
        );
        const bcAnnule = bandeCommandes.filter(bc => 
            !bc.datePaiement && bc.observations === "Annulé"
        );

        // Trier les BC avec paiement par date (le plus récent en premier)
        const sortedWithPayment = [...bcWithPayment].sort((a, b) => 
            new Date(b.datePaiement) - new Date(a.datePaiement)
        );

        return [
            // 1. Afficher d'abord les BC avec paiement (en vert)
            ...sortedWithPayment.map((bc) => (
                <tr 
                    key={`with-payment-${bc.id}`} 
                    style={{ 
                        backgroundColor: "#9ACD32", // Vert
                    }}
                >
                    <td>{bc.entite}</td>
                    <td>{bc.objet}</td>
                    <td style={{ textAlign: "center" }}>{bc.anne}</td>
                    <td style={{ textAlign: "center" }}>{bc.numeroBC}</td>
                    <td style={{ textAlign: "center" }}>{bc.montantBC?.toLocaleString('fr-MA')}</td>
                    <td style={{ textAlign: "center" }}>{bc.attributaire}</td>
                    <td style={{ textAlign: "center" }}>{bc.dateJugement}</td>
                    <td style={{ textAlign: "center" }}>{bc.datePaiement}</td>
                    <td style={{ textAlign: "center" }}>{bc.observations}</td>
                    <td className='numero-colonne'>
                        <Link 
                            to={`/excution/${bc.id}`} 
                            className="btn btn-info btn-sm"
                        >
                            Modifier
                        </Link>
                        <button
                            onClick={() => deleteBandeCommande(bc.id)}
                            className="btn btn-danger btn-sm ms-2"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            )),
            
            // 2. Ensuite les BC sans paiement (en marron)
            ...bcWithoutPayment.map(bc => (
                <tr 
                    key={`without-payment-${bc.id}`}
                    style={{ 
                        backgroundColor: "#CD853F" // Marron
                    }}
                >
                    <td>{bc.entite}</td>
                    <td>{bc.objet}</td>
                    <td style={{ textAlign: "center" }}>{bc.anne}</td>
                    <td style={{ textAlign: "center" }}>{bc.numeroBC}</td>
                    <td style={{ textAlign: "center" }}>{bc.montantBC?.toLocaleString('fr-MA')}</td>
                    <td style={{ textAlign: "center" }}>{bc.attributaire}</td>
                    <td style={{ textAlign: "center" }}>{bc.dateJugement}</td>
                    <td style={{ textAlign: "center" }}>{bc.datePaiement || '-'}</td>
                    <td style={{ textAlign: "center" }}>{bc.observations}</td>
                    <td className='numero-colonne'>
                        <Link 
                            to={`/excution/${bc.id}`} 
                            className="btn btn-info btn-sm"
                        >
                            Modifier
                        </Link>
                        <button
                            onClick={() => deleteBandeCommande(bc.id)}
                            className="btn btn-danger btn-sm ms-2"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            )),
            
            // 3. Puis les BC Infructueux (en rouge)
            ...bcInfructueux.map(bc => (
                <tr 
                    key={`infructueux-${bc.id}`}
                    style={{ 
                        backgroundColor: "#FF6B6B" // Rouge
                    }}
                >
                    <td>{bc.entite}</td>
                    <td>{bc.objet}</td>
                    <td style={{ textAlign: "center" }}>{bc.anne}</td>
                    <td style={{ textAlign: "center" }}>{bc.numeroBC}</td>
                    <td style={{ textAlign: "center" }}>{bc.montantBC?.toLocaleString('fr-MA')}</td>
                    <td style={{ textAlign: "center" }}>{bc.attributaire}</td>
                    <td style={{ textAlign: "center" }}>{bc.dateJugement}</td>
                    <td style={{ textAlign: "center" }}>{bc.datePaiement || '-'}</td>
                    <td style={{ textAlign: "center" }}>{bc.observations}</td>
                    <td className='numero-colonne'>
                        <Link 
                            to={`/excution/${bc.id}`} 
                            className="btn btn-info btn-sm"
                        >
                            Modifier
                        </Link>
                        <button
                            onClick={() => deleteBandeCommande(bc.id)}
                            className="btn btn-danger btn-sm ms-2"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            )),
            
            // 4. Enfin les BC Annulé (en rose)
            ...bcAnnule.map(bc => (
                <tr 
                    key={`annule-${bc.id}`}
                    style={{ 
                        backgroundColor: "#C0C0C0" // Rose
                    }}
                >
                    <td>{bc.entite}</td>
                    <td>{bc.objet}</td>
                    <td style={{ textAlign: "center" }}>{bc.anne}</td>
                    <td style={{ textAlign: "center" }}>{bc.numeroBC}</td>
                    <td style={{ textAlign: "center" }}>{bc.montantBC?.toLocaleString('fr-MA')}</td>
                    <td style={{ textAlign: "center" }}>{bc.attributaire}</td>
                    <td style={{ textAlign: "center" }}>{bc.dateJugement}</td>
                    <td style={{ textAlign: "center" }}>{bc.datePaiement || '-'}</td>
                    <td style={{ textAlign: "center" }}>{bc.observations}</td>
                    <td className='numero-colonne'>
                        <Link 
                            to={`/excution/${bc.id}`} 
                            className="btn btn-info btn-sm"

                        >
                            Modifier
                        </Link>
                        <button
                            onClick={() => deleteBandeCommande(bc.id)}
                            className="btn btn-danger btn-sm ms-2"

                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            ))
        ];
    })())}
</tbody>
                </table>
            </div>
        </div>
    );
};

export default ListBandeCommandeExcutionComponent;