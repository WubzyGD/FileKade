const refresh = require('./refresh');

module.exports = (newPath, customOptions) => {
    return refresh(newPath || window.kade.cpath, customOptions || {animate: false, resetNav: false, scroll: false});
};