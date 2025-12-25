import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LogOut, Calendar, User, ChevronDown, Bell } from 'lucide-react'; // Icônes modernes
import useAutoLogout from './useAutoLogout';

const EXERCICES = ['2026', '2025', '2024', '2023'];

const HeaderComponent = () => {
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
      const defaultEx = EXERCICES.includes(currentYear) ? currentYear : EXERCICES[0];
      setExercice(defaultEx);
      sessionStorage.setItem('exercice', defaultEx);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); 
    history.push('/login');
    window.location.reload();
  };

  const navLinks = {
    ROLE_SI: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/appelOffres", label: "Appels d'Offres" },
      { to: "/recapp", label: "Marchés" },
      { to: "/bande-commandes", label: "BC" },
      { to: "/admin/users", label: "Utilisateurs" },
    ],
    ROLE_ADMIN: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/appelOffres", label: "Appels d'Offres" },
      { to: "/recapp", label: "Marchés" },
    ],
    ROLE_USER: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/ListSA", label: "Suivi AO" },
    ]
  };

  const currentLinks = user ? navLinks[user.role] || [] : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo & Titre */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
              <img src="/ormvad_1.jpg" alt="Logo" className="rounded-lg object-cover w-full h-full" />
            </div>
            <span className="hidden lg:block font-bold text-slate-800 text-lg tracking-tight">
              Marchés <span className="text-green-600">Publics</span>
            </span>
          </Link>

          {/* Sélecteur d'exercice stylisé */}
          {user && location.pathname !== '/login' && (
            <div className="ml-4 flex items-center bg-slate-100 rounded-full px-3 py-1 border border-slate-200">
              <Calendar size={14} className="text-slate-500 mr-2" />
              {isEditing ? (
                <select 
                  className="bg-transparent text-sm font-semibold outline-none"
                  value={exercice}
                  onChange={(e) => {
                    sessionStorage.setItem('exercice', e.target.value);
                    window.location.reload();
                  }}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                >
                  {EXERCICES.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              ) : (
                <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-slate-700 hover:text-green-600 transition-colors">
                  {exercice}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation Centrale */}
        <nav className="hidden md:flex items-center gap-1">
          {currentLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.to 
                ? 'bg-green-50 text-green-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Profil & Logout */}
        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-slate-800">{user.nom}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{user.role?.replace('ROLE_', '')}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-all shadow-md">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;