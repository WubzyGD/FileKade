const mousetrap = require('../dep/mousetrap');
const electron = require('electron'); const ipc = electron.ipcRenderer;

const binds = require('../../json/shortcuts.json');

module.exports = () => {
    const sendIpcMessage = (message) => {
        ipc.sendSync('keybind', message);
    };

    const process = binds.process;
    const renderer = binds.renderer;

    Object.keys(process).forEach((bind) => {
        mousetrap.bind(bind, () => sendIpcMessage(process[bind]));
    });

    Object.keys(renderer).forEach((bind) => {
        mousetrap.bind(bind, require(`./renderer/${renderer[bind]}`));
    });
};