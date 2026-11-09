// Sauvegarder le joueur
export function sauvgarderJoueur(joueur) {
    localStorage.setItem("joueurActuel", JSON.stringify(joueur));
}

// Récupérer le joueur
export function recupererJoueur() {
    return JSON.parse(localStorage.getItem("joueurActuel"));
}

// Supprimer le joueur
export function supprimerJoueur() {
    localStorage.removeItem("joueurActuel");
}

// Incrémenter les parties jouées
export function incrementerPartiesJouees() {
    const joueur = recupererJoueur();

    if (joueur) {
        joueur.partiesJouees = (joueur.partiesJouees || 0) + 1;
        sauvgarderJoueur(joueur);
    }
}

// Sauvegarder tous les profils
export function sauvgarderProfils(profils) {
    localStorage.setItem("profils", JSON.stringify(profils));
}

// Récupérer les profils
export function recupererProfils(profilsData) {
    const profils = localStorage.getItem("profils");

    if (profils !== null) {
        return JSON.parse(profils);
    }

    return profilsData;
}

