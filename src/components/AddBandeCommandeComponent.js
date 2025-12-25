import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import BandeCommandeService from '../services/BandeCommandeService';
import './AddBandeCommandeComponent.css';

const AddBandeCommandeComponent = () => {
    // États pour les champs du formulaire
    const [numeroBC, setNumeroBC] = useState('');
    const [entite, setEntite] = useState('');
    const [objet, setObjet] = useState('');
    const [typeMarche, setTypeMarche] = useState('');
    const [estimation, setEstimation] = useState('');
    const [transmisCommission, setTransmisCommission] = useState('');
    const [dateOuvertureReelle, setDateOuvertureReelle] = useState('');
    const [heureOuverture, setHeureOuverture] = useState('');
    const [dateJugement, setDateJugement] = useState('');
    const [montantBC, setMontantBC] = useState('');
    const [observations, setObservations] = useState('');
    const [attributaire, setAttributaire] = useState('');
    const [anne, setAnne] = useState('');
    const [dateDevis, setDateDevis] = useState('');
    const [dateOrdonn, setDateOrdonn] = useState('');
    const [datePaiement, setDatePaiement] = useState('');
    const [nbrdevis, setNbrdevis] = useState('');
    const history = useHistory();
    const { id } = useParams();
    let { entiteParam } = useParams();

    if (entiteParam === undefined) {
        entiteParam = null;
    }

    const handleCancel = () => {
        if (entiteParam) {
            history.push(`/bande-commandes/${entiteParam}`);
        } else {
            history.push('/bande-commandes');
        }
    };

    const saveOrUpdateBandeCommande = (e) => {
        e.preventDefault();
        
        if (!objet || !entite) {
            alert("Veuillez remplir les champs obligatoires !");
            return;
        }

        const bandeCommande = {
            numeroBC,
            entite,
            objet,
            typeMarche,
            estimation,
            transmisCommission,
            dateOuvertureReelle,
            heureOuverture,
            dateJugement,
            montantBC,
            observations,
            attributaire,
            anne,
            dateDevis,
            dateOrdonn,
            datePaiement,
            nbrdevis


        };

        if (id) {
            // Mise à jour
            console.log("post:",id,bandeCommande)
            BandeCommandeService.updateBandeCommande(id, bandeCommande)
            
            .then(() => {
                  
         
                  
                    redirectAfterSubmit();
                })
                .catch(error => {
                    console.error("Erreur lors de la mise à jour:", error);
                });
        } else {
            // Création

            console.log("post:",bandeCommande)
            BandeCommandeService.createBandeCommande(bandeCommande)
                .then(() => {
                 
                    redirectAfterSubmit();
                })
                .catch(error => {
                    console.error("Erreur lors de la création:", error);
                });
        }
    };

    const redirectAfterSubmit = () => {
     
            history.push(`/bande-commandes`);
      
    };

    useEffect(() => {
        if (id) {
            BandeCommandeService.getBandeCommandeById(id)
                .then(response => {
                    const bc = response.data;
                    setNumeroBC(bc.numeroBC);
                    setEntite(bc.entite);
                    setObjet(bc.objet);
                    setTypeMarche(bc.typeMarche);
                    setEstimation(bc.estimation);
                    setTransmisCommission(bc.transmisCommission);
                    setDateOuvertureReelle(bc.dateOuvertureReelle);
                    setHeureOuverture(bc.heureOuverture);
                    setDateJugement(bc.dateJugement);
                    setMontantBC(bc.montantBC);
                    setObservations(bc.observations);
                    setAttributaire(bc.attributaire);
                    setNbrdevis(bc.nbrdevis);
                    setAnne(bc.anne);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération:", error);
                });
        }
    }, [id]);

    const title = () => {
        return id 
            ? <h2 className="text-center">Modifier bon de Commande</h2>
            : <h2 className="text-center">Ajouter bon de Commande</h2>;
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="card col-md-8 offset-md-2">
                    {title()}
                    <div className="card-body">
                        <form onSubmit={saveOrUpdateBandeCommande}>
                            {/* Numéro BC */}
                            <div className="form-group mb-3">
                                <label className="form-label">Numéro BC:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={numeroBC}
                                    onChange={(e) => setNumeroBC(e.target.value)}
                                    
                                />
                            </div>

                            {/* Entité */}
                            <div className="form-group mb-3">
                                <label className="form-label">Entité:</label>
                                <select
                                    className="form-select"
                                    value={entite}
                                    onChange={(e) => setEntite(e.target.value)}
                                    required
                                >
                                    <option value="">Sélectionner une entité</option>
                   
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

                            {/* Objet */}
                            <div className="form-group mb-3">
                                <label className="form-label">Objet:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={objet}
                                    onChange={(e) => setObjet(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Annee:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={anne}
                                    onChange={(e) => setAnne(e.target.value)}
                                    
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Devis Recus:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nbrdevis}
                                    onChange={(e) => setNbrdevis(e.target.value)}
                                    
                                />
                            </div>


                            {/* Type Marché */}
                            {/* <div className="form-group mb-3">
                                <label className="form-label">Type Marché:</label>
                                <select
                                    className="form-select"
                                    value={typeMarche}
                                    onChange={(e) => setTypeMarche(e.target.value)}
                                >
                                    <option value="">Sélectionner un type</option>
                                    <option value="F">Fourniture</option>
                                    <option value="S">Service</option>
                                    <option value="T">Travaux</option>
                                </select>
                            </div> */}

                            {/* Estimation */}
                            {/* <div className="form-group mb-3">
                                <label className="form-label">Estimation (DH):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={estimation}
                                    onChange={(e) => setEstimation(e.target.value)}
                                    step="0.01"
                                />
                            </div> */}



                            {/* Date  Transmis à la Commission */}
                            {/* <div className="form-group mb-3">
                                <label className="form-label"> Transmis à la Commission:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={transmisCommission}
                                    onChange={(e) => setTransmisCommission(e.target.value)}
                                />
                            </div> */}

                            {/* Heure Ouverture */}

                            {/* Date Ouverture Réelle */}
                            <div className="form-group mb-3">
                                <label className="form-label">Date de Réception des Devis:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateOuvertureReelle}
                                    onChange={(e) => setDateOuvertureReelle(e.target.value)}
                                />
                            </div>

                            {/* Heure Ouverture */}
                            <div className="form-group mb-3">
                                <label className="form-label">Heure de Réception des Devis :</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={heureOuverture}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setHeureOuverture(value ? value : null);
                                    }}
                                />
                            </div>

                            {/* Date Jugement */}
                            <div className="form-group mb-3">
                                <label className="form-label">Date Jugement:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dateJugement}
                                    onChange={(e) => setDateJugement(e.target.value)}
                                />
                            </div>

                            {/* Montant BC */}
                            <div className="form-group mb-3">
                                <label className="form-label">Montant BC (DH):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={montantBC}
                                    onChange={(e) => setMontantBC(e.target.value)}
                                    step="0.01"
                                />
                            </div>
                            {/* Attributaire */}
                            <div className="form-group mb-3">
                                <label className="form-label">Attributaire:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={attributaire}
                                    onChange={(e) => setAttributaire(e.target.value)}
                                />
                            </div>
                            {/* Observations */}
                            <div className="form-group mb-3">
                                <label className="form-label">Observations:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={observations}
                                    onChange={(e) => setObservations(e.target.value)}
                                />
                            </div>

                            {/* Boutons */}
                            <div className="d-flex justify-content-between mt-4">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                >
                                    {id ? 'Mettre à jour' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBandeCommandeComponent;