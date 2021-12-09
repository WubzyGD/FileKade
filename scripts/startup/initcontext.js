const ctxl = require('../../json/ctx.json');

module.exports = () => {
    document.getElementById('ctx').style.display = 'none';
    const ctx = document.getElementById('ctx');
    console.log(ctxl);
    try {
        for (let i = 0; i < ctxl.length; i++) {
            let k = ctxl[i];
            let ctxg = document.createElement('div');
            ctxg.className = 'ctx-group';
            ctx.appendChild(ctxg);
            for (let x = 0; x < k.length; x++) {
                let item = k[x];
                let ctxi = document.createElement('div');
                ctxi.className = 'ctx-item';
                ctxi.id = item.id;
                try {ctxi.onclick = require(`../contextmenu/${item.onclick}`);} catch {}
                ctxg.appendChild(ctxi);
                let name = document.createElement('p');
                name.classList.add('ctx-name', 'nosel');
                name.innerHTML = item.name;
                ctxi.appendChild(name);
            }
            if (i + 1 < ctxl.length) {ctx.appendChild(document.createElement('hr'));}
        }
    } catch (e) {console.error(e);}
};