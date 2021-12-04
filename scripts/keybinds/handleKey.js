const mousetrap = require('../dep/mousetrap');
const electron = require('electron'); const ipc = electron.ipcRenderer;

const binds = require('../../json/shortcuts.json');

module.exports = () => {
    const sendIpcMessage = (message) => {
        ipc.sendSync('keybind', message);
    };

    Object.keys(binds).forEach((bind) => {
        mousetrap.bind(bind, () => sendIpcMessage(binds[bind]));
    });
};