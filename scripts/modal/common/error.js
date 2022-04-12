const mousetrap = require('../../dep/mousetrap');

const lightRefresh = require('../../fileview/lightrefresh');
const preModal = require('../pre');
const postModal = require('../post');

module.exports = (name, text, after = () => {}) => {
    if (window.kade.modal) {return;}
    preModal('error-modal-container');
    let modalOut = document.createElement('div');
    modalOut.className = 'modal';
    modalOut.id = 'error-modal-container'
    document.body.appendChild(modalOut);
    let modal = document.createElement('div');
    modal.className = 'modal-wrapper';
    modalOut.appendChild(modal);
    modal.classList.add('error-modal');
    modal.id = 'error-modal';
    let title = document.createElement('h2');
    title.innerHTML = `Error - ${name}`;
    modal.appendChild(title);
    let err = document.createElement('p');
    err.innerHTML = text;
    modal.appendChild(err);
    after('error-modal');
    postModal();
    let msm = new mousetrap(modal);
    msm.bind('esc', () => {
        lightRefresh();
        modalOut.remove();
        postModal(modalOut.id);
    });
    let close = document.createElement('a');
    close.className = 'close-button';
    close.onclick = () => {
        lightRefresh();
        modalOut.remove();
        postModal(modalOut.id);
    };
    let closeWrap = document.createElement('div');
    closeWrap.className = 'close-button-wrapper';
    modal.appendChild(closeWrap);
    closeWrap.appendChild(close);
}