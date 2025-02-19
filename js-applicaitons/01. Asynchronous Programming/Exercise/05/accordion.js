document.addEventListener('DOMContentLoaded', solution);

const main = document.querySelector('#main');
const urls = {
    articles: 'http://localhost:3030/jsonstore/advanced/articles/list',
    articleDetails:
        'http://localhost:3030/jsonstore/advanced/articles/details/',
};

function solution() {
    fetch(urls.articles)
        .then((r) => r.json())
        .then((articles) => {
            articles.forEach(createArticle);
        });
}

function createArticle(articleData) {
    const { _id, title } = articleData;
    const accordion = document.createElement('div');
    accordion.className = 'accordion';

    const head = document.createElement('div');
    head.className = 'head';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;

    const toggleButton = document.createElement('button');
    toggleButton.className = 'button';
    toggleButton.textContent = 'More';
    toggleButton.id = _id;

    const extra = document.createElement('div');
    extra.className = 'extra';

    fetch(urls.articleDetails + _id)
        .then((r) => r.json())
        .then((d) => {
            const contentP = document.createElement('p');
            contentP.textContent = d.content;
            extra.append(contentP);
        });

    main.append(accordion);
    accordion.append(head, extra);
    head.append(titleSpan, toggleButton);

    console.log(toggleButton);
    toggleButton.addEventListener('click', toggleArticle);
}

function toggleArticle(e) {
    const extra = e.target.closest('.accordion').querySelector('.extra');
    if (this.textContent == 'More') {
        extra.style.display = 'block';
        e.target.textContent = 'Less';
    } else {
        extra.style.display = 'none';
        e.target.textContent = 'More';
    }
}