
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
//ajout profil
form.addEventListener("submit",function(e){
    e.preventDefault();
    profils=AjouterProfil(profils,nickname.ariaValueMax,avatar.value);
    afficherProfils(profils);
    form.reset();
    formContainer.classList.add("hidden");
    formContainer.classList.remove("flex");
});


