import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'
import AppelOffreService from '../services/AppelOffreService';

const AddAppelOffreComponent = () => {

    const [numero, setNumero] = useState('')
    const [entite, setEntite] = useState('')
    const [objet, setObjet] = useState('')
    const [typeMarche, settypeMarche] = useState('')
    const [estimation, setEstimation] = useState('')
    const [cp, setCp] = useState('')
    const [ce, setCe] = useState('')
    const [pme, setPme] = useState('')
    const [statut, setStatut] = useState(null)
    const [nbrseance, setNbrseance] = useState('')
    const [exercice, setExercice] = useState('')
    // 
    const [moisPublicationPrevisionnelle	, setMoisPublicationPrevisionnelle] = useState('')
    const [dateOuverturePrevisionnelle	, setDateOuverturePrevisionnelle] = useState('')
    //   
    const [datetransmisCe, setDatetransmisCe] = useState('')
    const [dateobservationMc	, setDateobservationMc] = useState('')
    const [dateOuvertureReelle	, setDateOuvertureReelle] = useState('')
    const [observations	, set0bservations] = useState('')
    const [dateJugement	, setDateJugement] = useState('')
    const [heure	, setHeure] = useState('')

    const history = useHistory();
    const {id} = useParams();
    let {entitee} = useParams();
    
    
    if (entitee === undefined) {
        entitee = null;
    }
// hello kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    const {entt} = useParams();
    const handleCancel = () => {
        if(id){
     
             
                console.log(entitee)
                if(entitee === "no")
                {
                    history.push('/appelOffres')
                    
                }else if(entitee === "SA")
                    {
                        history.push('/ListSA')
                        
                    }
                
                else{
                    console.log(entitee)
                    history.push(`/ListAppelOffreParEntite/${entitee}`);
                    
                }
              
            

        }else{
            

                console.log("entt ici "+entt)
                if(entt === "noentite")
                    {
                        console.log("ici no "+entt)
                        history.push('/appelOffres')
                    }else if(entt === "SA")
                        {
                            console.log("ici no "+entt)
                            history.push('/ListSA')
                            
                        }else{                       
                        console.log("ici "+entt)
                        history.push(`/ListAppelOffreParEntite/${entt}`);
                        
                    }
    
        }
      };
    const saveOrUpdatedAppelOffre = (e) => {
        e.preventDefault();
        if (!entite || entite === "ENTITE" ) {
            alert("Veuillez remplir  Entite  !");
            return;
        }else if(!objet ){
            alert("Veuillez remplir  Objet  !");
            return;
        }else if(!moisPublicationPrevisionnelle){
            alert("Veuillez remplir  Date Ouverture Previsionnelle  !");
            return;
        }else if (!exercice) {
  alert("Veuillez sélectionner un exercice !");
  return;
}
        const appelOffre = {numero, exercice, entite, objet,typeMarche,estimation,nbrseance,pme,moisPublicationPrevisionnelle,dateOuverturePrevisionnelle,datetransmisCe,dateobservationMc,dateOuvertureReelle,heure,dateJugement,observations,cp,ce,statut}

        if(id){
            AppelOffreService.updateappelOffre(id, appelOffre).then((response) => {
                console.log("statut",appelOffre)
                console.log(entitee)
                if(entitee === "no")
                {
                    history.push('/appelOffres')
                    
                }else if(entitee === "SA")
                    {
                        history.push('/ListSA')
                        
                    }
                else{
                    console.log(entitee)
                    history.push(`/ListAppelOffreParEntite/${entitee}`);
                    
                }
              
            }).catch(error => {
                console.log(error)
            })

        }else{
            AppelOffreService.createAppelOffre(appelOffre).then((response) =>{

                console.log("entt ici "+entt)
                if(entt === "noentite")
                    {
                        console.log("ici no "+entt)
                        history.push('/appelOffres')
                    }else if(entt === "SA")
                        {
                            history.push('/ListSA')
                            
                        }
                    
                    else{                       
                        console.log("ici "+entt)
                        history.push(`/ListAppelOffreParEntite/${entt}`);
                        
                    }
    
          
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        AppelOffreService.getappelOffreById(id).then((response) =>{
            setNumero(response.data.numero)
            setExercice(response.data.exercice)
            setEntite(response.data.entite)
            setObjet(response.data.objet)
            settypeMarche(response.data.typeMarche)
            setEstimation(response.data.estimation)
            setNbrseance(response.data.nbrseance)
            setCp(response.data.cp)
            setCe(response.data.ce)
            setPme(response.data.pme)
            setStatut(response.data.statut)
            //
            setMoisPublicationPrevisionnelle(response.data.moisPublicationPrevisionnelle)
            setDateOuverturePrevisionnelle(response.data.dateOuverturePrevisionnelle)
            // 
            setDatetransmisCe(response.data.datetransmisCe)
            setDateobservationMc(response.data.dateobservationMc)
            setDateOuvertureReelle(response.data.dateOuvertureReelle)
            setDateJugement(response.data.dateJugement)
            set0bservations(response.data.observations)
            setHeure(response.data.heure)

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(id){
            return <h2 className = "text-center">Modifier Appel Offre</h2>
        }else{
            return <h2 className = "text-center">Ajouter Appel Offre</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Numero d'appel d'offre :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Numero d'appel d'offre"
                                        name = "numero"
                                        className = "form-control"
                                        value = {numero}
                                        onChange = {(e) => setNumero(e.target.value)}
                                        />
                                </div>
                                <div className="form-group mb-2">
  <label className="form-label"> Exercice :</label>
  <select
    className="form-select"
    value={exercice}
    onChange={(e) => setExercice(e.target.value)}
    required
  >
    <option value="">Sélectionner l'exercice</option>
    <option value="2026">2026</option>
      <option value="2025">2025</option>
          <option value="2024">2024</option>
              <option value="2023">2023</option>
    {/* Ajoutez d'autres années si nécessaire */}
  </select>
</div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Entité :</label>
                                        <select
                                        className="form-select"
                                        value = {entite}
                                        required
                                        onChange = {(e) => setEntite(e.target.value)}                                    >
                                        <option selected>ENTITE</option>
                                        <option value="DPF">DPF</option>
                                        <option value="DGR">DGR</option>
                                        <option value="DA">DA</option>
                                        <option value="DDA">DDA</option>
                                       
                                        <option value="DRH">DRH</option>
                                        <option value="SAICG">SAICG</option>
                                        <option value="SMG">SMG</option>
                                    </select>                                   
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Objet :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Objet"
                                        name = "Objet"
                                        className = "form-control"
                                        value = {objet}
                                        onChange = {(e) => setObjet(e.target.value)}
                                        required
                                        />
                                  
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Type Marché :</label>                                  

                                        <select
                                        className="form-select"
                                        value = {typeMarche}
                                        onChange = {(e) => settypeMarche(e.target.value)}
                                    >
                                        <option selected>TYPE MARCHE</option>
                                        <option value="F">F</option>
                                        <option value="S">S</option>
                                        <option value="T">T</option>
                                    </select>
                                  
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Estimation :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Estimation"
                                        name = "Estimation"
                                        className = "form-control"
                                        value = {estimation}
                                        onChange = {(e) => setEstimation(e.target.value)}
                                        />
                                </div>

                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <label className="form-label">CP :</label>
                                        <input
                                            type="number"
                                            placeholder="Enter CP"
                                            name="cp"
                                            className="form-control"
                                            value={cp}
                                            onChange={(e) => setCp(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">CE :</label>
                                        <input
                                            type="number"
                                            placeholder="Enter CE"
                                            name="ce"
                                            className="form-control"
                                            value={ce}
                                            onChange={(e) => setCe(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className = "form-group mb-2">
                                <label className = "form-label"> Statut :</label>
                                <select
                                    className="form-select"
                                    value = {statut}
                                    onChange = {(e) => setStatut(e.target.value)}
                                >
                                    <option value="">Normale</option>
                                    <option value="Annulé">Annulé</option>
                                    <option value="Infructueux">Infructueux</option>
                                    <option value="Definitivement">Annulé Définitivement</option>
                                </select>
                            </div>


                                <div className = "form-group mb-2">
                                    <label className = "form-label"> PME :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter PME"
                                        name = "PME"
                                        className = "form-control"
                                        value = {pme}
                                        onChange = {(e) => setPme(e.target.value)}
                                        />
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Nombre de Séances :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter nombre de séances"
                                        name = "nbrseance"
                                        className = "form-control"
                                        value = {nbrseance}
                                        onChange = {(e) => setNbrseance(e.target.value)}
                                        />
                                </div>

                                <div className = "form-group mb-2"style={{ backgroundColor: "#D8BFD8"}}>
                                    <label className = "form-label"> Date de publication Prévisionnelle	 :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date de publication Prévisionnelle"
                                        name = "moisPublicationPrevisionnelle"
                                        className = "form-control"
                                        value = {moisPublicationPrevisionnelle}
                                        onChange = {(e) => setMoisPublicationPrevisionnelle(e.target.value)}
                                        required
                                    >
                                    </input><br></br>
                                </div>

                                {/* <div className = "form-group mb-2"style={{ backgroundColor: "#87CEEB"}}>
                                    <label className = "form-label"> DATE Transmis BAM :</label>
                                    <input
                                        type = "date"
                                        placeholder = "DATE D’OUVERTURE Prévisionnelle"
                                        name = "DateJugement"
                                        className = "form-control"
                                        value = {dateOuverturePrevisionnelle}
                                        onChange = {(e) => setDateOuverturePrevisionnelle(e.target.value)}
                                        /><br></br>
                                </div> */}

                                <div className = "form-group mb-2" style={{ backgroundColor: "#FFFF00"}}>
                                    <label className = "form-label">Transmis commission :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date Transmis CE"
                                        name = "Observations"
                                        className = "form-control"
                                        value = {datetransmisCe}
                                        onChange = {(e) => setDatetransmisCe(e.target.value)}
                                        />
                                        <br></br>
                                </div>
                                <div className = "form-group mb-2" style={{ backgroundColor: "#F4A460"}}>
                                    <label className = "form-label" > Observation MC :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date Observation MC"
                                        name = "dateobservationMc"
                                        className = "form-control"
                                        value = {dateobservationMc}
                                        onChange = {(e) => setDateobservationMc(e.target.value)}
                                        /><br></br>
                                </div>
                                <div className = "form-group mb-2" style={{ backgroundColor: "#7CFC00"}}>
                                    <label className = "form-label" > Date ouverture Reelle:</label>
                                    <input
                                    
                                        type = "date"
                                        placeholder = "Date ouverture Reelle"
                                        name = "dateOuvertureReelle"
                                        className = "form-control"
                                        value = {dateOuvertureReelle}
                                        onChange = {(e) => setDateOuvertureReelle(e.target.value)}
                                        /><br></br>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Heure d'ouverture réelle :</label>
                                    <input
                                        type="time"
                                        name="heure"
                                        className="form-control"
                                        value={heure}
                                        onChange={(e) => setHeure(e.target.value)}
                                    />
                                </div>

                                <div className = "form-group mb-2" style={{ backgroundColor: "#FA8072"}}>
                                    <label className = "form-label"> Date jugement	:</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date jugement"
                                        name = "dateJugement"
                                        className = "form-control"
                                        value = {dateJugement}
                                        onChange = {(e) => setDateJugement(e.target.value)}
                                        /><br></br>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> OSERVATIONS:</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter OSERVATIONS"
                                        name = "observations"
                                        className = "form-control"
                                        value = {observations}
                                        onChange = {(e) => set0bservations(e.target.value)}
                                        />
                                </div>
                                        <div>
                                
                                        <button className="btn btn-danger"  onClick={handleCancel}   >      Annuler         </button>                                <button className = "btn btn-success" style={{ marginLeft: "30px" }} onClick = {(e) => saveOrUpdatedAppelOffre(e)} >Valider   </button>
                                       </div>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddAppelOffreComponent