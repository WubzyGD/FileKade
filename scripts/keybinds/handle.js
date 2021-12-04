const mousetrap = require('../dep/mousetrap');

const binds = require('../../json/shortcuts.json');

module.exports = () => {
    Object.keys(binds).forEach((bind) => {
        mousetrap.bind(bind, require(`./${binds[bind]}.js`));
    });
};