
import { profils as profilsData } from "./data.js";
import { afficherProfils } from "./ui.js";
import { AjouterProfil } from "./players.js";
let profils = [...profilsData];
//afficher les profils
afficherProfils(profils);
const addButton = document.getElementById("add-profile");
const formContainer = document.getElementById("profile-form-container");
const form = document.getElementById("profile-form");
const nickname = document.getElementById("nickname");
const avatar = document.getElementById("avatar");
const profilesContainer = document.getElementById("profiles-container");
//variable pour modification

let profilAModifier = null;
let joueurActuel = null;

//afficher formulaire
addButton.addEventListener("click", function () {
    formContainer.classList.remove("hidden");
    formContainer.classList.add("flex");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    //validation pseudo
    const pseudo = nickname.value.trim();
    const regex = /^[A-Za-z0-9]{3,15}$/;
    const error = document.getElementById("nickname-error");
    error.textContent = "";
    if (!regex.test(pseudo)) {
        error.textContent = "pseudo invalide (3 à 15 caractères)";
        return;
    }
    const existe = profils.some(profil => profil.nickname.toLowerCase() === pseudo.toLowerCase());
    if (existe) {
        error.textContent = "ce pseudo est existe déja";
        return;
    }
    if (avatar.value === "") {
        alert("choisissez un avatar");
        return;

    }
    //ajout profil
    if (profilAModifier !== null) {
        const profil = profils.find(p => p.id == profilAModifier);
        profil.nickname = pseudo;
        profil.avatar = avatar.value;
        profilAModifier = null;
    } else {
        profils = AjouterProfil(profils, pseudo, avatar.value);
    }
    afficherProfils(profils)
    form.reset();
    formContainer.classList.add("hidden");
    formContainer.classList.remove("flex");
});
//Modifier profil
profilesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("modifier-btn")) {
        const id = e.target.dataset.id;
        const profil = profils.find(p => p.id === id);
        profilAModifier = id;
        nickname.value = profil.nickname;
        avatar.value = profil.avatar;
        formContainer.classList.remove("hidden");
        formContainer.classList.add("flex");
        document.getElementById("form-title").textContent = "Modifier un profil";
    }
});
//supprimer profil
profilesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("supprimer-btn")) {
        const id = e.target.dataset.id;
        const confirmation = confirm("voulez vous supprimer ce profil?");
        if (confirmation) {
            profils = profils.filter(p => p.id != id);
            afficherProfils(profils);
        }
    }
});
//choisir un joueur:
profilesContainer.addEventListener("click",function(e){
    if(e.target.classList.contains("choisir-btn")){
        const id = e.target.dataset.id;
        joueurActuel = profils.find(p => p.id === id);
        document.getElementById("joueur-actuel").textContent = "joueur : " +joueurActuel.nickname
    }
    });
const commencerButton = document.getElementById("commencer-partie");
commencerButton.addEventListener("click" ,function(){
    if(joueurActuel === null){
        alert ("veuillez choisir un joueur avant de commencer !");
        return;
    }
    alert("bonne chance " + joueurActuel.nickname );
});

