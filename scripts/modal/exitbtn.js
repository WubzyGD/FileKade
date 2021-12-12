module.exports = (parent, btnID) => {
    let wr = document.createElement('div');
    wr.className = 'exit-wrapper';
    parent.appendChild(wr);
    let btn = document.createElement('a');
    btn.className = 'exit-button';
    btn.id = btnID;
    wr.appendChild(btn)
    let ind = document.createElement('div');
    ind.className = 'exit-in';
    btn.appendChild(ind);
    let inbl1 = document.createElement('div');
    inbl1.className = 'exit-button-block';
    ind.appendChild(inbl1);
    let inbl2 = document.createElement('div');
    inbl2.className = 'exit-button-block';
    ind.appendChild(inbl2);
    let outd = document.createElement('div');
    outd.className = 'exit-out';
    btn.appendChild(outd);
    let outbl1 = document.createElement('div');
    outbl1.className = 'exit-button-block';
    outd.appendChild(outbl1);
    let outbl2 = document.createElement('div');
    outbl2.className = 'exit-button-block';
    outd.appendChild(outbl2);
    return wr;
};