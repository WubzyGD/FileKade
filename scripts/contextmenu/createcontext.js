module.exports = (e, target, window) => {
    if (window.kade.modal) {return;}
    window.kade.context = true;
    let ctx = document.getElementById('ctx');
    ctx.style.display = 'block';
    const ctxf = document.getElementById('ctx-folder');
    if (target.classList.contains('file') || (target.parentElement && target.parentElement.classList.contains('file'))) {
        ctxf.style.display = 'block';
        ctxf.previousElementSibling.style.display = 'block';
        if (target.classList.contains('file')) {window.kade.currentFolder = window.kade.cpath + '/' + target.children[1].innerHTML;}
        else {window.kade.currentFolder = window.kade.cpath + '/' + target.parentElement.children[1].innerHTML;}
        console.log(window.kade.currentFolder);
    } else {
        ctxf.style.display = 'none';
        ctxf.previousElementSibling.style.display = 'none';
    }
    ctx.style.left = `${Math.min(e.pageX, (window.innerWidth - (ctx.clientWidth + 2)))}px`;
    ctx.style.top = `${Math.min(e.pageY, ((window.innerHeight + window.scrollY) - (ctx.clientHeight + 2)))}px`;
};