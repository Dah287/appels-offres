
import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'
import useAutoLogout from './useAutoLogout';
const ListAppelOffreParEntiteComponent = () => {



const [typeMarcheF, settypeMarcheF] = useState('')

const [appelOffre, setAppelOffre] = useState([])

const {entitee} = useParams();

  useEffect(() => {
    
        getAllAppelOffre(entitee,typeMarcheF);
        
    }, [entitee,typeMarcheF])

    const getAllAppelOffre = (entiteF,typeMarcheF) => {
        AppelOffreService.getAllAppelOffre(entiteF,typeMarcheF).then((response) => {
            setAppelOffre(response.data)
            console.log(entiteF);
            console.log(typeMarcheF);
        }).catch(error =>{
            console.log(error);
        })
    } 

    const deleteappelOffre = (appelOffreId) => {
        // Afficher une boîte de dialogue de confirmation
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet appel d'offre ?");
    
        // Si l'utilisateur confirme la suppression
        if (confirmation) {
            AppelOffreService.deleteappelOffre(appelOffreId)
                .then((response) => {
                    // Recharger la liste des appels d'offre après la suppression
                    getAllAppelOffre(entitee, typeMarcheF);
    
                    // Rediriger vers la liste des appels d'offre
                    history.push(`/ListAppelOffreParEntite/${entitee}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Si l'utilisateur annule, ne rien faire
            console.log("Suppression annulée.");
        }
    };
    const isValidDate = (date) => {
        // Vérifie si la date est valide
        if(date!=null){
            return true;
        }else{
            return false;
        }
      };

      const history = useHistory();

      useAutoLogout();
  return (
    
    <div className="container-fluid">
    <h2 className="text-center">List Appel Offre : {entitee}</h2>

    {/* Filtres */}
    <div className="row my-3">

        <div className="col-5">
            <select
                className="form-select"
                value={typeMarcheF}
                onChange={(e) => settypeMarcheF(e.target.value)}
            >
                <option selected>TYPE MARCHE</option>
                <option value="F">Fourniture</option>
                <option value="S">Service</option>
                <option value="T">Travaux</option>
            </select>
        </div>
        <div className="col-4">
        <div className="col text-end">
        <p>
                <strong>
                    Total des appels d'offre : <span style={{ color: 'red' }}>{appelOffre.length}</span>
                </strong>
                </p>
                </div>
        </div>
        <div className="col text-end">
            <Link  to={`/add-appeloffre/${entitee}`} className="btn btn-primary">
            Ajouter AO
            </Link>
        </div>
    </div>

    {/* Table */}
    <div className="table-responsive">
    <table className="table table-bordered table-striped" style={{ tableLayout: "fixed" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "center" }}>Entité</th>
      <th style={{ textAlign: "center", width: "550px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Objet</th>
      <th style={{ textAlign: "center",width: "80px" }}>Type Marché</th>
      <th style={{ textAlign: "center" }}>Estimation</th>
      <th style={{ textAlign: "center",width: "80px" }}>PME</th>
      <th style={{ textAlign: "center" }}>Publication PREV</th>

      <th style={{ textAlign: "center" }}>Transmis CE</th>
      <th style={{ textAlign: "center" }}>Observation MC</th>
      <th style={{ textAlign: "center" ,width: "60px"}}>N° AO</th>
      <th style={{ textAlign: "center" }}>Ouverture Reelle</th>
      <th style={{ textAlign: "center" }}>Jugement</th>
      <th style={{ textAlign: "center" }}>Observations</th>
      
    </tr>
  </thead>
  <tbody>
    {appelOffre
      .sort((a, b) => {
        const dateA = a.dateOuvertureReelle ? new Date(a.dateOuvertureReelle) : null;
        const dateB = b.dateOuvertureReelle ? new Date(b.dateOuvertureReelle) : null;
        const dateTransA = a.datetransmisCe ? new Date(a.datetransmisCe) : null;
        const dateTransB = b.datetransmisCe ? new Date(b.datetransmisCe) : null;

        if (dateA && !dateB) return -1;
        if (!dateA && dateB) return 1;
        if (dateA && dateB) return dateA - dateB;

        if (dateTransA && !dateTransB) return -1;
        if (!dateTransA && dateTransB) return 1;
        if (dateTransA && dateTransB) return dateTransA - dateTransB;

        return 0;
      })
      .map((appel) => (
        <tr
          key={appel.id}
          style={{
            backgroundColor: appel.dateOuvertureReelle
              ? "#50C878"
              : appel.datetransmisCe
              ? "#FFFF00"
              : "white",
          }}
        >
          <td>{appel.entite}</td>
          <td style={{ width: "550px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {appel.objet}
          </td>
          <td>{appel.typeMarche}</td>
          <td>{appel.estimation?.toLocaleString('fr-MA')}</td>
          <td>{appel.pme}</td>
          <td>{appel.moisPublicationPrevisionnelle}</td>
          
          <td>{appel.datetransmisCe}</td>
          <td>{appel.dateobservationMc}</td>
          <td style={{ textAlign: "center" ,width: "60px"}}>{appel.numero}</td>
          <td>{appel.dateOuvertureReelle}</td>
          <td>{appel.dateJugement}</td>
          <td>{appel.observations}</td>
          
        </tr>
      ))}
  </tbody>
</table>
    </div>
</div>
  )
}

export default ListAppelOffreParEntiteComponent