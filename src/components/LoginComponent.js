import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AppelOffreService from '../services/AppelOffreService';

const LoginComponent = () => {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Hook pour naviguer

    const user = {username, password}; 


    const loginf = (e) => {
        e.preventDefault();

        const utilisateuropt = {username, password}

    
AppelOffreService.login(utilisateuropt)
  .then((response) => {
    const data = response.data;

    if (data.role === "admin") {
      localStorage.setItem('user', JSON.stringify({ 
        username: data.username, 
        role: 'admin', 
        nom: 'Mr. ANDALOUSSI' 
      }));
      history.push('/appelOffres');

    } else if (data.role === "sous_admin") {
      localStorage.setItem('user', JSON.stringify({ 
        username: data.username, 
        role: 'sous_admin', 
        nom: 'Mr. KAFIH' 
      }));
      history.push('/ListSA');

    } else if (data.role === "user" && data.entite) {
      const entitee = data.entite;
      localStorage.setItem('user', JSON.stringify({ 
        username: data.username, 
        role: 'user', 
        nom: entitee 
      }));
      history.push(`/ListAppelOffreParEntite/${entitee}`);

    } else {
      setMessage("Identifiants invalides");
    }
  })
  .catch((error) => {
    console.error("Erreur de login", error);
    setMessage("Erreur de connexion");
  });

        
        
    }

  return (

    
    <div className="login-container">
        <br></br>
        
      <h2>Connexion</h2>
      <br></br>
      <form>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <button
          className="btn btn-success"
          onClick={(e) => loginf(e)}
        >
          Valider
        </button>
      </form>
      <br></br>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  )
}

export default LoginComponent