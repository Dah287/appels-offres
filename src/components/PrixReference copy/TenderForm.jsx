import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Alert,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Calculate as CalculateIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import PrixReferenceService from '../../services/PrixReferenceService';

const TenderForm = ({ onCalculationComplete }) => {
    const [reference, setReference] = useState('');
    const [category, setCategory] = useState('TRAVAUX');
    const [estimation, setEstimation] = useState('');
    const [concurrents, setConcurrents] = useState([{ nom: '', prix: '' }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const addConcurrent = () => {
        setConcurrents(prev => [...prev, { nom: '', prix: '' }]);
    };

    const removeConcurrent = (idx) => {
        setConcurrents(prev => prev.filter((_, i) => i !== idx));
    };

    const updateConcurrent = (idx, field, value) => {
        const updated = [...concurrents];
        updated[idx][field] = value;
        setConcurrents(updated);
    };

    const resetForm = () => {
        setReference('');
        setCategory('TRAVAUX');
        setEstimation('');
        setConcurrents([{ nom: '', prix: '' }]);
        setError('');
    };

    // 🟢 LOGIQUE DE STATUT : Excessive / Anormalement basse / Acceptable
    const getStatus = (prixStr) => {
        if (!estimation || !prixStr) return null;
        const prix = parseFloat(prixStr);
        const est = parseFloat(estimation);
        if (isNaN(prix) || isNaN(est) || est === 0) return null;

        const seuilPercent = category === 'TRAVAUX' ? 20 : 25;
        const percent = ((prix - est) / est) * 100;

        if (percent > seuilPercent) {
            return { text: 'Offre excessive', color: 'error', percent, icon: '📈' };
        }
        if (percent < -seuilPercent) {
            return { text: 'Anormalement basse', color: 'warning', percent, icon: '📉' };
        }
        return { text: 'Offre acceptable', color: 'success', percent, icon: '✅' };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!estimation || !reference.trim()) {
            setError("Veuillez saisir la référence marché et l'estimation");
            return;
        }
        const payload = {
            referenceMarche: reference.trim(),
            type: category,
            estimation: parseFloat(estimation),
            offers: concurrents
                .filter(c => c.nom.trim() !== '' && c.prix !== '')
                .map(c => ({ entreprise: c.nom.trim(), montant: parseFloat(c.prix) }))
        };
        if (payload.offers.length === 0) {
            setError('Ajoutez au moins un concurrent valide');
            return;
        }

        setLoading(true);
        try {
            const response = await PrixReferenceService.calculatePrice(payload);
            if (onCalculationComplete) {
                onCalculationComplete(response.data);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur : ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={2} sx={{ borderRadius: 2, p: 3, mb: 4 }}>
            {/* En-tête */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ bgcolor: 'primary.main', borderRadius: 2, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalculateIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        📋 Calculateur Prix de Référence
                    </Typography>

                </Box>
            </Box>

            {/* Message d'erreur */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Référence marché */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Référence marché"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            required
                            fullWidth
                            placeholder="Ex: AO-2024-001"
                        />
                    </Grid>

                    {/* Catégorie */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Catégorie d'appel d'offre</InputLabel>
                            <Select
                                value={category}
                                label="Catégorie d'appel d'offre"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="TRAVAUX">️ Travaux (±20%)</MenuItem>
                                <MenuItem value="SERVICES"> Services & Fournitures (±25%)</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <InfoIcon fontSize="small" /> 
                            Seuil de tolérance appliqué automatiquement
                        </Typography>
                    </Grid>

                    {/* Estimation */}
                    <Grid item xs={12}>
                        <TextField
                            label="Estimation (DH)"
                            type="number"
                            value={estimation}
                            onChange={(e) => setEstimation(e.target.value)}
                            required
                            fullWidth
                            placeholder="100000"
                            InputProps={{ endAdornment: <Typography sx={{ color: 'text.secondary' }}>DH</Typography> }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <InfoIcon fontSize="small" /> 
                            Montant estimé du marché servant de base de comparaison
                        </Typography>
                    </Grid>
                </Grid>

                {/* Section Concurrents */}
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                            👥 Concurrents
                        </Typography>
                        <Chip label={concurrents.length} size="small" color="primary" variant="outlined" />
                    </Box>

                    {concurrents.map((c, idx) => {
                        const status = getStatus(c.prix);
                        return (
                            <Paper 
                                key={idx} 
                                variant="outlined" 
                                sx={{ 
                                    p: 2, 
                                    mb: 2, 
                                    borderRadius: 2,
                                    // Bordure gauche dynamique selon le statut
                                    borderLeft: status ? `4px solid` : 'none',
                                    borderColor: status?.color || 'transparent',
                                    // Fond légèrement teinté selon le statut
                                    bgcolor: status?.color === 'error' ? 'error.lighter' : 
                                           status?.color === 'warning' ? 'warning.lighter' : 
                                           status?.color === 'success' ? 'success.lighter' : 'background.paper'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                                        Concurrent {idx + 1}
                                    </Typography>
                                    {concurrents.length > 1 && (
                                        <Tooltip title="Supprimer">
                                            <IconButton 
                                                size="small" 
                                                color="error" 
                                                onClick={() => removeConcurrent(idx)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                                
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Nom de l'entreprise"
                                            value={c.nom}
                                            onChange={(e) => updateConcurrent(idx, 'nom', e.target.value)}
                                            fullWidth
                                            size="small"
                                            placeholder="Entreprise XYZ"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            label="Prix proposé (DH)"
                                            type="number"
                                            value={c.prix}
                                            onChange={(e) => updateConcurrent(idx, 'prix', e.target.value)}
                                            fullWidth
                                            size="small"
                                            placeholder="95000"
                                            InputProps={{ endAdornment: <Typography sx={{color:'text.secondary'}}>DH</Typography> }}
                                        />
                                    </Grid>
                                    
                                    {/*  COLONNE STATUS ANALYTIQUE 🟢 */}
                                    <Grid item xs={12} md={4}>
                                        {status ? (
                                            <Chip
                                                icon={<span>{status.icon}</span>}
                                                label={`${status.text} (${status.percent > 0 ? '+' : ''}${status.percent.toFixed(1)}%)`}
                                                color={status.color}
                                                size="small"
                                                variant="outlined"
                                                sx={{ 
                                                    fontWeight: 'bold', 
                                                    borderRadius: 1,
                                                    width: '100%',
                                                    justifyContent: 'flex-start'
                                                }}
                                            />
                                        ) : (
                                            <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                                                Saisir un prix pour voir l'analyse
                                            </Typography>
                                        )}
                                    </Grid>
                                    
                                    <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {/* Espace réservé pour alignement ou future action */}
                                    </Grid>
                                </Grid>
                            </Paper>
                        );
                    })}

                    <Button
                        startIcon={<AddIcon />}
                        onClick={addConcurrent}
                        variant="outlined"
                        color="primary"
                        sx={{ mb: 3, mt: 1 }}
                    >
                        + Ajouter un concurrent
                    </Button>
                </Box>

                {/* Boutons d'action */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CalculateIcon />}
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
                    >
                        {loading ? <LinearProgress color="inherit" sx={{ width: 100 }} /> : '🧮 Calculer le prix de référence'}
                    </Button>
                    
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<RefreshIcon />}
                        onClick={resetForm}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        🔄 Réinitialiser
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default TenderForm;