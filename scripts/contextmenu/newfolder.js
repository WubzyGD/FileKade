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
    preModal('new-folder-modal-container');
    let modalOut = document.createElement('div');
    modalOut.className = 'modal';
    modalOut.id = 'new-folder-modal-container';
    document.body.appendChild(modalOut);
    let modal = document.createElement('div');
    modal.className = 'modal-wrapper';
    modalOut.appendChild(modal);
    let title = document.createElement('h2');
    title.innerHTML = 'New Folder';
    modal.appendChild(title);
    let text = document.createElement('p');
    text.innerHTML = "Please name your new folder.";
    modal.appendChild(text);
    let cont = document.createElement('div');
    cont.className = 'button-container';
    modal.appendChild(cont);
    let input = document.createElement('input');
    input.placeholder = 'New Folder';
    input.id = 'new-folder-input';
    let lastIn = '';
    input.oninput = () => {
        if (!input.value.match(/^[a-zA-Z0-9-_() ]*$/gm)) {input.value = lastIn;}
        else {lastIn = input.value;}
    };
    cont.appendChild(input);
    let conf = document.createElement('button');
    conf.innerHTML = 'Create';
    conf.onclick = () => {
        try {
            input.value.trim();
            if (!input.value.length) {return;}
            if (fs.existsSync(path.join(window.kade.cpath, input.value))) {
                if (!input.value.match(/^.+\(\d\)$/gm)) {input.value += ' (1)';}
                else {
                    let tempstr = input.value.split('');
                    tempstr[input.value.length - 2] = `${Number(input.value.charAt(input.value.length - 2)) + 1}`;
                    input.value = tempstr.join('');
                }
                return;
            }
            fs.mkdirSync(path.join(window.kade.cpath, input.value));
            lightRefresh();
            modalOut.remove();
            newToast("Folder created", [`Folder "${input.value}" created successfully`, `<em>${window.kade.cpath}\\${input.value}</em>`]);
        } catch {
            newToast("Folder not Created", "An error caused that folder to not be created.", "#b24355", false, 5, () => {showError("Folder Creation", "There was an unknown error while trying to create that folder. It may be a permissions issue, or the host folder doesn't exist anymore.");});
            clearModals();
        }
        postModal(modalOut.id);
    };
    cont.appendChild(conf);
    input.focus();
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
}