const path = require('path');

module.exports = () => {
    return require('./compress')(undefined, path.join(window.kade.cpath, window.kade.currentFolder));
};