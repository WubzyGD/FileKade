const fs = require('fs');
const path = require('path');

const lightRefresh = require('../fileview/lightrefresh');
const preModal = require('../modal/pre');
const postModal = require('../modal/post');
const showError = require('../modal/common/error');
const clearModals = require('../modal/clearmodals');

module.exports = () => {
    if (window.kade.modal) {console.log('hboonk'); return;}
    preModal('new-folder-modal-container');
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'new-folder-modal-container';
    document.body.appendChild(modal);
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
            modal.remove();
            postModal(modal.id);
        } catch {
            clearModals();
            showError("Folder Creation", "There was an unknown error while trying to create that folder. It may be a permissions issue, or the host folder doesn't exist anymore.");
        }
    };
    cont.appendChild(conf);
}