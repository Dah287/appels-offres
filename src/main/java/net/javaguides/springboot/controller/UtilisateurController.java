package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Utilisateur;
import net.javaguides.springboot.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder; // Import nécessaire
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs") // Assurez-vous que cela correspond à votre Frontend
@CrossOrigin("*")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Pour hacher les mots de passe

    // 1. Récupérer tous les utilisateurs
    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // 2. Ajouter un utilisateur (avec hachage de mot de passe)
    @PostMapping
    public ResponseEntity<?> addUtilisateur(@RequestBody Utilisateur utilisateur) {
        if (utilisateurRepository.existsByUsername(utilisateur.getUsername())) {
            return ResponseEntity.badRequest().body("Erreur : Le nom d'utilisateur existe déjà !");
        }

        // Hachage du mot de passe avant enregistrement
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));

        Utilisateur savedUser = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(savedUser);
    }

    // 3. Modifier un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(
            @PathVariable Long id, @RequestBody Utilisateur utilisateurDetails) {

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id : " + id));

        utilisateur.setUsername(utilisateurDetails.getUsername());
        utilisateur.setRole(utilisateurDetails.getRole());
        utilisateur.setEntite(utilisateurDetails.getEntite());

        // Gestion intelligente du mot de passe
        // Si un nouveau mot de passe est fourni, on le hache. Sinon, on garde l'ancien.
        if (utilisateurDetails.getPassword() != null && !utilisateurDetails.getPassword().isEmpty()) {
            utilisateur.setPassword(passwordEncoder.encode(utilisateurDetails.getPassword()));
        }

        Utilisateur updatedUtilisateur = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(updatedUtilisateur);
    }

    // 4. Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id : " + id));

        utilisateurRepository.delete(utilisateur);
        return ResponseEntity.noContent().build();
    }
}