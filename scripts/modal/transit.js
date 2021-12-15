module.exports = (id, open=false) => {
    if (open && !window.kade.modals.includes(id)) {window.kade.modals.push(id);}
    else if (window.kade.modals.includes(id)) {window.kade.modals.splice(window.kade.modals.indexOf(id), 1);}
};