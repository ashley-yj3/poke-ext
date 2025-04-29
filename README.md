# Productive Pokemon Chrome Extension

## Overview
This extension tracks how much time you're on a "productive site" and spawns pokemon to your screen depending on how long you remain on those sites. The longer you spend staying focused the rarer the pokemon that spawn! You can store a collection of all the pokemon you've caught and come back to them at any time by clicking the extension icon :)

## Software Requirements
- JavaScript
- HTML
- CSS
- Chrome Browser

## Development Setup
### Local Setup
Clone the repository:
```bash
    git clone https://github.com/ashley-yj3/poke-ext.git
    cd poke-ext
```

### Chrome Extension Setup
1. Open Chrome and navigate to `chrome://extensions/`

2. Enable ***Developer mode*** using the toggle in the top right corner

3. Select ***Load unpacked*** in the top left corner

4. Select the entire `poke-ext` repository

### Productive Site User Personalizations
Feel free to add your own productive sites or adjust any of the pre-included ones! 

1. Open the `background.js` file
2. Add the general url for any sites you wish to include in the `ProductiveSites` array

### Pokemon User Personalizations
If there are any pokemon you really wish to catch that aren't included you can add them!

1. Add an image for your desired pokemon in the imgs folder

2. Open the `content.js` file

3. Locate the `poke` array at the top of the file

4. Add in your pokemon following this format:
```bash
    {name: "Pokemon_Name", rarity: "Pokemon_Rarity"},
```

5. Locate the `poke_imgs` array in the `get_pokeimg` function at the bottom of the file

6. Add in your pokemon following this format:
```bash
    Pokemon_Name: chrome.runtime.getURL('imgs/file_name.png'),
```

7. Ensure the Pokemon_Name used in step 4. and step 6. is **exactly** the same