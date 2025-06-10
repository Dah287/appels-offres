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
    public  AppelOffre createappelOffre(@RequestBody AppelOffre appelOffre)
    {
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
        updateappelOffre.setEntite(appelOffreDetails.getEntite());
        updateappelOffre.setObjet(appelOffreDetails.getObjet());
        updateappelOffre.setTypeMarche(appelOffreDetails.getTypeMarche());
        updateappelOffre.setEstimation(appelOffreDetails.getEstimation());
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
            @RequestParam(required = false) String visa) {

        if ("ouv".equals(fitre)) {
            // Si filtre = "ouv", récupère les lignes où dateOuvertureReelle est non nulle et dateJugement est nulle
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDateOuvertureReelleIsNotNullAndDateJugementIsNull(typeMarche);
            } else {
                return appelOffreRepository.findByDateOuvertureReelleIsNotNullAndDateJugementIsNull(); // Filtrer par dateOuvertureReelle non nulle et dateJugement nulle
            }
        }

        else if ("ce".equals(fitre)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutNull(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutNull(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutNull(typeMarche);
            } else {
                return appelOffreRepository.findByDatetransmisCeIsNotNullAndDateOuvertureReelleIsNullAndStatutNull();
            }
        }
        else if ("jug".equals(fitre)) {
            // Si fitre = "ouv", récupère les lignes où dateOuvertureReelle est non nulle
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDateJugementIsNotNull(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDateJugementIsNotNull(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDateJugementIsNotNull(typeMarche);
            } else {
                return appelOffreRepository.findByDateJugementIsNotNull(); // Filtrer par dateOuvertureReelle non nulle
            }

        }else if ("pre".equals(fitre)) {
            // Si filtre = "pre", récupère les lignes où datetransmisCe est nulle
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndDatetransmisCeIsNull(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndDatetransmisCeIsNull(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndDatetransmisCeIsNull(typeMarche);
            } else {
                return appelOffreRepository.findByDatetransmisCeIsNull(); // Filtrer par datetransmisCe nulle
            }
        } else if ("vise".equals(visa)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndMarcheViseIsNotNull(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndMarcheViseIsNotNull(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndMarcheViseIsNotNull(typeMarche);
            } else {
                return appelOffreRepository.findByMarcheViseIsNotNull(); // Filtrer par datetransmisCe nulle
            }

        } else if ("nonvise".equals(visa)) {
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarcheAndMarcheViseIsNull(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntiteAndMarcheViseIsNull(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarcheAndMarcheViseIsNull(typeMarche);
            } else {
                return appelOffreRepository.findByMarcheViseIsNull(); // Filtrer par datetransmisCe nulle
            }
        } else {
            // Si fitre est nul ou non reconnu, appliquer les autres filtres comme avant
            if (entite != null && typeMarche != null) {
                return appelOffreRepository.findByEntiteAndTypeMarche(entite, typeMarche);
            } else if (entite != null) {
                return appelOffreRepository.findByEntite(entite);
            } else if (typeMarche != null) {
                return appelOffreRepository.findByTypeMarche(typeMarche);
            } else {
                return appelOffreRepository.findAll(); // Retourne toutes les offres si aucun filtre n'est appliqué
            }
        }

//        // Appliquer le filtre visa si présent
//        if ("vise".equals(visa)) {
//            return appelOffreRepository.findByMarcheViseIsNotNull();
//        } else if ("nonvise".equals(visa)) {
//            return appelOffreRepository.findByMarcheViseIsNull();
//        }


    }


    // dashbord
    @GetMapping("/dashboard")
    public List<Map<String, Object>> getDashboardData() {
        return appelOffreRepository.findAll().stream()
                .collect(Collectors.groupingBy(AppelOffre::getEntite)) // Regroupe par entité
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> row = new HashMap<>();
                    row.put("entite", entry.getKey());

                    // Comptage des appels d'offres ALancer où getMoisPublicationPrevisionnelle() n'est pas null
                    long appelOffresALancer = entry.getValue().stream()
                            .filter(a -> a.getMoisPublicationPrevisionnelle() != null &&
                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
                            .count();

                    // Comptage des appels d'offres lancés
                    long appelOffresLance = entry.getValue().stream()
                            .filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null &&
                                    (a.getStatut() == null ))
                            .count();

                    // Comptage des appels d'offres transmis à la commission
                    long appelOffresTransmisCe = entry.getValue().stream()
                            .filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null &&
                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
                            .count();

                    // Comptage des appels d'offres jugés
                    long appelOffresJuge = entry.getValue().stream()
                            .filter(a -> a.getDateJugement() != null &&
                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
                            .count();

                    // Pour appelOffresEnCoursExamen, ajouter la logique nécessaire pour ce cas
                    // Par exemple, si vous voulez filtrer les appels d'offres où aucune des dates n'est définie :
                    long appelOffresEnCoursExamen = entry.getValue().stream()
                            .filter(a -> a.getDateOuvertureReelle() == null && a.getDatetransmisCe() == null && a.getDateJugement() == null &&
                                    (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
                            .count();

                    // Ajoute les résultats dans la map
                    row.put("appelOffresALancer", appelOffresALancer);
                    row.put("appelOffresLance", appelOffresLance);
                    row.put("appelOffresTransmisCe", appelOffresTransmisCe);
                    row.put("appelOffresJuge", appelOffresJuge);
                    row.put("appelOffresEnCoursExamen", appelOffresEnCoursExamen);

                    return row;
                })
                .collect(Collectors.toList());
    }


    @GetMapping("/dashboards")
    public List<Map<String, Object>> getDashboardData(@RequestParam(required = false) String entite) {
        List<AppelOffre> appelOffres;

        if (entite == null || entite.isEmpty()) {
            appelOffres = appelOffreRepository.findAll().stream()
                    .filter(a ->
                            (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
                    .collect(Collectors.toList());
        } else {
            appelOffres = appelOffreRepository.findAll().stream()
                    .filter(a -> a.getEntite().equals(entite) && (a.getStatut() == null || !a.getStatut().equals("Definitivement")))
                    .collect(Collectors.toList());
        }

        // Calcul du total global si aucune entité spécifique
        Map<String, Object> globalRow = new HashMap<>();
        if (entite == null || entite.isEmpty()) {
            globalRow.put("entite", "Total");

            long totalAppelOffres = appelOffres.size();
            long totalAppelOffresLance = appelOffres.stream().filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null).count();
            long totalAppelOffresTransmisCe = appelOffres.stream().filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null).count();
            long totalAppelOffresJuge = appelOffres.stream().filter(a -> a.getDateJugement() != null).count();
            long totalAppelOffresPme = appelOffres.stream().filter(a -> a.getPme() != null).count();
            long totalAppelOffresVisa = appelOffres.stream().filter(a -> a.getMarcheVise() != null).count();
            long totalAppelOffresOds = appelOffres.stream().filter(a -> a.getOds() != null).count();
            long totalAppelOffresEnCoursExamen = appelOffres.size() - (totalAppelOffresLance + totalAppelOffresTransmisCe + totalAppelOffresJuge);

            // Calcul des estimations globales
            double totalsEstimationTotalAppelOffres = appelOffres.stream().mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
            double totalsEstimationTotalLance = appelOffres.stream().filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                    .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
            double totalsEstimationTotalTransmisCe = appelOffres.stream().filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                    .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
            double totalsEstimationTotalJuge = appelOffres.stream().filter(a -> a.getDateJugement() != null)
                    .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
            double totalsEstimationTotalPme = appelOffres.stream().filter(a -> a.getPme() != null)
                    .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
            double totalsEstimationTotalVisa = appelOffres.stream().filter(a -> a.getMarcheVise() != null)
                    .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
            double totalsEstimationTotalOds = appelOffres.stream().filter(a -> a.getOds() != null)
                    .mapToDouble(a -> a.getMontantTTC() != null ? a.getMontantTTC() : 0.0).sum();
            globalRow.put("appelOffresTotal", totalAppelOffres);
            globalRow.put("appelOffresLance", totalAppelOffresLance);
            globalRow.put("appelOffresTransmisCe", totalAppelOffresTransmisCe);
            globalRow.put("appelOffresJuge", totalAppelOffresJuge);
            globalRow.put("appelOffresPme", totalAppelOffresPme);
            globalRow.put("appelOffresVisa", totalAppelOffresVisa);
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

                    long appelOffresLance = entry.getValue().stream().filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null).count();
                    long appelOffresTransmisCe = entry.getValue().stream().filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null).count();
                    long appelOffresJuge = entry.getValue().stream().filter(a -> a.getDateJugement() != null).count();
                    long appelOffresPme = entry.getValue().stream().filter(a -> a.getPme() != null).count();
                    long appelOffresVisa = entry.getValue().stream().filter(a -> a.getMarcheVise()!= null).count();
                    long appelOffresOds = entry.getValue().stream().filter(a -> a.getOds()!= null).count();
                    long appelOffresEnCoursExamen = entry.getValue().size() - (appelOffresLance + appelOffresTransmisCe + appelOffresJuge);

                    // Calcul des estimations par entité
                    double totalsEstimationTotalAppelOffres = entry.getValue().stream().mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
                    double totalsEstimationTotalLance = entry.getValue().stream().filter(a -> a.getDateOuvertureReelle() != null && a.getDateJugement() == null)
                            .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
                    double totalsEstimationTotalTransmisCe = entry.getValue().stream().filter(a -> a.getDatetransmisCe() != null && a.getDateOuvertureReelle() == null)
                            .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
                    double totalsEstimationTotalJuge = entry.getValue().stream().filter(a -> a.getDateJugement() != null)
                            .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
                    double totalsEstimationTotalPme = entry.getValue().stream().filter(a -> a.getPme() != null)
                            .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
                    double totalsEstimationTotalVisa = entry.getValue().stream().filter(a -> a.getMarcheVise() != null)
                            .mapToDouble(a -> a.getEstimation() != null ? a.getEstimation() : 0.0).sum();
                    double totalsEstimationTotalOds = entry.getValue().stream().filter(a -> a.getOds() != null)
                            .mapToDouble(a -> a.getMontantTTC() != null ? a.getMontantTTC() : 0.0).sum();
                    row.put("Total des Appels d'Offres", entry.getValue().size());
                    row.put("Total Lancés", appelOffresLance);
                    row.put("Total Transmis à la Commission", appelOffresTransmisCe);
                    row.put("Total Jugés", appelOffresJuge);
                    row.put("Total Pme", appelOffresPme);
                    row.put("Total Visa", appelOffresVisa);
                    row.put("Total Ods", appelOffresVisa);
                    row.put("appelOffresEnCoursExamen", appelOffresEnCoursExamen);
                    row.put("totalsEstimationTotalAppelOffres", totalsEstimationTotalAppelOffres);
                    row.put("totalsEstimationTotalLance", totalsEstimationTotalLance);
                    row.put("totalsEstimationTotalTransmisCe", totalsEstimationTotalTransmisCe);
                    row.put("totalsEstimationTotalJuge", totalsEstimationTotalJuge);
                    row.put("totalsEstimationTotalPme", totalsEstimationTotalPme);
                    row.put("totalsEstimationTotalVisa", totalsEstimationTotalVisa);
                    row.put("totalsEstimationTotalOds", totalsEstimationTotalVisa);

                    return row;
                })
                .collect(Collectors.toList());

        // Ajouter la ligne de total global si l'entité n'est pas spécifiée
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