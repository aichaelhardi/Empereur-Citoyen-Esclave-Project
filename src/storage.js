// sauvgarder joueur
export function sauvgarderJoueur(joueur){
    localStorage.setItem("joueurActuel", JSON.stringify(joueur));
}
//récupérer joueur
export function recupererJoueur(){
    return
    JSON.parse(localStorage.getItem("joueurActuel"));
}
//supprimer joueur
export function supprimerJoueur(){
    localStorage.removeItem("joueurActuel");
}
export function incrementerPartiesJouees(){
    const joueur = JSON.parse(localStorage.getItem("joueurActuel"));
    if(joueur){
        joueur.partiesJouees = (joueur.partiesJouees||0)+1;
        localStorage.setItem("joueurActuel",JSON.stringify(joueur));
    }
}