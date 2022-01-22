module.exports = () => {
    require('../toast/createtoast')("Refresh", "View refreshed!");
    require('../fileview/lightrefresh')(window.kade.cpath);
};