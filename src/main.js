
import { profils as profilsData } from "./data.js";
import { afficherProfils } from "./ui.js";
import{ AjouterProfil } from "./players.js";
let profils=[...profilsData];
//afficher les profils
afficherProfils(profils);
const addButton=document.getElementById("add-profile");
const formContainer=document.getElementById("profile-form-container");
const form=document.getElementById("profile-form");
const nickname=document.getElementById("nickname");
const avatar=document.getElementById("avatar");
//afficher formulaire
addButton.addEventListener("click",function(){
    formContainer.classList.remove("hidden");
    formContainer.classList.add("flex");
});

form.addEventListener("submit",function(e){
    e.preventDefault();
    //validation pseudo
    const pseudo=nickname.value.trim();
    const regex=/^[A-Za-z0-9]{3,15}$/;
    const error=document.getElementById("nickname-error");
    error.textContent="";
    if(!regex.test(pseudo)){
        error.textContent="pseudo invalide (3 à 15 caractères)";
        return;
    }
    const existe = profils.some(profil=>profil.nickname.toLowerCase()===pseudo.toLowerCase());
    if(existe){
        error.textContent="ce pseudo est existe déja";
        return;
    }
    //ajout profil
    profils=AjouterProfil(profils,nickname.value,avatar.value);
    afficherProfils(profils);
    form.reset();
    formContainer.classList.add("hidden");
    formContainer.classList.remove("flex");
});


