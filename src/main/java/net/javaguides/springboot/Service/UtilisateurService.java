package net.javaguides.springboot.Service;

import net.javaguides.springboot.model.Utilisateur;
import net.javaguides.springboot.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur register(String username, String password) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setUsername(username);
        utilisateur.setPassword(password);
        return utilisateurRepository.save(utilisateur);
    }

    public boolean login(String username, String password) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByUsername(username);
        return utilisateurOpt.isPresent() && utilisateurOpt.get().getPassword().equals(password);
    }
}
