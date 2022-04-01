const refresh = require('../fileview/refresh');

const qa = require('../../json/qa.json');
const os = require("os");
const fs = require('fs');
const path = require('path');

module.exports = () => {
    let root
    switch (window.kade.platform) {
        case 'win32':
            root = `${os.homedir()}`;
            break;
        case 'linux':
            root = `~/home`;
            break;
    }

    let quickAccess = document.getElementById('favorites-container');

    qa.default.forEach(i => {
        let quick = document.createElement('div');
        quick.innerHTML = i.name;
        quick.onclick = () => {refresh(i[window.kade.platform].replace('{r}', root));};
        quick.className = 'favorites-button';
        quick.classList.add('nosel');
        quickAccess.appendChild(quick);
    });

    if (fs.existsSync(path.join(__dirname, '../../', '/json/config/favorites.json'))) {
        const pins = require('../../json/config/favorites.json');
        let cfc = document.getElementById('custom-favorites-container');
        Object.keys(pins).forEach(pin => {
            let fav = document.createElement('div');
            ['favorites-button', 'folder-pin', 'nosel'].forEach(x => fav.classList.add(x));
            fav.innerHTML = pins[pin];
            fav.onclick = () => {refresh(pin);};
            cfc.appendChild(fav);
        });
    }
};