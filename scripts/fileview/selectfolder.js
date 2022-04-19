module.exports = (name) => {
    let folders = document.getElementById('files').getElementsByClassName('folder');
    let folder = 1;
    for (let i = 0; i < folders.length; i++) {
        if (folders.item(i).children.item(1).innerHTML === name) {
            folder = folders.item(i);
            folder.click();
            break;
        }
    }
    return folder;
};