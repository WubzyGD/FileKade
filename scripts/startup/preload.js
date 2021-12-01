const os = require('os');

const setButtons = require('./setbuttons');

window.addEventListener('DOMContentLoaded', () => {
    window.kade = {};

    window.kade.elc = false;
    window.kade.cpath = '';
    window.kade.sort = 'Name';
    window.kade.ascend = true;

    const startDir = `${os.homedir}\\Desktop`;

    require('../fileview/refresh')(startDir);
    setButtons();

    document.onclick = () => {
        setTimeout(function () {
            if (window.kade.elc) {window.kade.elc = false; return;}
            if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
        }, 100);
    }
});
