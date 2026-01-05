package net.javaguides.springboot.controller;


import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.AppelOffre;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.Utilisateur;
import net.javaguides.springboot.repository.AppelOffreRepository;
import net.javaguides.springboot.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/appelOffre")
public class AppelOffreController {

    @Autowired
    private AppelOffreRepository  appelOffreRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;


//   @GetMapping
//    public List<AppelOffre> getAllAppelOffres()
//    {
//        return appelOffreRepository.findAll();
//    }

    // create
    @PostMapping
    public AppelOffre createappelOffre(@RequestBody AppelOffre appelOffre) {
        // Si exercice non défini, mettre l'année actuelle
//        if (appelOffre.getExercice() == null || appelOffre.getExercice().isEmpty()) {
//            int currentYear = java.time.Year.now().getValue();
//            appelOffre.setExercice(String.valueOf(currentYear));
//        }


        // Affecter l'année 2026 pour tous les nouveaux AO
        //appelOffre.setExercice("2026");

        return appelOffreRepository.save(appelOffre);
    }


    // build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<AppelOffre> getEmployeeById(@PathVariable  long id){
        AppelOffre appelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("appelOffre not exist with id:" + id));
        return ResponseEntity.ok(appelOffre);
    }

    @PutMapping("{id}")
    public ResponseEntity<AppelOffre> updateEmployee(@PathVariable long id,@RequestBody AppelOffre appelOffreDetails) {
        AppelOffre updateappelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("appelOffre not exist with id: " + id));
        updateappelOffre.setNumero(appelOffreDetails.getNumero());
        updateappelOffre.setExercice(appelOffreDetails.getExercice());
        updateappelOffre.setEntite(appelOffreDetails.getEntite());
        updateappelOffre.setObjet(appelOffreDetails.getObjet());
        updateappelOffre.setTypeMarche(appelOffreDetails.getTypeMarche());
        updateappelOffre.setEstimation(appelOffreDetails.getEstimation());
        updateappelOffre.setNbrseance(appelOffreDetails.getNbrseance());
        updateappelOffre.setCp(appelOffreDetails.getCp());
        updateappelOffre.setCe(appelOffreDetails.getCe());
        updateappelOffre.setPme(appelOffreDetails.getPme());

        //

        //
        updateappelOffre.setStatut(appelOffreDetails.getStatut());
        //
        updateappelOffre.setMoisPublicationPrevisionnelle(appelOffreDetails.getMoisPublicationPrevisionnelle());
        updateappelOffre.setDateOuverturePrevisionnelle(appelOffreDetails.getDateOuverturePrevisionnelle());

        updateappelOffre.setDatetransmisCe(appelOffreDetails.getDatetransmisCe());
        updateappelOffre.setDateobservationMc(appelOffreDetails.getDateobservationMc());
        updateappelOffre.setDateOuvertureReelle(appelOffreDetails.getDateOuvertureReelle());
        updateappelOffre.setDateJugement(appelOffreDetails.getDateJugement());
        updateappelOffre.setObservations(appelOffreDetails.getObservations());
        updateappelOffre.setHeure(appelOffreDetails.getHeure());


        appelOffreRepository.save(updateappelOffre);

        return ResponseEntity.ok(updateappelOffre);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AppelOffre> updateEmployeerecapp(@PathVariable long id,@RequestBody AppelOffre appelOffreDetails) {
        AppelOffre updateappelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("appelOffre not exist with id: " + id));
        updateappelOffre.setAttributaire(appelOffreDetails.getAttributaire());
        updateappelOffre.setMontantTTC(appelOffreDetails.getMontantTTC());
        updateappelOffre.setNbravenant(appelOffreDetails.getNbravenant());
        updateappelOffre.setMarcheVise(appelOffreDetails.getMarcheVise());
        updateappelOffre.setNumeroVisa(appelOffreDetails.getNumeroVisa());
        updateappelOffre.setNbrmarche(appelOffreDetails.getNbrmarche());
        updateappelOffre.setOds(appelOffreDetails.getOds());
        updateappelOffre.setDelai(appelOffreDetails.getDelai());

        appelOffreRepository.save(updateappelOffre);

        return ResponseEntity.ok(updateappelOffre);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteappelOffre(@PathVariable long id){

        AppelOffre appelOffre = appelOffreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AppelOffre not exist with id: " + id));

        appelOffreRepository.delete(appelOffre);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    //gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    // Endpoint pour récupérer les appel d'offres filtrés
    @GetMapping
    public List<AppelOffre> getAppelOffres(
            @RequestParam(required = false) String entite,
            @RequestParam(required = false) String typeMarche,
            @RequestParam(required = false) String fitre,
            @RequestParam(required = false) String visa,
            @RequestHeader(required = false, name = "exercice") String exercice) {

        // Option : gérer exercice null (ici on retourne vide si absent)
        if (exercice == null || exercice.trim().isEmpty()) {
            return Collections.emptyList();
        }

        if ("ouv".equals(fitre)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNullAndStatutIsNullAndExercice(
                        entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDateOuvertureReelleIsNotNullAndDateJugementIsNullAndStatutIsNullAndExercice(
                        entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNullAndStatutIsNullAndExercice(
                        typeMarche, exercice);
            } else {
                return appelOffreRepository.findByDateOuvertureReelleIsNotNullAndDateJugementIsNullAndStatutIsNullAndExercice(exercice);
            }
        } else if ("ce".equals(fitre)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutIsNullAndExercice(
                        entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutIsNullAndExercice(
                        entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutIsNullAndExercice(
                        typeMarche, exercice);
            } else {
                return appelOffreRepository.findByDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutIsNullAndExercice(exercice);
            }
        } else if ("jug".equals(fitre)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDateJugementIsNotNullAndStatutIsNullAndExercice(entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDateJugementIsNotNullAndStatutIsNullAndExercice(entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDateJugementIsNotNullAndStatutIsNullAndExercice(typeMarche, exercice);
            } else {
                return appelOffreRepository.findByDateJugementIsNotNullAndStatutIsNullAndExercice(exercice);
            }
        } else if ("pre".equals(fitre)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDatetransmisCeIsNullAndStatutIsNullAndExercice(entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDatetransmisCeIsNullAndStatutIsNullAndExercice(entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDatetransmisCeIsNullAndStatutIsNullAndExercice(typeMarche, exercice);
            } else {
                return appelOffreRepository.findByDatetransmisCeIsNullAndStatutIsNullAndExercice(exercice);
            }
        } else if ("vise".equals(visa)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndMarcheViseIsNotNullAndStatutIsNullAndExercice(entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndMarcheViseIsNotNullAndStatutIsNullAndExercice(entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndMarcheViseIsNotNullAndStatutIsNullAndExercice(typeMarche, exercice);
            } else {
                return appelOffreRepository.findByMarcheViseIsNotNullAndStatutIsNullAndExercice(exercice);
            }
        } else if ("nonvise".equals(visa)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndMarcheViseIsNullAndStatutIsNullAndExercice(entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndMarcheViseIsNullAndStatutIsNullAndExercice(entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndMarcheViseIsNullAndStatutIsNullAndExercice(typeMarche, exercice);
            } else {
                return appelOffreRepository.findByMarcheViseIsNullAndStatutIsNullAndExercice(exercice);
            }
        } else {
            // Cas par défaut : tous les filtres + statut IS NULL + exercice
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndExercice(entite, typeMarche, exercice);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndExercice(entite, exercice);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndExercice(typeMarche, exercice);
            } else {
                return appelOffreRepository.findByExercice(exercice);
            }
        }
    }

// testsetetetetetet

    private static final Set<String> STATUTS_EXCLUS = Set.of("Definitivement", "Infructueux", "Annulé");

    @GetMapping("/dashboard")
    public List<Map<String, Object>> getDashboardData1(
            @RequestHeader(required = false, name = "exercice") String exercice) {

        // Récupère tous les AppelOffre, filtrés par exercice si fourni
        List<AppelOffre> allAppelOffres;
        if (exercice != null && !exercice.trim().isEmpty()) {
            allAppelOffres = appelOffreRepository.findByExercice(exercice);
        } else {
            // Option : retourner vide ou tout (ici on retourne tout si exercice absent)
            allAppelOffres = appelOffreRepository.findAll();
        }

        return allAppelOffres.stream()
                .collect(Collectors.groupingBy(AppelOffre::getEntite))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> row = new HashMap<>();
                    row.put("entite", entry.getKey());

                    // Filtre réutilisable
                    Predicate<AppelOffre> isNotExclu = a -> a.getStatut() == null || !STATUTS_EXCLUS.contains(a.getStatut());

                    long appelOffresALancer = entry.getValue().stream()
                            .filter(a -> a.getMoisPublicationPrevisionnelle() != null)
                            .filter(isNotExclu)
                            .count();

                    long appelOffresLance = entry.getValue().stream()
                            .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                            .filter(isNotExclu)
                            .count();

                    long appelOffresTransmisCe = entry.getValue().stream()
                            .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                            .filter(isNotExclu)
                            .count();

                    long appelOffresJuge = entry.getValue().stream()
                            .filter(a -> a.getDateJugement() != null)
                            .filter(isNotExclu)
                            .count();

                    long appelOffresEnCoursExamen = entry.getValue().stream()
                            .filter(a -> a.getDateOuvertureReelle() == null
                                    && a.getDatetransmisCe() == null
                                    && a.getDateJugement() == null)
                            .filter(isNotExclu)
                            .count();

                    row.put("appelOffresALancer", appelOffresALancer);
                    row.put("appelOffresLance", appelOffresLance);
                    row.put("appelOffresTransmisCe", appelOffresTransmisCe);
                    row.put("appelOffresJuge", appelOffresJuge);
                    row.put("appelOffresEnCoursExamen", appelOffresEnCoursExamen);

                    return row;
                })
                .collect(Collectors.toList());
    }

    // dashbord
//    @GetMapping("/dashboard")
//    public List<Map<String, Object>> getDashboardData() {
//        return appelOffreRepository.findAll().stream()
//                .collect(Collectors.groupingBy(AppelOffre::getEntite)) // Regroupe par entité
//                .entrySet().stream()
//                .map(entry -> {
//                    Map<String, Object> row = new HashMap<>();
//                    row.put("entite", entry.getKey());
//
//                    // Comptage des appels d'offres ALancer où getMoisPublicationPrevisionnelle() n'est pas null
//                    long appelOffresALancer = entry.getValue().stream()
//                            .filter(a -> a.getMoisPublicationPrevisionnelle() != null &&
//                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
//                            .count();
//
//                    // Comptage des appels d'offres lancés
//                    long appelOffresLance = entry.getValue().stream()
//                            .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null &&
//                                    (a.getStatut() == null ))
//                            .count();
//
//                    // Comptage des appels d'offres transmis à la commission
//                    long appelOffresTransmisCe = entry.getValue().stream()
//                            .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null &&
//                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
//                            .count();
//
//                    // Comptage des appels d'offres jugés
//                    long appelOffresJuge = entry.getValue().stream()
//                            .filter(a -> a.getDateJugement() != null &&
//                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
//                            .count();
//
//                    // Pour appelOffresEnCoursExamen, ajouter la logique nécessaire pour ce cas
//                    // Par exemple, si vous voulez filtrer les appels d'offres où aucune des dates n'est définie :
//                    long appelOffresEnCoursExamen = entry.getValue().stream()
//                            .filter(a -> a.getDateOuvertureReelle() == null && a.getDatetransmisCe() == null && a.getDateJugement() == null &&
//                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
//                            .count();
//                    //test test tes
////                    long appelOffresInfructueuxRelance = entry.getValue().stream()
////                            .filter(a -> a.getStatut().equals("Infructueux"))
////                            .count();
////
////                    long appelOffresAnnuleRelance = entry.getValue().stream()
////                            .filter(a -> a.getStatut().equals("Annulé"))
////                            .count();
////                    long appelOffresAnnuleDef = entry.getValue().stream()
////                            .filter(a -> a.getStatut().equals("Definitivement"))
////                            .count();
//                    // Ajoute les résultats dans la map
//                    row.put("appelOffresALancer", appelOffresALancer);
//                    row.put("appelOffresLance", appelOffresLance);
//                    row.put("appelOffresTransmisCe", appelOffresTransmisCe);
//                    row.put("appelOffresJuge", appelOffresJuge);
//                    row.put("appelOffresEnCoursExamen", appelOffresEnCoursExamen);
////                    row.put("appelOffresInfructueuxRelance", appelOffresInfructueuxRelance);
////                    row.put("appelOffresAnnuleRelance", appelOffresAnnuleRelance);
////                    row.put("appelOffresAnnuleDef", appelOffresAnnuleDef);
//
//                    return row;
//                })
//                .collect(Collectors.toList());
//    }


@GetMapping("/dashboards")
public List<Map<String, Object>> getDashboardData(
        @RequestParam(required = false) String entite,
        @RequestHeader(required = false, name = "exercice") String exercice) {

    // Récupérer les AppelOffre filtrés par exercice
    List<AppelOffre> allAppelOffres;
    if (exercice != null && !exercice.trim().isEmpty()) {
        allAppelOffres = appelOffreRepository.findByExercice(exercice);
    } else {
        allAppelOffres = appelOffreRepository.findAll();
    }

    // Appliquer le filtre métier sur statut (exclure certains statuts)
    List<AppelOffre> filteredAppelOffres = allAppelOffres.stream()
            .filter(a -> a.getStatut() == null ||
                    (!"Definitivement".equals(a.getStatut()) &&
                            !"Infructueux".equals(a.getStatut()) &&
                            !"Annulé".equals(a.getStatut())))
            .collect(Collectors.toList());

    // Filtrer par entité si fournie
    List<AppelOffre> appelOffres;
    if (entite != null && !entite.isEmpty()) {
        appelOffres = filteredAppelOffres.stream()
                .filter(a -> entite.equals(a.getEntite()))
                .collect(Collectors.toList());
    } else {
        appelOffres = filteredAppelOffres;
    }

    // --- Reste du code inchangé (calculs globaux, regroupement, etc.) ---
    Map<String, Object> globalRow = new HashMap<>();
    if (entite == null || entite.isEmpty()) {
        globalRow.put("entite", "Total");

        long totalAppelOffres = appelOffres.size();
        long totalAppelOffresLance = appelOffres.stream()
                .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                .count();

        double totalNbrSeance = appelOffres.stream()
                .mapToDouble(a -> a.getNbrseance() != null ? a.getNbrseance() : 0.0)
                .sum();
        double totalNbravenant = appelOffres.stream()
                .mapToDouble(a -> a.getNbravenant() != null ? a.getNbravenant() : 0.0)
                .sum();
        long totalAppelOffresTransmisCe = appelOffres.stream()
                .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                .count();
        long totalAppelOffresJuge = appelOffres.stream()
                .filter(a -> a.getDateJugement() != null)
                .count();
        long totalAppelOffresPme = appelOffres.stream()
                .filter(a -> a.getPme() != null)
                .count();
        long totalAppelOffresVisa = appelOffres.stream()
                .filter(a -> a.getMarcheVise() != null)
                .count();
        long totalAppelOffresOds = appelOffres.stream()
                .filter(a -> a.getOds() != null)
                .count();
        long totalAppelOffresEnCoursExamen = totalAppelOffres - (totalAppelOffresLance + totalAppelOffresTransmisCe + totalAppelOffresJuge);

        double totalsEstimationTotalAppelOffres = appelOffres.stream()
                .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                .sum();
        double totalsEstimationTotalLance = appelOffres.stream()
                .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                .sum();
        double totalsEstimationTotalTransmisCe = appelOffres.stream()
                .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                .sum();
        double totalsEstimationTotalJuge = appelOffres.stream()
                .filter(a -> a.getDateJugement() != null)
                .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                .sum();
        double totalsEstimationTotalPme = appelOffres.stream()
                .filter(a -> a.getPme() != null)
                .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                .sum();
        double totalsEstimationTotalVisa = appelOffres.stream()
                .filter(a -> a.getMarcheVise() != null)
                .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                .sum();
        double totalsEstimationTotalOds = appelOffres.stream()
                .filter(a -> a.getOds() != null)
                .mapToDouble(a -> a.getMontantTTC() != null ? a.getMontantTTC() : 0.0)
                .sum();

        globalRow.put("appelOffresTotal", totalAppelOffres);
        globalRow.put("appelOffresLance", totalAppelOffresLance);
        globalRow.put("appelOffresTransmisCe", totalAppelOffresTransmisCe);
        globalRow.put("appelOffresJuge", totalAppelOffresJuge);
        globalRow.put("appelOffresPme", totalAppelOffresPme);
        globalRow.put("appelOffresVisa", totalAppelOffresVisa);
        globalRow.put("totalNbrSeance", totalNbrSeance);
        globalRow.put("totalNbravenant", totalNbravenant);
        globalRow.put("appelOffresOds", totalAppelOffresOds);
        globalRow.put("appelOffresEnCoursExamen", totalAppelOffresEnCoursExamen);
        globalRow.put("totalsEstimationTotalAppelOffres", totalsEstimationTotalAppelOffres);
        globalRow.put("totalsEstimationTotalLance", totalsEstimationTotalLance);
        globalRow.put("totalsEstimationTotalTransmisCe", totalsEstimationTotalTransmisCe);
        globalRow.put("totalsEstimationTotalJuge", totalsEstimationTotalJuge);
        globalRow.put("totalsEstimationTotalPme", totalsEstimationTotalPme);
        globalRow.put("totalsEstimationTotalVisa", totalsEstimationTotalVisa);
        globalRow.put("totalsEstimationTotalOds", totalsEstimationTotalOds);
    }

    List<Map<String, Object>> result = appelOffres.stream()
            .collect(Collectors.groupingBy(AppelOffre::getEntite))
            .entrySet().stream()
            .map(entry -> {
                Map<String, Object> row = new HashMap<>();
                row.put("entite", entry.getKey());

                List<AppelOffre> values = entry.getValue();
                long appelOffresLance = values.stream()
                        .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                        .count();
                long appelOffresTransmisCe = values.stream()
                        .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                        .count();
                long appelOffresJuge = values.stream()
                        .filter(a -> a.getDateJugement() != null)
                        .count();
                long appelOffresPme = values.stream()
                        .filter(a -> a.getPme() != null)
                        .count();
                long appelOffresVisa = values.stream()
                        .filter(a -> a.getMarcheVise() != null)
                        .count();
                long appelOffresOds = values.stream()
                        .filter(a -> a.getOds() != null)
                        .count();
                long appelOffresEnCoursExamen = values.size() - (appelOffresLance + appelOffresTransmisCe + appelOffresJuge);

                double totalNbrSeance = values.stream()
                        .mapToDouble(a -> a.getNbrseance() != null ? a.getNbrseance() : 0.0)
                        .sum();
                double totalNbravenant = values.stream()
                        .mapToDouble(a -> a.getNbravenant() != null ? a.getNbravenant() : 0.0)
                        .sum();

                double totalsEstimationTotalAppelOffres = values.stream()
                        .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                        .sum();
                double totalsEstimationTotalLance = values.stream()
                        .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                        .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                        .sum();
                double totalsEstimationTotalTransmisCe = values.stream()
                        .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                        .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                        .sum();
                double totalsEstimationTotalJuge = values.stream()
                        .filter(a -> a.getDateJugement() != null)
                        .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                        .sum();
                double totalsEstimationTotalPme = values.stream()
                        .filter(a -> a.getPme() != null)
                        .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                        .sum();
                double totalsEstimationTotalVisa = values.stream()
                        .filter(a -> a.getMarcheVise() != null)
                        .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0)
                        .sum();
                double totalsEstimationTotalOds = values.stream()
                        .filter(a -> a.getOds() != null)
                        .mapToDouble(a -> a.getMontantTTC() != null ? a.getMontantTTC() : 0.0)
                        .sum();

                row.put("Total des Appels d'Offres", values.size());
                row.put("Total Lancés", appelOffresLance);
                row.put("Total Transmis à la Commission", appelOffresTransmisCe);
                row.put("Total Jugés", appelOffresJuge);
                row.put("Total Pme", appelOffresPme);
                row.put("Total Visa", appelOffresVisa);
                row.put("Total Ods", appelOffresOds);
                row.put("appelOffresEnCoursExamen", appelOffresEnCoursExamen);
                row.put("totalsEstimationTotalAppelOffres", totalsEstimationTotalAppelOffres);
                row.put("totalsEstimationTotalLance", totalsEstimationTotalLance);
                row.put("totalsEstimationTotalTransmisCe", totalsEstimationTotalTransmisCe);
                row.put("totalsEstimationTotalJuge", totalsEstimationTotalJuge);
                row.put("totalsEstimationTotalPme", totalsEstimationTotalPme);
                row.put("totalsEstimationTotalVisa", totalsEstimationTotalVisa);
                row.put("totalsEstimationTotalOds", totalsEstimationTotalOds);
                row.put("totalNbrSeance", totalNbrSeance);
                row.put("totalNbravenant", totalNbravenant);

                return row;
            })
            .collect(Collectors.toList());

    if (entite == null || entite.isEmpty()) {
        result.add(0, globalRow);
    }

    return result;
}
    @GetMapping("/dashboards/annules-infructueux")
    public List<Map<String, Object>> getAnnulesInfructueuxParEntite(
            @RequestParam(required = false) String entite,
            @RequestHeader(required = false, name = "exercice") String exercice) {

        // 🔹 Récupérer les AppelOffre selon exercice
        List<AppelOffre> allAppelOffres;
        if (exercice != null && !exercice.trim().isEmpty()) {
            allAppelOffres = appelOffreRepository.findByExercice(exercice);
        } else {
            allAppelOffres = appelOffreRepository.findAll();
        }

        // 🔹 Filtrer selon entité et statut (Annulé / Infructueux)
        List<AppelOffre> appelOffres = allAppelOffres.stream()
                .filter(a -> {
                    // Garder seulement "Annulé" ou "Infructueux"
                    String statut = a.getStatut();
                    return "Annulé".equalsIgnoreCase(statut) || "Infructueux".equalsIgnoreCase(statut);
                })
                .filter(a -> {
                    // Filtrer par entité si fournie
                    if (entite == null || entite.isEmpty()) {
                        return true;
                    }
                    return entite.equals(a.getEntite());
                })
                .collect(Collectors.toList());

        // =====================
        // 🔸 Partie Totaux Globaux
        // =====================
        Map<String, Object> globalRow = new HashMap<>();
        if (entite == null || entite.isEmpty()) {
            globalRow.put("entite", "Total");

            long totalAnnules = appelOffres.stream()
                    .filter(a -> "Annulé".equalsIgnoreCase(a.getStatut()))
                    .count();

            long totalInfructueux = appelOffres.stream()
                    .filter(a -> "Infructueux".equalsIgnoreCase(a.getStatut()))
                    .count();

            globalRow.put("Total Annulés", totalAnnules);
            globalRow.put("Total Infructueux", totalInfructueux);
        }

        // =====================
        // 🔸 Regrouper par entité
        // =====================
        List<Map<String, Object>> result = appelOffres.stream()
                .collect(Collectors.groupingBy(AppelOffre::getEntite))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> row = new HashMap<>();
                    row.put("entite", entry.getKey());

                    long appelOffresAnnules = entry.getValue().stream()
                            .filter(a -> "Annulé".equalsIgnoreCase(a.getStatut()))
                            .count();

                    long appelOffresInfructueux = entry.getValue().stream()
                            .filter(a -> "Infructueux".equalsIgnoreCase(a.getStatut()))
                            .count();

                    row.put("Total Annulés", appelOffresAnnules);
                    row.put("Total Infructueux", appelOffresInfructueux);

                    return row;
                })
                .collect(Collectors.toList());

        // 🔹 Ajouter la ligne globale en haut si pas d’entité spécifique
        if (entite == null || entite.isEmpty()) {
            result.add(0, globalRow);
        }

        return result;
    }


    // login
    @PostMapping("/register")
    public Utilisateur register(@RequestBody Utilisateur utilisateur) {

        return utilisateurRepository.save(utilisateur);
    }
    @PostMapping("/login")
    public String login(@RequestBody Utilisateur utilisateur) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByUsername(utilisateur.getUsername());
        if( utilisateurOpt.isPresent() && utilisateurOpt.get().getPassword().equals(utilisateur.getPassword())){

            if(utilisateurOpt.get().getRole().equals("admin")){
                return "admin";
            }else if(utilisateurOpt.get().getRole().equals("sous admin")){
                return "sous admin";
            } else {
                return utilisateurOpt.get().getEntite();
            }


        }else{
            return "no";
        }

    }


}