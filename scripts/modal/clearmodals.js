const transit = require("./transit");

module.exports = (...modals) => {
    let tc = modals.length ? modals : window.kade.modals;
    tc.forEach(modal => {
        if (window.kade.modals.includes(modal)) {
            transit(modal, false);
            document.getElementById(modal).remove();
        }
    });
};