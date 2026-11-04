//Ajout profil
export function AjouterProfil(profils,nickname,avatar){
    const nouveauProfil={
        id:Date.now(),
        nickname:nickname,
        avatar:avatar,
        createdAt:new Date()
    };
    return[...profils,nouveauProfil];
}