
import {
    recupererJoueur,
    incrementerPartiesJouees
} from "./storage.js";

// ================================
// 1. INFORMATIONS DU JOUEUR
// ================================

const joueurInfo = document.getElementById("premier-joueur");
const joueurSelectionne = recupererJoueur();

if (joueurSelectionne && joueurInfo) {
    joueurInfo.textContent = `Premier à jouer : ${joueurSelectionne.nickname}`;
} else if (joueurInfo) {
    joueurInfo.textContent = "Aucun joueur sélectionné";
}

// ================================
// 2. ELEMENTS HTML
// ================================

const finPartie = document.getElementById("fin-partie");
const btnRejouer = document.getElementById("rejouer");
const resultatFinal = document.getElementById("resultat-final");

const cartesJoueur = document.getElementById("cartes-joueur");
const cartesOrdinateur = document.getElementById("cartes-ordinateur");

const carteJoueurDuel = document.getElementById("carte-joueur-duel");
const carteOrdinateurDuel = document.getElementById("carte-ordinateur-duel");

const btnStart = document.getElementById("start-duel");
const resultatDuel = document.getElementById("resultat-duel");

const mancheInfo = document.getElementById("manche");
const campInfo = document.getElementById("camp-joueur");
const groupeInfo = document.getElementById("groupe");
const scoreInfo = document.getElementById("score");

// ================================
// 3. CARTES DISPONIBLES
// ================================

const cartes = [
    {
        nom: "Empereur",
        image: "./images/emperor.png"
    },
    {
        nom: "Citoyen",
        image: "./images/citoyen.png"
    },
    {
        nom: "Esclave",
        image: "./images/esclave3.png"
    }
];

// ================================
// 4. VARIABLES DU JEU
// ================================

let mainJoueur = [];
let mainOrdinateur = [];

let scoreJoueur = 0;
let scoreOrdinateur = 0;

let mancheActuelle = 1;
let groupeActuel = 1;

let campJoueur = "Empereur";

let joueurPeutJouer = false;
let partieTerminee = false;

// ================================
// 5. DISTRIBUTION DES CARTES
// ================================

function distribuerCartes(camp) {

    if (camp === "Empereur") {

        mainJoueur = [
            "Empereur",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen"
        ];

        mainOrdinateur = [
            "Esclave",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen"
        ];

    } else {

        mainJoueur = [
            "Esclave",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen"
        ];

        mainOrdinateur = [
            "Empereur",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen"
        ];
    }
}

// ================================
// 6. AFFICHER LES CARTES
// ================================

function afficherCartes() {

    cartesJoueur.innerHTML = "";
    cartesOrdinateur.innerHTML = "";

    mainJoueur.forEach((carte, index) => {

        const img = document.createElement("img");

        const carteTrouvee = cartes.find(c => c.nom === carte);

        img.src = carteTrouvee.image;
        img.className = "w-24 h-auto cursor-pointer";
        img.dataset.index = index;

        cartesJoueur.appendChild(img);
    });

    mainOrdinateur.forEach(() => {

        const img = document.createElement("img");

        img.src = "./images/carte vide.png";
        img.className = "w-24 h-auto";

        cartesOrdinateur.appendChild(img);
    });
}

// ================================
// 7. AFFICHER LES INFORMATIONS
// ================================

function afficherInfos() {

    mancheInfo.textContent = `Manche ${mancheActuelle}/12`;

    campInfo.textContent = `Camp : ${campJoueur}`;

    groupeInfo.textContent = `Groupe ${groupeActuel}/4`;

}

// ================================
// 8. CHOIX DE LA CARTE ORDINATEUR
// ================================

function choisircartesOrdinateur() {

    const index = Math.floor(
        Math.random() * mainOrdinateur.length
    );

    return index;
}

// ================================
// 9. FONCTION DUEL
// ================================

function duel(carteJoueur, carteOrdinateur) {

    if (carteJoueur === carteOrdinateur) {
        return "égalité";
    }

    else if (
        carteJoueur === "Empereur" &&
        carteOrdinateur === "Citoyen"
    ) {
        return "victoire";
    }

    else if (
        carteJoueur === "Citoyen" &&
        carteOrdinateur === "Esclave"
    ) {
        return "victoire";
    }

    else if (
        carteJoueur === "Esclave" &&
        carteOrdinateur === "Empereur"
    ) {
        return "victoire";
    }

    else {
        return "défaite";
    }
}

// ================================
// 10. CALCULER LES POINTS
// ================================

function calculerPoints(carteJoueur, carteOrdinateur) {

    const resultat = duel(carteJoueur, carteOrdinateur);

    if (resultat === "égalité") {
        return;
    }

    // Le camp de l'ordinateur est opposé au camp du joueur
    const campOrdinateur =
        campJoueur === "Empereur" ? "Esclave" : "Empereur";

    if (resultat === "victoire") {

        const points = campJoueur === "Esclave" ? 5 : 1;

        scoreJoueur += points;

    } else {

        const points = campOrdinateur === "Esclave" ? 5 : 1;

        scoreOrdinateur += points;
    }
}

// ================================
// 11. AFFICHER LE SCORE
// ================================

function afficherScore() {

    scoreInfo.textContent =
        `Score [${scoreJoueur} - ${scoreOrdinateur}]`;
}

// ================================
// 12. LANCER UN DUEL
// ================================

btnStart.addEventListener("click", function () {

    if (partieTerminee) return;

    resultatDuel.textContent = "";

    joueurPeutJouer = true;

    btnStart.classList.add("hidden");
});

// ================================
// 13. CHOISIR UNE CARTE
// ================================

cartesJoueur.addEventListener("click", function (e) {

    if (!joueurPeutJouer || partieTerminee) {
        return;
    }

    const carteCliquee = e.target.closest("img");

    if (
        !carteCliquee ||
        carteCliquee.dataset.index === undefined
    ) {
        return;
    }

    joueurPeutJouer = false;

    const index = Number(carteCliquee.dataset.index);

    const carteJoueur = mainJoueur[index];

    const indexOrdinateur = choisircartesOrdinateur();

    const carteOrdinateur = mainOrdinateur[indexOrdinateur];

    const imageJoueur = cartes.find(
        c => c.nom === carteJoueur
    );

    const imageOrdinateur = cartes.find(
        c => c.nom === carteOrdinateur
    );

    // Calcul du résultat et des points
    const resultat = duel(carteJoueur, carteOrdinateur);

    calculerPoints(carteJoueur, carteOrdinateur);

    afficherScore();

    resultatDuel.textContent = resultat;

    // Afficher la carte du joueur
    carteJoueurDuel.innerHTML = "";

    const imgJoueur = document.createElement("img");

    imgJoueur.src = imageJoueur.image;
    imgJoueur.className = "w-36";

    carteJoueurDuel.appendChild(imgJoueur);

    // Afficher la carte de l'ordinateur
    carteOrdinateurDuel.innerHTML = "";

    const imgOrdinateur = document.createElement("img");

    imgOrdinateur.src = imageOrdinateur.image;
    imgOrdinateur.className = "w-36";

    carteOrdinateurDuel.appendChild(imgOrdinateur);

    // Retirer les cartes utilisées
    mainJoueur.splice(index, 1);

    mainOrdinateur.splice(indexOrdinateur, 1);

    afficherCartes();

    setTimeout(() => {

        if (mainJoueur.length === 0) {

            terminerManche();

        } else {

            if (resultat === "égalité") {
                resultatDuel.textContent = "Égalité ! Rejouez.";
            }

            btnStart.classList.remove("hidden");

            joueurPeutJouer = false;
        }

    }, 1000);

});

// ================================
// 14. TERMINER UNE MANCHE
// ================================

function terminerManche() {

    // Vérifier si les 12 manches sont terminées
    if (mancheActuelle === 12) {

        if (!partieTerminee) {

            partieTerminee = true;

            // Incrémenter le nombre de parties jouées
            incrementerPartiesJouees();
        }

        finPartie.classList.remove("hidden");

        if (scoreJoueur > scoreOrdinateur) {

            resultatFinal.textContent = "Vous avez gagné !";

        } else if (scoreJoueur < scoreOrdinateur) {

            resultatFinal.textContent = "L'ordinateur a gagné !";

        } else {

            resultatFinal.textContent = "Égalité générale !";
        }

        joueurPeutJouer = false;

        btnStart.classList.add("hidden");

        return;
    }

    // Changer de camp après les manches 3, 6 et 9
    if (
        mancheActuelle === 3 ||
        mancheActuelle === 6 ||
        mancheActuelle === 9
    ) {

        if (campJoueur === "Empereur") {

            campJoueur = "Esclave";

        } else {

            campJoueur = "Empereur";
        }
    }

    // Passer à la manche suivante
    mancheActuelle++;

    groupeActuel = Math.ceil(mancheActuelle / 3);

    // Distribuer les cartes selon le camp actuel
    distribuerCartes(campJoueur);

    afficherCartes();

    afficherInfos();

    // Réinitialiser l'affichage du duel
    carteJoueurDuel.innerHTML = "";

    carteOrdinateurDuel.innerHTML = "";

    resultatDuel.textContent = "Nouvelle manche !";

    btnStart.classList.remove("hidden");

    joueurPeutJouer = false;
}

// ================================
// 15. REJOUER UNE PARTIE
// ================================

btnRejouer.addEventListener("click", function () {

    // Réinitialiser les scores
    scoreJoueur = 0;
    scoreOrdinateur = 0;

    // Recommencer à la première manche
    mancheActuelle = 1;
    groupeActuel = 1;

    // Recommencer dans le camp Empereur
    campJoueur = "Empereur";

    partieTerminee = false;
    joueurPeutJouer = false;

    // Réinitialiser l'affichage
    finPartie.classList.add("hidden");

    resultatFinal.textContent = "";

    resultatDuel.textContent = "Nouvelle partie !";

    carteJoueurDuel.innerHTML = "";

    carteOrdinateurDuel.innerHTML = "";

    // Nouvelle distribution
    distribuerCartes(campJoueur);

    afficherCartes();

    afficherScore();

    afficherInfos();

    btnStart.classList.remove("hidden");
});

// ================================
// 16. INITIALISATION DU JEU
// ================================

distribuerCartes(campJoueur);

afficherCartes();

afficherScore();

afficherInfos();
