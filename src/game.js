 import { recupererJoueur } from "./storage.js";
 import { incrementerPartiesJouees } from "./storage.js";

const joueurSelectionne =recupererJoueur();  
if(joueurSelectionne) {
    joueurInfo.textContent=`Premier à jouer:${joueurSelectionne.nickname}`;
}  
import { incrementerPartiesJouees } from "./storage.js";    
      
const finPartie =document.getElementById("fin-partie");
const btnRejouer = document.getElementById("rejouer");
const resultatFinal = document.getElementById("resultat-final");

// les cartes dispo
const cartes=[
    {
      nom: "Empereur",
      image:"./images/emperor.png"

    },
      {
      nom: "Citoyen",
      image:"./images/citoyen.png"

    },
      {
      nom: "Esclave",
      image:"./images/esclave3.png"

    }
];
let mainJoueur =[];
let mainOrdinateur=[];
//distribution des cartes
function distribuerCartes(camp){
    if(camp==="Empereur"){
        mainJoueur=[
            "Empereur",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen",

        ];
        mainOrdinateur=[
            "Esclave",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen",


        ];
    } else{
         mainJoueur=[
            "Esclave",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen",

        ];
          mainOrdinateur=[
            "Empereur",
            "Citoyen",
            "Citoyen",
            "Citoyen",
            "Citoyen",
          ];
        
    }
}
const cartesJoueur=document.getElementById ("cartes-joueur");
const cartesOrdinateur=document.getElementById("cartes-ordinateur");
const carteJoueurDuel =document.getElementById("carte-joueur-duel");
const carteOrdinateurDuel= document.getElementById("carte-ordinateur-duel");
const btnStart=document.getElementById("start-duel");
const resultatDuel =document.getElementById("resultat-duel");
const mancheInfo =document.getElementById("manche");
const campInfo =document.getElementById("camp-joueur");
const joueurInfo=document.getElementById("premier-joueur");
const groupeInfo = document.getElementById("groupe");
function afficherCartes(){
    cartesJoueur.innerHTML="";
    cartesOrdinateur.innerHTML="";
    mainJoueur.forEach((carte , index) => {
        const img= document.createElement("img");
        if(carte==="Empereur"){
            img.src="./images/emperor.png";
        } else if(carte === "Citoyen"){
       img.src ="./images/citoyen.png";
        } else{
            img.src="./images/esclave3.png";
        }
        img.className="w-24 h-auto cursor-pointer";
        img.dataset.index = index;
        cartesJoueur.appendChild(img);
    });
    mainOrdinateur.forEach(()=>{
        const img =document.createElement("img");
        img.src="./images/carte vide.png";
        img.className="w-24 h-auto";
        cartesOrdinateur.appendChild(img);
    });
}
distribuerCartes("Empereur");
afficherCartes();
let scoreJoueur = 0;
let scoreOrdinateur = 0;
let mancheActuelle = 1;
let groupeActuel = 1;
let campJoueur ="Empereur";
let joueurPeutJouer = true;
function choisircartesOrdinateur(){
    const index = Math.floor (Math.random()*mainOrdinateur.length);
    return index;
}
function duel(carteJoueur,carteOrdinateur){
    if(carteJoueur === carteOrdinateur){
        return "égalité" ;
    }
   else if (carteJoueur === "Empereur" && carteOrdinateur === "Citoyen"){
    return "victoire";
   }
   else if(carteJoueur === "Citoyen" && carteOrdinateur ==="Esclave"){
    return "victoire";
   }
   else if (carteJoueur === "Esclave" && carteOrdinateur ==="Empereur"){
     return "victoire";
   }
   else{
    return "défaite";
   }
}
function calculerPoints(carteJoueur,carteOrdinateur){

 const resultat =duel(carteJoueur,carteOrdinateur);

 if(resultat === "égalité"){
    return;
 }
let points =1;

 if((carteJoueur === "Esclave"&& carteOrdinateur==="Empereur") || (carteJoueur ==="Empereur" && carteOrdinateur==="Esclave")){
        points = 5;
    }
    if(resultat === "victoire"){
        scoreJoueur += points;
    }else{
        scoreOrdinateur += points;
    }
 } 

function afficherScore(){
    document.getElementById("score").textContent = `score [${scoreJoueur}-${scoreOrdinateur}]`;
}

joueurPeutJouer = false;
btnStart.addEventListener("click",function(){
    resultatDuel.textContent="";
    joueurPeutJouer=true;
    btnStart.classList.add("hidden");
});
cartesJoueur.addEventListener("click" ,function(e){
    if(!joueurPeutJouer){
        return;
    }
    const carteCliquee = e.target.closest("img");
    if(!carteCliquee||carteCliquee.dataset.index === undefined){
        return;
    } joueurPeutJouer=false;
    const index = Number(carteCliquee.dataset.index);
    const carteJoueur = mainJoueur[index];
    const indexOrdinateur = choisircartesOrdinateur();
    const carteOrdinateur = mainOrdinateur[indexOrdinateur];
    const imageJoueur = cartes.find (c=> c.nom === carteJoueur);
    const imageOrdinateur = cartes .find(c=> c.nom === carteOrdinateur);
    //calculer score
    const  resultat = duel (carteJoueur,carteOrdinateur);
    calculerPoints(carteJoueur,carteOrdinateur);
    afficherScore();
    resultatDuel.textContent=resultat;

    carteJoueurDuel.innerHTML ="";
    const imgJoueur=document.createElement("img");
    imgJoueur.src =imageJoueur.image ;
    imgJoueur.className ="w-36";
    carteJoueurDuel .appendChild(imgJoueur);
    carteOrdinateurDuel .innerHTML="";
    const imgOrdinateur= document.createElement("img");
    imgOrdinateur.src =imageOrdinateur.image;
    imgOrdinateur .className ="w-36";
    carteOrdinateurDuel.appendChild(imgOrdinateur);
     //affichage du carte choisi au duel actuel
     mainJoueur =[...mainJoueur];
     mainOrdinateur=[...mainOrdinateur];
     mainJoueur.splice(index,1);
     mainOrdinateur.splice(indexOrdinateur,1);
     
     afficherCartes();
     setTimeout(() => {
         if(mainJoueur.length === 0){
                terminerManche();
         }else{
            if(resultat === "égalité"){
            resultatDuel.textContent = "égalité ! Rejouez.";
            }
            btnStart.classList.remove("hidden");
            joueurPeutJouer = false ;
            }
        
     },1000);
  
});
//terminer manche
function terminerManche(){
   
    if(mancheActuelle ===12){
        finPartie .classList .remove("hidden");

        if(scoreJoueur > scoreOrdinateur){
            resultatFinal.textContent ="vous avez gagné !";
        } else if(scoreJoueur < scoreOrdinateur){
            resultatFinal.textContent ="ordinateur gagné !";
        } 
        else {
            resultatFinal.textContent ="égalité générale !";
        } 
        joueurPeutJouer = false;
        return;
        }
        //changer camp aprés manches
    if(mancheActuelle=== 3 || mancheActuelle===6||mancheActuelle===9){
        if(campJoueur === "Empereur"){
            campJoueur ="Esclave";
        } else{
            campJoueur ="Empereur";
        }
    }
   mancheActuelle++;
   groupeActuel = Math.ceil(mancheActuelle/3);
   afficherInfos();
   
   //distribuer 5 nouvelles cartes
distribuerCartes("Empereur");
afficherCartes();
afficherInfos();
incrementerPartiesJouees();

carteJoueurDuel.innerHTML="";
carteOrdinateurDuel.innerHTML="";
resultatDuel.textContent="Nouvelle manche!";
btnStart.classList.remove("hidden");
joueurPeutJouer =false;
}
function afficherInfos (){
    mancheInfo.textContent =`Manche ${mancheActuelle}/12`;
    campInfo.textContent =`Camp:${campJoueur}`;
    groupeInfo.textContent =`Groupe${groupeActuel}/4`;
}