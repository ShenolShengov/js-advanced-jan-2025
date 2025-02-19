function colorize() {
    const rowsToColorize = document.querySelectorAll('tr:nth-child(even)');
    const color = 'teal';
    rowsToColorize.forEach(r => r.style.backgroundColor = color);
}