
import { profils as profilsData } from "./data.js";
import { afficherProfils } from "./ui.js";
import { AjouterProfil } from "./players.js";

import {
    sauvgarderJoueur,
    recupererJoueur,
    sauvgarderProfils,
    recupererProfils
} from "./storage.js";

// Récupérer les profils sauvegardés
let profils = recupererProfils(profilsData);

// Récupérer le joueur sélectionné
let joueurActuel = recupererJoueur();

// Afficher les profils
afficherProfils(profils);

// Éléments HTML
const addButton = document.getElementById("add-profile");
const formContainer = document.getElementById("profile-form-container");
const form = document.getElementById("profile-form");
const nickname = document.getElementById("nickname");
const avatar = document.getElementById("avatar");
const profilesContainer = document.getElementById("profiles-container");
const error = document.getElementById("nickname-error");
const formTitle = document.getElementById("form-title");

// Variable pour modification
let profilAModifier = null;


// Ouvrir le formulaire pour ajouter un profil
addButton.addEventListener("click", function () {

    profilAModifier = null;

    form.reset();
    error.textContent = "";

    formTitle.textContent = "Ajouter un profil";

    formContainer.classList.remove("hidden");
    formContainer.classList.add("flex");
});


// Ajouter ou modifier un profil
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const pseudo = nickname.value.trim();

    // Validation du pseudo
    const regex = /^[A-Za-z0-9]{3,15}$/;

    error.textContent = "";

    if (!regex.test(pseudo)) {
        error.textContent = "Pseudo invalide (3 à 15 caractères)";
        return;
    }

    // Vérifier si le pseudo existe déjà
    const existe = profils.some(profil =>
        profil.nickname.toLowerCase() === pseudo.toLowerCase() &&
        String(profil.id) !== String(profilAModifier)
    );

    if (existe) {
        error.textContent = "Ce pseudo existe déjà";
        return;
    }

    // Vérifier l'avatar
    if (avatar.value === "") {
        alert("Choisissez un avatar");
        return;
    }

    // Modifier un profil
    if (profilAModifier !== null) {

        const profil = profils.find(
            p => String(p.id) === String(profilAModifier)
        );

        if (!profil) {
            alert("Profil introuvable");
            return;
        }

        profil.nickname = pseudo;
        profil.avatar = avatar.value;

        profilAModifier = null;

    }

    // Ajouter un nouveau profil
    else {

        profils = AjouterProfil(profils, pseudo, avatar.value);

    }

    // Sauvegarder les profils
    sauvgarderProfils(profils);

    // Actualiser l'affichage
    afficherProfils(profils);

    // Réinitialiser le formulaire
    form.reset();

    formTitle.textContent = "Ajouter un profil";

    formContainer.classList.add("hidden");
    formContainer.classList.remove("flex");

});


// Modifier et supprimer et choisir un profil
profilesContainer.addEventListener("click", function (e) {

    // Modifier un profil
    if (e.target.classList.contains("modifier-btn")) {

        const id = e.target.dataset.id;

        const profil = profils.find(
            p => String(p.id) === String(id)
        );

        if (!profil) return;

        profilAModifier = id;

        nickname.value = profil.nickname;
        avatar.value = profil.avatar;

        error.textContent = "";

        formTitle.textContent = "Modifier un profil";

        formContainer.classList.remove("hidden");
        formContainer.classList.add("flex");

    }


    // Supprimer un profil
    if (e.target.classList.contains("supprimer-btn")) {

        const id = e.target.dataset.id;

        const confirmation = confirm(
            "Voulez-vous supprimer ce profil ?"
        );

        if (confirmation) {

            profils = profils.filter(
                p => String(p.id) !== String(id)
            );

           
            if (
                joueurActuel &&
                String(joueurActuel.id) === String(id)
            ) {

                joueurActuel = null;

                localStorage.removeItem("joueurActuel");

                const joueurInfo = document.getElementById("joueur-actuel");

                if (joueurInfo) {
                    joueurInfo.textContent = "Aucun joueur sélectionné";
                }

            }

            sauvgarderProfils(profils);

            afficherProfils(profils);

        }

    }


    // Choisir un joueur
    if (e.target.classList.contains("choisir-btn")) {

        const id = e.target.dataset.id;

        joueurActuel = profils.find(
            p => String(p.id) === String(id)
        );

        if (!joueurActuel) return;

        // Sauvegarder le joueur sélectionné
        sauvgarderJoueur(joueurActuel);

        // Afficher le joueur actuel
        const joueurInfo = document.getElementById("joueur-actuel");

        if (joueurInfo) {
            joueurInfo.textContent =
                "Joueur : " + joueurActuel.nickname;
        }

    }

});


// Commencer une partie
const commencerButton = document.getElementById("commencer-partie");

commencerButton.addEventListener("click", function () {

    if (joueurActuel === null) {

        alert("Veuillez choisir un joueur avant de commencer !");

        return;
    }

    alert("Bonne chance " + joueurActuel.nickname);

    window.location.href = "./jouer.html";

});


// Récupérer le pseudo du joueur
const pseudo = joueurActuel
    ? joueurActuel.nickname
    : "Joueur supprimé";
