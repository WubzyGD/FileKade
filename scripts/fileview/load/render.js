const loadHierarchy = require("../hierarchy");

const isOverflowing = require('../../dep/overflowing');

module.exports = (dir, options) => {
    const refresh = require("../refresh");

    let cdir = dir || window.kade.cdir;
    let num = 0;
    for (let i = 0; i < cdir.length; i++) {
        let file = cdir[i];
        const exp = document.getElementById('files');
        let cfc = document.createElement("div");
        cfc.className = 'file';
        if (options.animate) {cfc.classList.add('rise');}
        cfc.onclick = function () {
            window.kade.elc = true;
            if (cfc.classList.contains('file-active')) {if (file.dir) {refresh(`${window.kade.cpath}\\${file.name}`);}}
            cfc.classList.add('file-active');
            if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
            window.kade.cl = cfc;
        };
        cfc.oncontextmenu = function () {
            window.kade.elc = true;
            if (!cfc.classList.contains('file-active')) {cfc.classList.add('file-active');}
            if (window.kade.cl) {window.kade.cl.classList.remove('file-active');}
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
};