const loadDir = require('./load/loaddir');

const headers = require('../../json/headers.json');

module.exports = (newPath, options={animate:true,scroll:true,resetNav:true}) => {
    ['animate', 'scroll', 'resetNav'].forEach(k => {if (typeof options[k] === 'undefined') {options[k] = true;}});
    document.getElementById('files').remove();
    let files = document.createElement('div');
    files.className = 'files';
    files.setAttribute('id', 'files');
    document.getElementById('container').appendChild(files);
    let fh = document.createElement('div');
    fh.className = 'file-header';
    fh.setAttribute('id', 'file-header');
    files.appendChild(fh);
    Object.keys(headers).forEach(k => {
        let temp = document.createElement('p');
        temp.innerHTML = k;
        temp.style = `flex-basis: ${headers[k]}%;`;
        temp.className = 'nosel';
        fh.appendChild(temp);
    });
    if (options.resetNav) {
        document.getElementById('header-nav').remove();
        let nav = document.createElement('div');
        nav.setAttribute('id', 'header-nav');
        document.getElementById('controls').appendChild(nav);
    }
    if (options.scroll) {window.scrollTo(0, 0);}
    loadDir(newPath, options);
};