import { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, FormControl,
  InputLabel, Select, MenuItem, Chip, Grid, Alert, LinearProgress,
  Tooltip, IconButton, Switch, FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Calculate as CalculateIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import PrixReferenceService from '../../services/PrixReferenceService';
import { NumericFormat } from 'react-number-format';
const TenderForm = ({ onCalculationComplete, initialData, tenderId }) => {
    const [reference, setReference] = useState('');
    const [category, setCategory] = useState('TRAVAUX');
    const [estimation, setEstimation] = useState('');
    const [concurrents, setConcurrents] = useState([{ nom: '', prix: '', rejected: false, rejectionReason: '' }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setReference(String(initialData.reference ?? ''));
            setCategory(initialData.category || 'TRAVAUX');
            setEstimation(String(initialData.estimation ?? ''));
            if (initialData.concurrents && initialData.concurrents.length > 0) {
                setConcurrents(initialData.concurrents.map(c => ({
                    nom: c.nom ?? '',
                    prix: c.prix ?? '',
                    rejected: c.rejected ?? false,
                    rejectionReason: c.rejectionReason ?? ''
                })));
            } else {
                setConcurrents([{ nom: '', prix: '', rejected: false, rejectionReason: '' }]);
            }
        } else {
            setReference('');
            setCategory('TRAVAUX');
            setEstimation('');
            setConcurrents([{ nom: '', prix: '', rejected: false, rejectionReason: '' }]);
            setError('');
        }
    }, [initialData]);

    const addConcurrent = () => {
        setConcurrents(prev => [...prev, { nom: '', prix: '', rejected: false, rejectionReason: '' }]);
    };

    const removeConcurrent = (idx) => {
        setConcurrents(prev => prev.filter((_, i) => i !== idx));
    };

    const updateConcurrent = (idx, field, value) => {
        const updated = [...concurrents];
        updated[idx][field] = value;
        if (field === 'rejected' && value === false) {
            updated[idx].rejectionReason = '';
        }
        setConcurrents(updated);
    };

    const resetForm = () => {
        setReference('');
        setCategory('TRAVAUX');
        setEstimation('');
        setConcurrents([{ nom: '', prix: '', rejected: false, rejectionReason: '' }]);
        setError('');
    };

    const getStatus = (prixStr) => {
        if (!estimation || !prixStr) return null;
        const prix = parseFloat(prixStr);
        const est = parseFloat(estimation);
        if (isNaN(prix) || isNaN(est) || est === 0) return null;

        const percent = ((prix - est) / est) * 100;
        if (percent > 20) {
            return { text: 'Offre excessive', color: 'error', percent, icon: '📈' };
        }
        const seuilBas = category === 'TRAVAUX' ? 20 : 25;
        if (percent < -seuilBas) {
            return { text: 'Anormalement basse', color: 'warning', percent, icon: '📉' };
        }
        return { text: 'Offre normale', color: 'success', percent, icon: '✅' };
    };

    const findExistingTenderId = async (reference) => {
        try {
            const response = await PrixReferenceService.getAllTenders();
            const existing = response.data.find(t => t.referenceMarche === reference);
            return existing ? existing.id : null;
        } catch (err) {
            console.error("Erreur lors de la recherche de la référence", err);
            return null;
        }
    };

    const buildPayload = () => ({
        referenceMarche: reference.trim(),
        type: category,
        estimation: parseFloat(estimation),
        offers: concurrents
            .filter(c => c.nom.trim() !== '')
            .map(c => ({
                entreprise: c.nom.trim(),
                montant: c.prix === '' ? 0 : parseFloat(c.prix),
                rejected: c.rejected,
                rejectionReason: c.rejectionReason || null
            }))
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!estimation || !reference.trim()) {
            setError("Veuillez saisir la référence marché et l'estimation");
            return;
        }

        const payload = buildPayload();
        const hasValidOffer = payload.offers.some(o => !o.rejected && o.montant > 0);
        if (!hasValidOffer) {
            setError('Ajoutez au moins un concurrent valide (non écarté) avec un prix positif');
            return;
        }

        setLoading(true);
        try {
            const response = await PrixReferenceService.calculatePrice(payload);
            const resultData = response.data;

            // Sauvegarde ou mise à jour automatique
            if (tenderId) {
                await PrixReferenceService.updateTender(tenderId, payload);
            } else {
                const existingId = await findExistingTenderId(payload.referenceMarche);
                if (existingId) {
                    await PrixReferenceService.updateTender(existingId, payload);
                } else {
                    await PrixReferenceService.saveTender(payload);
                }
            }

            if (onCalculationComplete) {
                onCalculationComplete(resultData, payload);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur : ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!estimation || !reference.trim()) {
            setError("Veuillez d'abord calculer ou saisir des données valides");
            return;
        }
        const payload = buildPayload();
        const hasValidOffer = payload.offers.some(o => !o.rejected && o.montant > 0);
        if (!hasValidOffer) {
            setError('Ajoutez au moins un concurrent valide (non écarté) avec un prix positif');
            return;
        }

        setLoading(true);
        try {
            if (tenderId) {
                await PrixReferenceService.updateTender(tenderId, payload);
                alert("✅ Analyse mise à jour avec succès !");
            } else {
                const existingId = await findExistingTenderId(payload.referenceMarche);
                if (existingId) {
                    await PrixReferenceService.updateTender(existingId, payload);
                    alert("✅ Analyse mise à jour avec succès (référence existante) !");
                } else {
                    await PrixReferenceService.saveTender(payload);
                    alert("✅ Analyse enregistrée avec succès !");
                }
            }
        } catch (err) {
            console.error(err);
            setError('Erreur lors de l\'enregistrement : ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={2} sx={{ borderRadius: 2, p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ bgcolor: 'primary.main', borderRadius: 2, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalculateIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                     Calculateur Prix de Référence
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Référence d'AO"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            required
                            fullWidth
                            placeholder="Ex: AO-2024-001"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type d'appel d'offre</InputLabel>
                            <Select
                                value={category}
                                label="Catégorie d'appel d'offre"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="TRAVAUX">
                                    🏗️ Travaux
                                    <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem', ml: 1 }}>
                                        (Excessive: &gt;+20% | Basse: &lt;-20%)
                                    </Typography>
                                </MenuItem>
                                <MenuItem value="SERVICES">
                                    📦 Services & Fournitures
                                    <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem', ml: 1 }}>
                                        (Excessive: &gt;+20% | Basse: &lt;-25%)
                                    </Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
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
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                            👥 Concurrents
                        </Typography>
                        <Chip label={concurrents.length} size="small" color="primary" variant="outlined" />
                    </Box>

                    {concurrents.map((c, idx) => {
                        const status = !c.rejected ? getStatus(c.prix) : null;
                        return (
                            <Paper key={idx} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2, borderLeft: status ? `4px solid` : (c.rejected ? '4px solid #f44336' : 'none'), borderColor: status?.color || (c.rejected ? '#f44336' : 'transparent'), bgcolor: c.rejected ? '#ffebee' : (status?.color === 'error' ? '#ffebee' : status?.color === 'warning' ? '#fff8e1' : status?.color === 'success' ? '#e8f5e9' : 'background.paper') }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                                        Concurrent {idx + 1}
                                    </Typography>
                                    {concurrents.length > 1 && (
                                        <Tooltip title="Supprimer définitivement">
                                            <IconButton size="small" color="error" onClick={() => removeConcurrent(idx)}>
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
                                            fullWidth size="small"
                                            placeholder="Entreprise XYZ"
                                        />
                                    </Grid>
<Grid item xs={12} md={3}>
  <NumericFormat
    customInput={TextField}
    label="Offre financière proposée"
    value={c.prix}
    onValueChange={(values) => {
      // values.floatValue est le nombre réel (ex: 1250000)
      updateConcurrent(idx, 'prix', values.floatValue);
    }}
    thousandSeparator=" "        // séparateur = espace (conforme usage français)
    decimalSeparator=","         // virgule pour les décimales (optionnel)
    allowNegative={false}
    disabled={c.rejected}
    fullWidth
    size="small"
    placeholder="95 000"
    InputProps={{
      endAdornment: <Typography sx={{ color: 'text.secondary' }}>DH</Typography>
    }}
  />
</Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={c.rejected}
                                                    onChange={(e) => updateConcurrent(idx, 'rejected', e.target.checked)}
                                                    color="error"
                                                />
                                            }
                                            label="Écartée"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {!c.rejected && status && (
                                            <Chip icon={<span>{status.icon}</span>} label={`${status.text} (${status.percent > 0 ? '+' : ''}${status.percent.toFixed(1)}%)`} color={status.color} size="small" variant="outlined" sx={{ fontWeight: 'bold', borderRadius: 1, width: '100%', justifyContent: 'flex-start' }} />
                                        )}
                                        {c.rejected && (
                                            <Chip icon={<span>❌</span>} label="Offre écartée manuellement" color="error" size="small" variant="outlined" sx={{ fontWeight: 'bold', borderRadius: 1, width: '100%', justifyContent: 'flex-start' }} />
                                        )}
                                    </Grid>
                                    {c.rejected && (
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Motif du rejet"
                                                value={c.rejectionReason}
                                                onChange={(e) => updateConcurrent(idx, 'rejectionReason', e.target.value)}
                                                fullWidth
                                                size="small"
                                                required
                                                placeholder="Ex: Destination non conforme, spécifications techniques non respectées..."
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        );
                    })}

                    <Button startIcon={<AddIcon />} onClick={addConcurrent} variant="outlined" color="primary" sx={{ mb: 3, mt: 1 }}>
                        + Ajouter un concurrent
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<CalculateIcon />} onClick={handleSubmit} disabled={loading} sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}>
                        {loading ? <LinearProgress color="inherit" sx={{ width: 100 }} /> : '🧮 Calculer le prix de référence'}
                    </Button>
                    <Button variant="outlined" color="secondary" startIcon={<RefreshIcon />} onClick={resetForm} sx={{ borderRadius: 2, px: 3 }}>
                        🔄 Réinitialiser
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default TenderForm;