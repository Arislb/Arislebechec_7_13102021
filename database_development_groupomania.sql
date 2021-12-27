-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 27 déc. 2021 à 17:30
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `database_development_groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `UserId`, `content`, `attachment`, `createdAt`, `updatedAt`) VALUES
(25, 1, 'Salut a tous ', 'http://localhost:3000/images/200w.webp1640623330005.undefined', '2021-12-27 16:42:10', '2021-12-27 16:42:10'),
(26, 19, 'Salut, c\'est sympas ici !', 'http://localhost:3000/images/200w_(1).webp1640623518197.undefined', '2021-12-27 16:45:18', '2021-12-27 16:45:18'),
(28, 4, 'Alors il y a un traitre parmi nous ?', 'http://localhost:3000/images/Among-Us-Logo.png1640624911466.png', '2021-12-27 17:08:31', '2021-12-27 17:08:31'),
(29, 20, '*tousse* Salut tout le monde !', NULL, '2021-12-27 17:08:58', '2021-12-27 17:08:58'),
(30, 20, 'euh', NULL, '2021-12-27 17:09:07', '2021-12-27 17:09:07'),
(31, 5, 'On est tous des innocents', NULL, '2021-12-27 17:11:01', '2021-12-27 17:11:01'),
(32, 1, 'Vous inquiétez pas, on est tous safe !', 'http://localhost:3000/images/200w_(2).webp1640625305379.undefined', '2021-12-27 17:15:05', '2021-12-27 17:15:05');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20211027161039-create-user.js'),
('20211027161242-create-message.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@gmail.com', 'Admin', '$2b$10$Jzm5NBzvFl9f7Ws/jyRmxesj3CuMT1.UBxSEBunDmnzyEVvxU8Hji', 1, '2021-12-15 16:15:56', '2021-12-15 16:15:56'),
(4, 'Pierre@gmail.com', 'Pierre', '$2b$10$bcqA2vQLQH37Q.R8n9K3TuJtNYNQCWufN7J.cAU8GYRU4xkqPML26', 0, '2021-12-21 14:41:47', '2021-12-21 14:41:47'),
(5, 'Alex@gmail.com', 'Alex', '$2b$10$XA3YA7eSe6LD7C5p15m1CeCZuoyUIQT4QoeiKPoAeQwZ2t/F2UUGa', 0, '2021-12-22 14:16:01', '2021-12-22 14:16:01'),
(19, 'Zheyn@gmail.com', 'Zheyn', '$2b$10$ISYkI0VpTmcfpA1NGLg3xeUCFW/aQD8udMVBxqcyKHZm72jc9cnPK', 0, '2021-12-27 16:37:49', '2021-12-27 16:37:49'),
(20, 'Impo@gmail.com', 'Impo', '$2b$10$QS.5l62Z/IRg8OJkP46mXO5FRa/OlFqx3Sb4lOculA3nho4GrMqeq', 0, '2021-12-27 16:39:38', '2021-12-27 16:39:38');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
