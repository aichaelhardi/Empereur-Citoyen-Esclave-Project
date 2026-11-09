Empereur, Citoyen, Esclave
Présentation du projet
Empereur, Citoyen, Esclave est un jeu de cartes en ligne. Le joueur joue contre l'ordinateur dans une partie de 12 manches.

Le projet a été réalisé dans le cadre du Sprint 2 — Brief 2 de la formation YouCode Safi. L'interface est créée avec HTML et Tailwind CSS, et le jeu fonctionne avec JavaScript.
Objectif
Le but est de gagner le plus de points possible à la fin des 12 manches.
Règles du jeu
L'Empereur gagne contre le Citoyen.
 Le Citoyen gagne contre l'Esclave.
L'Esclave gagne contre l'Empereur.
 Deux cartes Citoyen donnent une égalité.
Une victoire dans le camp de l'Empereur rapporte 1 point.
 Une victoire dans le camp de l'Esclave rapporte 5 points.
 Les camps changent après les manches 3, 6 et 9.
 Le joueur affronte l'ordinateur pendant 12 manches.
Fonctionnalités
Profils des joueurs
 Ajouter un profil avec un pseudo et un avatar.
 Afficher la liste des profils.
 Modifier un profil.
 Supprimer un profil après confirmation.
Choisir le joueur avant de commencer une partie.
Jeu
 Jouer contre l'ordinateur.
 Choisir une carte pour chaque duel.
Afficher le résultat du duel et le score.
Gérer les égalités et les changements de camp.
Afficher le résultat final après 12 manches.
Historique
 Enregistrer les parties terminées.
 Afficher les parties de la plus récente à la plus ancienne.
 Rechercher une partie par pseudo.
 Filtrer les parties par résultat et par date.
 Supprimer une partie après confirmation.
Les fonctionnalités ci-dessus décrivent les objectifs du projet. Les fonctionnalités réellement terminées dépendent de la version présente dans le dépôt.

Organisation des fichiers
Le projet est organisé en modules JavaScript. Chaque fichier a un rôle précis :
Fichier	Rôle
index.html	Structure de la page et chargement du JavaScript
src/main.js	Démarrage de l'application et gestion des événements
src/game.js	Règles du jeu, duels, manches et scores
src/players.js	Gestion des profils des joueurs
src/history.js	Gestion de l'historique des parties
src/storage.js	Sauvegarde et lecture des données dans le LocalStorage
src/ui.js	Affichage des éléments à l'écran


Technologies utilisées
 HTML
 Tailwind CSS
JavaScript (ES6+)
 LocalStorage
  Git et GitHub
Comment lancer le projet
 Cloner le dépôt GitHub :
   git clone https://github.com/aichaelhardi/Empereur-Citoyen-Esclave-Project.git
Ouvrir le dossier du projet dans Visual Studio Code.
 Installer ou activer l'extension Live Server si nécessaire.
 Ouvrir le fichier index.html.
 Cliquer sur Open with Live Server.
Important : il faut utiliser Live Server pour lancer le projet, car les modules JavaScript ne fonctionnent pas correctement avec un simple double-clic sur le fichier HTML.
Sauvegarde des données
Les données sont sauvegardées dans le LocalStorage du navigateur. Les profils, le joueur sélectionné et l'historique peuvent rester disponibles après le rechargement de la page, selon les fonctionnalités implémentées.
GitHub
 Dépôt du projet : https://github.com/aichaelhardi/Empereur-Citoyen-Esclave-Project

Auteur
Projet individuel réalisé par Aicha Elhardi — YouCode Safi, année 2026/2027.