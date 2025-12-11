import React, { useState, useEffect } from 'react';
import { Table, Select, Card, Statistic, DatePicker, Spin, message } from 'antd';
import axios from 'axios';
import './Dashboard.css';
import useAutoLogout from './useAutoLogout';
const { RangePicker } = DatePicker;

const DashboardBC = () => {
    const [bandeCommandes, setBandeCommandes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [statsByEntite, setStatsByEntite] = useState([]);
    const [globalStats, setGlobalStats] = useState({});
    const [selectedYear, setSelectedYear] = useState('Toutes');
    const [dateRange, setDateRange] = useState(null);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);

    // Récupérer les données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://192.168.1.81:8080/api/v1/bande-commande');
                setBandeCommandes(response.data);
                
                // Extraire les années disponibles
                const uniqueYears = [...new Set(response.data.map(bc => bc.anne))];
                setYears(['Toutes', ...uniqueYears.sort((a, b) => b - a)]);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                message.error('Erreur lors du chargement des données');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    // Filtrer les données quand les filtres ou les données changent
    useEffect(() => {
        let data = [...bandeCommandes];
        
        // Filtre par année
        if (selectedYear !== 'Toutes') {
            data = data.filter(bc => bc.anne == selectedYear);
        }
        
        // Filtre par date range
        if (dateRange && dateRange.length === 2) {
            const [start, end] = dateRange;
            data = data.filter(bc => {
                const dateJugement = bc.dateJugement ? new Date(bc.dateJugement) : null;
                return dateJugement && dateJugement >= start && dateJugement <= end;
            });
        }
        
        setFilteredData(data);
    }, [bandeCommandes, selectedYear, dateRange]);

    // Calculer les statistiques quand les données filtrées changent
    useEffect(() => {
        if (filteredData.length === 0) {
            setStatsByEntite([]);
            setGlobalStats({});
            return;
        }

        // Group by entité
        const entites = [...new Set(filteredData.map(bc => bc.entite))];
        
        // Calculer les stats par entité
        const stats = entites.map(entite => {
            const bcs = filteredData.filter(bc => bc.entite === entite);
            
            // Dates pour chaque statut
            const datesOuverture = bcs.filter(bc => bc.dateOuvertureReelle)
                                     .map(bc => new Date(bc.dateOuvertureReelle));
            const datesJugement = bcs.filter(bc => bc.dateJugement)
                                    .map(bc => new Date(bc.dateJugement));
            const datesOrdonn = bcs.filter(bc => bc.dateOrdonn)
                                  .map(bc => new Date(bc.dateOrdonn));
            const datesPaiement = bcs.filter(bc => bc.datePaiement)
                                    .map(bc => new Date(bc.datePaiement));

            return {
                entite,
                totalBC: bcs.length,
                totalEnCours: bcs.filter(bc => !bc.dateJugement).length,
                totalLances: datesOuverture.length,
                minDateOuverture: datesOuverture.length > 0 ? new Date(Math.min(...datesOuverture)) : null,
                maxDateOuverture: datesOuverture.length > 0 ? new Date(Math.max(...datesOuverture)) : null,
                totalJuges: datesJugement.length,
                minDateJugement: datesJugement.length > 0 ? new Date(Math.min(...datesJugement)) : null,
                maxDateJugement: datesJugement.length > 0 ? new Date(Math.max(...datesJugement)) : null,
                totalOrdonnances: datesOrdonn.length,
                minDateOrdonn: datesOrdonn.length > 0 ? new Date(Math.min(...datesOrdonn)) : null,
                maxDateOrdonn: datesOrdonn.length > 0 ? new Date(Math.max(...datesOrdonn)) : null,
                totalPaiements: datesPaiement.length,
                minDatePaiement: datesPaiement.length > 0 ? new Date(Math.min(...datesPaiement)) : null,
                maxDatePaiement: datesPaiement.length > 0 ? new Date(Math.max(...datesPaiement)) : null
            };
        });

        setStatsByEntite(stats);

        // Calculer les stats globales
        setGlobalStats({
            totalBC: filteredData.length,
            totalEnCours: filteredData.filter(bc => !bc.dateJugement).length,
            totalLances: filteredData.filter(bc => bc.dateOuvertureReelle).length,
            totalJuges: filteredData.filter(bc => bc.dateJugement).length,
            totalOrdonnances: filteredData.filter(bc => bc.dateOrdonn).length,
            totalPaiements: filteredData.filter(bc => bc.datePaiement).length
        });
    }, [filteredData]);

    const columns = [
        {
            title: 'Entité',
            dataIndex: 'entite',
            key: 'entite',
            fixed: 'left',
            width: '10%', // Pourcentage de la largeur totale
        },
        {
            title: 'Total BC',
            dataIndex: 'totalBC',
            width: '10%',
            key: 'totalBC',
            render: (count) => <Statistic value={count} className="dashboard-stat"/>
        },
        {
            title: 'En Cours',
            dataIndex: 'totalEnCours',
            width: '10%',
            key: 'totalEnCours',
            render: (count) => <Statistic value={count} className="dashboard-stat"/>
        },
        {
            title: 'Lancés',
            dataIndex: 'totalLances',
            key: 'totalLances',
            width: '10%',
            render: (count) => (
                <Statistic value={count} className="dashboard-stat" />
            )
        }
        ,
        {
            title: 'Jugés',
            dataIndex: 'totalJuges',
            key: 'totalJuges',
            width: '10%',
            render: (count) => (
                <Statistic value={count} className="dashboard-stat" />
            )
        }
        ,
        {
            title: 'Ordonnancés',
            dataIndex: 'totalOrdonnances',
            key: 'totalOrdonnances',
            width: '10%',
            render: (count) => (
                <Statistic value={count} className="dashboard-stat" />
            )
        }
        ,
        {
            title: 'Payés',
            dataIndex: 'totalPaiements',
            key: 'totalPaiements',
            width: '10%',
            render: (count) => (
                <Statistic value={count} className="dashboard-stat" />
            )
        }
        
        
    ];
    const getRowClassName = (record) => {
        const entitesOrange = ['DDA', 'SMG', 'DRH', ];
        return entitesOrange.includes(record.entite) ? 'row-orange' : 'row-gray';
    };
    useAutoLogout();
    return (
        <div className="dashboard-container">
            <Spin spinning={loading} tip="Chargement des données...">
                <div className="dashboard-header">
                    <h2>Tableau de Bord des Bons de Commande</h2>
                    <div className="filters">
                        <Select
                            value={selectedYear}
                            onChange={setSelectedYear}
                            style={{ width: 150, marginRight: 10 }}
                            options={years.map(year => ({ value: year, label: year }))}
                        />

                    </div>
                </div>

                <div className="global-stats">
                    <Card  className="stats-card">
                        <div className="stats-grid">
                            <Statistic title="Total BC" value={globalStats.totalBC || 0} />
                            <Statistic title="En Cours" value={globalStats.totalEnCours || 0} />
                            <Statistic title="Lancés" value={globalStats.totalLances || 0} />
                            <Statistic title="Jugés" value={globalStats.totalJuges || 0} />
                            <Statistic title="Ordonnancés" value={globalStats.totalOrdonnances || 0} />
                            <Statistic title="Payés" value={globalStats.totalPaiements || 0} />
                        </div>
                    </Card>
                </div>

                <Table
    columns={columns}
    dataSource={statsByEntite}
    loading={loading}
    scroll={{ width: '100%' }}
    pagination={false}
    rowClassName={(record) => {
        const specialEntites = ['DDA', 'SMG', 'DRH'];
        return specialEntites.includes(record.entite) ? 'orange-row' : 'gray-row';
    }}
    summary={() => (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                    <Statistic value={globalStats.totalBC || 0} className="dashboard-stat"/>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} >
                    <Statistic value={globalStats.totalEnCours || 0} className="dashboard-stat"/>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                    <Statistic value={globalStats.totalLances || 0} className="dashboard-stat"/>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                    <Statistic value={globalStats.totalJuges || 0} className="dashboard-stat"/>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                    <Statistic value={globalStats.totalOrdonnances || 0} className="dashboard-stat"/>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                    <Statistic value={globalStats.totalPaiements || 0} className="dashboard-stat"/>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    )}
/>


            </Spin>
        </div>
    );
};

export default DashboardBC;