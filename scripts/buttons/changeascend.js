const refresh = require("../fileview/refresh");

module.exports = () => {
    window.kade.ascend = !window.kade.ascend;
    document.getElementById('order-button').innerHTML = window.kade.ascend ? "Ascending" : "Descending";
    refresh(window.kade.cpath);
};