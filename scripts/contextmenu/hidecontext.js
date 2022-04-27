module.exports = (window) => {
    document.getElementById('ctx').style.display = 'none';
    if (!window) {return;}
    window.kade.context = false;
};