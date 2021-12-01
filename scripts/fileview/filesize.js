module.exports = function getsize(bytes) {
    let val = bytes;
    let types = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Terabytes'];
    reit = 0;
    while (true) {
        if (val > 1000) {
            val = (val / 1024).toFixed(2);
            reit++;
        } else {break;}
    }
    return `${val} ${types[reit]}`;
};