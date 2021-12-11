const transit = require('./transit');

module.exports = (id) => {
    let bl = document.createElement('div');
    bl.id = 'modal-block';
    document.body.appendChild(bl);
    window.kade.modal = true;
    transit(id, true);
};