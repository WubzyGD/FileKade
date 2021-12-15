const transit = require('./transit');

module.exports = (id) => {
    let bl = document.createElement('div');
    bl.id = 'modal-block';
    document.body.appendChild(bl);
    window.kade.modal = true;
    document.getElementById('modal-block').style.top = `${window.scrollY}px`;
    document.body.style.overflow = 'hidden';
    transit(id, true);
};