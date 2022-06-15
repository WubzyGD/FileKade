module.exports = (e, target, window) => {
    if (window.kade.modal) {return;}
    window.kade.context = true;
    let ctx = document.getElementById('ctx');
    ctx.style.display = 'block';
    const ctxf = document.getElementById('ctx-folder');
    const compress = document.getElementById('ctx-compress');
    const compsel = document.getElementById('ctx-compress-selected');
    if (target.classList.contains('folder') || (target.parentElement && target.parentElement.classList.contains('folder'))) {
        ctxf.style.display = 'block';
        ctxf.previousElementSibling.style.display = 'block';
        if (target.classList.contains('folder')) {window.kade.currentFolder = target.children[1].innerHTML.trim();}
        else {window.kade.currentFolder = target.parentElement.children[1].innerHTML.trim();}
        compress.style.display = 'none';
        compsel.style.display = 'block';
    } else {
        ctxf.style.display = 'none';
        ctxf.previousElementSibling.style.display = 'none';
        compress.style.display = 'block';
        compsel.style.display = 'none';
    }
    if (target.classList.contains('zip') || (target.parentElement && target.parentElement.classList.contains('zip'))) {
        if (target.classList.contains('zip')) {window.kade.currentFolder = target.children[1].innerHTML.trim();}
        else {window.kade.currentFolder = target.parentElement.children[1].innerHTML.trim();}
        document.getElementById('ctx-decompress').style.display = 'block';
    } else {
        document.getElementById('ctx-decompress').style.display = 'none';
    }
    ctx.style.left = `${Math.min(e.pageX, (window.innerWidth - (ctx.clientWidth + 2)))}px`;
    ctx.style.top = `${Math.min(e.pageY, ((window.innerHeight + window.scrollY) - (ctx.clientHeight + 2)))}px`;
};