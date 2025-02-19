function search() {
    const towns = document.querySelectorAll('#towns li');
    const resultEl = document.querySelector('#result');
    const searchQueryInput = document.querySelector('#searchText');
    const searchQuery = searchQueryInput.value;

    resultEl.textContent = '';
    searchQueryInput.value = '';

    if (!searchQuery) return;

    let matchesCount = 0;
    [...towns].forEach((t) => {
        resetTownStyles(t);
        if (t.textContent.includes(searchQuery)) {
            applySelectedStyles(t);
            matchesCount++;
        }
    });

    resultEl.textContent = `${matchesCount} matches found`;

    function applySelectedStyles(town) {
        town.style.textDecoration = 'underline';
        town.style.fontWeight = 'bold';
    }

    function resetTownStyles(town) {
        town.style.textDecoration = 'none';
        town.style.fontWeight = 'normal';
    }
}
