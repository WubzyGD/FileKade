module.exports = (name, text, bg = '#a172a6', persistOnClick = false, time = 5, onclick = () => {}, selectable = false) => {
    if (!name || !text) {return;}
    if (!Array.isArray(text)) {text = [text];}
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.backgroundColor = `${bg}c2`;
    toast.style.borderColor = `${bg}c2`;
    toast.onmouseenter = () => {toast.style.backgroundColor = bg;};
    toast.onmouseleave = () => {toast.style.backgroundColor = `${bg}c2`;};
    toast.onclick = () => {
        if (!persistOnClick) {}
        onclick();
    };
    document.getElementById('toast-container').appendChild(toast);
    let h2 = document.createElement('h2');
    h2.innerHTML = name;
    if (!selectable) {h2.className = 'nosel';}
    toast.appendChild(h2);
    for (let i = 0; i < text.length; i++) {
        if (text[i].length) {
            let p = document.createElement('p');
            p.innerHTML = text[i];
            if (!selectable) {p.className = 'nosel';}
            toast.appendChild(p);
        }
        else {toast.appendChild(document.createElement('br'));}
    }
};