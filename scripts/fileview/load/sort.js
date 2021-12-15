module.exports = (mode, check=false) => {
    mode = mode || window.kade.sort;
    let ts = check ? window.kade.chdir : window.kade.cdir;
    switch (mode) {
        case 'Name':
            ts.sort((a, b) => {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                return a > b ? 1 : a < b ? -1 : 0;
            });
            break;
        case 'Date':
            ts.sort((a, b) => a.lastModified - b.lastModified);
            break;
        case 'Type':
            ts.sort((a, b) => {
                a = a.type.toLowerCase();
                b = b.type.toLowerCase();
                return a > b ? 1 : a < b ? -1 : 0;
            });
            break;
        case 'Size':
            ts.sort((a, b) => a.size - b.size);
            break;
    }
    if (!window.kade.ascend) {ts.reverse();}
};