import React from 'react';
import { createRoot } from 'react-dom/client';  // Changement ici
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// Nouvelle méthode de rendu pour React 18
const container = document.getElementById('root');
const root = createRoot(container);  // Création de la racine

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Conservation des web vitals
reportWebVitals();