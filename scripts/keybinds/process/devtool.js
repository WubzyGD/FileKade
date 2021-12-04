module.exports = (broswerWindow, app) => {
    broswerWindow.webContents.openDevTools();
    return 'opened inspect element';
};