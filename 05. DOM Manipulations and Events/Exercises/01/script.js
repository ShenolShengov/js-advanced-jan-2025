function create(words) {
    const content = document.querySelector('#content');
    words.map(toSection).forEach(s => {
      content.appendChild(s);
    });

    function toSection(word) {
        const section = document.createElement('div');

        const paragraph = document.createElement('p');
        paragraph.textContent = word;
        paragraph.style.display = 'none';

        section.addEventListener('click', showParagraphInSection);

        section.appendChild(paragraph);
        return section;
    }

    function showParagraphInSection(e) {
        e.target.querySelector('p').style.display = 'block';
    }
}
