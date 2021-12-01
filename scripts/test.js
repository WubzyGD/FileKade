let e = [
    {name: 'e', e: 33},
    {name: 'a', e: 100},
    {name: 'c', e: 56},
    {name: 'b', e: 98},
    {name: 'd', e: 45},
]

console.log(e);

e.sort((a, b) => {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
});

console.log(e);