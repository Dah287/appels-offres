import React, { useState, useEffect } from 'react';
import AppelOffreService from '../services/AppelOffreService';
import './DashboardAppelOffreComponent.css'; // Chemin vers votre fichier CSS
import useAutoLogout from './useAutoLogout';

const DashboardAppelOffreComponent = () => {
    const [appelOffresData, setAppelOffresData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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


    useEffect(() => {
        fetchDashboardData();
        getDashboardData(); // Appel avec l'entité sélectionnée
    }, []);

    const fetchDashboardData = async () => {
        try {
          console.log("depu ici :");
            const response = await AppelOffreService.getdashboard();
              console.log("depu ici2 :");
            setAppelOffresData(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des données :", err);
            setError("Une erreur est survenue lors de la récupération des données.");
        } finally {
            setLoading(false);
        }
    };

    const formatToMDH = (value) => {
        return value ? (value / 1_000_000).toFixed(2) + "" : "0";
      };
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

    const calculateTotal = (key) => {
        return appelOffresData.reduce((sum, row) => sum + (row[key] || 0), 0);
    };
    useAutoLogout();
    return (
        <div className="vvvv">
            <br></br> <br></br>
            <h4 className="dashboard-title text-center">
            SUIVI DU PROGRAMME PREVISIONNEL DES OPERATIONS NOUVELLES A LANCER PAR <br /> L’ORMVAD
            </h4>

            {loading ? (
                <p className="text-center fs-4">Chargement des données...</p>
            ) : error ? (
                <div className="text-center">
                    <p className="text-danger fs-4">{error}</p>
                    <button className="btn btn-primary" onClick={fetchDashboardData}>Réessayer</button>
                </div>
            ) : (
                <div className="table-responsive">
                 <table className="table table-bordered table-striped styled-table" >
                        <thead className="table-dark">
                            <tr>
                                <th className="fs-7" >Entité</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Total des Appels d'Offres</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Appels d'Offres Transmis à la Commission</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Appels d'Offres Lancés</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Appels d'Offres Jugés</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Appels d'Offres En Cours de Préparation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appelOffresData.map((row, index) => (
                                <tr key={index}>
                                    <td className="fs-5">{row.entite}</td>
                                    <td className="text-center fs-5">{row.appelOffresALancer}</td>
                                    <td className="text-center fs-5">{row.appelOffresTransmisCe}</td>
                                    <td className="text-center fs-5">{row.appelOffresLance}</td>
                                    <td className="text-center fs-5">{row.appelOffresJuge}</td>
                                    <td className="text-center fs-5">{row.appelOffresEnCoursExamen}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="fs-5"><strong>Total</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresALancer')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresTransmisCe')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresLance')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresJuge')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresEnCoursExamen')}</strong></td>
                            </tr>
                            <tr style={{ backgroundColor: "#FFFF00" }}>
                                <td className="fs-5"><strong>Montant (MDH)   </strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(totals.estimationTotalAppelOffres)}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(totals.estimationTotalTransmisCe)}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(totals.estimationTotalLance)}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(totals.estimationTotalJuge)}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(0)}</strong></td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            )}
        </div>
    );
};

export default DashboardAppelOffreComponent;