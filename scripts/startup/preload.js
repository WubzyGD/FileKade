const os = require('os');
const moment = require('../dep/moment');
const {ipcRenderer} = require('electron');

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
        modal: false,
        version: {
            name: "Alpha",
            semver: require('../../package.json').version
        },
        platform: undefined
    };

    const platform = ipcRenderer.sendSync('preload', 'request-platform');
    window.kade.platform = platform;

    let startDir
    switch (platform) {
        case 'win32':
            startDir = `${os.homedir}\\Desktop`;
            break;
        case 'linux':
            startDir = `/home`;
            break;
    }

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

    setTimeout(() => {createToast("Welcome", ["Welcome to FileKade!", "App by WubzyGD", "Alpha/Pre-release Build"], '#5d60ca', false, 20);}, 1600);
    setTimeout(() => {createToast("Welcome", [`Today is ${moment().format('MMMM Do, YYYY')}`, `The time is ${moment().format('h:mma')}`], '#5d60ca', false, 20);}, 1300);
    setTimeout(() => {createToast("Recent Changes", "Click to view changelog", '#5d60ca', false, 10, () => {require('./changelog')();});}, 1000);

    document.getElementById('title').innerHTML = `FileKade - ${window.kade.version.name} ${window.kade.version.semver}`;
});

window.addEventListener('contextmenu', e => {
    e.preventDefault();
    require('../contextmenu/createcontext')(e, e.target, window);
    setTimeout(function () {
        if (window.kade.elc) {window.kade.elc = false; return;}
        if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
    }, 100);
});