import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAutoLogout from './useAutoLogout';
import './HeaderComponent.css';

const EXERCICES = ['2027','2026', '2025', '2024', '2023'];

const HeaderComponent = () => {
  // Récupération de l'utilisateur (Structure : { username, role, displayName, ... })
  const user = JSON.parse(sessionStorage.getItem('user'));
  const history = useHistory();
  const location = useLocation();

  const [exercice, setExercice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('exercice');
    if (stored && EXERCICES.includes(stored)) {
      setExercice(stored);
    } else {
      const currentYear = new Date().getFullYear().toString();
      const defaultExercice = EXERCICES.includes(currentYear) ? currentYear : EXERCICES[0];
      setExercice(defaultExercice);
      sessionStorage.setItem('exercice', defaultExercice);
    }
  }, []);

  const handleLogout = () => {
    // 🛡️ Nettoyage complet pour la sécurité JWT
    sessionStorage.clear(); 
    history.push('/login');
    window.location.reload(); // Pour réinitialiser l'état global de l'app
  };

  const handleExerciceChange = (e) => {
    const newExercice = e.target.value;
    setExercice(newExercice);
    sessionStorage.setItem('exercice', newExercice);
    setIsEditing(false);
    window.location.reload(); 
  };

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);

  useAutoLogout();

  const showExercice = user && location.pathname !== '/login';

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
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center gap-3 brand-section">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
              <img
                src="/ormvad_1.jpg"
                alt="Logo ORMAVD"
                style={{ width: 42, height: 42, border: '2px solid #fff', borderRadius: '10px' }}
              />
              <span className="fw-bold fs-5 text-white">Suivi Appels d'Offres</span>
            </Link>
            <img src="/MAPDEFF.png" alt="Logo MAPDEFF" style={{ width: 48, height: 42, borderRadius: '4px' }} />
          </div>

          {/* === Exercice === */}
          {showExercice && (
            <div className="mt-1 d-flex align-items-center" style={{ fontSize: '0.85rem' }}>
              <span className="text-white opacity-90 me-2">Exercice :</span>
              {isEditing ? (
                <select
                  value={exercice}
                  onChange={handleExerciceChange}
                  onBlur={cancelEditing}
                  autoFocus
                  className="form-select form-select-sm py-0"
                  style={{ width: '85px', fontSize: '0.85rem' }}
                >
                  {EXERCICES.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              ) : (
                <div className="d-flex align-items-center">
                  <strong className="text-white">{exercice}</strong>
                  <button onClick={startEditing} className="btn btn-link p-1 ms-1 text-white-50" style={{ fontSize: '0.8rem' }}>✏️</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* === Liens de navigation (Nouveaux Rôles JWT) === */}
        {user && location.pathname !== '/login' && (
          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
            {/* Rôle ADMIN SI*/}
            {user.role === 'ROLE_SI' && (
              <>
                <Link className="btn-nav" to="/dashboard">RECAP AO</Link>
                <Link className="btn-nav" to="/appelOffres">Suivi des Appels d'Offres</Link>
                <Link className="btn-nav" to="/recapp">Exécution des Marchés</Link>
                <Link className="btn-nav" to="/bande-commandes">BC à lancer</Link>
                <Link className="btn-nav" to="/excution-bandecommande">Exécution BC</Link>
                <Link className="btn-nav" to="/TableauBord">RECAP BC</Link>
                <Link className="btn-nav" to="/admin/users">Utilisateurs</Link>
              </>
            )}

            {/* Rôle ADMIN */}
            {user.role === 'ROLE_ADMIN' && (
              <>
                <Link className="btn-nav" to="/dashboard">RECAP AO</Link>
                <Link className="btn-nav" to="/appelOffres">Suivi des Appels d'Offres</Link>
                <Link className="btn-nav" to="/recapp">Exécution des Marchés</Link>
                <Link className="btn-nav" to="/bande-commandes">BC à lancer</Link>
                <Link className="btn-nav" to="/excution-bandecommande">Exécution BC</Link>
                <Link className="btn-nav" to="/TableauBord">RECAP BC</Link>
              </>
            )}

            {/* Rôle SOUS ADMIN (Utilisateur) */}
            {user.role === 'ROLE_USER' && (
              <>
                <Link className="btn-nav" to="/dashboard">RECAP AO</Link>
                <Link className="btn-nav" to="/ListSA">Suivi des Appels d'Offres</Link>
                <Link className="btn-nav" to="/recapp">Exécution des Marchés(Suivi Visa)</Link>
              </>
            )}
          </div>
        )}

        {/* === Section utilisateur === */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <div className="d-flex align-items-center gap-2 user-section">
                <div
                  style={{
                    width: 32, height: 32, backgroundColor: '#ffffff33',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem'
                  }}
                >
                  {user.nom?.charAt(0) || 'U'}
                </div>
                <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{user.nom}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm px-3"
                style={{ borderRadius: '20px' }}
              >
                Quitter
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light btn-sm">Connexion</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;