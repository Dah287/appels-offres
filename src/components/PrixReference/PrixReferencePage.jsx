import { useState, useEffect } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import TenderForm from './TenderForm';
import Results from './Results';
import PrixReferenceService from '../../services/PrixReferenceService';

const PrixReferencePage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [result, setResult] = useState(null);
    const [initialFormData, setInitialFormData] = useState(null);

    useEffect(() => {
        const locationState = history.location.state;

        if (id) {
            PrixReferenceService.getTenderData(id)
                .then(res => {
                    const data = res.data;
                    setInitialFormData({
                        reference: data.referenceMarche,
                        category: data.type,
                        estimation: data.estimation,
                        concurrents: data.offers.map(o => ({
                            nom: o.entreprise,
                            prix: o.montant,
                            rejected: o.rejected,
                            rejectionReason: o.rejectionReason
                        }))
                    });
                })
                .catch(err => console.error("Erreur chargement données tender :", err));

            PrixReferenceService.getTenderResult(id)
                .then(res => setResult(res.data))
                .catch(err => console.error("Erreur chargement résultats :", err));
        } 
        else if (locationState && (locationState.reference || locationState.category)) {
            setInitialFormData({
                reference: locationState.reference || '',
                category: locationState.category || 'SERVICES',
                estimation: locationState.estimation?.toString() || '',
                concurrents: [{ nom: '', prix: '', rejected: false, rejectionReason: '' }]
            });
            setResult(null);
        }
        else {
            setInitialFormData(null);
            setResult(null);
        }
    }, [id, history.location.state]);

    const handleCalculationComplete = (data) => {
        setResult(data);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                     Analyse des Offres & Prix de Référence
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => history.push('/historique')}
                    startIcon={<span>📜</span>}
                    sx={{ borderRadius: 2, fontWeight: 'bold' }}
                >
                    Historique
                </Button>
            </Box>

            <TenderForm 
                onCalculationComplete={handleCalculationComplete}
                initialData={initialFormData}
                tenderId={id}
            />

            <Box id="results-section" sx={{ mt: 2 }}>
                {result && <Results data={result} />}
            </Box>
        </Container>
    );
};

export default PrixReferencePage;