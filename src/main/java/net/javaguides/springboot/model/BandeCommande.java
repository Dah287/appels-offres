package net.javaguides.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bande_commande")
public class BandeCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entite;
    private String objet;
    private String typeMarche;
    private String attributaire	;
    private Double estimation;
    private LocalDate transmisCommission;
    private String numeroBC;
    private LocalDate dateOuvertureReelle;
    private String  heureOuverture;
    private LocalDate dateJugement;
    private Double montantBC;
    private String observations;
    private String anne;
    private LocalDate dateDevis;
    private LocalDate dateOrdonn;
    private LocalDate datePaiement;
    private String nbrdevis;
}
