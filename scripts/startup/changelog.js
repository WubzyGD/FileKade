const fs = require('fs');
const Mousetrap = require('../dep/mousetrap');
const path = require('path');

const preModal = require('../modal/pre');
const postModal = require('../modal/post');

const changelogs = fs.readdirSync(path.join(__dirname, '../../', '/json/changelogs')).filter(file => file.endsWith('.json'));

module.exports = () => {
    if (window.kade.modal) {return;}
    preModal('changelog-modal');
    let modalOut = document.createElement('div');
    modalOut.className = 'modal';
    modalOut.id = 'changelog-modal';
    document.body.appendChild(modalOut);
    let modal = document.createElement('div');
    modal.className = 'modal-wrapper';
    modalOut.appendChild(modal);
    let title = document.createElement('h2');
    title.innerHTML = 'FileKade - Changelog';
    modal.appendChild(title);

    let clww = document.createElement('div');
    clww.className = 'changelog-anchor';
    modal.appendChild(clww);

    let clw = document.createElement('div');
    clw.className = 'changelog-wrapper';
    clww.appendChild(clw);

    changelogs.reverse().forEach(changelog => {
        changelog = require(`../../json/changelogs/${changelog}`);
        let w = document.createElement('div');
        w.className = 'changelog-version-container';
        clw.appendChild(w);
        let subtitle = document.createElement('h2');
        subtitle.className = 'subtitle';
        subtitle.innerHTML = `${changelog.version.name} ${changelog.version.semver}${window.kade.version.semver === changelog.version.semver ? ' (Current)' : ''}`;
        w.appendChild(subtitle);
        let cl = changelog.log;
        Object.keys(cl).forEach(group => {
            let gc = document.createElement('div');
            gc.className = 'changelog-group-container';
            w.appendChild(gc);
            let gt = document.createElement('p');
            gt.innerHTML = group;
            gt.className = 'changelog-group-name';
            gc.appendChild(gt);
            let ul = document.createElement('ul');
            gc.appendChild(ul);
            cl[group].forEach(item => {
                let li = document.createElement('li');
                ul.appendChild(li);
                let itemp = document.createElement('p');
                itemp.innerHTML = item;
                li.appendChild(itemp);
            });
        });
    });

    clww.style = `height: ${modalOut.clientHeight - 6};`; // TODO cry enough tears that they magically make this line work
    console.log(clww.style.height);
    console.log(modalOut.clientHeight - 6);
    console.log(typeof clww.style);

    let msm = new Mousetrap(modal);
    msm.bind('esc', () => {
        modalOut.remove();
        postModal(modalOut.id);
    });

    let close = document.createElement('a');
    close.className = 'close-button';
    close.onclick = () => {
        modalOut.remove();
        postModal(modalOut.id);
    };
    let closeWrap = document.createElement('div');
    closeWrap.className = 'close-button-wrapper';
    modal.appendChild(closeWrap);
    closeWrap.appendChild(close);
}