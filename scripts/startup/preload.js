const os = require('os');

const setButtons = require('./setbuttons');
const hideContext = require('../contextmenu/hidecontext');
const lightRefresh = require('../fileview/lightrefresh');
const checkDir = require('../fileview/checkdir');

window.addEventListener('DOMContentLoaded', () => {
    window.kade = {
        elc: false,
        cpath: '',
        sort: 'Name',
        ascend: true,
        context: false,
        chdir: [],
        ctxFunc: {},
        modals: [],
        modal: false
    };

    const startDir = `${os.homedir}\\Desktop`;

    require('./initcontext')();

    require('../fileview/refresh')(startDir);
    setButtons();

    document.onclick = () => {
        setTimeout(function () {
            if (window.kade.elc) {window.kade.elc = false; return;}
            if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
            window.kade.ctxel = null;
        }, 100);
        if (window.kade.context) {hideContext(window);}
    }

    window.kade.refreshInterval = setInterval(() => {if (!window.kade.modal) {lightRefresh();}}, 60000);
    window.kade.checkDirInterval = setInterval(checkDir, 5000);

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