
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppelOffreService from '../services/AppelOffreService';
import './AddAppelOffreComponent.css';
import BandeCommandeService from '../services/BandeCommandeService';

const UpdateExcutionBC = () => {
  const [anne, setAnne] = useState('');
  const [numeroVisa, setNumeroVisa] = useState('');




  const [dateDevis, setDateDevis] = useState('');
  const [datePaiement, setDatePaiement] = useState('');
  const [dateOrdonn, setDateOrdonn] = useState(''); 
  const [marcheVise, setMarcheVise] = useState('');
  const [montantTTC, setMontantTTC] = useState('');
  const [montantBC, setMontantBC] = useState('');
  const [attributaire, setAttributaire] = useState('');
  const [nbrdevis, setNbrdevis] = useState('');
//

  const [observations, setObservations] = useState('');
    const [dateOuvertureReelle, setDateOuvertureReelle] = useState('');
    const [heureOuverture, setHeureOuverture] = useState('');
    const [dateJugement, setDateJugement] = useState('');
    const [numeroBC, setNumeroBC] = useState('');
    const [entite, setEntite] = useState('');
    const [objet, setObjet] = useState('');

  const history = useHistory();
  const { id, entitee, bloque } = useParams();
console.log("id :",id)
  const handleCancel = () => {
    if (id) {
      history.push('/excution-bandecommande');
    }
  };

  const saveOrUpdatedAppelOffre = (e) => {
    e.preventDefault();
    const appelOffre = { attributaire,anne,dateOrdonn,datePaiement,nbrdevis,montantBC,
        numeroBC,
        entite,
        objet,
        dateOuvertureReelle,
        heureOuverture,
        dateJugement,
        observations,
    
    };

    if (id) {
        console.log(appelOffre)
      BandeCommandeService.updateEX(id, appelOffre)
        .then((response) => {
          console.log(response.data.numero);
          history.push('/excution-bandecommande');
        })
        .catch((error) => {
          console.error(error);
          alert('Erreur lors de la mise à jour de l\'appel d\'offre.');
        });
    } 
  };

  useEffect(() => {
    if (id) {
      BandeCommandeService.getBandeCommandeById(id)
        .then((response) => {
            console.log("data :,",response.data)
        setAnne(response.data.anne);
        setDateDevis(response.data.dateDevis);
        setDateOrdonn(response.data.dateOrdonn);
        setDatePaiement(response.data.datePaiement);
          setAttributaire(response.data.attributaire);
          setNbrdevis(response.data.nbrdevis);
          setMontantBC(response.data.montantBC);
          setNumeroBC(response.data.numeroBC);
          setEntite(response.data.entite);
          setObjet(response.data.objet);
          setDateOuvertureReelle(response.data.dateOuvertureReelle);
        setHeureOuverture(response.data.heureOuverture);
        setDateJugement(response.data.dateJugement);
        setObservations(response.data.observations);

         
        //   setMarcheVise(response.data.marcheVise);
        //   setNumeroVisa(response.data.numeroVisa);
        })
        .catch((error) => {
          console.error(error);
          alert('Erreur de récupération des données pour cet appel d\'offre.');
        });
    }
  }, [id]);

  const title = () => {
    return id ? <h2 className="text-center">Modifier Bande de Commande</h2> : <h2 className="text-center">Modifier Bande de Commande</h2>;
  };

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
              {/* <div className="form-group mb-2">
                  <label className="form-label">Numero ° BC:</label>
                  <input
                    type="text"
                    placeholder="Enter Numero Visa"
                    name="numeroVisa"
                    className="form-control"
                    value={numeroVisa}
                    onChange={(e) => setNumeroVisa(e.target.value)}
                    required
                  />
                </div> */}
                <div className="form-group mb-3">
                    <label className="form-label">Numéro BC:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={numeroBC}
                        onChange={(e) => setNumeroBC(e.target.value)}
                        
                    />
                </div>

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

                   <div className="form-group mb-2">
                  <label className="form-label">Anne :</label>
                  <input
                    type="text"
                    placeholder="Enter Anne"
                    name="attributaire"
                    className="form-control"
                    value={anne}
                    onChange={(e) => setAnne(e.target.value)}
                    required
                  />
                </div>



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



                <div className="form-group mb-2">
                  <label className="form-label">Attributaire :</label>
                  <input
                    type="text"
                    placeholder="Enter Attributaire"
                    name="attributaire"
                    className="form-control"
                    value={attributaire}
                    onChange={(e) => setAttributaire(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Devis Recus :</label>
                  <input
                    type="text"
                    placeholder="Enter Devis Recus"
                    name="attributaire"
                    className="form-control"
                    value={nbrdevis}
                    onChange={(e) => setNbrdevis(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Montant TTC (BC):</label>
                  <input
                    type="text"
                    placeholder="Enter Montant TTC (BC)"
                    name="attributaire"
                    className="form-control"
                    value={montantBC}
                    onChange={(e) => setMontantBC(e.target.value)}
                    required
                  />
                </div>
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

                <div className="form-group mb-2">
                  <label className="form-label">Date Ordonn :</label>
                  <input
                    type="date"
                    placeholder="Date Ordonn"
                    name="marcheVise"
                    className="form-control"
                    value={dateOrdonn}
                    onChange={(e) => setDateOrdonn(e.target.value)}
                    // disabled={bloque === 'oui'} // Désactive si x est "oui"
                  />
                  <br />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Date Paiement :</label>
                  <input
                    type="date"
                    placeholder="Date Date Paiement"
                    name="marcheVise"
                    className="form-control"
                    value={datePaiement}
                    onChange={(e) => setDatePaiement(e.target.value)}
                    // disabled={bloque === 'oui'} // Désactive si x est "oui"
                  />
                  <br />
                </div>

                <div className="form-group mb-3">
                                <label className="form-label">Observations:</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={observations}
                                    onChange={(e) => setObservations(e.target.value)}
                                />
                            </div>
                <div>
                  <button className="btn btn-danger" onClick={handleCancel}>
                    Annuler
                  </button>
                  <button className="btn btn-success" style={{ marginLeft: '30px' }} onClick={saveOrUpdatedAppelOffre}>
                    Valider
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExcutionBC;
