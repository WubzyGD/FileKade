const preModal = require("../pre");
const postModal = require('../post');

module.exports = (name, text, after = () => {}) => {
    preModal('error-modal');
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.classList.add('error-modal');
    modal.id = 'error-modal';
    document.body.appendChild(modal);
    let title = document.createElement('h2');
    title.innerHTML = `Error - ${name}`;
    modal.appendChild(title);
    let err = document.createElement('p');
    err.innerHTML = text;
    modal.appendChild(err);
    after('error-modal');
    postModal();
};