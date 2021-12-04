module.exports = (e, target, window) => {
    window.kade.context = true;
    let ctx = document.getElementById('ctx');
    ctx.style.left = `${e.pageX}px`;
    ctx.style.top = `${e.pageY}px`;
    ctx.style.display = 'block';
};