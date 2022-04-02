const removeToast = require('./removetoast');

module.exports = (name, text, bg = '#a172a6', persistOnClick = false, time = 5, onclick = () => {}, selectable = false, timerColor='#ddddddb2') => {
    if (!name || !text) {return;}
    if (!Array.isArray(text)) {text = [text];}
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.backgroundColor = `${bg}c2`;
    toast.style.borderColor = `${bg}c2`;
    toast.classList.add('toast-entering');
    let toastWrap = document.createElement('div');
    toastWrap.className = 'toast-wrapper';
    let continueTimeout = true;
    toast.onclick = () => {
        if (!persistOnClick) {
            removeToast(toast);
            continueTimeout = false;
        }
        onclick();
    };
    document.getElementById('toast-container').appendChild(toast);
    toast.appendChild(toastWrap);
    let h2 = document.createElement('h2');
    h2.innerHTML = name;
    if (!selectable) {h2.className = 'nosel';}
    toastWrap.appendChild(h2);
    for (let i = 0; i < text.length; i++) {
        if (text[i].length) {
            let p = document.createElement('p');
            p.innerHTML = text[i];
            if (!selectable) {p.className = 'nosel';}
            toastWrap.appendChild(p);
        }
        else {toastWrap.appendChild(document.createElement('br'));}
    }
    let timer = document.createElement('div');
    timer.className = 'toast-timer';
    timer.style.backgroundColor = timerColor;
    timer.style.animation = `toast-timer ${time}s linear`;
    toastWrap.appendChild(timer);
    toast.id = `toast-${window.kade.toasts.total}`;
    toast.onmouseenter = () => {
        let ctoast = window.kade.toasts.shown[toast.id.slice(6)];
        ctoast.toast.style.backgroundColor = bg;
        ctoast.timer.style.animationPlayState = 'paused';
        clearTimeout(ctoast.timeout);
        ctoast.tl = ctoast.tt - (Date.now() - ctoast.ts);
    };
    toast.onmouseleave = () => {
        let ctoast = window.kade.toasts.shown[toast.id.slice(6)];
        ctoast.toast.style.backgroundColor = `${bg}c2`;
        ctoast.timer.style.animationPlayState = 'running';
        ctoast.timeout = setTimeout(() => {if (continueTimeout) {removeToast(ctoast.toast);}}, ctoast.tl);
    };
    window.kade.toasts.shown[window.kade.toasts.total] = {
        timeout: setTimeout(() => {if (continueTimeout) {removeToast(toast);}}, time * 1000),
        timer,
        toast,
        tl: time * 1000,
        ts: Date.now(),
        tt: time * 1000
    };
    window.kade.toasts.total++;
};