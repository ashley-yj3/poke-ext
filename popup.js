chrome.storage.local.get(["pokemon"], (result)=>{
    const collection = result.pokemon || [];
    const list = document.getElementById("poke_list");

    collection.forEach((pokemon)=>{

        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = get_pokeimg(pokemon);
        img.alt = pokemon;
        img.className = "poke_img"

        const name = document.createElement("div");
        name.textContent = pokemon;
        name.className = "poke_name";

        li.appendChild(img);
        li.appendChild(name);
        list.appendChild(li);

    });

});

function get_pokeimg(poke_name){
    const poke_imgs = {
        Pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        Charizard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        Garchomp: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png",
        Gardevoir: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
        Sylveon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png",
        Arceus: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
        Rayquaza: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png"

    };
    return poke_imgs[poke_name];

}

document.getElementById("reset").addEventListener("click",()=>{

    chrome.storage.local.set({pokemon:[]},()=>{
        document.getElementById("poke_list").innerHTML = "";
        alert("Collection resset!");
    });
});