export function afficherProfils(profils){
    const container=document.getElementById("profiles-container");
    container.innerHTML="";
    profils.forEach(profil=> {
        container.innerHTML+=`
        <div class="bg-[#E5CB90] rounded-xl p-5 shadow-lg flex flex-col items-center gap-3">
        ${
            profil.avatar.startsWith("avatar")
            ? `<img src="./images/${profil.avatar}.png" class="w-24 h-24  rounded-full object-cover" alt="${profil.nickname}">`
            :`<div class="text-6xl">${profil.avatar}</div>`
        }
        <h3 class="font-bold text-xl">${profil.nickname}</h3>
        <p class="text-sm text-gray-700">
        parties jouées : ${profil.partiesJouees || 0}
        </p>
        <div class="flex gap-3">
         <button class="choisir-btn bg-red-500 text-white px-4 py-2 rounded-lg"
        data-id="${profil.id}">choisir
        </button>
        <button class=" modifier-btn bg-blue-700  px-4 py-2 rounded-lg" 
        data-id="${profil.id}">🔄
        </button>
         <button class="supprimer-btn bg-red-700  px-4 py-2 rounded-lg"
         data-id="${profil.id}">🗑️
        </button>
      
        </div>
        </div>
        `;
        
    });
}