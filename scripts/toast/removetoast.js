module.exports = (toast) => {
    toast.classList.remove('toast-entering');
    toast.classList.add('toast-leaving');
    setTimeout(() => {toast.onanimationend = () => {toast.remove();};}, 100);
};