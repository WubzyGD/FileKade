const path = require('path');

module.exports = () => {
    const refresh = require('./refresh');

    let tpath = window.kade.cpath;
    let npath = tpath;
    let hierarchy = [];
    let fhierarchy = [];
    while (true) {
        hierarchy.push(path.basename(npath));
        fhierarchy.push(npath);
        npath = path.resolve(tpath, '..');
        if (npath === tpath) {break;}
        tpath = npath;
    }
    hierarchy.reverse().shift();
    fhierarchy.reverse().shift();
    for (let i = 0; i < hierarchy.length; i++) {
        let dir = hierarchy[i];
        let btn = document.createElement('p');
        btn.onclick = () => {refresh(fhierarchy[i]);};
        btn.innerHTML = dir;
        document.getElementById('header-nav').appendChild(btn);
        if ((i + 1) < hierarchy.length) {
            let arrow = document.createElement('img');
            arrow.src = './assets/icons/base/nav-arrow.svg';
            arrow.className = 'header-nav-arrow';
            document.getElementById('header-nav').appendChild(arrow);
        }
    }
};