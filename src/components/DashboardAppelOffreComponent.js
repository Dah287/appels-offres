import React, { useState, useEffect, useMemo } from 'react';
import AppelOffreService from '../services/AppelOffreService';
import './DashboardAppelOffreComponent.css';
import useAutoLogout from './useAutoLogout';

const DashboardAppelOffreComponent = () => {
    const [appelOffresData, setAppelOffresData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await AppelOffreService.getdashboard();
            setAppelOffresData(response.data);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Une erreur est survenue lors de la récupération des données.");
        } finally {
            setLoading(false);
        }
    };

    const formatToMDH = (value) => {
        return value ? (value / 1_000_000).toFixed(2) + " MDH" : "0 MDH";
    };

    const calculateTotal = (key) => {
        return appelOffresData.reduce((sum, row) => sum + (row[key] || 0), 0);
    };

    useAutoLogout();

    // Tri des données par total des appels d'offres (décroissant)
    const sortedData = useMemo(() => {
        return [...appelOffresData].sort((a, b) => (b.appelOffresALancer || 0) - (a.appelOffresALancer || 0));
    }, [appelOffresData]);

    return (
        <div className="vvvv">
            <br /><br />
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
                    <table className="table table-bordered table-striped styled-table">
                        <thead className="table-dark">
                            <tr>
                                <th className="fs-7" rowSpan="2">Entité</th>
                                <th className="fs-7" rowSpan="2" style={{ textAlign: "center" }}>Total des AOs</th>
                                <th className="fs-7" colSpan="3" style={{ textAlign: "center" }}> Transmis à la Commission</th>
                                <th className="fs-7" rowSpan="2" style={{ textAlign: "center" }}> Lancés</th>
                                <th className="fs-7" rowSpan="2" style={{ textAlign: "center" }}>En cours / Jugés</th>
                                <th className="fs-7" rowSpan="2" style={{ textAlign: "center" }}>En Cours de Préparation</th>
                            </tr>
                            <tr>
                                <th className="fs-7" style={{ textAlign: "center" }}>Total</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Avec réponse</th>
                                <th className="fs-7" style={{ textAlign: "center" }}>Sans réponse</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((row, index) => {
                                const totalTransmis = (row.appelOffresTransmisCeAvecReponse || 0) + (row.appelOffresTransmisCeSansReponse || 0);
                                return (
                                    <tr key={index}>
                                        <td className="fs-5">{row.entite}</td>
                                        <td className="text-center fs-5">{row.appelOffresALancer}</td>
                                        <td className="text-center fs-5">{row.appelOffresTransmisCeAvecReponse || 0}</td>
                                        <td className="text-center fs-5">{row.appelOffresTransmisCeSansReponse || 0}</td>
                                        <td className="text-center fs-5"><strong>{totalTransmis}</strong></td>
                                        <td className="text-center fs-5">{row.appelOffresLance}</td>
                                        <td className="text-center fs-5">{row.appelOffresJuge}</td>
                                        <td className="text-center fs-5">{row.appelOffresEnCoursExamen}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="fs-5"><strong>Total</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresALancer')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresTransmisCeAvecReponse')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresTransmisCeSansReponse')}</strong></td>
                                <td className="text-center fs-5"><strong>
                                    {calculateTotal('appelOffresTransmisCeAvecReponse') + calculateTotal('appelOffresTransmisCeSansReponse')}
                                </strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresLance')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresJuge')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresEnCoursExamen')}</strong></td>
                            </tr>
                            <tr style={{ backgroundColor: "#FFFF00" }}>
                                <td className="fs-5"><strong>Montant (MDH)</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(calculateTotal('estimationTotal'))}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(calculateTotal('estimationTransmisAvecReponse'))}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(calculateTotal('estimationTransmisSansReponse'))}</strong></td>
                                <td className="text-center fs-5"><strong>
                                    {formatToMDH(calculateTotal('estimationTransmisAvecReponse') + calculateTotal('estimationTransmisSansReponse'))}
                                </strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(calculateTotal('estimationLance'))}</strong></td>
                                <td className="text-center fs-5"><strong>{formatToMDH(calculateTotal('estimationJuge'))}</strong></td>
                               <td className="text-center fs-5">
                                    <strong>{formatToMDH(calculateTotal('estimationEnCoursExamen'))}</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DashboardAppelOffreComponent;