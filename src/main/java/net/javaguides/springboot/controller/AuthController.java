package net.javaguides.springboot.controller;



import net.javaguides.springboot.Config.JwtUtil;
import net.javaguides.springboot.Service.UtilisateurService;
import net.javaguides.springboot.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Utilisateur utilisateur) {
        try {
            utilisateurService.register(
                    utilisateur.getUsername(),
                    utilisateur.getPassword(),
                    utilisateur.getRole(),
                    utilisateur.getEntite()
            );
            return ResponseEntity.ok("Utilisateur enregistré avec succès !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utilisateur utilisateur) {
        // Extraire les champs
        String username = utilisateur.getUsername();
        String password = utilisateur.getPassword();

        // Vérifier qu'ils ne sont pas vides
        if (username == null || password == null || username.trim().isEmpty()) {
            return ResponseEntity.status(400).body("Identifiant ou mot de passe manquant");
        }

        // Authentification
        Utilisateur authenticatedUser = utilisateurService.login(username, password);

        if (authenticatedUser != null) {
            // ✅ Générer le token JWT
            String token = jwtUtil.generateToken(
                    authenticatedUser.getUsername(),
                    String.valueOf(authenticatedUser.getRole())
            );

            // ✅ Créer la réponse : token, username, role
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("username", authenticatedUser.getUsername());
            response.put("role", String.valueOf(authenticatedUser.getRole()));

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Identifiant ou mot de passe incorrect");
        }
    }
}