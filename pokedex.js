document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemon-list');

    chrome.storage.local.get(["pokemon"], (result) => {
        const collection = result.pokemon || [];

            collection.forEach(poke => {
                const entry = document.createElement('div');
                entry.className = 'poke-entry'; 
                entry.innerHTML = 
                `<img src="${poke.img}" alt="${poke.name}" class="poke-img">
                <span class="poke-name">${poke.name}</span>`;

                pokemonList.appendChild(entry);
            });
    });

    document.getElementById('reset').addEventListener('click', () => {
        chrome.storage.local.set({ pokemon: [] }, () => {
            alert('Collection reset!');
            location.reload();
        });
    });
});
