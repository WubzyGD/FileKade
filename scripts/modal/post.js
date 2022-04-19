const transit = require("./transit");

module.exports = (id) => {
    try {
        try {document.getElementById('modal-block').remove();} catch {}
        window.kade.modal = false;
        document.body.style.overflowY = 'overlay';
        transit(id, false);
    } catch {}
};