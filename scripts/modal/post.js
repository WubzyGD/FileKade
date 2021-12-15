const transit = require("./transit");

module.exports = (id) => {
    document.getElementById('modal-block').remove();
    window.kade.modal = false;
    document.body.style.overflow = 'auto';
    transit(id, false);
};