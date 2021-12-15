const electron = require('electron');

module.exports = () => {
    electron.ipcRenderer.sendSync('keybind', 'reload');
};