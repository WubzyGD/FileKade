const refresh = require('../fileview/refresh');

const modes = ['Name', 'Date', 'Size', 'Type'];

module.exports = (mode) => {
    window.kade.sort = mode || window.kade.sort === 'Type' ? 'Name' : modes[modes.indexOf(window.kade.sort) + 1];
    let sb = document.getElementById('sort-button');
    sb.innerHTML = `Sort by: ${window.kade.sort}`;
    document.getElementById('ctx-sort-by').innerHTML = `Sort by: ${window.kade.sort}`;
    refresh(window.kade.cpath);
};