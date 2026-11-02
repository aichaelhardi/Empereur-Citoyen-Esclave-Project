export function afficherProfils(profils){
    const container=document.getElementById("profiles-container");
    container.innerHTML="";
    profils.forEach(profil=> {container.innerHTML+=`
        <div class="bg-white rounded-xl p-5 shadow-lg flex flex-col items-center gap-3">
        <img src="./images/${profil.avatar}.png" class="w-24 h-24 object-contain" alt="${profil.nickname}">
        <h3 class="font-bold text-xl">${profil.nickname}</h3>
        <div class="flex gap-3">
        <button class="bg-blue-700 text-white px-4 py-2 rounded-lg">Modifier
        </button>
         <button class="bg-red-700 text-white px-4 py-2 rounded-lg">Supprimer
        </button>
        </div>
        </div>
        `;
        
    });
}