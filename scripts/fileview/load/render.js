const cp = require('child_process');
const path = require('path');

const loadHierarchy = require("../hierarchy");
const newToast = require('../../toast/createtoast');

const isOverflowing = require('../../dep/overflowing');

module.exports = (dir, options) => {
    const refresh = require("../refresh");

    let cdir = dir || window.kade.cdir;
    const exp = document.getElementById('files');
    let num = 0;
    for (let i = 0; i < cdir.length; i++) {
        let file = cdir[i];
        let cfc = document.createElement("div");
        cfc.className = 'file';
        if (options.animate) {cfc.classList.add('rise');}
        if (file.dir) {cfc.classList.add('folder');}
        if (!file.dir && path.extname(path.join(window.kade.cpath, file.trueName)) === '.zip') {cfc.classList.add('zip');}
        cfc.onclick = function () {
            window.kade.elc = true;
            if (cfc.classList.contains('file-active')) {
                if (file.dir) {refresh(`${window.kade.cpath}/${file.name}`);}
                else {
                    try {cp.exec(`${window.kade.cpath}/${file.trueName}`, {shell: 'powershell.exe'}, (error) => {
                        if (error) {newToast("Error", "Unable to open file.", "#a4052b");}
                    });}
                    catch {newToast("Error", "Unable to open file.", "#a4052b");}
                }
            }
            cfc.classList.add('file-active');
            if (window.kade.cl && !cfc.isSameNode(window.kade.cl)) {window.kade.cl.classList.remove('file-active');}
            window.kade.cl = cfc;
        };
        cfc.oncontextmenu = function () {
            window.kade.elc = true;
            if (!cfc.classList.contains('file-active')) {cfc.classList.add('file-active');}
            if (window.kade.cl && !cfc.isSameNode(window.kade.cl)) {window.kade.cl.classList.remove('file-active');}
            window.kade.cl = cfc;
            window.kade.ctxel = cfc;
        };
        if (options.animate) {
            cfc.style = `animation-delay: ${num * .03}s`;
            cfc.onanimationend = () => {
                cfc.style = '';
                cfc.classList.remove('rise');
            };
        }
        exp.appendChild(cfc);
        let im = document.createElement('img');
        im.src = file.icon;
        if (file.icon === './assets/icons/base/file.svg') {im.style.filter = "invert(29%) sepia(72%) saturate(3276%) hue-rotate(296deg) brightness(69%) contrast(97%)";}
        im.className = 'file-icon';
        cfc.appendChild(im);
        let cf = document.createElement('b');
        cf.className = 'file-name';
        cf.innerHTML = file.name;
        cfc.appendChild(cf);
        if (isOverflowing(cf)) {
            cfc.removeChild(cf);
            cf.classList.add('large-file-name');
            cf.style.animationDuration = `${file.name.length / 2.5}s`;
            let lfnc = document.createElement('div');
            lfnc.className = 'large-file-name-container';
            cfc.appendChild(lfnc);
            lfnc.appendChild(cf);
        }
        let isd = document.createElement('p');
        isd.className = 'file-type';
        isd.innerHTML = file.type;
        cfc.appendChild(isd);
        let lm = document.createElement('p');
        lm.className = 'file-date';
        lm.innerHTML = file.lastModifiedString;
        cfc.appendChild(lm);
        let size = document.createElement('p');
        size.className = 'file-size';
        size.innerHTML = file.sizeString;
        cfc.appendChild(size);
        Array.from(cfc.children).forEach(el => el.classList.add('nosel'));
        num++;
    }

    if (options.resetNav) {loadHierarchy();}
    if (!options.scroll && window.kade.scrollY) {
        window.scrollTo(0, window.kade.scrollY);
        window.kade.scrollY = 0;
    }

    if (!cdir.length) {
        let nts = document.createElement('p');
        nts.id = 'nothing-to-show';
        nts.innerHTML = "There's nothing to show here!<br>But you can look at this really pretty box :)<br><br><em>The folder is empty, or I don't have the permissions to show you your files.</em>";
        nts.className = 'nosel';
        exp.appendChild(nts);
    }
};