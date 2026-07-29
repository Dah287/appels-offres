import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'
import './FilterComponent.css';
import * as XLSX from 'xlsx';
import useAutoLogout from './useAutoLogout';


import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Icône pour l'export Excel
const RECAPPCONSU = () => {

  const user = JSON.parse(sessionStorage.getItem('user'));
  
const [entiteF, setEntiteF] = useState('')
const [typeMarcheF, settypeMarcheF] = useState('')
const [visa, setvisa] = useState('')
const [fitre, setfitre] = useState('')
const [appelOffre, setAppelOffre] = useState([])
const {enttt} = useParams();
const [montantTTC, setMontantTTC] = useState("");
const [marcheVise, setMarcheVise] = useState("");


let isBloque = "non";

const getMarcheVise = (appel) => {
  // Vérifie si le marché répond aux conditions pour être visé
  const isEligibleForVisa = 
    ((appel.typeMarche === 'S' || appel.typeMarche === 'F') && appel.montantTTC >= 2_500_000) ||
    (appel.typeMarche === 'T' && appel.montantTTC >= 3_000_000);

  if (isEligibleForVisa) {
    isBloque = "non";
    if (appel.marcheVise) {
      // Si date existe, retourne la date formatée
      return new Date(appel.marcheVise); 
    } else {
      // Si pas de date mais éligible, retourne "Visé"
      return "Visé";
    }
  } else {
    isBloque = "oui";
    return "Non Visé";
  }
};






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
  totalOds: 0,
  estimationTotalJuge: 0,
  estimationTotalPme: 0,
  estimationTotalVisa: 0,
  estimationTotalOds: 0,
  totalEnCoursExamen: 0,
  totalNbravenant: 0,

});

const bloque = "oui"
  useEffect(() => {
    console.log( getAllAppelOffre(entiteF,typeMarcheF,fitre,visa))
        getAllAppelOffre(entiteF,typeMarcheF,fitre,visa);
        getDashboardData(entiteF); // Appel avec l'entité sélectionnée
    }, [entiteF, typeMarcheF,fitre,visa])

    const getAllAppelOffre = (entiteF,typeMarcheF,fitre,visa) => {
        AppelOffreService.getAllAppelOffre(entiteF,typeMarcheF,fitre,visa).then((response) => {
          console.log("Données pr:", response);
                                         // Filtrer les résultats pour ne garder que ceux avec dateJugement non null
                                       const filteredData = response.data.filter(bc => 
  bc.dateJugement !== null &&
  bc.attributaire !== "Infructueux" &&   // 👈 on exclut ici
  bc.attributaire !== "Annulé" &&
  bc.statut !== "Infructueux" &&
  bc.statut !== "Definitivement" &&
  bc.statut !== "Annulé"
);
                                         setAppelOffre(filteredData);
            //setAppelOffre(response.data)
            console.log(entiteF);
            console.log(typeMarcheF);
            console.log(fitre);
        }).catch(error =>{
            console.log(error);
        })
    } 

    const getDashboardData = (entite) => {
      AppelOffreService.getDashboardPourVisa(entite).then((response) => {
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

                totalOds: entityData["Total Ods"],
                estimationTotalOds: entityData["totalsEstimationTotalOds"],
    
                totalEnCoursExamen: entityData["appelOffresEnCoursExamen"],
                totalNbravenant: entityData["totalNbravenant"]
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

                totalOds: globalData["appelOffresOds"],
                estimationTotalOds: globalData["totalsEstimationTotalOds"],
    
                totalEnCoursExamen: globalData["appelOffresEnCoursExamen"],
                totalNbravenant: globalData["totalNbravenant"]
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
        'Attributaire': appel.attributaire,
        'Montant TTC': appel.montantTTC,
        'N° Visa': appel.numeroVisa,
        'Marche Vise': appel.marcheVise,
        'ODS': appel.ods,
        'Delai Execution': appel.delai
      }));
    
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "AppelsOffres");
      XLSX.writeFile(wb, `Liste_des_Marches_${new Date().toISOString().slice(0,10)}.xlsx`);
    };
    
        
    // }
    const formatToMDH = (value) => {
      return value ? (value / 1_000_000).toFixed(2) + " MDH" : "0 MDH";
    };
    
    

 const [showFilters, setShowFilters] = useState(false); // État pour gérer l'affichage des filtres
 useAutoLogout();
  return (

    
    <div className="container-fluid">
    

    {/* Filtres */}
    <div className="container-fluid">
    <h2 className="filter-section-title text-center nnn" >Liste des Marches</h2>


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
                                        <option value="BJC">BJC</option>
      </select>
    </div>
  </div>

  {/* Filter: Situation */}
  {/* <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Situation</label>
      <select className="form-select filter-select" value={fitre} onChange={(e) => setfitre(e.target.value)}>
        <option value="">Sélectionner une situation</option>
        <option value="pre">Appel d'Offre en cours de Préparation</option>
        <option value="ce">Appel d'Offre en Cours de Vérification</option>
        <option value="ouv">Appel d'Offre Lancé</option>
        <option value="jug">Appel d'Offre Jugé</option>
      </select>
    </div>
  </div> */}

  {/* Filter: Type Marché */}
  <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Type Marché</label>
      <select className="form-select filter-select" value={typeMarcheF} onChange={(e) => settypeMarcheF(e.target.value)}>
        <option value="">Sélectionner un type de marché</option>
        <option value="F">Fourniture</option>
        <option value="S">Service</option>
        <option value="T">Travaux</option>
      </select>
    </div>
  </div>
    {/* Filter: Type Visa */}
    <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Suivi de Visa </label>
      <select className="form-select filter-select" value={visa} onChange={(e) => setvisa(e.target.value)}>
        <option value="">Sélectionner un type de marché</option>
        <option value="vise">marché Visé</option>
        <option value="nonvise">Non Visé </option>
      </select>
    </div>
  </div>


    <div className="col-12 col-md-4 mb-2">
    <div className="stats-card">
  <p><strong>Total des Marches : <span className="stat-value" style={{paddingRight: "15px"}}>{totals.totalJuge}</span> (Montant : <span className="stat-value">{formatToMDH(totals.estimationTotalAppelOffres)}</span>)</strong></p>
  <p><strong>Marchés Visés : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalVisa}</span> (Montant : <span className="stat-value">{formatToMDH(totals.estimationTotalVisa)}</span>)</strong></p>
 <p><strong>Marchés ODS : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalOds}</span> (Montant : <span className="stat-value">{formatToMDH(totals.estimationTotalOds)}</span>)</strong></p>
 <p><strong>Nombre D'avenants : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalNbravenant}</span> </strong></p>
  {/* <p><strong>AO. PME : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalPme}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalPme)}</span>)</strong></p> */}
 
</div>

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
  <thead>
    <tr>
      <th style={{ textAlign: "center",width: "40px" }}>Entité</th>
      
      <th  style={{ textAlign: "center",  width: "180px" }}>Objet</th>
       <th style={{ textAlign: "center",width: "40px" }}>Type Marché</th>
      <th style={{ textAlign: "center",width: "50px" }}>N° Marché</th>
      {/* <th style={{ width: "70px" }}>Estimation</th>
      <th style={{ textAlign: "center",width: "50px" }}>PME</th> */}
      <th style={{ textAlign: "center",width: "80px" }}>Attributaire</th>
      
      <th style={{ textAlign: "center" ,width: "80px" }}>Montant de Marché TTC</th>
      <th style={{ textAlign: "center",width: "50px" }}>Numero Visa</th>
      <th style={{ textAlign: "center",width: "80px"  }}>Marché Visé</th>
      <th style={{ textAlign: "center",width: "80px"  }}>ODS</th>
      <th style={{ textAlign: "center",width: "80px"  }}>Délai d'exécution</th>

    </tr>
  </thead>
  <tbody>
    {appelOffre && appelOffre.length > 0 ? (
  appelOffre
  .sort((a, b) => {
    // En dernier les "Résilier"
    if (a.delai === "Résilier" && b.delai !== "Résilier") return 1;
    if (a.delai !== "Résilier" && b.delai === "Résilier") return -1;

    // Récupérer les dates de visa
    const viseA = getMarcheVise(a);
    const viseB = getMarcheVise(b);
    
    // Priorité aux marchés visés avec date
    if (viseA instanceof Date && !(viseB instanceof Date)) return -1;
    if (!(viseA instanceof Date) && viseB instanceof Date) return 1;
    if (viseA instanceof Date && viseB instanceof Date) {
      return viseB - viseA; // Tri décroissant par date
    }

    // Ensuite les marchés visés sans date
    // Ensuite les marchés visés sans date1402
    if (viseA === "Visé" && viseB !== "Visé") return -1;
    if (viseA !== "Visé" && viseB === "Visé") return 1;
    
    // Ensuite tri par dateJugement
    const dateJugementA = a.dateJugement ? new Date(a.dateJugement) : null;
    const dateJugementB = b.dateJugement ? new Date(b.dateJugement) : null;
    if (dateJugementA && !dateJugementB) return -1;
    if (!dateJugementA && dateJugementB) return 1;
    if (dateJugementA && dateJugementB) return dateJugementA - dateJugementB;

    // Ensuite tri par dateOuvertureReelle
    const dateA = a.dateOuvertureReelle ? new Date(a.dateOuvertureReelle) : null;
    const dateB = b.dateOuvertureReelle ? new Date(b.dateOuvertureReelle) : null;
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    if (dateA && dateB) return dateA - dateB;

    return 0;

      })
      .map((appel) => (
        <tr
        style={{
          backgroundColor: appel.delai === "Résilier"
            ? "#FFB6C1" // Couleur spéciale pour "Résilier"
            : appel.marcheVise
            ? "#9ACD32"
            : appel.dateJugement
            ? "#d4edda"
            : appel.dateOuvertureReelle
            ? "#50C878"
            : "white",
        }}
      >
          <td >{appel.entite}</td>
          <td style={{ width: "550px" }}>
            {appel.objet}
          </td>
          <td  style={{ textAlign: "center"}}>{appel.typeMarche}</td>
          <td style={{ textAlign: "center"}}>{appel.nbrmarche}</td>
          {/* <td style={{ textAlign: "center"}}>{appel.estimation?.toLocaleString('fr-MA')}</td>
          <td style={{ textAlign: "center"}}>{appel.pme}</td> */}
          <td >{appel.attributaire}</td>
        
          {/* <td>{appel.dateOuverturePrevisionnelle}</td> */}
          <td style={{ textAlign: "center"}}>{appel.montantTTC?.toLocaleString('fr-MA')}</td>
          <td style={{ textAlign: "center",width: "50px" }}>{appel.numeroVisa}</td>
         <td style={{ textAlign: "center"}}>
  {getMarcheVise(appel) instanceof Date 
    ? getMarcheVise(appel).toLocaleDateString() 
    : getMarcheVise(appel)}
</td>
          <td style={{ textAlign: "center"}}>{appel.ods}</td>
          <td style={{ textAlign: "center"}}>{appel.delai}</td>
     

        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="13" style={{ textAlign: "center", padding: "20px", fontStyle: "italic", color: "#888" }}>
        Aucun Marche trouvé.
      </td>
    </tr>
  )}
  </tbody>
</table>

    </div>
</div>

  )
}




export default RECAPPCONSU