import React from 'react'
import { Link ,useHistory,useLocation} from 'react-router-dom'
import './HeaderComponent.css';
import useAutoLogout from './useAutoLogout';
const HeaderComponent = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const location = useLocation(); 
    
    // Obtenir l'URL actuelle
    const handleLogout = () => {
        localStorage.removeItem('user'); // Supprimer l'utilisateur de localStorage
        history.push('/login'); // Rediriger vers la page de connexion
    };
    useAutoLogout();
    return (
        <div style={{ height: '80px' }} >
        <header>
            <nav className="navbar navbar-expand-md navbar-dark  px-3 navheigh"style={{ backgroundColor: '#4CAF50' }} >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo ou titre */}
                    <div  className='d-flex'>
                    <a href="#" className="navbar-brand d-flex align-items-center">
                                <img
                                    src="/ormvad_1.jpg"  // Chemin relatif à la racine du projet
                                    alt="Logo"
                                    className="me-2"
                                    style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        border: '3px solid #fff',  // Bordure blanche
                                        borderRadius: '12px'  // Coins arrondis
                                    }} // Ajuste la taille selon tes besoins
                                />
    <span className="fw-bold text-white">Suivi des Appels d'Offres</span>
</a>
<a href="#" className="navbar-brand d-flex align-items-center">
                                <img
                                    src="/MAPDEFF.png"  // Chemin relatif à la racine du projet
                                    alt="Logo"
                                    className="me-2"
                                    style={{ 
                                        width: '45px', 
                                        height: '40px', 
                                         // Bordure blanche
                                        borderRadius: '3px'  // Coins arrondis
                                    }} // Ajuste la taille selon tes besoins
                                />

</a></div>

                    {/* Liens de navigation */}
                    <div className="d-flex align-items-center">
                            {/* Afficher les liens si :
                                1. L'utilisateur est connecté
                                2. L'URL actuelle n'est pas "/login"
                                3. Le rôle de l'utilisateur est "admin"
                            */}
                        {user && location.pathname !== '/login' && (
  <>
    {user.role === 'admin' && (
      <>
        <Link
          className="nav-link text-white mx-2"
          to="/dashboard"
          style={{
            border: '2px solid #fff',
            borderRadius: '12px',
            padding: '6px 12px',
            transition: 'all 0.3s ease',
          }}
        >
          <strong>RECAP AO</strong>
        </Link>
        <Link
          className="nav-link text-white mx-2"
          to="/appelOffres"
          style={{
            border: '2px solid #fff',
            borderRadius: '12px',
            padding: '6px 12px',
            transition: 'all 0.3s ease',
            height:'48px'
          }}
        >
          <strong>Suivi des Appels d'Offres</strong>
        </Link>
        <Link
        className="nav-link text-white mx-2"
        to="/recapp"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>Exécution des Marches</strong>
    </Link>
    <Link
        className="nav-link text-white mx-2"
        to="/bande-commandes"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>Suivi des BC à lancer</strong>
    </Link>
    <Link
        className="nav-link text-white mx-2"
        to="/excution-bandecommande"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>Exécution des BC</strong>
    </Link>
    <Link
        className="nav-link text-white mx-2"
        to="/TableauBord"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>RECAP BC</strong>
    </Link>
    
      </>
    )}
    {user.role === 'sous admin' && (
      <>
      <Link
        className="nav-link text-white mx-2"
        to="/dashboard"
        style={{
          border: '2px solid #fff',
          borderRadius: '12px',
          padding: '6px 12px',
          transition: 'all 0.3s ease',
        }}
      >
        <strong>RECAP</strong>
      </Link>
      <Link
        className="nav-link text-white mx-2"
        to="/ListSA"
        style={{
          border: '2px solid #fff',
          borderRadius: '12px',
          padding: '6px 12px',
          transition: 'all 0.3s ease',
        }}
      >
        <strong>Liste des Appels d'Offres</strong>
      </Link>
      <Link
        className="nav-link text-white mx-2"
        to="/recapp"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>Suivi de Visa</strong>
    </Link>
    {/* <Link
        className="nav-link text-white mx-2"
        to="/excution-bandecommande"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>Exécution des BC</strong>
    </Link> */}


    </>
    )}
  </>
)}
                
                    </div>

                    {/* Bouton de connexion */}
                    <div>
                    {user ? (
                            <div className="d-flex align-items-center" >
                            {/* Logo utilisateur */}
                            <i className="bi bi-person-circle text-white mx-2" style={{ fontSize: '1.5rem' , marginLeft: '8px'}}></i>
                            {/* Nom de l'utilisateur */}
                            <span className="text-white mx-2 lll">{user.nom}</span>
                            {/* Bouton déconnexion */}
                            <button
                                className="btn btn-outline-light mx-4"
                                style={{
                                    border: '2px solid #fff',      // Ajout de la bordure
                                    borderRadius: '12px',          // Arrondir les bords
                                    padding: '2px 2px',           // Ajouter un peu de padding pour rendre le lien plus large
                                    transition: 'all 0.3s ease',   // Animation pour un effet au survol
                                    fontSize: '12px'
                                }}
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </button>
                        </div>
                            ) : (
                                <a href="/login" className="btn btn-outline-light">
                                    Connexion
                                </a>
                            )}
                    </div>
                </div>
            </nav>
        </header>
            <br></br><br></br>
        </div>
    )
}

export default HeaderComponent