import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppelOffreService from "../services/AppelOffreService";
import "./LoginComponent.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const loginf = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    AppelOffreService.login(credentials)
      .then((response) => {
        const role = response.data;
        if (role === "admin") {
          sessionStorage.setItem(
            "user",
            JSON.stringify({ username, role, nom: "Mr. ANDALOUSSI" })
          );
          history.push("/appelOffres");
        } else if (role === "sous admin") {
          sessionStorage.setItem(
            "user",
            JSON.stringify({ username, role, nom: "Mr. KAFIH" })
          );
          history.push("/ListSA");
        } else if (role === "no") {
          setMessage("Nom d’utilisateur ou mot de passe incorrect.");
        } else {
          sessionStorage.setItem(
            "user",
            JSON.stringify({ username, role: "user", nom: role })
          );
          history.push(`/ListAppelOffreParEntite/${role}`);
        }
      })
      .catch(() => setMessage("Erreur de connexion. Veuillez réessayer."));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header text-center mb-4">
          <img
            src="/ormvad_1.jpg"
            alt="Logo ORMAVD"
            className="login-logo"
          />
          <h3 className="fw-bold text-success mt-3">Portail ORMAVD</h3>
          <p className="text-muted">Connectez-vous pour accéder à votre espace</p>
        </div>

        <form onSubmit={loginf}>
<div className="form-group" style={{ marginBottom: '1rem' }}>
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

<div className="form-group" style={{ marginBottom: '1rem' }}>
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

          <button type="submit" className="btn-modern w-100 mt-3">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
