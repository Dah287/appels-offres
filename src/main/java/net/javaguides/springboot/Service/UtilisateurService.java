package net.javaguides.springboot.Service;


import net.javaguides.springboot.model.Role;
import net.javaguides.springboot.model.Utilisateur;
import net.javaguides.springboot.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Enregistre un nouvel utilisateur
     * - Vérifie que le username n'existe pas déjà
     * - Hache le mot de passe
     * - Définit un rôle par défaut si null
     * - Définit une entité par défaut si null
     *
     * @param username
     * @param password
     * @param role
     * @param entite
     * @return Utilisateur enregistré
     */
    public Utilisateur register(String username, String password, Role role, String entite) {
        // Vérifier que le username n'existe pas déjà
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom d'utilisateur est obligatoire");
        }

        if (password == null || password.length() < 4) {
            throw new IllegalArgumentException("Le mot de passe doit contenir au moins 4 caractères");
        }

        if (utilisateurRepository.findByUsername(username.trim()).isPresent()) {
            throw new RuntimeException("Nom d'utilisateur déjà pris : " + username);
        }

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setUsername(username.trim());
        utilisateur.setPassword(passwordEncoder.encode(password)); // 🔐 Hachage BCrypt
        utilisateur.setRole(role);
        utilisateur.setEntite(entite != null ? entite.trim() : "Non attribuée");

        return utilisateurRepository.save(utilisateur);
    }

    /**
     * Authentifie un utilisateur
     * - Cherche par username
     * - Compare le mot de passe avec BCrypt
     *
     * @param username
     * @param password
     * @return Utilisateur authentifié ou null
     */
    public Utilisateur login(String username, String password) {
        if (username == null || password == null) {
            return null;
        }

        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByUsername(username.trim());

        if (utilisateurOpt.isPresent()) {
            Utilisateur utilisateur = utilisateurOpt.get();
            // Comparer le mot de passe hashé
            if (passwordEncoder.matches(password, utilisateur.getPassword())) {
                return utilisateur;
            }
        }
        return null;
    }
}