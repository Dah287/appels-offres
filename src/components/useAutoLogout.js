
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const useAutoLogout = () => {
  const history = useHistory(); // Hook pour naviguer

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Supprimer les données utilisateur
        localStorage.clear();
        history.push('/') // Redirection vers la page de login
      }, 10 * 60 * 1000); // 5 minutes
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Démarrer le timer au chargement

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
      clearTimeout(timer);
    };
  }, [history]);
};

export default useAutoLogout;
