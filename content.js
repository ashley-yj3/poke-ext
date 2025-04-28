console.log("✅ content.js loaded!");

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "show_pokemon") {
    console.log("Spawning Pokémon!");
      display_poke(message.time);
    }
  });

  const poke = [{name: "Pikachu", rarity: "rare"},
    {name: "Garchomp", rarity: "epic"},
    {name: "Charizard", rarity: "rare"},
    {name: "Gardevoir", rarity: "epic"},
    {name: "Sylveon", rarity: "epic"},
    {name: "Arceus", rarity: "mythic"}, 
    {name: "Shroomish", rarity: "common"},
    {name: "Rayquaza", rarity: "mythic"}]; //think ab making this a diff file


function display_poke(t){
    const poke_rar = get_rarity(t);
    const poke_name = get_poke(poke_rar).name;
    const poke_img = get_pokeimg(poke_name);

    const popup = document.createElement("div");
    popup.classList.add("poke-popup");
    
    popup.innerHTML = `
      <p class="poke-text">You encountered a wild ${poke_name}!</p>
      <img src="${poke_img}" alt="${poke_name}" class="poke-image">
      <button id="catch" class="poke-button">Catch!</button>
    `;
    
    document.body.appendChild(popup);

    document.getElementById("catch").onclick = () => {
        chrome.storage.local.get(["pokemon"],(result) => {
           const collection = result.pokemon || [];
           collection.push(poke_name);
           chrome.storage.local.set({pokemon: collection});
        });
        popup.remove();
    };
}

function get_rarity(t_passed){ //for productive sites

    if (t_passed>240){
        return ["epic","mythic"];
    } else if(t_passed > 120){
        return ["rare","epic"];
    } else {
        return ["common","rare"];
    }

}

function get_poke(rar) {
    const filtered = poke.filter((p)=>rar.includes(p.rarity));

    const rand_ind = Math.floor(Math.random() * filtered.length);
    return filtered[rand_ind];
}

function get_pokeimg(poke_name){
    const poke_imgs = {
        Pikachu: "./imgs/pikachu.png",
        Charizard: "./imgs/charizard.png",
        Garchomp: "./imgs/garchomp.png",
        Gardevoir: "./imgs/gardevoir.png",
        Sylveon: "./imgs/sylveon.png",
        Arceus: "./imgs/arceus.png",
        Rayquaza: "./imgs/rayquaza.png"
    };
    return poke_imgs[poke_name];
}