const os = require('os');
const moment = require('../dep/moment');

const setButtons = require('./setbuttons');
const hideContext = require('../contextmenu/hidecontext');
const lightRefresh = require('../fileview/lightrefresh');
const checkDir = require('../fileview/checkdir');
const createToast = require('../toast/createtoast');

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

    setTimeout(() => {createToast("Welcome", [`Today is ${moment().format('MMMM Do, YYYY')}`, `The time is ${moment().format('h:mma')}`], '#5d60ca', false, 10);}, 1000);
    setTimeout(() => {createToast("Welcome", ["Welcome to FileKade!", "App by WubzyGD", "Alpha/Pre-release Build"], '#5d60ca', false, 10);}, 1300);
});

window.addEventListener('contextmenu', e => {
    e.preventDefault();
    require('../contextmenu/createcontext')(e, e.target, window);
    setTimeout(function () {
        if (window.kade.elc) {window.kade.elc = false; return;}
        if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
    }, 100);
});