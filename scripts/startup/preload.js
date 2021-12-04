const os = require('os');

const setButtons = require('./setbuttons');
const hideContext = require('../contextmenu/hidecontext');

window.addEventListener('DOMContentLoaded', () => {
    window.kade = {};

    window.kade.elc = false;
    window.kade.cpath = '';
    window.kade.sort = 'Name';
    window.kade.ascend = true;
    window.kade.context = false;

    const startDir = `${os.homedir}\\Desktop`;

    require('../fileview/refresh')(startDir);
    setButtons();

    document.onclick = () => {
        setTimeout(function () {
            if (window.kade.elc) {window.kade.elc = false; return;}
            if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
        }, 100);
        if (window.kade.context) {hideContext(window);}
    }

    document.getElementById('ctx').style.display = 'none';

    require('../keybinds/handleKey')();
});

window.addEventListener('contextmenu', e => {
    e.preventDefault();
    require('../contextmenu/createcontext')(e, e.target, window);
    setTimeout(function () {
        if (window.kade.elc) {window.kade.elc = false; return;}
        if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
    }, 100);
});