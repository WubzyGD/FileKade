const load = require('./load/load');
const sort = require('./load/sort');
const lightRefresh = require("./lightrefresh");

module.exports = () => {
    if (!window.kade.cpath.length || !window.kade.cdir.length) {return;}
    window.kade.chdir = [];
    load(true);
    sort(undefined, true);
    if (JSON.stringify(window.kade.cdir) !== JSON.stringify(window.kade.chdir)) {
        //console.log('Detected directory updates.', JSON.stringify(window.kade.cdir), JSON.stringify(window.kade.chdir));
        lightRefresh();
    }
};