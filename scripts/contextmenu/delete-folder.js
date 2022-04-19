const fs = require('fs');
const path = require('path');
const Mousetrap = require('../dep/mousetrap');

const lightRefresh = require('../fileview/lightrefresh');
const preModal = require('../modal/pre');
const postModal = require('../modal/post');
const showError = require('../modal/common/error');
const clearModals = require('../modal/clearmodals');
const newToast = require('../toast/createtoast');

module.exports = () => {
    if (window.kade.modal) {return;}
    preModal('delete-folder-modal-container');
    let modalOut = document.createElement('div');
    modalOut.className = 'modal';
    modalOut.id = 'delete-folder-modal-container';
    document.body.appendChild(modalOut);
    let modal = document.createElement('div');
    modal.className = 'modal-wrapper';
    modalOut.appendChild(modal);
    let title = document.createElement('h2');
    title.innerHTML = 'Delete Folder';
    modal.appendChild(title);
    let text = document.createElement('p');
    text.innerHTML = "Are you sure you'd like to delete this folder? Remember, this <b>cannot be undone</b>.";
    modal.appendChild(text);
    let cont = document.createElement('div');
    cont.className = 'button-container';
    modal.appendChild(cont);
    let conf = document.createElement('button');
    conf.innerHTML = 'Delete it!';
    let cxl = document.createElement('button');
    cxl.innerHTML = "Nevermind";
    cxl.onclick = () => {
        lightRefresh();
        modalOut.remove();
        postModal(modalOut.id);
    };
    conf.onclick = () => {
        try {
            fs.rmdirSync(path.join(window.kade.cpath, window.kade.currentFolder));
            postModal(modalOut.id);
            modalOut.remove();
            lightRefresh(window.kade.cpath);
            newToast("Folder Deleted", "Your folder has been deleted successfully.");
        } catch {
            newToast("Folder not Deleted", "An error caused that folder to not be deleted.", "#b24355", false, 5, () => {showError("Folder Deletion", "There was an unknown error while trying to delete that folder. It may be a permissions issue, or the host folder doesn't exist anymore.");});
            clearModals();
            try {modalOut.remove();} catch {}
            postModal(modalOut.id);
        }
    };
    cont.appendChild(conf);
    cont.appendChild(cxl);
    let iin = document.createElement('input');
    iin.className = 'invis';
    iin.classList.add('nosel');
    cont.appendChild(iin);
    iin.focus();
    let msm = new Mousetrap(modal);
    msm.bind('esc', () => {
        lightRefresh();
        modalOut.remove();
        postModal(modalOut.id);
    });
    msm.bind('enter', () => {conf.click();});
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
};