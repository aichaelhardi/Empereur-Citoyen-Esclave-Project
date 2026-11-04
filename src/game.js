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
