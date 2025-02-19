function extractText() {
    const liItems = document.querySelectorAll('#items li');
    const resultEl = document.querySelector('#result');
    resultEl.textContent = [...liItems].map(e => e.textContent).join('\n');
}
