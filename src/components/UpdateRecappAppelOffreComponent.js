
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppelOffreService from '../services/AppelOffreService';
import './AddAppelOffreComponent.css';

const UpdateRecappAppelOffreComponent = () => {
  const [numero, setNumero] = useState('');
  const [numeroVisa, setNumeroVisa] = useState('');
  const [entite, setEntite] = useState('');
  const [objet, setObjet] = useState('');
  const [typeMarche, setTypeMarche] = useState('');
  const [estimation, setEstimation] = useState('');
  const [pme, setPme] = useState('');
  const [moisPublicationPrevisionnelle, setMoisPublicationPrevisionnelle] = useState('');
  const [dateOuverturePrevisionnelle, setDateOuverturePrevisionnelle] = useState('');
  const [datetransmisCe, setDatetransmisCe] = useState('');
  const [dateobservationMc, setDateobservationMc] = useState('');
  const [dateOuvertureReelle, setDateOuvertureReelle] = useState('');
  const [observations, setObservations] = useState('');
  const [dateJugement, setDateJugement] = useState('');
  const [marcheVise, setMarcheVise] = useState('');
  const [montantTTC, setMontantTTC] = useState('');
  const [attributaire, setAttributaire] = useState('');
  const [ods, setOds] = useState([])
  const [delai, setDelai] = useState([])
  const [nbrmarche, setNbrmarche] = useState([])
  const [nbravenant, setNbravenant] = useState('')
  const history = useHistory();
  const { id, entitee, bloque } = useParams();

  const handleCancel = () => {
    if (id) {
      history.push('/recapp');
    }
  };

  const saveOrUpdatedAppelOffre = (e) => {
    e.preventDefault();
    const appelOffre = { attributaire, montantTTC,nbravenant, marcheVise,numeroVisa,ods,delai,nbrmarche };

    if (id) {
        console.log(appelOffre)
      AppelOffreService.updateappelOffrerecapp(id, appelOffre)
        .then((response) => {
          console.log(response.data.numero);
          history.push('/recapp');
        })
        .catch((error) => {
          console.error(error);
          alert('Erreur lors de la mise à jour de l\'appel d\'offre.');
        });
    } 
  };

  useEffect(() => {
    if (id) {
      AppelOffreService.getappelOffreById(id)
        .then((response) => {
          setNumero(response.data.numero);
          setEntite(response.data.entite);
          setObjet(response.data.objet);
          setTypeMarche(response.data.typeMarche);
          setEstimation(response.data.estimation);
          setPme(response.data.pme);
          setMoisPublicationPrevisionnelle(response.data.moisPublicationPrevisionnelle);
          setDateOuverturePrevisionnelle(response.data.dateOuverturePrevisionnelle);
          setDatetransmisCe(response.data.datetransmisCe);
          setDateobservationMc(response.data.dateobservationMc);
          setDateOuvertureReelle(response.data.dateOuvertureReelle);
          setDateJugement(response.data.dateJugement);
          setObservations(response.data.observations);
          setAttributaire(response.data.attributaire);
          setMontantTTC(response.data.montantTTC);
          setMarcheVise(response.data.marcheVise);
          setNumeroVisa(response.data.numeroVisa);
          setOds(response.data.ods)
          setDelai(response.data.delai)
          setNbrmarche(response.data.nbrmarche)
          setNbravenant(response.data.nbravenant)
        })
        .catch((error) => {
          console.error(error);
          alert('Erreur de récupération des données pour cet appel d\'offre.');
        });
    }
  }, [id]);

  const title = () => {
    return id ? <h2 className="text-center">Modifier Appel Offre</h2> : <h2 className="text-center">Ajouter Appel Offre</h2>;
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
              <div className="form-group mb-2">
                  <label className="form-label">Numero Visa:</label>
                  <input
                    type="text"
                    placeholder="Enter Numero Visa"
                    name="numeroVisa"
                    className="form-control"
                    value={numeroVisa}
                    onChange={(e) => setNumeroVisa(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">N° Marché</label>
                  <input
                    type="text"
                    placeholder="Enter Numero Visa"
                    name="numeroVisa"
                    className="form-control"
                    value={nbrmarche}
                    onChange={(e) => setNbrmarche(e.target.value)}
                    required
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
                  <label className="form-label">Montant de Marché TTC :</label>
                  <input
                    type="number"
                    placeholder="Enter Montant de Marché TTC"
                    name="montantTTC"
                    className="form-control"
                    value={montantTTC}
                    onChange={(e) => setMontantTTC(e.target.value)}
                  />
                </div>

                <div className = "form-group mb-2">
                                    <label className = "form-label"> Nombre D'avenants :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter nombre D'avenants"
                                        name = "nbrseance"
                                        className = "form-control"
                                        value = {nbravenant}
                                        onChange = {(e) => setNbravenant(e.target.value)}
                                        />
                                </div>
                <div className="form-group mb-2">
                  <label className="form-label">ODS :</label>
                  <input
                    type="date"
                    placeholder="Enter ODS"
                    name="montantTTC"
                    className="form-control"
                    value={ods}
                    onChange={(e) => setOds(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Délai d'exécution :</label>
                  <input
                    type="text"
                    placeholder="Enter Délai d'exécution"
                    name="montantTTC"
                    className="form-control"
                    value={delai}
                    onChange={(e) => setDelai(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Date Marché Visé :</label>
                  <input
                    type="date"
                    placeholder="Date de Marché Visé"
                    name="marcheVise"
                    className="form-control"
                    value={marcheVise}
                    onChange={(e) => setMarcheVise(e.target.value)}
                    disabled={bloque === 'oui'} // Désactive si x est "oui"
                  />
                  <br />
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

export default UpdateRecappAppelOffreComponent;
