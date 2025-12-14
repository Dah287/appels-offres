package net.javaguides.springboot.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AppelOffre")
public class AppelOffre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Informations générales
    private Long numero;
    private String entite; // ENTITE
    private String objet; // Objet
    private String typeMarche; // TYPE MARCHE
    private Double estimation; // Estimation
    private Double cp; // Estimation
    private Double ce; // Estimation
    private String pme; // PME
    private String numeroVisa;
    // Section Prévisionnelle
    private LocalDate moisPublicationPrevisionnelle; // Mois de publication
    private LocalDate dateOuverturePrevisionnelle; // DATE D'OUVERTURE PREVISIONNELLE

    // Section Réalisation
    private LocalDate datetransmisCe; // Transmis CE
    private LocalDate dateobservationMc; // Observation MC
    private LocalDate dateOuvertureReelle; // Date ouverture (réelle)
    private String heure;
    private LocalDate dateJugement; // Date jugement
    private String observations; // OBSERVATIONS
    private String Attributaire;
    private Double MontantTTC;
    private LocalDate marcheVise;
    private LocalDate ods;
    private String delai;
    private String statut;
    private String nbrmarche;
    private Double nbrseance;
    private Double nbravenant;
    private String exercice;
    // Getters et Setters
    // Getter pour cp
    public Double getNbrseance() {
        return nbrseance;
    }

    public void setNbrseance(Double nbrseance) {
        this.nbrseance = nbrseance;
    }
    public Double getNbravenant() {
        return nbravenant;
    }

    public void setNbravenant(Double nbrseance) {
        this.nbravenant = nbrseance;
    }

    public Double getCp() {
        return cp;
    }



    // Getter pour ce
    public Double getCe() {
        return ce;
    }

    // Setter pour cp
    public void setCp(Double cp) {
        this.cp = cp;
    }

    // Getter pour ce
    public String getStatut() {
        return statut;
    }

    // Setter pour cp
    public void setStatut(String cp) {
        this.statut = cp;
    }

    public String getNbrmarche() {
        return nbrmarche;
    }

    // Setter pour cp
    public void setNbrmarche(String cp) {
        this.nbrmarche = cp;
    }

    // Setter pour ce
    public void setCe(Double ce) {
        this.ce = ce;
    }


    public String getHeure() {
        return heure;
    }

    // Setter pour cp
    public void setHeure(String heure) {
        this.heure = heure;
    }

    public String getDelai() {
        return delai;
    }

    // Setter pour cp
    public void setDelai(String heure) {
        this.delai = heure;
    }

    public LocalDate getOds() {
        return ods;
    }

    // Setter pour cp
    public void setOds(LocalDate heure) {
        this.ods = heure;
    }
}
