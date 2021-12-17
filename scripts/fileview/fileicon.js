const icons = require('../../json/icons.json');
const fs = require('fs');
const path = require('path');

module.exports = (fpath, name) => {
    let icon;
    try {
        if (fs.lstatSync(fpath).isDirectory()) {
            if (fs.existsSync(`./assets/icons/folder/folder-${name.toLowerCase()}`)) {icon = `./assets/icons/folder/folder-${name.toLowerCase()}`;}
            else {icon = './assets/icons/base/folder.svg';}
        }
        /*else if (['.lnk'].includes(path.extname(file))) {
            try {isrc = shell.readShortcutLink(`${dir}\\${file}`).icon;}
            catch {
                isrc = './assets/icons/base/file.svg';
                im.style.filter = "invert(29%) sepia(72%) saturate(3276%) hue-rotate(296deg) brightness(69%) contrast(97%)";
            }
        }*/
        else {
            let ext = name.startsWith('.') ? name : path.extname(name);
            if (name.includes('.') && fs.existsSync(`./assets/icons/extension/${(ext.toLowerCase()).slice(1)}.svg`)) {icon = `./assets/icons/extension/${(ext.toLowerCase()).slice(1)}.svg`;}
            else if (name.includes('.') && Object.keys(icons.file).includes((ext.toLowerCase()).slice(1))) {icon = `./assets/icons/extension/${icons.file[(ext.toLowerCase()).slice(1)]}.svg`;}
            else {icon = './assets/icons/base/file.svg';}
        }
    } catch {icon = './assets/icons/base/file.svg';}
    return icon;
};