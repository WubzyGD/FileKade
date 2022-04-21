const path = require('path');

const refresh = require("../fileview/refresh");
const changesort = require('../buttons/changesort');
const changeascend = require('../buttons/changeascend');

module.exports = () => {
    let hb = document.getElementById('header-buttons');

    let backb = document.createElement('p');
    backb.innerHTML = 'Go Back';
    backb.setAttribute('id', 'back-button');
    backb.className = 'header-button';
    backb.classList.add('nosel');
    backb.onclick = () => {
        if (window.kade.cpath !== 'C:\\' && window.kade.cpath !== '\\') {refresh(path.join(window.kade.cpath, '..'));}
    };
    hb.appendChild(backb);

    let sb = document.createElement('p');
    sb.innerHTML = 'Sort by: Name';
    sb.className = 'header-button';
    sb.classList.add("nosel");
    sb.onclick = () => {changesort();};
    sb.setAttribute('id', 'sort-button');
    hb.appendChild(sb);

    let ob = document.createElement('p');
    ob.innerHTML = 'Ascending';
    ob.className = 'header-button';
    ob.classList.add("nosel");
    ob.onclick = () => {changeascend();};
    ob.setAttribute('id', 'order-button');
    hb.appendChild(ob);
}