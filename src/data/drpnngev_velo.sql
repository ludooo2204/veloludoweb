-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 08 juil. 2021 à 10:31
-- Version du serveur :  10.3.29-MariaDB
-- Version de PHP : 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `drpnngev_velo`
--

-- --------------------------------------------------------

--
-- Structure de la table `parcours`
--

CREATE TABLE `parcours` (
  `id` int(10) NOT NULL,
  `date` varchar(20) NOT NULL,
  `trajet` text DEFAULT NULL,
  `distance` float NOT NULL,
  `url` varchar(40) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parcours`
--

INSERT INTO `parcours` (`id`, `date`, `trajet`, `distance`, `url`) VALUES
(70, '25/06/2021 07:06', NULL, 17178, 'n3 du 25-06-2021.txt'),
(2, '09/06/2021 21:00', NULL, 29490, 'parcours 30 KM du 090621.txt'),
(1, '14/06/2021 21:00', NULL, 25489, 'parcours 26 KM lencloitre du 140621.txt'),
(3, '11/06/2021 8:00', NULL, 17026, 'parcours velotaff 110621.txt'),
(4, '11/06/2021 14:00', NULL, 16755, 'parcours velotaff 110621AM.txt'),
(83, '25/06/2021 15:01', NULL, 16834, 'n7 du 25-06-2021 15H01.txt'),
(84, '01/07/2121 21:01', NULL, 24145, 'n9 du 01-07-2121 21H01.txt'),
(85, '05/07/2021 20:07', NULL, 38218, 'n10 du 05-07-2021 20H07.txt');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `parcours`
--
ALTER TABLE `parcours`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `parcours`
--
ALTER TABLE `parcours`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
