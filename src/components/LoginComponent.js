import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppelOffreService from "../services/AppelOffreService";
import "./LoginComponent.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [exercice, setExercice] = useState(""); // ← nouvel état
  const [showExerciceSelector, setShowExerciceSelector] = useState(false); // ← pour afficher le sélecteur
  const [loginResponse, setLoginResponse] = useState(null); // ← stocker la réponse du login
  const history = useHistory();

  const loginf = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    AppelOffreService.login(credentials)
      .then((response) => {
        const role = response.data;
        if (role === "no") {
          setMessage("Nom d’utilisateur ou mot de passe incorrect.");
        } else {
          // ✅ Login réussi → montrer le sélecteur d'exercice
          setLoginResponse({ username, role });
          setShowExerciceSelector(true);
          setMessage("");
        }
      })
      .catch(() => setMessage("Erreur de connexion. Veuillez réessayer."));
  };

  const handleExerciceSubmit = (e) => {
    e.preventDefault();
    if (!exercice.trim()) {
      setMessage("Veuillez sélectionner un exercice.");
      return;
    }

    // 🔑 Stocker l'exercice dans sessionStorage
    sessionStorage.setItem("exercice", exercice.trim());

    const { username, role } = loginResponse;

    // Définir les infos utilisateur
    let user;
    if (role === "admin") {
      user = { username, role, nom: "Mr. ANDALOUSSI" };
      history.push("/appelOffres");
    } else if (role === "sous admin") {
      user = { username, role, nom: "Mr. KAFIH" };
      history.push("/ListSA");
    } else {
      user = { username, role, nom: role };
      history.push(`/ListAppelOffreParEntite/${role}`);
    }

    sessionStorage.setItem("user", JSON.stringify(user));
        window.location.reload(); // ou utiliser un contexte pour recharger proprement
  };

  // Si on doit choisir l'exercice → afficher le sélecteur
  if (showExerciceSelector) {
    return (
      <div className="login-page">
        <div className="login-card" style={{ maxWidth: "400px" }}>
          <div className="login-header text-center mb-4">
            <h4 className="fw-bold text-success">Sélection de l'exercice</h4>
            <p className="text-muted">Veuillez choisir l’année d’exercice</p>
          </div>

          <form onSubmit={handleExerciceSubmit}>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label className="fw-semibold">Année d’exercice</label>
              <select
                className="form-control modern-input"
                value={exercice}
                onChange={(e) => setExercice(e.target.value)}
                required
              >
                <option value="">-- Sélectionnez --</option>
                {/* Tu peux aussi charger dynamiquement depuis une API */}
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            {message && <div className="alert alert-danger py-2 text-center">{message}</div>}

            <button type="submit" className="btn-modern w-100 mt-3">
              Confirmer
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => {
                setShowExerciceSelector(false);
                setLoginResponse(null);
                setMessage("");
              }}
            >
              ← Retour à la connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Affichage normal de la page de login
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header text-center mb-4">
          <img src="/ormvad_1.jpg" alt="Logo ORMAVD" className="login-logo" />
          <h3 className="fw-bold text-success mt-3">Portail ORMAVD</h3>
          <p className="text-muted">Connectez-vous pour accéder à votre espace</p>
        </div>

        <form onSubmit={loginf}>
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label className="fw-semibold">Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control modern-input"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label className="fw-semibold">Mot de passe</label>
            <input
              type="password"
              className="form-control modern-input"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && <div className="alert alert-danger py-2 text-center">{message}</div>}

          <button type="submit" className="btn-modern w-100 mt-3">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;