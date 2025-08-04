-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2025 at 11:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ems`
--

-- --------------------------------------------------------

--
-- Table structure for table `appel_offre`
--

CREATE TABLE `appel_offre` (
  `id` bigint(20) NOT NULL,
  `date_jugement` date DEFAULT NULL,
  `date_ouverture_previsionnelle` date DEFAULT NULL,
  `date_ouverture_reelle` date DEFAULT NULL,
  `dateobservation_mc` date DEFAULT NULL,
  `datetransmis_ce` date DEFAULT NULL,
  `entite` varchar(255) DEFAULT NULL,
  `estimation` double DEFAULT NULL,
  `mois_publication_previsionnelle` date DEFAULT NULL,
  `numero` bigint(20) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `pme` varchar(255) DEFAULT NULL,
  `type_marche` varchar(255) DEFAULT NULL,
  `attributaire` varchar(255) DEFAULT NULL,
  `marche_vise` date DEFAULT NULL,
  `montantttc` double DEFAULT NULL,
  `numero_visa` varchar(20) DEFAULT NULL,
  `ce` double DEFAULT NULL,
  `cp` double DEFAULT NULL,
  `heure` varchar(255) DEFAULT NULL,
  `delai` varchar(255) DEFAULT NULL,
  `ods` date DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `nbrmarche` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appel_offre`
--

INSERT INTO `appel_offre` (`id`, `date_jugement`, `date_ouverture_previsionnelle`, `date_ouverture_reelle`, `dateobservation_mc`, `datetransmis_ce`, `entite`, `estimation`, `mois_publication_previsionnelle`, `numero`, `objet`, `observations`, `pme`, `type_marche`, `attributaire`, `marche_vise`, `montantttc`, `numero_visa`, `ce`, `cp`, `heure`, `delai`, `ods`, `statut`, `nbrmarche`) VALUES
(85, '2025-01-29', NULL, '2025-01-16', '2024-12-10', '2024-11-29', 'DGR', 5000000, '2024-12-01', 3, 'Prestation de gardiennage des prises et des ouvrages du réseau d\'irrigation du périmètre des Doukkala', 'WORLD GARDIENNAGE SERVICE', NULL, 'S', 'World Gardiennage Sercice', '2025-02-14', 3664674.43, '01/2025', 3000000, 3000000, '10:30', '12 mois', '2025-03-04', NULL, '03/2025/DK-DGR'),
(86, '2025-02-11', NULL, '2025-01-21', '2024-12-07', '2024-11-27', 'DPF', 500000, '2024-12-01', 1, 'Acquisition de Matériel Informatique', 'GADMAY-CONSO', 'Réservé', 'F', 'GADMAY-CONSO', NULL, 489480, NULL, 2000, 2000, '12:00', '3 Mois', '2025-04-07', NULL, '07/2025/DK-DPF'),
(87, '2025-02-11', NULL, '2025-01-21', '2024-12-07', '2024-11-29', 'DPF', 480000, '2024-12-01', 2, 'Diagnostic de la sécurité du système d’information de l’ORMVAD', 'NEAR SECURE', 'Réservé', 'S', 'Near secure', NULL, 480000, NULL, 1000, 1000, '10:30', '8 Mois', '2025-04-07', NULL, '08/2025/DK-DPF'),
(88, '2025-05-13', NULL, '2025-03-18', '2025-01-24', '2025-01-02', 'DGR', 120000, '2025-01-01', 10, 'Travaux d\'entretien de l\'ascenseur et du monte-charge de la station de pompage haut service des Doukkala', 'KASTRAV', 'Réservé', 'T', 'KASTRAV', NULL, 247708.8, NULL, NULL, NULL, '13:30', '36 mois', '2025-05-13', NULL, '19/2025/DK-DGR	'),
(89, NULL, NULL, NULL, '2025-01-28', '2025-01-02', 'DGR', 2400000, '2025-01-01', NULL, 'Assistance technique pour l’appui aux agriculteurs à l’équipement interne collectif dans la zone d’action de l’ORMVAD', 'Annulé / Définitivement ', NULL, 'S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Definitivement', NULL),
(90, '2025-04-08', NULL, '2025-02-25', '2025-01-13', '2024-12-27', 'DPF', 300000, '2025-01-01', 4, 'Elaboration du schéma directeur informatique', 'IT CONSULTING', 'Réservé', 'S', 'INFORMATION TECHNOLOGY CONSULTING', NULL, 294600, NULL, NULL, NULL, '10:30', '6 mois ', '2025-05-19', NULL, '10/2025/DK-DPF'),
(91, '2025-05-06', NULL, '2025-04-15', '2025-02-14', '2025-02-04', 'DA', 4000000, '2025-02-01', 15, 'Travaux d\'entretien des pistes aménagées et des ouvrages dans le périmètre irrigué des Doukkala', 'SOCIETE GLOBAL D\'INVESTISSEMENT ET TRADING', NULL, 'T', 'SOCIETE GLOBAL D\'INVESTISSEMENT ET TRADING', '2025-06-09', 3678522, '03/25', NULL, NULL, '10:30', '12 mois', '2025-06-01', NULL, '18/2025/DK-DA'),
(92, '2025-04-08', NULL, '2025-03-25', '2025-02-12', '2025-01-24', 'DDA', 4400000, '2025-02-01', 11, 'Plantation du cactus 320 ha (Lotn°1)', 'Lotn°1: STE ADINI', NULL, 'T', 'STE ADINI', NULL, 1106799.84, NULL, NULL, NULL, '10:30', '18 mois', '2025-05-15', NULL, '15/2025/DK-DDA'),
(98, '2025-07-02', NULL, '2025-06-10', NULL, '2025-03-11', 'SMG', 900000, '2025-02-01', 20, 'Travaux d\'entretien des bâtiments administratifs de l\'ORMVAD', 'INTELMED', 'Réservé', 'T', 'INTELMED', NULL, 884964, NULL, NULL, NULL, '10:30', '6 mois ', '2025-08-11', NULL, '25/2025/DK-SMG'),
(100, '2025-04-08', NULL, '2025-03-11', '2025-01-28', '2025-01-23', 'SMG', 650000, '2025-01-01', 5, 'Acquisition de fournitures informatiques et produits d’impression', 'AMINA MULTI SERVICES', 'Réservé', 'F', 'AMINA MULTI SERVICES', NULL, 485040, NULL, NULL, NULL, '10:30', '2 mois ', '2025-05-10', NULL, '11/2025/DK-SMG'),
(101, '2025-04-08', NULL, '2025-03-18', '2025-02-14', '2025-02-04', 'SMG', 400000, '2025-01-01', 7, 'Acquisition de mobilier de bureau pour les services de l\'ORMVAD', 'SETA BUREAU', 'Réservé', 'F', 'SETA BUREAU', NULL, 396840, NULL, NULL, NULL, '12:00', '2 mois ', '2025-05-10', NULL, '13/2025/DK-SMG'),
(103, '2025-05-27', NULL, '2025-04-15', '2025-02-04', '2025-01-23', 'SMG', 600000, '2025-01-01', 17, 'Acquisition, installation et mise en service d’un système de sonorisation pour l’ORMVAD', 'MEDIA TARGET TECHNOLOGY', 'Réservé', 'F', 'MEDIA TARGET TECHNOLOGY', NULL, 478491.2, NULL, NULL, NULL, '12:00', '3 mois', '2025-07-01', NULL, '23/2025/DK-SMG'),
(104, '2025-04-08', NULL, '2025-03-18', '2025-02-14', '2025-02-05', 'SMG', 400000, '2025-02-01', 6, 'Acquisition de fournitures de bureau', 'DAMANA KIT', 'Réservé', 'F', 'DAMANA KIT', NULL, 298500, NULL, NULL, NULL, '10:30', '1 mois ', '2025-05-10', NULL, '12/2025/DK-SMG'),
(107, NULL, NULL, NULL, '2025-03-21', '2025-02-19', 'DGR', 300000, '2025-01-01', NULL, 'Observatoire de suivi de la qualité des eaux et des sols de l\'ORMVAD', 'Annulé / Définitivement', 'Réservé', 'S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Definitivement', NULL),
(108, '2025-04-03', NULL, '2025-04-08', '2025-01-27', '2025-01-15', 'DDA', 450000, '2025-01-01', 8, 'Assistance technique pour le traitement des dossiers de subvention ', 'Capital ingenierie', 'Réservé', 'S', 'CAPITAL INGENIERIE', NULL, 491673.6, NULL, NULL, NULL, '10:30', '18 mois', '2025-05-06', NULL, '14/2025/DK-DDA'),
(109, '2025-03-11', NULL, '2025-03-04', '2025-01-23', '2025-01-15', 'DDA', 1000000, '2025-01-01', 9, 'Prestations d’hébergement et de restauration pour le compte de l’Office Régional de Mise en Valeur Agricole des Doukkala', 'SERCLEAN NEGOCE', 'Réservé', 'S', 'SERCLEAN NEGOCE', NULL, 889224, '', 500, 500, '12:00', 'Résilier', NULL, NULL, NULL),
(110, '2025-04-15', NULL, '2025-03-25', '2025-01-28', '2025-01-10', 'DRH', 600000, '2025-01-01', 13, 'Organisation des sessions de formation au profit du personnel de l\'ORMVAD', 'infructueux / Relancé ', 'Réservé', 'S', 'INFRUCTUEUX', NULL, NULL, NULL, NULL, NULL, '12:00', NULL, NULL, 'Infructueux', NULL),
(112, NULL, NULL, '2025-07-24', '2025-01-13', '2025-01-03', 'DA', 4000000, '2025-01-01', 21, 'Etudes d’amélioration de fonctionnement des canaux principaux de périmètre bas service des Doukkala (Canal Principal Bas Service (CPBS) et Canal Intermédiaire (CI))', '', NULL, 'S', NULL, NULL, NULL, NULL, NULL, NULL, '10:30', '16 mois', NULL, NULL, NULL),
(113, '2025-05-13', NULL, '2025-04-08', '2025-01-13', '2024-12-24', 'DDA', 500000, '2025-01-01', 14, 'Fourniture et pose des équipements d’irrigation au niveau de la station expérimentale de mise en valeur agricole de Zemamra', 'KETTO CONCEPTION ET REALISATION', 'Réservé', 'F', 'KETO CONCEPTION ET REALISATION', NULL, 384704.38, NULL, NULL, NULL, '12:00', ' 3 mois', '2025-06-02', NULL, '22/2025/DK-DDA	'),
(114, NULL, NULL, NULL, '2025-07-03', '2025-02-25', 'DGR', 250000, '2025-02-01', NULL, 'Expertise, réparation et révision d\'une pompe de la station de pompage haut service', '', 'Réservé', 'S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(116, '2025-05-20', NULL, '2025-04-08', '2025-02-14', '2025-02-05', 'DDA', 560000, '2025-02-01', 12, 'AT Plantation du cactus 320 h ( Lotn°1)', 'Lotn°1 : CAPITAL INGENIERIE', 'Réservé', 'S', 'CAPITAL INGENIERIE ', NULL, 111000, NULL, NULL, NULL, '10:30', '18 mois', '2025-05-20', NULL, '20/2025/DK-DDA	'),
(119, NULL, NULL, NULL, '2025-06-25', '2025-03-03', 'SAICG', 200000, '2025-02-01', NULL, 'Actualisation et mise à jour de l’étude relative au système de management des risques de l’ORMVAD.', '', 'Réservé', 'S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(131, '2025-04-15', NULL, '2025-04-10', NULL, '2025-03-10', 'DGR', 2884668, '2025-02-01', 16, 'Prestations de gardiennage des bâtiments techniques et leurs annexes de l’office Régional de Mise en Valeur Agricole des Doukkala', 'ER-SAR', NULL, 'S', 'ER-SAR\n', '2025-05-05', 2729012.87, '02/25', NULL, NULL, '10:30', '12 mois', '2025-05-05', NULL, '17/2025/DK-DGR'),
(136, '2025-06-26', NULL, '2025-06-03', NULL, '2025-04-21', 'DRH', 329400, '2025-05-27', 18, 'Organisation des sessions de formation au profit du personnel de l\'ORMVAD', 'TMIS', '', 'S', 'TMIS', NULL, 396000, NULL, NULL, NULL, '10:30', '6 mois ', '2025-08-04', NULL, '24/2025/DK-DRH'),
(137, '2025-05-29', NULL, '2025-05-27', NULL, '2025-04-17', 'DDA', 536250, '2025-05-27', 19, 'Prestations d’hébergement et de restauration pour le compte de l’Office Régional de Mise en Valeur Agricole des Doukkala', 'Annulé / Relancé ', '', 'S', NULL, NULL, NULL, NULL, NULL, NULL, '10:30', NULL, NULL, 'Annulé', NULL),
(139, '2025-04-08', NULL, '2025-03-25', '2025-02-12', '2025-01-24', 'DDA', 4400000, '2025-02-01', 11, 'Plantation du cactus 320 ha (Lotn°2)', 'Lotn°2 : FRAUMANE', NULL, 'T', 'FRAUMANE', NULL, 1866768, NULL, NULL, NULL, '10:30', '18 mois', '2025-05-15', NULL, '16/2025/DK-DDA'),
(140, '2025-05-20', NULL, '2025-04-08', '2025-02-14', '2025-02-05', 'DDA', 560000, '2025-02-01', 12, 'AT Plantation du cactus 320 h (Lotn°2)', 'Lotn°2 : CAPITAL INGENIERIE', 'Réservé', 'S', 'CAPITAL INGENIERIE', NULL, 192240, NULL, NULL, NULL, '10:30', '18 mois', '2025-05-20', NULL, '21/2025/DK-DDA'),
(143, '2025-07-02', NULL, '2025-06-24', NULL, NULL, 'DDA', 556050, '2025-06-24', 22, 'Prestations d’hébergement et de restauration pour le compte de l’Office Régional de Mise en Valeur Agricole des Doukkala', 'MAYACINE-MULTISERV', '', 'S', 'MAYACINE-MULTISERV', NULL, 556928, NULL, NULL, NULL, '10:30', '8 mois', '2025-07-23', NULL, '26/2025/DK-DDA'),
(144, NULL, NULL, NULL, NULL, '2025-07-09', 'DDA', 292090.8, '2025-08-14', NULL, 'Prestations pour la réalisation des essais agricoles au niveau de la Station Expérimentale de Mise en Valeur Agricole de Zemamra', '', 'Réservé', 'S', NULL, NULL, NULL, NULL, NULL, NULL, '10:30', NULL, NULL, NULL, NULL),
(145, NULL, NULL, NULL, NULL, '2025-07-21', 'DDA', NULL, '2025-08-25', NULL, 'Prestations pour la réalisation des irrigations d\'appoint des plantations du cactus ', '', '', 'S', NULL, NULL, NULL, NULL, NULL, 2800000, '', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bande_commande`
--

CREATE TABLE `bande_commande` (
  `id` bigint(20) NOT NULL,
  `date_jugement` date DEFAULT NULL,
  `date_ouverture_reelle` date DEFAULT NULL,
  `entite` varchar(255) DEFAULT NULL,
  `estimation` double DEFAULT NULL,
  `heure_ouverture` varchar(225) DEFAULT NULL,
  `montantbc` double DEFAULT NULL,
  `numerobc` varchar(255) DEFAULT NULL,
  `objet` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `transmis_commission` date DEFAULT NULL,
  `type_marche` varchar(255) DEFAULT NULL,
  `attributaire` varchar(255) DEFAULT NULL,
  `anne` varchar(255) DEFAULT NULL,
  `date_devis` date DEFAULT NULL,
  `date_ordonn` date DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `nbrdevis` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bande_commande`
--

INSERT INTO `bande_commande` (`id`, `date_jugement`, `date_ouverture_reelle`, `entite`, `estimation`, `heure_ouverture`, `montantbc`, `numerobc`, `objet`, `observations`, `transmis_commission`, `type_marche`, `attributaire`, `anne`, `date_devis`, `date_ordonn`, `date_paiement`, `nbrdevis`) VALUES
(36, '2025-04-15', '2025-04-03', 'DDA', NULL, '10:00', 300000, '03/2025/DDA', 'Organisation des visites techniques au Salon International d\'Agriculture de Meknès 2025 ', '', NULL, '', '', '2025', NULL, NULL, NULL, '12'),
(37, '2025-03-28', '2025-03-20', 'DPF', NULL, '15:00', 86000, '02/2025/DPF', 'Achat de l\'atelier de génie Logiciel (WinDev+Webdev+Windev mobile) ', 'Infructueux', NULL, '', 'Infructueux', '2025', NULL, NULL, NULL, '10'),
(38, '2025-03-17', '2025-03-13', 'DPF', NULL, '16:00', 50400, '01/2025/DPF', 'Assistance de l\'ORMVAD dans le domaine comptable au titre de l\'exercice 2025', 'Paiement fin d\'année', NULL, '', 'ICOMPTE CONSEILS', '2025', NULL, NULL, NULL, '8'),
(39, '2024-12-29', '2024-12-30', 'SMG', NULL, '10:00', 57984, '30/2024/SMG/ORMVAD', 'ACHAT DE MATÉRIEL ÉLECTRIQUE, D\'ÉLECTROPOMPES ET DE MOTOPOMPES DESTINÉS AU CLUB DE L\'ORMVAD', '', NULL, '', 'AMROUZ MULTI TRAV', '2024', NULL, NULL, NULL, '18'),
(40, '2024-12-29', '2024-12-23', 'SMG', NULL, '10:00', 37192.8, '29/2024/SMG/ORMVAD', 'ACHAT D\'ARTICLES DE DROGUERIE, DE QUINCAILLERIE, D\'ELECTRICITE, DE MENUISERIE ET DE PLOMBERIE SANITAIRE', '', NULL, '', 'COMPTE DE DEPOTS ET DE GESTION RABAT', '2024', NULL, NULL, NULL, '19'),
(41, '2024-12-29', '2024-12-23', 'SMG', NULL, '10:00', 39960, '28/2024/SMG/ORMVAD', 'ACQUISITION DE MATERIELS ET ARTICLES DE SPORT POUR L\'EQUIPEMENT DU CLUB DE L\'ORMVAD', '', NULL, '', 'STE GENERALE MAROCAINE DE SPORT', '2024', NULL, NULL, NULL, '12'),
(42, '2024-12-29', '2024-12-23', 'SMG', NULL, '10:00', 174480, '25/2024/SMG/ORMVAD', 'FOURNITURE DES ÉQUIPEMENTS DE CUISINE AU NIVEAU DU CLUB DE L\'ORMVAD', '', NULL, '', 'BRICOLA.SLOG SERVICES', '2024', NULL, NULL, NULL, '14'),
(43, '2024-12-29', '2024-12-23', 'SMG', NULL, '10:00', 122400, '27/2024/SMG/ORMVAD', 'ACHAT DE MATÉRIEL AUDIOVISUEL POUR L\'ÉQUIPEMENT DU CLUB DE L\'ORMVAD', '', NULL, '', 'MELGHAZ SERVICES', '2024', NULL, NULL, NULL, '22'),
(44, '2024-12-29', '2024-12-23', 'SMG', NULL, '10:00', 143400, '26/2024/SMG/ORMVAD', 'ACHAT DE MOBILIER POUR L\'EQUIPEMENT DU CLUB DE L\'ORMVAD', '', NULL, '', 'SUPERINNOV', '2024', NULL, NULL, NULL, '18'),
(45, '2024-12-25', '2024-12-19', 'DGR', NULL, '12:00', 252000, '23/2024/DGR/ORMVAD', 'Voyage technique et de visite des projets de reconversion à l\'irrigation localisée en Espagne', '', NULL, '', 'MOUNA MEDIA', '2024', NULL, NULL, NULL, '10'),
(46, '2024-12-24', '2024-12-18', 'SMG', NULL, '10:00', 23892, '24/2024/SMG/ORMVAD', 'DIAGNOSTIC, ENTRETIEN, REPARATION ET CHANGEMENT DES PIECES DEFECTUEUSES DES MACHINES PHOTOCOPIEUSES POUR LES DIFFERENTES ENTITES DE L\'ORMVAD', '', NULL, '', 'MAITRE DU GOUT', '2024', NULL, NULL, NULL, '4'),
(47, '2024-12-02', '2024-11-26', 'DGR', NULL, '10:00', 66000, '22/2024/DGR/ORMVAD', 'Audit de conformité d\'environnementale et sociale du projet PAPNEE2', '', NULL, '', 'BRICOLA.SLOG SERVICES', '2024', NULL, NULL, NULL, '9'),
(48, '2024-11-24', '2024-11-18', 'SMG', NULL, '16:30', NULL, '21/2024/SMG/ORMVAD', 'Acquisition, installation et mise en service d\'un système de sonorisation pour le compte de l\'ORMVA des Doukkala', 'Infructueux', NULL, '', '', '2024', NULL, NULL, NULL, '4'),
(49, '2024-11-26', '2024-11-20', 'DDA', NULL, '12:00', 35268, '20/2024/DDA/ORMVAD', 'Achats des produits chimiques de laboratoire pour le compte de l\'ORMVAD', '', NULL, '', 'HK LABO', '2024', NULL, NULL, NULL, '6'),
(51, '2024-10-22', '2024-10-16', 'DGR', NULL, '10:00', NULL, '17/2024/DGR/ORMVAD', 'Audit de conformité d\'environnementale et sociale du projet PAPNEE2', 'Annulé', NULL, '', '', '2024', NULL, NULL, NULL, '16'),
(52, '2024-09-19', '2024-09-13', 'DDA', NULL, '15:00', 124200, '16/12024/DDA/ORMVAD', 'PRESTATION DE TRANSPORT DES AGRICULTEURS ET TECHNICIENS DE L\'ORMVAD AU SALON DU CHEVAL 2024 A EL JADIDA', '', NULL, '', 'VIVANCE SERVICE', '2024', NULL, NULL, '2024-10-16', '11'),
(53, '2024-09-12', '2024-09-06', 'DRH', NULL, '10:00', 42320, '15/2024/DRH', 'Prestations de restauration des membres des Jury, des surveillants et membres d\'encadrement des examens organisés par l\'Office Régional de Mise en Valeur Agricole des Doukkala au titre de l\'exercice 2024', '', NULL, '', 'SCOUTS EVENTS', '2024', NULL, NULL, '2024-12-25', '5'),
(54, '2024-08-29', '2024-08-23', 'DRH', NULL, '12:00', 1146, '14/2024/DRH', 'Conception et Impression des documents et supports de communication.', '', NULL, '', 'PACK SERVICES COM', '2024', NULL, NULL, '2024-12-25', '37'),
(55, '2024-07-24', '2024-07-18', 'DDA', NULL, '16:00', 67980, '12/2024/DDA', 'Acquisition du matériel de mesure, de laboratoire et d\'analyse du sol et de l\'eau pour le compte de l\'ORMVAD', '', NULL, '', 'ST LAB', '2024', NULL, NULL, '2024-12-12', '11'),
(56, '2024-07-24', '2024-07-18', 'DDA', NULL, '16:00', 24756, '13/2024/DDA/ORMVAD', 'Achats de produits chimiques pour laboratoire pour le compte de l\'ORMVAD', '', NULL, '', 'SOVALCHIM', '2024', NULL, NULL, '2024-12-12', '6'),
(57, '2024-07-14', '2024-07-08', 'DRH', NULL, '10:00', 41040, '11/2024/DRH', 'Prestations de restauration des membres des Jury, des surveillants et membres d\'encadrement des concours organisés par l\'Office Régional de Mise en Valeur Agricole des Doukkala au titre de l\'exercice 2024', '', NULL, '', 'KB TRAITEUR', '2024', NULL, NULL, '2024-10-02', '8'),
(58, '2024-06-06', '2024-05-31', 'SMG', NULL, '12:00', 6468, '10/2024/SMG/ORMVAD', 'Entretien et réparation des extincteurs au profit des services des bâtiments administratifs et techniques de l\'ORMVAD pour l\'année 2024', '', NULL, '', 'GROUPE BETA INCENDIE ', '2024', NULL, NULL, '2024-12-12', '10'),
(61, '2024-03-18', '2024-03-12', 'SMG', NULL, '12:00', 26022, '07/2024/SMG', 'ACQUISITION DES DRAPEAUX,PAVILLONS ET PORTRAITS POUR L\'ORMVAD', '', NULL, '', 'ONE WORD COMPANY', '2024', NULL, NULL, '2024-07-16', '31'),
(63, '2024-02-27', '2024-02-21', 'DPF', NULL, '12:00', 33600, '05/2024/DPF/ORMVAD', 'Assistance de l\'ORMVAD dans le domaine comptable au titre de l\'exercice 2024', '', NULL, '', 'ICOMPTE CONSEILS', '2024', NULL, '2024-09-15', '2024-11-10', '13'),
(64, '2024-02-26', '2024-02-20', 'DDA', NULL, '11:00', 244092, '04/2024/DDA/ORMVAD', 'Organisation des visites techniques au Salon International d\'Agriculture de Meknès 2024 (SIAM 2024) au profit des Agents de l\'ORMVAD ', '', NULL, '', 'OBJECT SERVICE MAROC', '2024', NULL, NULL, '2024-07-03', '20'),
(65, '2024-02-22', '2024-02-16', 'DDA', NULL, '11:00', 244092, '02/2024/DDA/ORMVAD', 'Organisation des visites techniques au Salon International d\'Agriculture de Meknès 2024 (SIAM 2024) au profit des Agents de l\'ORMVAD ', '', NULL, '', 'OBJECT MAROC SERVICE', '2024', NULL, NULL, '2024-12-12', '11'),
(66, '2024-02-20', '2024-02-14', 'DDA', NULL, '12:00', 102960, '03/2024/DDA/ORMVAD', 'Acquisition des GPS pour la réalisation des constats des lieux des dossiers de demande de subvention des cultures maraîchères.', '', NULL, '', 'COFAS', '2024', NULL, NULL, '2024-12-12', '15'),
(67, '2024-02-18', '2024-02-12', 'SMG', NULL, '12:00', 10584, '01/2024/SMG/ORMVAD', 'LA CONFECTION DES CACHETS POUR L\'ORMVAD', '', NULL, '', 'ORIGINAL PAPETERIES', '2024', NULL, NULL, '2024-10-30', '11'),
(70, '2023-12-28', '2023-12-22', 'DGR', NULL, '12:00', NULL, '01/2023/DGR/ORMVAD', 'Achat de matériel informatique pour le compte de L\'ORMVAD', 'Annulé', NULL, '', '', '2023', NULL, NULL, NULL, '21'),
(71, '2023-12-07', '2023-12-01', 'DRH', NULL, '10:00', NULL, '02/2023/DRH', 'ORGANISATION D\'UNE SESSION DE FORMATION CONTINUE DANS LE DOMAINE DE LA GOUVERNANCE AU PROFIT DU PERSONNEL DE L\'ORMVAD AU TITRE DE L\'EXERCICE 2023', 'Infructueux', NULL, '', 'Infructueux', '2023', NULL, NULL, NULL, '13'),
(73, '2023-10-25', '2023-10-19', 'DA', NULL, '10:00', 6000, '01/2023/DA', 'Expertise du bâtiment administratif de l\'arrondissement de Sidi Bennour', '', NULL, '', 'BUREAU D\'ETUDE EXPERTISE DIAGUOSTIC', '2023', NULL, NULL, '2024-12-20', '15'),
(74, '2023-10-03', '2023-09-27', 'DDA', NULL, '10:00', 129960, '05/2023/DDA/ORMVAD', 'PRESTATION DE TRANSPORT DES AGRICULTEURS ET TECHNICIENS DE L\'ORMVAD AU SALON DU CHEVAL 2023 A EL JADIDA', '', NULL, '', 'CALIFORNIA TRANSPORT', '2023', NULL, NULL, '2023-09-20', '8'),
(77, '2020-02-04', '2023-01-01', 'DPF', NULL, '', 7200, '05/2020/DPF', 'PARTICIPATION DES CADRES DE L\'ORMVAD AU SEMINAIRE SUR LE THEME \'LES NOUVELLES DISPOSITIONS FISCALES DE LA LOI DE FINANCES 2020 \' LE 07/02/2020\n', '', NULL, '', 'FIZAZI ET ASSOCIES', '2020', NULL, NULL, NULL, ''),
(78, '2021-04-30', '2021-10-20', 'DDA', NULL, '', 19440, '24/2021/DDA', 'SUIVI DES TRAVAUX DE CONSTRUCTIONDE L\'UNITE DE VALORISATION DE LA POMME DE TERRE A BOULAAOUANE PROVINCE D\'EL JADIDA', '', NULL, '', 'BETOCONCEPT', '2021', NULL, NULL, NULL, ''),
(79, '2021-12-12', '2021-10-20', 'DDA', NULL, '', 40800, '17/2021/DDA', 'ELABORATION DES  ETUDES TECHNIQUES DES TRAVAUX DE CONSTRUCTION   DE L\' UNITE DE VALORISATION DE LA POMME DE TERRE AU NIVEAU DE LA COMMUNE DE BOULAAOUNE PROVINCE D\'EL JADIDA', '', NULL, '', 'BATICI', '2021', NULL, NULL, NULL, ''),
(80, '2021-12-12', '2021-10-20', 'DDA', NULL, '', 43200, '07/2021/DDA', 'ELABORATION DES ETUDES TECHNIQUES DES TRAVAUX DE  CONSTRUCTION D\'UNE UNITE DE VALORISATION DES PRODUITS  APICOLES  AU NIVEAU DE   LA COMMUNE DE LAATATRA PROVINCE DE SIDI BENNOUR', '', NULL, '', 'BETOCONCEPT', '2021', NULL, NULL, NULL, ''),
(81, '2021-12-12', '2021-10-20', 'DDA', NULL, '', 23250, '22/2021/DDA', 'SUIVI DES TRAVAUX DE CONSTRUCTIONDE L\'UNITE DE VALORISATION DU LAIT AU NIVEAU DE LA COMMUNE DE BENI HILAL PROVINCE DE SIDI BENNOUR', '', NULL, '', 'BETOCONCEPT', '2021', NULL, NULL, NULL, ''),
(82, '2021-12-12', '2021-10-20', 'DDA', NULL, '', 23250, '25/2021/DDA', 'SUIVI DES TRAVAUX DE CONSTRUCTIONDE L\'UNITE DE VALORISATION DES PRODUITS APICOLES DANS LA PROVINCE DE SIDI BENNOUR ', '', NULL, '', 'BETOCONCEPT', '2021', NULL, NULL, NULL, ''),
(83, '2014-12-12', '2014-10-20', 'DGR', NULL, '', 9150, '47/2014/DGR', 'ACQUISITION DE BILLET D\'AVION POUR MISSION A L\'ETRANGER', '', NULL, '', 'MAROC VOYAGES', '2014', NULL, NULL, NULL, ''),
(84, '2023-12-12', '2021-10-20', 'DGR', NULL, '', 258000, '16/2023/DGRID', 'FRAIS DE VOYAGE TECHNIQUE ET DE VISITE DES PROJETS DE RECONVERSION A L\'IRRIGATION LOCALISEE', '', NULL, '', 'FOCUS RH', '2023', NULL, NULL, NULL, ''),
(85, '2014-12-12', '2014-10-20', 'DPF', NULL, '', 9000, '43/2014/DPF', 'FRAIS DE PARTICIPATION DE 3 AGENTS DE L\'ORMVAD A UN SEMINAIRE \"L\'ARRETE DES COMPTES\"', '', NULL, '', 'PKF MAROC', '2014', NULL, NULL, NULL, ''),
(86, NULL, NULL, 'SMG', NULL, NULL, 40000, '', 'CONFECTION DES CACHETS POUR L\'ORMVAD', NULL, NULL, NULL, NULL, '2025', NULL, NULL, NULL, NULL),
(87, NULL, NULL, 'SMG', NULL, NULL, 40000, NULL, 'ACQUISITION DES DRAPEAUX, PAVILLONS ET PORTRAITS POUR L\'ORMVAD', NULL, NULL, NULL, NULL, '2025', NULL, NULL, NULL, NULL),
(88, NULL, NULL, 'SMG', NULL, NULL, 40000, NULL, 'ENTRETIEN DU MATERIEL DE LUTTE CONTRE L\'INCENDIE', NULL, NULL, NULL, NULL, '2025', NULL, NULL, NULL, NULL),
(89, NULL, NULL, 'SMG', NULL, NULL, 40000, NULL, 'REPARATION PHOTOCOPIEUSE', NULL, NULL, NULL, NULL, '2025', NULL, NULL, NULL, NULL),
(90, NULL, NULL, 'SMG', NULL, NULL, 100000, NULL, 'ACHAT DE MATERIEL DROGERIE', NULL, NULL, NULL, NULL, '2025', NULL, NULL, NULL, NULL),
(91, NULL, NULL, 'SMG', NULL, NULL, 100000, NULL, 'Dératisation et désinsectisation des goulottes du réseau informatique, des locaux administratifs et des stations de pompage de l\'ORMVAD', NULL, NULL, NULL, NULL, '2025', NULL, NULL, NULL, NULL),
(95, '2023-12-12', '2023-10-20', 'DRH', NULL, '', 40212, '01/2023/DRH', 'FORMATION SUR LA DEMATERIALISATION DES PROCEDURES DE PASSATION DES MARCHES PUBLICS AU PROFIT DE 20 PERSONNES', '', NULL, '', 'LEONARD DE VINCI PRIVE', '2023', NULL, NULL, '2024-04-02', ''),
(100, '2023-12-12', '2023-10-20', 'DDA', NULL, '', 55680, 'BC05/2023/DDA', 'EDITION DES DOCUMENTS ET FOURNITURES DIVERS POUR LE CONSEIL D\'ADMINISTRATION DE L\'ORMVAD ', '', NULL, '', 'SKY ART', '2023', NULL, NULL, '2023-05-10', ''),
(101, '2024-12-12', '2024-10-20', 'DDA', NULL, '', 143016, 'BC14277/2024', 'EDITION DES DOCUMENTS ET FOURNITURES DIVERS POUR LE CONSEIL D\'ADMINISTRATION DE L\'ORMVAD ', '', NULL, '', 'SKY ART', '2024', NULL, NULL, '2024-11-14', '');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `entite` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `password`, `username`, `role`, `entite`) VALUES
(8, 'admin', 'admin', 'admin', 'admin'),
(14, 'DPF', 'DPF', 'usernormale', 'DPF'),
(15, 'DGR', 'DGR', 'usernormale', 'DGR'),
(16, 'kafih', 'kafih', 'sous admin', 'DPF'),
(17, 'DDA', 'DDA', 'usernormale', 'DDA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appel_offre`
--
ALTER TABLE `appel_offre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bande_commande`
--
ALTER TABLE `bande_commande`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_kq7nt5wyq9v9lpcpgxag2f24a` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appel_offre`
--
ALTER TABLE `appel_offre`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `bande_commande`
--
ALTER TABLE `bande_commande`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
