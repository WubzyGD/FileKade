const fs = require('fs');
const path = require('path');
const az = require('adm-zip');
const Mousetrap = require('../dep/mousetrap');

const lightRefresh = require('../fileview/lightrefresh');
const preModal = require('../modal/pre');
const postModal = require('../modal/post');
const showError = require('../modal/common/error');
const clearModals = require('../modal/clearmodals');
const newToast = require('../toast/createtoast');
const refresh = require('../fileview/refresh');

module.exports = () => {
    let zip = new az();
    if (window.kade.modal) {return;}
    preModal('compress-folder-modal-container');
    let modalOut = document.createElement('div');
    modalOut.className = 'modal';
    modalOut.id = 'compress-folder-modal-container';
    document.body.appendChild(modalOut);
    let modal = document.createElement('div');
    modal.className = 'modal-wrapper';
    modalOut.appendChild(modal);
    let title = document.createElement('h2');
    title.innerHTML = 'Compress Folder';
    modal.appendChild(title);
    let text = document.createElement('p');
    text.innerHTML = "Please name the zip you'd like to compress to.";
    modal.appendChild(text);
    let cont = document.createElement('div');
    cont.className = 'button-container';
    modal.appendChild(cont);
    let input = document.createElement('input');
    input.placeholder = window.kade.cpath.split(/\\+|\/+/gm).reverse()[0];
    input.value = input.placeholder;
    input.id = 'compress-folder-input';
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
            input.value = input.value.trim();
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
            input.style.display = 'none';
            conf.style.display = 'none';
            cont.style.display = 'none';
            text.innerHTML = "Please wait a moment...";
            zip.addLocalFolderPromise(window.kade.cpath).then(() => {
                title.innerHTML += " - In Progress..."
                text.innerHTML = "Your folder is being compressed. Please wait a moment.<br><br>This may take some time...";
                closeWrap.style.display = 'none';
                let bar = document.createElement('div');
                bar.className = "loading-bar";
                modal.appendChild(bar);
                zip.writeZipPromise(`${window.kade.cpath}/${input.value}${input.value.endsWith('.zip') ? '' : '.zip'}`, {overwrite: true}).then(() => {
                    newToast("Folder compressed", [`The current folder was compressed into "${input.value}" successfully`, `<em>${window.kade.cpath}/${input.value}</em>`], undefined, false, 5);
                    lightRefresh();
                    modalOut.remove();
                    postModal(modalOut.id);    
                });
            });
        } catch {
            newToast("Folder not Compressed", "An error caused that folder to not be compressed.", "#b24355", false, 5, () => {showError("Folder Creation", "There was an unknown error while trying to compress that folder. It may be a permissions issue, or the host folder doesn't exist anymore.");});
            clearModals();
            postModal(modalOut.id);
        }
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
};