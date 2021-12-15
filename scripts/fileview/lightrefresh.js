const refresh = require('./refresh');

module.exports = (newPath, customOptions) => {
    window.kade.currentScroll = window.scrollY;
    return refresh(newPath || window.kade.cpath, customOptions || {animate: false, resetNav: false, scroll: false});
};