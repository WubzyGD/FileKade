const path = require('path');
const fs = require('fs');

const load = require('./load/load');
const sort = require('./load/sort');
const lightRefresh = require("./lightrefresh");
const refresh = require('../fileview/refresh');
const newToast = require("../toast/createtoast");
const hideContext = require('../contextmenu/hidecontext');

module.exports = () => {
    if (!window.kade.cpath.length) {return;}
    if (!fs.existsSync(window.kade.cpath)) {
        let cp = window.kade.cpath;
        while (true) {
            if (!fs.existsSync(cp)) {cp = path.join(cp, '..');}
            else {break;}
        }
        refresh(cp);
        newToast("Folder Deleted", `The folder you were viewing no longer exists (this usually means it was removed from another app) so you were automatically moved to the nearest existing folder in hierarchy: <em>${cp}</em>`, '#b24355', false, 10);
    }
    window.kade.chdir = [];
    load(true);
    sort(undefined, true);
    if (JSON.stringify(window.kade.cdir) !== JSON.stringify(window.kade.chdir)) {
        //console.log('Detected directory updates.', JSON.stringify(window.kade.cdir), JSON.stringify(window.kade.chdir));
        lightRefresh();
        newToast('External Directory Change', "Looks like the folder you're viewing was changed outside of this app. I've refreshed for you though <3", undefined, undefined, 10);
        hideContext();
    }
};