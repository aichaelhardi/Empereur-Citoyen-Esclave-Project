
// Sauvegarder le joueur sélectionné
export function sauvgarderJoueur(joueur) {
    localStorage.setItem("joueurActuel", JSON.stringify(joueur));
}

// Récupérer le joueur sélectionné
export function recupererJoueur() {
    const joueur = localStorage.getItem("joueurActuel");

    return joueur ? JSON.parse(joueur) : null;
}

// Supprimer le joueur sélectionné
export function supprimerJoueur() {
    localStorage.removeItem("joueurActuel");
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


// Incrémenter les parties jouées
export function incrementerPartiesJouees() {

    const joueur = recupererJoueur();

    if (!joueur) return;

    const profils = recupererProfils([]);

    const index = profils.findIndex(
        p => String(p.id) === String(joueur.id)
    );

    if (index !== -1) {

        profils[index].partiesJouees =
            (profils[index].partiesJouees || 0) + 1;

        // Sauvegarder les profils actualisés
        sauvgarderProfils(profils);

        // Actualiser le joueur sélectionné
        sauvgarderJoueur(profils[index]);
    }
}
