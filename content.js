chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "show_pokemon") {
      display_poke(message.time);
    }
  });

  const poke = [{name: "Pikachu", rarity: "rare"},
    {name: "Garchomp", rarity: "epic"},
    {name: "Charizard", rarity: "rare"},
    {name: "Gardevoir", rarity: "epic"},
    {name: "Sylveon", rarity: "epic"},
    {name: "Arceus", rarity: "mythic"},
    {name: "Rayquaza", rarity: "mythic"}]; //think ab making this a diff file


function display_poke(t){
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.bottom = "10px";
    popup.style.right = "10px";
    popup.style.padding = "20px";
    popup.style.backgroundColor = "#f9f9f9"; //and no bg colour?
    popup.style.border = "2px solid #000"; //what if i want no border
    popup.style.zIndex = "10000";

    const poke_rar = get_rarity(t);
    const poke_name = get_poke(poke_rar);

    popup.innerHTML = `<p>You encountered a wild ${poke_name}!</p>
                     <button id="catch">Catch!</button>`;

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