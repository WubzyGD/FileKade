module.exports = () => {
    require('../toast/createtoast')("Refresh", "View refreshed!", undefined, undefined, undefined, () => require('../toast/createtoast')("Refresh vs. Reload", "Your view was refreshed. This means any changes to files or folders in the directory you're currently viewing will show. This should be all you need, but if the app is behaving weirdly, or you changed some settings that aren't loading properly, you can do a hard reload with <b>Ctrl + Shift + R</b>.", undefined, undefined, 10));
    require('../fileview/lightrefresh')(window.kade.cpath);
};