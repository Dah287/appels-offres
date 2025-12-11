import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAutoLogout from './useAutoLogout';
import './HeaderComponent.css';

const HeaderComponent = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    history.push('/login');
  };

  useAutoLogout();

  return (
    <header
      className="shadow-sm"
      style={{
        background: 'linear-gradient(90deg, #2e7d32, #4caf50)',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav className="navbar navbar-expand-md px-4 py-2 d-flex justify-content-between align-items-center">
{/* === Bloc logos et titre === */}
<div className="d-flex align-items-center gap-3 brand-section">
  <a href="#" className="navbar-brand d-flex align-items-center gap-2">
    <img
      src="/ormvad_1.jpg"
      alt="Logo ORMAVD"
      style={{
        width: 42,
        height: 42,
        border: '2px solid #fff',
        borderRadius: '10px',
      }}
    />
    <span className="fw-bold fs-5 text-white">Suivi des Appels d'Offres</span>
  </a>

  <img
    src="/MAPDEFF.png"
    alt="Logo MAPDEFF"
    style={{
      width: 48,
      height: 42,
      borderRadius: '4px',
    }}
  />
</div>

        {/* === Liens de navigation === */}
        {user && location.pathname !== '/login' && (
          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
            {user.role === 'admin' && (
              <>
                <Link className="btn-nav" to="/dashboard">RECAP AO</Link>
                <Link className="btn-nav" to="/appelOffres">Suivi des Appels d'Offres</Link>
                <Link className="btn-nav" to="/recapp">Exécution des Marchés</Link>
                <Link className="btn-nav" to="/bande-commandes">Suivi des BC à lancer</Link>
                <Link className="btn-nav" to="/excution-bandecommande">Exécution des BC</Link>
                <Link className="btn-nav" to="/TableauBord">RECAP BC</Link>
              </>
            )}

            {user.role === 'sous admin' && (
              <>
                <Link className="btn-nav" to="/dashboard">RECAP</Link>
                <Link className="btn-nav" to="/ListSA">Liste des Appels d'Offres</Link>
                <Link className="btn-nav" to="/recapp">Suivi de Visa</Link>
              </>
            )}
          </div>
        )}

        {/* === Section utilisateur === */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
            {/* === Bloc utilisateur === */}
<div className="d-flex align-items-center gap-2 user-section">
  <div
    style={{
      width: 35,
      height: 35,
      backgroundColor: '#ffffff33',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#fff',
      textTransform: 'uppercase',
    }}
  >
    {user.nom?.charAt(0) || 'U'}
  </div>
  <span className="fw-semibold">{user.nom}</span>
</div>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm px-3"
                style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <a href="/login" className="btn btn-outline-light btn-sm">
              Connexion
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
