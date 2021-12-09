const fs = require('fs');
const path = require('path');
const moment = require("../../dep/moment");

const fileIcon = require('../fileicon');

const trimext = require("../../../json/trimext.json");
const extensions = require("../../../json/extensions.json");
const getsize = require("../../fileview/filesize");

module.exports = (check=false) => {
    let load = check ? window.kade.chdir : window.kade.cdir;
    let dir = window.kade.cpath;
    let ldir = fs.readdirSync(dir);

    for (const file of ldir) {
        let ofile = {};
        ofile.icon = fileIcon(`${dir}\\${file}`, file);
        ofile.name = trimext.includes(path.extname(file)) ? file.slice(0, file.length - path.extname(file).length) : file;
        try {ofile.type = fs.lstatSync(`${dir}\\${file}`).isDirectory() ? "File Folder" : (extensions[path.extname(file).slice(1)] || "File");}
        catch {ofile.type = `${path.extname(file)} File`.trim();}
        try {ofile.lastModified = new Date(fs.lstatSync(`${dir}\\${file}`).mtimeMs);}
        catch {ofile.lastModified = 0;}
        try {ofile.lastModifiedString = ofile.lastModified === 0 ? '' : moment(ofile.lastModified).format('M/D/YYYY, h:mm:ssa');}
        catch {ofile.lastModifiedString = '';}
        try {
            if (fs.lstatSync(`${dir}\\${file}`).isFile()) {
                ofile.size = fs.lstatSync(`${dir}\\${file}`).size;
                ofile.sizeString = `${getsize(ofile.size)}`;
                ofile.dir = false;
            } else {
                ofile.size = 0;
                ofile.sizeString = '';
                ofile.dir = true;
            }
        } catch {
            ofile.size = 0;
            ofile.sizeString = '';
            ofile.dir = true;
        }
        load.push(ofile);
    }
};