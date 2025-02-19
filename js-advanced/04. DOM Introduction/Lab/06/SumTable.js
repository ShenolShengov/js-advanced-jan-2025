function sumTable() {
    const sum = [...document.querySelectorAll('tr:not(:last-child) td:last-child')]
        .map(e => Number(e.textContent))
        .reduce((sum, current) => sum + current, 0);
    document.querySelector('#sum').textContent = sum;
}