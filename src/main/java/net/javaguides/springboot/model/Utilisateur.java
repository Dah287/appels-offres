package net.javaguides.springboot.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Utilisateur")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // Sera stocké sous forme de hash BCrypt

    @Enumerated(EnumType.STRING) // Stocke le nom de l'enum (ex: "ROLE_ADMIN") en BD
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String entite;
    @Column(nullable = false)
    private String nom;
}
