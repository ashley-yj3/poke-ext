document.addEventListener('DOMContentLoaded', function() {
    const dex = document.querySelector('.dex');  

    chrome.storage.local.get(["pokemon"], function(result) {
        const pokemon = result.pokemon || [];
        pokemon.forEach(name => {
            const p = document.createElement('p');
            p.textContent = name.name;  
            dex.appendChild(p);
        });
    });

    document.getElementById('reset').addEventListener('click', function() {
        chrome.storage.local.set({ pokemon: [] }, () => {
            location.reload();
        });
    });
});
