const finPartie =
document.getElementById("fin-partie");
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
joueurPeutJouer = false;
btnStart.addEventListener("click",function(){
    resultatDuel.textContent="";
    joueurPeutJouer=true;
    btnStart.classList.add();
});
cartesJoueur.addEventListener("click" ,function(e){
    if(!joueurPeutJouer){
        return;
    }
    const carteCliquee = e.target.closest("img");
    if(!carteCliquee){
        return;
    }
    const index = Number(carteCliquee.dataset.index);
    const carteJoueur = mainJoueur[index];
    const indexOrdinateur = choisircartesOrdinateur();
    const carteOrdinateur = mainOrdinateur[indexOrdinateur];
    const imageJoueur = cartes.find (c=> c.nom === carteJoueur);
    const imageOrdinateur = cartes .find(c=> c.nom === carteOrdinateur);

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
     mainJoueur.splice(index, 1);
     mainOrdinateur.splice(indexOrdinateur, 1);
     afficherCartes();
  
})

