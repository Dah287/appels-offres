import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const Results = ({ data }) => {
    if (!data) return null;

    const formatMoney = (val) => 
        new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(val).replace('MAD', 'DH');

    return (
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            {/* En-tête Résultats */}
            <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'white', color: 'success.main' }}>
                    <TrophyIcon />
                </Avatar>
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        📊 Résultats & Classement
                    </Typography>

                </Box>
            </Box>

            <Box sx={{ p: 3 }}>
                {/* Prix de référence */}
                <Paper 
                    variant="outlined" 
                    sx={{ 
                        p: 3, 
                        mb: 3, 
                        borderRadius: 2, 
                        bgcolor: 'primary.lighter',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="body2" color="primary" fontWeight="medium" sx={{ mb: 0.5 }}>
                        ⭐ Prix de référence calculé
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary.main">
                        {formatMoney(data.prixReference)}
                    </Typography>
                </Paper>

                <Divider sx={{ my: 3 }} />

                {/* Classement */}
                {data.ranking?.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <TrophyIcon color="warning" />
                            <Typography variant="h6" fontWeight="bold">
                                🏆 Classement des offres valides
                            </Typography>
                        </Box>
                        
                        <TableContainer component={Paper} variant="outlined">
                            <Table>
                                <TableHead sx={{ bgcolor: 'primary.main' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rang</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Entreprise</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Montant</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Écart</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.ranking.map((r) => (
                                        <TableRow 
                                            key={r.rang}
                                            hover
                                            sx={{ 
                                                '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                                borderLeft: r.rang === 1 ? '4px solid' : undefined,
                                                borderColor: r.rang === 1 ? 'warning.main' : undefined
                                            }}
                                        >
                                            <TableCell>
                                                <Chip
                                                    label={`${r.rang}er`}
                                                    size="small"
                                                    color={r.rang === 1 ? 'warning' : r.rang === 2 ? 'secondary' : 'default'}
                                                    sx={{ fontWeight: 'bold' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ 
                                                        bgcolor: r.rang === 1 ? 'warning.light' : 'primary.light',
                                                        width: 32, 
                                                        height: 32,
                                                        fontSize: '0.875rem'
                                                    }}>
                                                        {r.entreprise.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <Typography fontWeight="medium">
                                                        {r.entreprise}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight="bold" color="primary">
                                                    {formatMoney(r.montant)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={`${r.ecartPercentReference > 0 ? '+' : ''}${r.ecartPercentReference.toFixed(2)}%`}
                                                    size="small"
                                                    color={r.ecartPercentReference > 0 ? 'warning' : 'success'}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {/* Concurrents écartés */}
                {data.rejected?.length > 0 && (
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <WarningIcon color="error" />
                            <Typography variant="h6" fontWeight="bold" color="error">
                                ❌ Offres écartées
                            </Typography>
                            {/* <Chip 
                                label={`Hors ±${data.thresholdPercent}%`} 
                                size="small" 
                                color="error" 
                                variant="outlined" 
                            /> */}
                        </Box>
                        
                        {data.rejected.map((r, i) => (
                            <Alert 
                                key={i}
                                severity="warning"
                                icon={<CancelIcon />}
                                sx={{ 
                                    mb: 1, 
                                    borderRadius: 1,
                                    '& .MuiAlert-message': { 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center', 
                                        width: '100%' 
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography fontWeight="medium">{r.entreprise}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {formatMoney(r.montant)}
                                    </Typography>
                                </Box>
                                <Chip 
                                    label={r.raisonRejet} 
                                    size="small" 
                                    color="error" 
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </Alert>
                        ))}
                    </Box>
                )}

                {/* Aucun résultat */}
                {(!data.ranking || data.ranking.length === 0) && (!data.rejected || data.rejected.length === 0) && (
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                        ℹ️ Aucune offre à analyser pour le moment.
                    </Alert>
                )}
            </Box>
        </Paper>
    );
};

export default Results;