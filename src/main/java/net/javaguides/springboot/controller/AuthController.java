package net.javaguides.springboot.controller;

import net.javaguides.springboot.Service.UtilisateurService;
import net.javaguides.springboot.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Utilisateur utilisateur) {
        try {
            utilisateurService.register(utilisateur.getUsername(), utilisateur.getPassword());
            return ResponseEntity.ok("Utilisateur enregistré avec succès !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Utilisateur utilisateur) {
        boolean isAuthenticated = utilisateurService.login(utilisateur.getUsername(), utilisateur.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("ok");
        } else {
            return ResponseEntity.status(401).body("no");
        }
    }
}
