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
//incrementer partie joueur
export function incrementerPartiesJouees() {

    const joueur = recupererJoueur();

    if (!joueur) return;

    // Récupérer tous les profils
    const profils = JSON.parse(localStorage.getItem("profils")) || [];

    // Trouver le joueur dans la liste
    const index = profils.findIndex(p => p.id === joueur.id);

    if (index !== -1) {

        // Augmenter le nombre de parties
        profils[index].partiesJouees =
            (profils[index].partiesJouees || 0) + 1;

        // Sauvegarder les profils
        sauvgarderProfils(profils);

        // Mettre à jour le joueur actuel
        sauvgarderJoueur(profils[index]);
    }
}

