import React, { useState, useEffect } from 'react';
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
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UtilisateurService from '../services/UtilisateurService';

const UserManagementComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ 
        nom: '', 
        username: '', 
        password: '', 
        role: 'ROLE_USER', 
        entite: '' 
    });
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        refreshUsers();
    }, []);

    const refreshUsers = async () => {
        setLoading(true);
        try {
            const response = await UtilisateurService.getAllUsers();
            setUsers(response.data || []);
        } catch (err) {
            console.error("Erreur chargement utilisateurs", err);
            showMessage("❌ Erreur lors du chargement des utilisateurs", 'error');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 4000);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation basique
        if (!formData.nom.trim() || !formData.username.trim() || !formData.entite.trim()) {
            showMessage("⚠️ Veuillez remplir tous les champs obligatoires", 'warning');
            return;
        }
        
        if (!editMode && !formData.password.trim()) {
            showMessage("⚠️ Veuillez saisir un mot de passe", 'warning');
            return;
        }

        try {
            if (editMode) {
                await UtilisateurService.updateUser(currentUserId, formData);
                showMessage("✅ Utilisateur mis à jour avec succès !");
            } else {
                await UtilisateurService.createUser(formData);
                showMessage("✅ Utilisateur créé avec succès !");
            }
            resetForm();
            refreshUsers();
            setOpenDialog(false);
        } catch (err) {
            console.error("Erreur lors de l'opération", err);
            showMessage("❌ Erreur lors de l'opération", 'error');
        }
    };

    const handleEdit = (user) => {
        setEditMode(true);
        setCurrentUserId(user.id);
        setFormData({ 
            nom: user.nom || '', 
            username: user.username || '', 
            password: '', 
            role: user.role || 'ROLE_USER', 
            entite: user.entite || '' 
        });
        setOpenDialog(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;
        
        try {
            await UtilisateurService.deleteUser(userToDelete.id);
            showMessage("✅ Utilisateur supprimé avec succès !");
            refreshUsers();
        } catch (err) {
            console.error("Erreur suppression utilisateur", err);
            showMessage("❌ Erreur lors de la suppression", 'error');
        } finally {
            setDeleteDialog(false);
            setUserToDelete(null);
        }
    };

    const resetForm = () => {
        setFormData({ nom: '', username: '', password: '', role: 'ROLE_USER', entite: '' });
        setEditMode(false);
        setCurrentUserId(null);
        setOpenDialog(false);
    };

const getRoleLabel = (role) => {
    switch(role) {
        case 'ROLE_ADMIN': return 'ADMIN';
        case 'ROLE_SI': return 'SERVICE SI';
        case 'ROLE_USER': return 'SOUS ADMIN';
        case 'CONSULTATION': return 'CONSULTATION';
        default: return role;
    }
};

const getRoleColor = (role) => {
    switch(role) {
        case 'ROLE_ADMIN': return 'error';
        case 'ROLE_SI': return 'warning';
        case 'ROLE_USER': return 'primary';
        case 'CONSULTATION': return 'info'; // tu peux choisir une couleur différente si tu veux
        default: return 'default';
    }
};

const getRoleIcon = (role) => {
    switch(role) {
        case 'ROLE_ADMIN': return <SecurityIcon />;
        case 'ROLE_SI': return <BusinessIcon />;
        case 'ROLE_USER': return <PersonIcon />;
        case 'CONSULTATION': return <VisibilityIcon />; // par exemple pour consultation
        default: return <PersonIcon />;
    }
};

    return (
        <Box sx={{ p: 3 }}>
            {/* En-tête */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                        👥 Gestion des Utilisateurs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Administration des accès et permissions utilisateurs
                    </Typography>
                </Box>
                
                <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => {
                        resetForm();
                        setOpenDialog(true);
                    }}
                    sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Nouvel Utilisateur
                </Button>
            </Box>

            {/* Statistiques */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6">{users.length}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total utilisateurs
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'error.main' }}>
                                <SecurityIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6">
                                    {users.filter(u => u.role === 'ROLE_ADMIN').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Administrateurs
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'warning.main' }}>
                                <BusinessIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6">
                                    {users.filter(u => u.role === 'ROLE_SI').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Service SI
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'info.main' }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6">
                                    {users.filter(u => u.role === 'ROLE_USER').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Sous Admins
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tableau des utilisateurs */}
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                {loading ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <LinearProgress sx={{ mb: 2 }} />
                        <Typography color="text.secondary">Chargement des utilisateurs...</Typography>
                    </Box>
                ) : users.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <PersonIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Aucun utilisateur trouvé
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Cliquez sur "Nouvel Utilisateur" pour commencer
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: 'primary.main' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Utilisateur</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Identifiant</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rôle</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Entité</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow 
                                        key={user.id}
                                        hover
                                        sx={{ 
                                            '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                            '&:hover': { bgcolor: 'action.selected' }
                                        }}
                                    >
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                #{user.id}
                                            </Typography>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                                                    {getRoleIcon(user.role)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {user.nom}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Typography variant="body2" color="primary">
                                                @{user.username}
                                            </Typography>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Chip
                                                icon={getRoleIcon(user.role)}
                                                label={getRoleLabel(user.role)}
                                                color={getRoleColor(user.role)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Chip
                                                label={user.entite}
                                                size="small"
                                                sx={{ 
                                                    bgcolor: 'secondary.light',
                                                    color: 'secondary.dark'
                                                }}
                                            />
                                        </TableCell>
                                        
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <Tooltip title="Modifier">
                                                    <IconButton 
                                                        color="primary" 
                                                        size="small"
                                                        onClick={() => handleEdit(user)}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip title="Supprimer">
                                                    <IconButton 
                                                        color="error" 
                                                        size="small"
                                                        onClick={() => handleDeleteClick(user)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* Dialog pour ajouter/modifier */}
            <Dialog 
                open={openDialog} 
                onClose={resetForm}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    {editMode ? "✏️ Modifier l'utilisateur" : "👤 Nouvel utilisateur"}
                </DialogTitle>
                
                <DialogContent sx={{ pt: 3 }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Nom complet"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            autoFocus
                        />
                        
                        <TextField
                            label="Nom d'utilisateur"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        
                        <TextField
                            label={editMode ? "Mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required={!editMode}
                            fullWidth
                        />
                        
                        <FormControl fullWidth>
                            <InputLabel>Rôle</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                label="Rôle"
                            >
                                <MenuItem value="ROLE_USER">SOUS ADMIN</MenuItem>
                                <MenuItem value="ROLE_ADMIN">ADMIN</MenuItem>
                                <MenuItem value="ROLE_SI">SERVICE SI</MenuItem>
                                <MenuItem value="CONSULTATION">CONSULTATION</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TextField
                            label="Entité"
                            name="entite"
                            value={formData.entite}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            placeholder="Ex: DPF, DAF, DRH..."
                        />
                    </Box>
                </DialogContent>
                
                <DialogActions sx={{ p: 2 }}>
                    <Button 
                        onClick={resetForm}
                        startIcon={<ClearIcon />}
                        color="inherit"
                    >
                        Annuler
                    </Button>
                    
                    <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        startIcon={editMode ? <SaveIcon /> : <AddIcon />}
                        sx={{ minWidth: 120 }}
                    >
                        {editMode ? "Mettre à jour" : "Ajouter"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog de confirmation de suppression */}
            <Dialog 
                open={deleteDialog} 
                onClose={() => setDeleteDialog(false)}
                maxWidth="xs"
            >
                <DialogTitle sx={{ color: 'error.main' }}>
                    ⚠️ Confirmer la suppression
                </DialogTitle>
                
                <DialogContent>
                    {userToDelete && (
                        <>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                Cette action est irréversible
                            </Alert>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'error.light' }}>
                                    {getRoleIcon(userToDelete.role)}
                                </Avatar>
                                <Box>
                                    <Typography fontWeight="bold">
                                        {userToDelete.nom}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        @{userToDelete.username} • {getRoleLabel(userToDelete.role)}
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Typography variant="body2">
                                Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                            </Typography>
                        </>
                    )}
                </DialogContent>
                
                <DialogActions>
                    <Button 
                        onClick={() => setDeleteDialog(false)}
                        startIcon={<CancelIcon />}
                        color="inherit"
                    >
                        Annuler
                    </Button>
                    
                    <Button 
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notifications */}
            <Snackbar
                open={!!message}
                autoHideDuration={4000}
                onClose={() => setMessage('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setMessage('')} 
                    severity={messageType}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserManagementComponent;