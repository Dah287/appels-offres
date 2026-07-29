import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import TenderForm from './TenderForm';
import Results from './Results';

const PrixReferencePage = () => {
    const [result, setResult] = useState(null);

    const handleCalculationComplete = (data) => {
        setResult(data);
        // Scroll doux vers les résultats
        setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* En-tête de page */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    🎯 Analyse des Offres & Prix de Référence
                </Typography>

            </Box>

            {/* Formulaire */}
            <TenderForm onCalculationComplete={handleCalculationComplete} />

            {/* Résultats */}
            <Box id="results-section" sx={{ mt: 2 }}>
                {result && <Results data={result} />}
            </Box>
        </Container>
    );
};

export default PrixReferencePage;