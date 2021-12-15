const {ipcMain: ipc} = require('electron');

module.exports = (browserWindow, app) => {
    ipc.on('keybind', (event, arg) => {
        try {event.returnValue = require(`./${arg}`)(browserWindow, app);} catch {}
    });
    ipc.on('preload', (event, arg) => {
        if (arg === 'request-platform') {event.returnValue = process.platform;}
    });
};