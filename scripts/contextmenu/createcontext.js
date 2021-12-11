module.exports = (e, target, window) => {
    window.kade.context = true;
    let ctx = document.getElementById('ctx');
    ctx.style.display = 'block';
    ctx.style.left = `${Math.min(e.pageX, (window.innerWidth - (ctx.clientWidth + 2)))}px`;
    ctx.style.top = `${Math.min(e.pageY, (window.innerHeight - (ctx.clientHeight + 2)))}px`;
};