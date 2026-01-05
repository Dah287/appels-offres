import React, { useState, useEffect } from "react";
import useAutoLogout from './useAutoLogout';
const DashboardTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les données du backend
  useEffect(() => {
    fetch("http://192.168.1.14:8080/api/v1/bande-commande")
      .then((response) => response.json())
      .then((data) => {
        setData(processData(data)); // Traitement des données
        setIsLoading(false); // Changer l'état de chargement
      })
      .catch((error) => {
        console.error("Erreur de récupération des données : ", error);
        setIsLoading(false);
      });
  }, []);

  // Fonction pour traiter les données reçues du backend
  const processData = (data) => {
    const result = {};

    data.forEach((bc) => {
      const { anne, entite, dateJugement, dateOrdonn, datePaiement } = bc;

      if (!result[anne]) {
        result[anne] = {};
      }

      if (!result[anne][entite]) {
        result[anne][entite] = {
          total: 0,
          enCours: 0,
          juges: 0,
          ordonnances: 0,
          paiements: 0,
        };
      }

      result[anne][entite].total++;

      if (!dateJugement) result[anne][entite].enCours++;
      else result[anne][entite].juges++;

      if (dateOrdonn) result[anne][entite].ordonnances++;
      if (datePaiement) result[anne][entite].paiements++;
    });

    return result;
  };
  useAutoLogout();
  return (
    <div>
      <h1>DashboardTable des Bande Commande</h1>

      {isLoading ? (
        <p>Chargement des données...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Année</th>
              <th>Entité</th>
              <th>Total BC</th>
              <th>En Cours</th>
              <th>Juges</th>
              <th>Ordonnances</th>
              <th>Paiements</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((anne) => {
              return Object.keys(data[anne]).map((entite) => {
                const entiteData = data[anne][entite];

                return (
                  <tr key={`${anne}-${entite}`}>
                    <td>{anne}</td>
                    <td>{entite}</td>
                    <td>{entiteData.total}</td>
                    <td>{entiteData.enCours}</td>
                    <td>{entiteData.juges}</td>
                    <td>{entiteData.ordonnances}</td>
                    <td>{entiteData.paiements}</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardTable;
