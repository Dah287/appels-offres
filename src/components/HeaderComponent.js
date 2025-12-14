import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAutoLogout from './useAutoLogout';
import './HeaderComponent.css';

// 🔹 Liste des exercices disponibles (modifiable selon besoin)
const EXERCICES = ['2023', '2024', '2025', '2026', '2027'];

const HeaderComponent = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const history = useHistory();
  const location = useLocation();

  const [exercice, setExercice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Charger l'exercice au montage
  useEffect(() => {
    const stored = sessionStorage.getItem('exercice');
    if (stored && EXERCICES.includes(stored)) {
      setExercice(stored);
    } else {
      // Définir l'année courante si disponible, sinon la première de la liste
      const currentYear = new Date().getFullYear().toString();
      const defaultExercice = EXERCICES.includes(currentYear) ? currentYear : EXERCICES[EXERCICES.length - 1];
      setExercice(defaultExercice);
      sessionStorage.setItem('exercice', defaultExercice);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    history.push('/login');
  };

  const handleExerciceChange = (e) => {
    const newExercice = e.target.value;
    setExercice(newExercice);
    sessionStorage.setItem('exercice', newExercice);
    setIsEditing(false);
    // ⚠️ Optionnel : recharger les données ou forcer le refresh
    window.location.reload(); // ou utiliser un contexte pour recharger proprement
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

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

          {/* === Affichage ou sélection de l'exercice === */}
          {showExercice && (
            <div className="mt-1 d-flex align-items-center" style={{ fontSize: '0.95rem' }}>
              <span className="text-white opacity-90 me-2">Exercice :</span>
              {isEditing ? (
                <div className="d-flex align-items-center gap-1">
                  <select
                    value={exercice}
                    onChange={handleExerciceChange}
                    onBlur={cancelEditing}
                    autoFocus
                    className="form-select form-select-sm"
                    style={{
                      width: '90px',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      color: '#1b5e20',
                      backgroundColor: '#e8f5e9',
                      border: '1px solid #a5d6a7',
                      borderRadius: '5px',
                      padding: '3px 8px',
                    }}
                  >
                    {EXERCICES.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={cancelEditing}
                    className="btn btn-outline-light btn-sm py-0 px-1 ms-1"
                    style={{ borderRadius: '4px' }}
                    title="Annuler"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <strong className="text-white" style={{ fontSize: '1rem' }}>
                    {exercice}
                  </strong>
                  <button
                    onClick={startEditing}
                    className="btn btn-link p-1 ms-2"
                    style={{
                      color: '#e0f2e9',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                    }}
                    title="Modifier l'exercice"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>
          )}
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