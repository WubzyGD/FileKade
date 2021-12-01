module.exports = (mode) => {
    mode = mode || window.kade.sort;
    switch (mode) {
        case 'Name':
            window.kade.cdir.sort((a, b) => {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                return a > b ? 1 : a < b ? -1 : 0;
            });
            break;
        case 'Date':
            window.kade.cdir.sort((a, b) => a.lastModified - b.lastModified);
            break;
        case 'Type':
            window.kade.cdir.sort((a, b) => {
                a = a.type.toLowerCase();
                b = b.type.toLowerCase();
                return a > b ? 1 : a < b ? -1 : 0;
            });
            break;
        case 'Size':
            window.kade.cdir.sort((a, b) => a.size - b.size);
            break;
    }
    if (!window.kade.ascend) {window.kade.cdir.reverse();}
};