package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Utilisateur;
import net.javaguides.springboot.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin("*")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // Récupérer tous les utilisateurs
    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // Ajouter un utilisateur
    @PostMapping
    public Utilisateur addUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    // Modifier un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(
            @PathVariable Long id, @RequestBody Utilisateur utilisateurDetails) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id : " + id));

        utilisateur.setUsername(utilisateurDetails.getUsername());
        utilisateur.setPassword(utilisateurDetails.getPassword());
        utilisateur.setRole(utilisateurDetails.getRole());
        utilisateur.setEntite(utilisateurDetails.getEntite());

        Utilisateur updatedUtilisateur = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(updatedUtilisateur);
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id : " + id));

        utilisateurRepository.delete(utilisateur);
        return ResponseEntity.noContent().build();
    }
}