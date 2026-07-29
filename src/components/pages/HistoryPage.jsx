// src/components/pages/HistoryPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, CircularProgress, Grid, Card, CardContent,
  CardActions, Button, Box, Chip, TextField, InputAdornment, Divider,
  Avatar, IconButton, Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Work as WorkIcon,
  Build as BuildIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
  MonetizationOn as MoneyIcon,
  People as PeopleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import PrixReferenceService from '../../services/PrixReferenceService';

const HistoryPage = () => {
  const [tenders, setTenders] = useState([]);
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    PrixReferenceService.getAllTenders()
      .then(res => {
        setTenders(res.data);
        setFilteredTenders(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filtre par référence marché ou par nom d'entreprise (via les offres)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTenders(tenders);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = tenders.filter(t =>
      t.referenceMarche.toLowerCase().includes(lowerSearch)
      // Optionnel : chercher aussi dans les entreprises des offres ?
      // Nécessiterait de charger les offres associées, mais on peut enrichir le DTO backend.
      // Pour l'instant on se limite à la référence.
    );
    setFilteredTenders(filtered);
  }, [searchTerm, tenders]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getTypeIcon = (type) => {
    return type === 'TRAVAUX' ? <BuildIcon /> : <WorkIcon />;
  };

  const getTypeColor = (type) => {
    return type === 'TRAVAUX' ? 'secondary' : 'info';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Chargement des analyses...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête avec retour */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <IconButton onClick={() => history.push('/prix-reference')} color="primary" sx={{ bgcolor: 'action.hover' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Historique des analyses
        </Typography>
        <Chip label={`${filteredTenders.length} analyse(s)`} color="primary" variant="outlined" sx={{ ml: 'auto' }} />
      </Box>

      {/* Barre de recherche */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher par référence marché..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Paper>

      {filteredTenders.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          {tenders.length === 0 ? "Aucune analyse enregistrée pour le moment." : "Aucune analyse ne correspond à votre recherche."}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredTenders.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                  cursor: 'pointer'
                }}
                onClick={() => history.push(`/analyse/${t.id}`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: `${getTypeColor(t.type)}.main`, mr: 1.5 }}>
                      {getTypeIcon(t.type)}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" noWrap title={t.referenceMarche}>
                      {t.referenceMarche}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip 
                      label={t.type === 'TRAVAUX' ? 'Travaux' : 'Services & Fournitures'} 
                      size="small" 
                      color={getTypeColor(t.type)} 
                      variant="outlined"
                    />
                    <Chip 
                      icon={<CalendarIcon fontSize="small" />} 
                      label={formatDate(t.createdAt)} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>

                  {/* Infos supplémentaires : estimation (si disponible) */}
                  {/* Note : le DTO TenderSummaryDTO ne contient pas l'estimation. Il faut l'ajouter dans le backend si vous voulez l'afficher ici. 
                      En attendant, on ne l'affiche pas. On peut aussi enrichir le DTO. */}
                  
                  {/* Bouton d'action en bas de carte */}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                  <Button size="small" color="primary" onClick={(e) => { e.stopPropagation(); history.push(`/analyse/${t.id}`); }}>
                    Voir les détails →
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HistoryPage;