import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'
import './FilterComponent.css';
import * as XLSX from 'xlsx';
import useAutoLogout from './useAutoLogout';

import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Icône pour l'export Excel
const ListAppelOffreComponent = () => {

const [entiteF, setEntiteF] = useState('')
const [typeMarcheF, settypeMarcheF] = useState('')
const [fitre, setfitre] = useState('')
const [appelOffre, setAppelOffre] = useState([])
const {enttt} = useParams();
const [visa, setvisa] = useState('')
const [totals, setTotals] = useState({
  totalAppelOffres: 0,
  estimationTotalAppelOffres: 0,
  totalLance: 0,
  estimationTotalLance: 0,
  totalTransmisCe: 0,
  estimationTotalTransmisCe: 0,
  totalJuge: 0,
  totalPme: 0,
  totalVisa: 0,
  estimationTotalJuge: 0,
  estimationTotalPme: 0,
  estimationTotalVisa: 0,
  totalEnCoursExamen: 0
});

const ent = "no"
  useEffect(() => {
    
        getAllAppelOffre(entiteF,typeMarcheF,fitre,visa);
        getDashboardData(entiteF); // Appel avec l'entité sélectionnée
    }, [entiteF, typeMarcheF,fitre,visa])

    const getAllAppelOffre = (entiteF,typeMarcheF,fitre,visa) => {
        AppelOffreService.getAllAppelOffre(entiteF,typeMarcheF,fitre,visa).then((response) => {
            setAppelOffre(response.data)
            console.log(entiteF);
            console.log(typeMarcheF);
            console.log(fitre);    
                 console.log(visa);
        }).catch(error =>{
            console.log(error);
        })
    } 

    const getDashboardData = (entite) => {
      AppelOffreService.getDashboard(entite).then((response) => {
        const data = response.data;
    
        console.log("Données reçues:", data);
        console.log("Entité sélectionnée:", entite);
    
        if (data.length > 0) {
          if (entite) {
            const entityData = data.find(row => row.entite === entite);
            if (entityData) {
              console.log("Données de l'entité trouvées:", entityData);
              setTotals({
                totalAppelOffres: entityData["Total des Appels d'Offres"],
                estimationTotalAppelOffres: entityData["totalsEstimationTotalAppelOffres"],
    
                totalLance: entityData["Total Lancés"],
                estimationTotalLance: entityData["totalsEstimationTotalLance"],
    
                totalTransmisCe: entityData["Total Transmis à la Commission"],
                estimationTotalTransmisCe: entityData["totalsEstimationTotalTransmisCe"],
    
                totalJuge: entityData["Total Jugés"],
                estimationTotalJuge: entityData["totalsEstimationTotalJuge"],

                totalPme: entityData["Total Pme"],
                estimationTotalPme: entityData["totalsEstimationTotalPme"],

                totalVisa: entityData["Total Visa"],
                estimationTotalVisa: entityData["totalsEstimationTotalVisa"],
    
                totalEnCoursExamen: entityData["appelOffresEnCoursExamen"]
              });
            } else {
              console.log("Aucune donnée trouvée pour l'entité:", entite);
            }
          } else {
            const globalData = data.find(row => row.entite === "Total");
            if (globalData) {
              console.log("Données globales trouvées:", globalData);
              setTotals({
                totalAppelOffres: globalData["appelOffresTotal"],
                estimationTotalAppelOffres: globalData["totalsEstimationTotalAppelOffres"],
    
                totalLance: globalData["appelOffresLance"],
                estimationTotalLance: globalData["totalsEstimationTotalLance"],
    
                totalTransmisCe: globalData["appelOffresTransmisCe"],
                estimationTotalTransmisCe: globalData["totalsEstimationTotalTransmisCe"],
    
                totalJuge: globalData["appelOffresJuge"],
                estimationTotalJuge: globalData["totalsEstimationTotalJuge"],

                totalPme: globalData["appelOffresPme"],
                estimationTotalPme: globalData["totalsEstimationTotalPme"],

                totalVisa: globalData["appelOffresVisa"],
                estimationTotalVisa: globalData["totalsEstimationTotalVisa"],
    
                totalEnCoursExamen: globalData["appelOffresEnCoursExamen"]
              });
            } else {
              console.log("Aucune donnée globale trouvée.");
            }
          }
        } else {
          console.log("Aucune donnée reçue.");
        }
      }).catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
    };
  

const deleteappelOffre = (appelOffreId) => {
    // Afficher une boîte de dialogue de confirmation
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet appel d'offre ?");

    // Si l'utilisateur confirme la suppression
    if (confirmation) {
        AppelOffreService.deleteappelOffre(appelOffreId)
            .then((response) => {
                // Recharger la liste des appels d'offre après la suppression
                getAllAppelOffre(entiteF, typeMarcheF);
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

      const entt = "noentite";


    //   const fetchAppelOffres = (e) => {
    //     e.preventDefault();     
    //     getAllAppelOffre(entiteF,typeMarcheF);
    //             console.log(entiteF)
    const exportToExcel = () => {
      const dataToExport = appelOffre.map(appel => ({
        'Entité': appel.entite,
        'Objet': appel.objet,
        'Type Marché': appel.typeMarche,
        'Estimation': appel.estimation?.toLocaleString('fr-MA'),
        'PME': appel.pme,
        'Publication Prev': appel.moisPublicationPrevisionnelle,
        'Transmis Commission': appel.datetransmisCe,
        'Observation Commission': appel.dateobservationMc,
        'N° AO': appel.numero,
        'Ouverture Reelle': appel.dateOuvertureReelle,
        'Heure Ouverture': appel.heure,
        'Jugement': appel.dateJugement,
        'Observations': appel.observations
      }));
    
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "AppelsOffres");
      XLSX.writeFile(wb, `appels_offres_${new Date().toISOString().slice(0,10)}.xlsx`);
    };
           
        
    // }
    const formatToMDH = (value) => {
      return value ? (value / 1_000_000).toFixed(2) + " MDH" : "0 MDH";
    };
    
    const [showFilters, setShowFilters] = useState(false); // État pour gérer l'affichage des filtres



// // Fonction pour exporter en Excel
// const exportToExcel = () => {
//   // Préparer les données pour l'export
//   const dataToExport = appelOffre.map(appel => ({
//   'Entité': appel.entite,
//   'Objet': appel.objet,
//   'Type Marché': appel.typeMarche,
//   'Estimation': appel.estimation?.toLocaleString('fr-MA'),
//   'PME': appel.pme,
//   'Publication Prev': appel.moisPublicationPrevisionnelle,
//   'Transmis Commission': appel.datetransmisCe,
//   'Observation Commission': appel.dateobservationMc,
//   'N° AO': appel.numero,
//   'Ouverture Reelle': appel.dateOuvertureReelle,
//   'Heure Ouverture': appel.heure,
//   'Jugement': appel.dateJugement,
//   'Observations': appel.observations
//   }));

// // Créer un nouveau workbook et une feuille
// const ws = XLSX.utils.json_to_sheet(dataToExport);
// const wb = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(wb, ws, "AppelsOffres");

// // Exporter le fichier
// XLSX.writeFile(wb, `appels_offres_${new Date().toISOString().slice(0,10)}.xlsx`);};
useAutoLogout();
  return (

    
    <div className="container-fluid">
    


    {/* Filtres */}
    <div className="container-fluid">
    <h2 className="filter-section-title text-center nnn" >Liste des Appels d'Offres</h2>
          
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

            <div className="col-12 col-md-1 text-end mb-2">
        {/* <Button
          variant="contained"
          color="success"
          startIcon={<FileDownloadIcon />}
          onClick={exportToExcel}
          sx={{
            fontSize: '0.75rem',
            minWidth: '120px',
            px: 1,
            textTransform: 'none',
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20',
            }
          }}
        >
          Excel
        </Button> */}
      </div>


                        {/* Filtres - conditionnellement affichés */}
                        {showFilters && (
  <div className="row my-2">
  <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Entité</label>
      <select className="form-select filter-select" value={entiteF} onChange={(e) => setEntiteF(e.target.value)}>
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
  </div>

  {/* Filter: Situation */}
  <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Situation</label>
      <select className="form-select filter-select" value={fitre} onChange={(e) => setfitre(e.target.value)}>
        <option value="">Sélectionner une situation</option>
        <option value="pre">AO. En cours de Préparation</option>
        <option value="ce">AO. Transmis Commission</option>
        <option value="ouv">AO. Lancé</option>
        <option value="jug">AO. Jugé</option>
      </select>
    </div>
  </div>

  {/* Filter: Type Marché */}
  <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Type D'appel d'Offre</label>
      <select className="form-select filter-select" value={typeMarcheF} onChange={(e) => settypeMarcheF(e.target.value)}>
        <option value="">Sélectionner un type d'AO</option>
        <option value="F">Fourniture</option>
        <option value="S">Service</option>
        <option value="T">Travaux</option>
      </select>
    </div>
  </div>

      {/* Filter: Type Visa */}
      {/* <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Suivi de Visa </label>
      <select className="form-select filter-select" value={visa} onChange={(e) => setvisa(e.target.value)}>
        <option value="">Sélectionner un type de marché</option>
        <option value="vise">Marché Visé</option>
        <option value="nonvise">Non Visé </option>
      </select>
    </div>
  </div> */}


    <div className="col-12 col-md-4 mb-2">
    <div className="stats-card">
  <p><strong>Total des Appels d'Offres : <span className="stat-value" style={{paddingRight: "6px"}}>{totals.totalAppelOffres}</span> (Estimation: <span className="stat-value">{formatToMDH(totals.estimationTotalAppelOffres)}</span>)</strong></p>
  <p><strong>AO. Transmis Commission : <span className="stat-value"style={{paddingRight: "6px"}}>{totals.totalTransmisCe}</span> (Estimation: <span className="stat-value">{formatToMDH(totals.estimationTotalTransmisCe)}</span>)</strong></p>
  <p><strong>AO. Lancés : <span className="stat-value"style={{paddingRight: "6px"}}>{totals.totalLance}</span> (Estimation: <span className="stat-value">{formatToMDH(totals.estimationTotalLance)}</span>)</strong></p>
  <p><strong>AO. Jugés : <span className="stat-value"style={{paddingRight: "6px"}}>{totals.totalJuge}</span> (Estimation: <span className="stat-value">{formatToMDH(totals.estimationTotalJuge)}</span>)</strong></p>
  <p><strong>AO. PME : <span className="stat-value"style={{paddingRight: "6px"}}>{totals.totalPme}</span> (Estimation: <span className="stat-value">{formatToMDH(totals.estimationTotalPme)}</span>)</strong></p>
  {/* <p><strong>Marchés Visés : <span className="stat-value"style={{paddingRight: "6px"}}>{totals.totalVisa}</span> (Estimation: <span className="stat-value">{formatToMDH(totals.estimationTotalVisa)}</span>)</strong></p> */}
</div>

    </div>

    <div className="col-12 col-md-1 text-end mb-2">
      <Link to={`/add-appeloffre/${entt}`} className="btn-ajouter-ao">
              Ajouter AO
      </Link>
</div>
  </div>


)}
</div>


<br></br>
    {/* Table */}
    <div className="table-responsive" style={{ 
            maxHeight: 'calc(110vh - 300px)',
            overflowY: 'auto',
            position: 'relative'
        }}>
            <table className="table table-bordered table-striped" style={{ tableLayout: "fixed" }}>
                <thead style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    background: 'white'
                }}>
                    <tr>
                        <th style={{ textAlign: "center", width: "40px", position: 'sticky', left: 0, zIndex: 110, background: 'white' }}>Entité</th>
                        <th style={{ textAlign: "center", width: "280px" }}>Objet</th>
                        <th style={{ textAlign: "center", width: "50px" }}>Type Marché</th>
                        <th className="devise" style={{ width: "110px", textAlign: "center", overflow: "hidden" }}>
                            <div className="haut">Estimation</div>
                            <div className="bas" style={{ display: "flex", width: "100%" }}>
                                <div style={{ width: "50%", borderRight: "1px solid black", textAlign: "center" }}>CP</div>
                                <div style={{ width: "50%", textAlign: "center" }}>CE</div>
                            </div>
                        </th>
                        <th style={{ textAlign: "center", width: "50px" }}>PME</th>
                        <th style={{ textAlign: "center", width: "80px" }}>Publication Prev</th>
                        <th style={{ textAlign: "center", width: "80px" }}>Transmis Commission</th>
                        <th style={{ textAlign: "center", width: "80px" }}>Observation Commission</th>
                        <th style={{ textAlign: "center", width: "40px" }}>N° AO</th>
                        <th style={{ textAlign: "center", width: "80px" }}>
                            <div>Ouverture Reelle</div>
                            <div style={{ borderTop: "1px solid black", paddingTop: "2px", marginTop: "2px" }}>Heure</div>
                        </th>
                        <th style={{ textAlign: "center", width: "80px" }}>Jugement</th>
                        <th style={{ textAlign: "center", width: "80px" }}>Observations</th>
                        <th className="cccc numero-colonne" style={{ 
                            textAlign: "center", 
                            width: "85px",
                            position: 'sticky',
                            right: 0,
                            zIndex: 110,
                            background: 'white'
                        }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
  {appelOffre
  .sort((a, b) => {
    // Placer les "Annulé" ou "Infructueux" à la fin
    const statutA = a.statut;
    const statutB = b.statut;
    const isAOut = statutA === "Annulé" || statutA === "Infructueux" || statutA === "Definitivement";
    const isBOut = statutB === "Annulé" || statutB === "Infructueux" || statutB === "Definitivement";
    if (isAOut && !isBOut) return 1;
    if (!isAOut && isBOut) return -1;

    // Tri classique
    const dateJugementA = a.dateJugement ? new Date(a.dateJugement) : null;
    const dateJugementB = b.dateJugement ? new Date(b.dateJugement) : null;
    const dateA = a.dateOuvertureReelle ? new Date(a.dateOuvertureReelle) : null;
    const dateB = b.dateOuvertureReelle ? new Date(b.dateOuvertureReelle) : null;
    const dateTransA = a.datetransmisCe ? new Date(a.datetransmisCe) : null;
    const dateTransB = b.datetransmisCe ? new Date(b.datetransmisCe) : null;

    if (dateJugementA && !dateJugementB) return -1;
    if (!dateJugementA && dateJugementB) return 1;
    if (dateJugementA && dateJugementB) return dateJugementA - dateJugementB;

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
      style={{
        backgroundColor:
          appel.statut === "Annulé" || appel.statut === "Infructueux" || appel.statut === "Definitivement"
            ? "#C0C0C0"
            : appel.dateJugement
            ? "#CD853F"
            : appel.dateOuvertureReelle
            ? "#50C878"
            : appel.datetransmisCe
            ? "#FFFF00"
            : "white",
      }}
    >
          <td >{appel.entite}</td>
          <td style={{ width: "550px" }}>
            {appel.objet}
          </td>
          <td style={{ textAlign: "center"}}>{appel.typeMarche}</td>
           {/* <td>{appel.estimation?.toLocaleString('fr-MA')}</td> */}
           <td className="devise" style={{ width: "70px", textAlign: "center", overflow: "hidden" }}>
            <div className="haut">{appel.estimation?.toLocaleString('fr-MA')}</div>
            <div className="bas" style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%", borderRight: "1px solid black", textAlign: "center" }}>{appel.cp?.toLocaleString('fr-MA')}</div>
              <div style={{ width: "50%", textAlign: "center" }}>{appel.ce?.toLocaleString('fr-MA')}</div>
            </div>
          </td>
          <td>{appel.pme}</td>
          <td>{appel.moisPublicationPrevisionnelle}</td>
          {/* <td>{appel.dateOuverturePrevisionnelle}</td> */}
          <td>{appel.datetransmisCe}</td>
          <td>{appel.dateobservationMc}</td>
          <td style={{ textAlign: "center" ,width: "60px"}}>{appel.numero}</td>
          {/* <td>{appel.dateOuvertureReelle}</td> */}
            {/* heure */}
            <td style={{ textAlign: "center" }}>
          <div >
            {appel.dateOuvertureReelle}
          </div>
          {appel.dateOuvertureReelle && appel.heure && (
          <div style={{ borderTop: "1px solid white", paddingTop: "8px", marginTop: "6px", fontWeight: "normal" }}>{appel.heure}</div>
        )}
          </td>
          {/* heure */}
          <td>
            {appel.dateJugement || 
            (appel.dateOuvertureReelle && new Date(appel.dateOuvertureReelle) > new Date() ? "À venir" : 
              (appel.dateOuvertureReelle ? "En cours" : "-"))}
          </td>
          <td>{appel.observations}</td>
          <td className='numero-colonne' style={{  alignItems: "center" ,width: "160px"}}>
            <Link
              className="btn btn-info small-buttonn"
              style={{
                
                fontSize: "12px",
                width: "50px",
                paddingLeft : "1px",
                paddingRight:"1px"
              
              }}
              to={`/edit-employee/${appel.id}/${ent}`}
            >
              Modifier
            </Link>
            <button
              className="btn btn-danger small-buttonn"
              onClick={() => deleteappelOffre(appel.id)}
              style={{
                
                fontSize: "12px",
                width: "60px",
                paddingLeft : "1px",
                paddingRight:"1px",
                marginLeft: "10px"
             
              }}
            >
              Supprimer
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>

    </div>
</div>

  )
}




export default ListAppelOffreComponent