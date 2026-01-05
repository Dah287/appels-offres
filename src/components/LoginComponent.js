import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppelOffreService from "../services/AppelOffreService";
import "./LoginComponent.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [exercice, setExercice] = useState("");
  const [showExerciceSelector, setShowExerciceSelector] = useState(false);
  const [loginData, setLoginData] = useState(null); // Contiendra { token, user }
  const history = useHistory();

  // 1. Appel au nouvel API de Login
  const loginf = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    AppelOffreService.login(credentials)
      .then((response) => {
        // La réponse est maintenant un objet : { token, user: { id, role, entite... } }
        console.log("reponse ----------------->",response.data)
        const { token, user } = response.data;

        if (!token) {
          setMessage("Erreur d'authentification.");
        } else {
          // ✅ Login réussi : On stocke les données temporairement
          setLoginData({ token, user });
          setShowExerciceSelector(true);
          setMessage("");
        }
      })
      .catch((error) => {
        console.error("Login error", error);
        setMessage("Nom d’utilisateur ou mot de passe incorrect.");
      });
  };

  // 2. Validation finale après choix de l'exercice
  const handleExerciceSubmit = (e) => {
    e.preventDefault();
    if (!exercice.trim()) {
      setMessage("Veuillez sélectionner un exercice.");
      return;
    }

    const { token, user } = loginData;

    // 🔑 Stockage des informations essentielles
    sessionStorage.setItem("token", token); // Stockage du JWT
    sessionStorage.setItem("exercice", exercice.trim());

    // 🔄 Mapping des rôles et Redirection
    // ADMIN par ROLE_ADMIN et sous admin par ROLE_USER
    if (user.role === "ROLE_ADMIN") {
      //user.displayName = "Mr. ANDALOUSSI"; // Votre logique de nommage
      sessionStorage.setItem("user", JSON.stringify(user));
      history.push("/appelOffres");
    } 
    else if (user.role === "ROLE_USER") {
    //  user.displayName = "Mr. KAFIH";
      sessionStorage.setItem("user", JSON.stringify(user));
      history.push("/ListSA");
    } 

      else if (user.role === "ROLE_SI") {
  //    user.displayName = "SI"; // Votre logique de nommage
      sessionStorage.setItem("user", JSON.stringify(user));
      history.push("/appelOffres");
    } 
    else {
      // Pour les autres entités
     // user.displayName = user.username;
      sessionStorage.setItem("user", JSON.stringify(user));
      history.push(`/ListAppelOffreParEntite/${user.entite}`);
    }

    window.location.reload(); 
  };

  // --- Rendu du sélecteur d'exercice ---
  if (showExerciceSelector) {
    return (
      <div className="login-page">
        <div className="login-card" style={{ maxWidth: "400px" }}>
          <div className="login-header text-center mb-4">
            <h4 className="fw-bold text-success">Sélection de l'exercice</h4>
            <p className="text-muted">Choisissez l’année de travail</p>
          </div>
          <form onSubmit={handleExerciceSubmit}>
            <div className="form-group mb-3">
              <label className="fw-semibold">Année d’exercice</label>
              <select
                className="form-control modern-input"
                value={exercice}
                onChange={(e) => setExercice(e.target.value)}
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="2027">2027</option>
                 <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            {message && <div className="alert alert-danger py-2 text-center">{message}</div>}
            <button type="submit" className="btn-modern w-100 mt-3">Confirmer</button>
          </form>
        </div>
      </div>
    );
  }

  // --- Rendu du formulaire de Login ---
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header text-center mb-4">
          <img src="/ormvad_1.jpg" alt="Logo ORMVAD" className="login-logo" style={{width: '100px'}} />
          <h3 className="fw-bold text-success mt-3">Portail ORMVAD</h3>
          <p className="text-muted">Connectez-vous pour accéder à votre espace</p>
        </div>
        <form onSubmit={loginf}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control modern-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold">Mot de passe</label>
            <input
              type="password"
              className="form-control modern-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-danger py-2 text-center">{message}</div>}
          <button type="submit" className="btn-modern w-100 mt-3">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;