package net.javaguides.springboot.controller;


import lombok.AllArgsConstructor;
import lombok.Data;
import net.javaguides.springboot.config.JwtUtil;
import net.javaguides.springboot.model.Role;
import net.javaguides.springboot.model.Utilisateur;
import net.javaguides.springboot.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UtilisateurRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 📝 INSCRIPTION (Register)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utilisateur utilisateur) {
        // 1. Vérifier si l'username existe déjà
        if (userRepository.existsByUsername(utilisateur.getUsername())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Erreur : Ce nom d'utilisateur est déjà pris !"));
        }

        // 2. Encoder le mot de passe (IMPORTANT)
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));

        // 3. Assigner un rôle par défaut si non spécifié
        if (utilisateur.getRole() == null) {
            utilisateur.setRole(Role.ROLE_USER);
        }

        // 4. Sauvegarder l'utilisateur
        Utilisateur savedUser = userRepository.save(utilisateur);
        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }

    // 🔑 CONNEXION (Login)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Utilisateur> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body(new ErrorResponse("Identifiants incorrects"));
        }

        Utilisateur user = optionalUser.get();

        // Vérification du mot de passe haché
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(new ErrorResponse("Identifiants incorrects"));
        }

        // Génération du Token JWT
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    // --- DTOs ---
    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private Utilisateur user;
    }

    @Data
    @AllArgsConstructor
    public static class ErrorResponse {
        private String message;
    }
}