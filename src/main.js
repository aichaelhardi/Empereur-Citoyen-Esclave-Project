
import { profils} from "./data.js";
import { afficherProfils } from "./ui.js";
afficherProfils(profils);
const addButton=document.getElementById("add-profile");
const formContainer=document.getElementById("profile-form-container");
addButton.addEventListener("click",function(){
    formContainer.classList.remove("hidden");
    formContainer.classList.add("flex");
});

