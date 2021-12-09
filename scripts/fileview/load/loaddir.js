const load = require('./load');
const sort = require('./sort');
const render = require('./render');

module.exports = (dir, options) => {
    window.kade.cpath = dir;
    window.kade.cdir = [];

    load();
    sort();
    render(undefined, options);
};