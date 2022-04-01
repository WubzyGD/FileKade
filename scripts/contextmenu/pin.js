const fs = require('fs');
const path = require('path');

const createToast = require('../toast/createtoast');
const refresh = require('../fileview/refresh');
const newToast = require("../toast/createtoast");

module.exports = () => {
    let pins;
    if (fs.existsSync(path.join(__dirname, '../../', '/json/config/favorites.json'))) {
        pins = require('../../json/config/favorites.json');
    } else {pins = {};}
    let fta = window.kade.currentFolder.trim();
    if (Object.keys(pins).includes(`${window.kade.cpath.replace(/\\+/gm, '/')}/${fta}`)) {
        return createToast("Already pinned", "That folder is already pinned!");
    }
    let tr = `${window.kade.cpath.replace(/\\+/gm, '/')}/${fta}`;
    pins[tr] = fta;
    let cfc = document.getElementById('custom-favorites-container');
    let fav = document.createElement('div');
    ['favorites-button', 'folder-pin', 'nosel'].forEach(x => fav.classList.add(x));
    fav.innerHTML = fta;
    fav.onclick = () => {refresh(tr);};
    cfc.appendChild(fav);
    createToast(
        "Folder Pinned", [`Folder "${fta}" was successfully pinned! You can now access it permanently in your sidebar!"`, `<em>${window.kade.cpath.replace(/\\+/gm, '/')}/${fta}</em>`], undefined, false, 5,
        () => {
            refresh(tr);
            require('electron').clipboard.writeText(`${window.kade.cpath.replace(/\\+/gm, '/')}`);
            newToast("Copied!", "<em>The folder's path has been copied to your clipboard.</em>", "#19df46");
        }
    );
    try {fs.writeFileSync(path.join(__dirname, '../../', '/json/config/favorites.json'), JSON.stringify(pins));}
    catch {createToast("Error", "Your pin was not saved for some reason. Please restart or reload (ctrl+shift+r) the app and try again.", "#ff557a");}
};