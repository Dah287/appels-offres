package net.javaguides.springboot.controller;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.BandeCommande;
import net.javaguides.springboot.repository.BandeCommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/bande-commande")
public class BandeCommandeController {

    @Autowired
    private BandeCommandeRepository bandeCommandeRepository;

    // Créer une nouvelle bande de commande
    @PostMapping
    public BandeCommande createBandeCommande(@RequestBody BandeCommande bandeCommande) {
        return bandeCommandeRepository.save(bandeCommande);
    }

    // Récupérer une bande de commande par ID
    @GetMapping("/{id}")
    public ResponseEntity<BandeCommande> getBandeCommandeById(@PathVariable long id) {
        BandeCommande bandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));
        return ResponseEntity.ok(bandeCommande);
    }

    // Mettre à jour une bande de commande
    @PutMapping("/{id}")
    public ResponseEntity<BandeCommande> updateBandeCommande(
            @PathVariable long id,
            @RequestBody BandeCommande bandeCommandeDetails) {

        BandeCommande updateBandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));

        updateBandeCommande.setEntite(bandeCommandeDetails.getEntite());
        updateBandeCommande.setNbrdevis(bandeCommandeDetails.getNbrdevis());
        updateBandeCommande.setObjet(bandeCommandeDetails.getObjet());
        updateBandeCommande.setTypeMarche(bandeCommandeDetails.getTypeMarche());
        updateBandeCommande.setEstimation(bandeCommandeDetails.getEstimation());
        updateBandeCommande.setTransmisCommission(bandeCommandeDetails.getTransmisCommission());
        updateBandeCommande.setNumeroBC(bandeCommandeDetails.getNumeroBC());
        updateBandeCommande.setDateOuvertureReelle(bandeCommandeDetails.getDateOuvertureReelle());
        updateBandeCommande.setHeureOuverture(bandeCommandeDetails.getHeureOuverture());
        updateBandeCommande.setDateJugement(bandeCommandeDetails.getDateJugement());
        updateBandeCommande.setMontantBC(bandeCommandeDetails.getMontantBC());
        updateBandeCommande.setObservations(bandeCommandeDetails.getObservations());
        updateBandeCommande.setAttributaire(bandeCommandeDetails.getAttributaire());
        updateBandeCommande.setAnne(bandeCommandeDetails.getAnne());

        bandeCommandeRepository.save(updateBandeCommande);
        return ResponseEntity.ok(updateBandeCommande);
    }

    // Mettre à jour une bande de commande
    @PutMapping("/update-excution/{id}")
    public ResponseEntity<BandeCommande> updateBandeCommandeEX(
            @PathVariable long id,
            @RequestBody BandeCommande bandeCommandeDetails) {

        BandeCommande updateBandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));

        updateBandeCommande.setAnne(bandeCommandeDetails.getAnne());
      //  updateBandeCommande.setNumeroBC(bandeCommandeDetails.getNumeroBC());
//        updateBandeCommande.setMontantBC(bandeCommandeDetails.getMontantBC());
        updateBandeCommande.setAttributaire(bandeCommandeDetails.getAttributaire());
//        updateBandeCommande.setDateDevis(bandeCommandeDetails.getDateDevis());
        updateBandeCommande.setDateOrdonn(bandeCommandeDetails.getDateOrdonn());
        updateBandeCommande.setDatePaiement(bandeCommandeDetails.getDatePaiement());
        updateBandeCommande.setNbrdevis(bandeCommandeDetails.getNbrdevis());
        updateBandeCommande.setMontantBC(bandeCommandeDetails.getMontantBC());

        updateBandeCommande.setNumeroBC(bandeCommandeDetails.getNumeroBC());
        updateBandeCommande.setEntite(bandeCommandeDetails.getEntite());
        updateBandeCommande.setObjet(bandeCommandeDetails.getObjet());
        updateBandeCommande.setDateOuvertureReelle(bandeCommandeDetails.getDateOuvertureReelle());
        updateBandeCommande.setHeureOuverture(bandeCommandeDetails.getHeureOuverture());
        updateBandeCommande.setDateJugement(bandeCommandeDetails.getDateJugement());
        updateBandeCommande.setObservations(bandeCommandeDetails.getObservations());
        bandeCommandeRepository.save(updateBandeCommande);
        return ResponseEntity.ok(updateBandeCommande);
    }

    // Supprimer une bande de commande
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBandeCommande(@PathVariable long id) {
        BandeCommande bandeCommande = bandeCommandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BandeCommande not exist with id: " + id));

        bandeCommandeRepository.delete(bandeCommande);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public List<BandeCommande> getBandeCommandes(
            @RequestHeader(value = "X-EXERCICE", required = false) String exercice,
            @RequestParam(required = false) String entite,
            @RequestParam(required = false) String typeMarche,
            @RequestParam(required = false) String fitre) {

        List<BandeCommande> result;

        // =========================
        // FILTRE PAR STATUT
        // =========================
        if ("transmis".equals(fitre)) {

            if (entite != null && typeMarche != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndTypeMarcheAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(entite, typeMarche);
            } else if (entite != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(entite);
            } else if (typeMarche != null) {
                result = bandeCommandeRepository
                        .findByTypeMarcheAndTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull(typeMarche);
            } else {
                result = bandeCommandeRepository
                        .findByTransmisCommissionIsNotNullAndDateOuvertureReelleIsNull();
            }

        } else if ("juge".equals(fitre)) {

            if (entite != null && typeMarche != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndTypeMarcheAndDateJugementIsNotNull(entite, typeMarche);
            } else if (entite != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndDateJugementIsNotNull(entite);
            } else if (typeMarche != null) {
                result = bandeCommandeRepository
                        .findByTypeMarcheAndDateJugementIsNotNull(typeMarche);
            } else {
                result = bandeCommandeRepository
                        .findByDateJugementIsNotNull();
            }

        } else if ("ouv".equals(fitre)) {

            if (entite != null && typeMarche != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(entite, typeMarche);
            } else if (entite != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(entite);
            } else if (typeMarche != null) {
                result = bandeCommandeRepository
                        .findByTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(typeMarche);
            } else {
                result = bandeCommandeRepository
                        .findByDateOuvertureReelleIsNotNullAndDateJugementIsNull();
            }

        } else if ("encours".equals(fitre)) {

            if (entite != null && typeMarche != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndTypeMarcheAndTransmisCommissionIsNullAndDateJugementIsNull(entite, typeMarche);
            } else if (entite != null) {
                result = bandeCommandeRepository
                        .findByEntiteAndTransmisCommissionIsNullAndDateJugementIsNull(entite);
            } else if (typeMarche != null) {
                result = bandeCommandeRepository
                        .findByTypeMarcheAndTransmisCommissionIsNullAndDateJugementIsNull(typeMarche);
            } else {
                result = bandeCommandeRepository
                        .findByTransmisCommissionIsNullAndDateJugementIsNull();
            }

        } else {
            // =========================
            // PAS DE FILTRE STATUT
            // =========================
            if (entite != null && typeMarche != null) {
                result = bandeCommandeRepository.findByEntiteAndTypeMarche(entite, typeMarche);
            } else if (entite != null) {
                result = bandeCommandeRepository.findByEntite(entite);
            } else if (typeMarche != null) {
                result = bandeCommandeRepository.findByTypeMarche(typeMarche);
            } else {
                result = bandeCommandeRepository.findAll();
            }
        }

        // =========================
        // FILTRE PAR EXERCICE (ANNEE)
        // =========================
        if (exercice != null && !exercice.isEmpty()) {
            result = result.stream()
                    .filter(bc -> exercice.equals(bc.getAnne()))
                    .collect(Collectors.toList());
        }

        return result;
    }


    // Dashboard pour les statistiques
    @GetMapping("/dashboard")
    public List<Map<String, Object>> getDashboardData(@RequestParam(required = false) String entite) {
        // Récupération des données
        List<BandeCommande> bandeCommandes = (entite == null || entite.isEmpty())
                ? bandeCommandeRepository.findAll()
                : bandeCommandeRepository.findByEntite(entite);

        // Vérification si la liste est null ou vide
        if (bandeCommandes == null || bandeCommandes.isEmpty()) {
            return Collections.emptyList();
        }

        // Calcul des totaux globaux si aucune entité spécifique
        Map<String, Object> globalRow = new HashMap<>();
        if (entite == null || entite.isEmpty()) {
            globalRow.put("entite", "Total");

            long totalBandeCommandes = bandeCommandes.size();
            long totalTransmisCommission = bandeCommandes.stream()
                    .filter(bc -> bc.getTransmisCommission() != null && bc.getDateOuvertureReelle() == null)
                    .count();
            long totalJuges = bandeCommandes.stream()
                    .filter(bc -> bc.getDateJugement() != null)
                    .count();

            long totalPaiements = bandeCommandes.stream()
                    .filter(bc -> bc.getDatePaiement() != null)
                    .count();

            long totalOrdonnances = bandeCommandes.stream()
                    .filter(bc -> bc.getDateOrdonn() != null)
                    .count();
            long totalLances = bandeCommandes.stream()
                    .filter(bc -> bc.getDateOuvertureReelle() != null)
                    .count();
            long totalEnCours = totalBandeCommandes - (totalTransmisCommission + totalJuges);

            double estimationTotal = bandeCommandes.stream()
                    .mapToDouble(bc -> bc.getEstimation() != null ? bc.getEstimation() : 0.0)
                    .sum();
            double montantTotalBC = bandeCommandes.stream()
                    .mapToDouble(bc -> bc.getMontantBC() != null ? bc.getMontantBC() : 0.0)
                    .sum();

            globalRow.put("totalBandeCommandes", totalBandeCommandes);
            globalRow.put("totalTransmisCommission", totalTransmisCommission);
            globalRow.put("totalJuges", totalJuges);
            globalRow.put("totalEnCours", totalEnCours);
            globalRow.put("totalLances", totalLances);
            globalRow.put("totalPaiements", totalPaiements);
            globalRow.put("totalOrdonnances", totalOrdonnances);

            globalRow.put("estimationTotal", estimationTotal);
            globalRow.put("montantTotalBC", montantTotalBC);
        }

        // Calcul par entité avec gestion des null
        List<Map<String, Object>> result = bandeCommandes.stream()
                .collect(Collectors.groupingBy(
                        bc -> bc.getEntite() != null ? bc.getEntite() : "Non spécifié",
                        Collectors.toList()
                ))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> row = new HashMap<>();
                    row.put("entite", entry.getKey());

                    List<BandeCommande> bcs = entry.getValue();
                    long totalTransmisCommission = bcs.stream()
                            .filter(bc -> bc.getTransmisCommission() != null && bc.getDateOuvertureReelle() == null)
                            .count();
                    long totalJuges = bcs.stream()
                            .filter(bc -> bc.getDateJugement() != null)
                            .count();
                    long totalPaiements = bcs.stream()
                            .filter(bc -> bc.getDatePaiement() != null)
                            .count();
                    long totalOrdonnances = bcs.stream()
                            .filter(bc -> bc.getDateOrdonn() != null)
                            .count();
                    long totalLances = bcs.stream()
                            .filter(bc -> bc.getDateOuvertureReelle() != null)
                            .count();
                    long totalEnCours = bcs.size() - (totalTransmisCommission + totalJuges);

                    double estimationTotal = bcs.stream()
                            .mapToDouble(bc -> bc.getEstimation() != null ? bc.getEstimation() : 0.0)
                            .sum();
                    double montantTotalBC = bcs.stream()
                            .mapToDouble(bc -> bc.getMontantBC() != null ? bc.getMontantBC() : 0.0)
                            .sum();

                    row.put("totalBandeCommandes", bcs.size());
                    row.put("totalTransmisCommission", totalTransmisCommission);
                    row.put("totalJuges", totalJuges);
                    row.put("totalEnCours", totalEnCours);
                    row.put("totalLances", totalLances);
                    row.put("totalPaiements", totalPaiements);
                    row.put("totalOrdonnances", totalOrdonnances);
                    row.put("estimationTotal", estimationTotal);
                    row.put("montantTotalBC", montantTotalBC);

                    return row;
                })
                .collect(Collectors.toList());

        // Ajouter la ligne de total global si aucune entité spécifique
        if (entite == null || entite.isEmpty()) {
            result.add(0, globalRow);
        }

        return result;
    }


    @Autowired
    private BandeCommandeRepository repository;

    @GetMapping("/bc-per-entite-and-annee")
    public Map<String, Object> getDashboardData() {
        List<Object[]> detailRows = repository.getDashboardDetails();
        List<Object[]> globalRows = repository.getGlobalTotalPerYear();

        List<Map<String, Object>> details = new ArrayList<>();
        for (Object[] row : detailRows) {
            Map<String, Object> map = new HashMap<>();
            map.put("anne", row[0]);
            map.put("entite", row[1]);
            map.put("total", row[2]);
            map.put("enCours", row[3]);
            map.put("juges", row[4]);
            map.put("ordonnances", row[5]);
            map.put("paiements", row[6]);
            details.add(map);
        }

        List<Map<String, Object>> globals = new ArrayList<>();
        for (Object[] row : globalRows) {
            Map<String, Object> map = new HashMap<>();
            map.put("anne", row[0]);
            map.put("total", row[1]);
            globals.add(map);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("details", details);
        response.put("totalsByYear", globals);

        return response;
    }
}