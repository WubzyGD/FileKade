const refresh = require('../fileview/refresh');

const qa = require('../../json/qa.json');
const os = require("os");

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
};