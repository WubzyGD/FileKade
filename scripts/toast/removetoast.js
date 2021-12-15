module.exports = (toast) => {
    toast.classList.remove('toast-entering');
    toast.classList.add('toast-leaving');
    toast.onanimationend = () => {toast.remove();};
};