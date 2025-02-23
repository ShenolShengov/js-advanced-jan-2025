document.addEventListener('DOMContentLoaded', setUp);

const html = {
    buttons: {
        load: document.querySelector('#loadBooks'),
    },
    form: {
        book: document.querySelector('form'),
    },
    table: {
        body: document.querySelector('tbody'),
    },
};

const url = 'http://localhost:3030/jsonstore/collections/books';

function setUp() {
    html.buttons.load.addEventListener('click', loadBooks);
    html.form.book.addEventListener('submit', processBook);
}

function processBook(e) {
    e.preventDefault();
    const formData = new FormData(html.form.book);
    const formatedData = [...formData].reduce((data, [name, value]) => {
        data[name] = value;
        return data;
    }, {});

    const reqeustInfo = extractFormRequestInfo();

    fetch(reqeustInfo.url, {
        method: reqeustInfo.method,
        body: JSON.stringify(formatedData),
    })
        .then(loadBooks)
        .catch((err) =>
            console.error('Error occursed when processing book: ' + err)
        );
    this.dataset.action = 'create';
    this.dataset.id = null;
    this.reset();
    updateBookFormUI();
}

function extractFormRequestInfo() {
    const formDataset = html.form.book.dataset;
    const method = formDataset.action === 'create' ? 'post' : 'put';
    const formUrl = method === 'post' ? url : `${url}/${formDataset.id}`;
    return {
        url: formUrl,
        method: html.form.book.dataset.action === 'create' ? 'post' : 'put',
    };
}

function loadBooks() {
    html.table.body.innerHTML = '';
    fetch(url)
        .then((r) => r.json())
        .then((booksData) => {
            Object.entries(booksData)
                .map(([id, data]) => toBookElement({ id, ...data }))
                .forEach((r) => html.table.body.append(r));
        })
        .catch((err) =>
            console.error('Error occursed when loading books: ' + err)
        );
}

function toBookElement(bookData) {
    const row = createElement('tr', { dataset: bookData });
    createElement('td', { textContent: bookData.title }, row);
    createElement('td', { textContent: bookData.author }, row);
    const buttons = createElement('td', {}, row);
    createElement(
        'button',
        { textContent: 'Edit', onclick: editBook },
        buttons
    );
    createElement(
        'button',
        { textContent: 'Delete', onclick: deleteBook },
        buttons
    );
    return row;
}

function editBook() {
    const row = this.closest('tr');
    const { id, title, author } = row.dataset;
    const bookForm = html.form.book;

    Object.assign(bookForm.dataset, { action: 'edit', id });
    bookForm.querySelector('#author').value = author;
    bookForm.querySelector('#title').value = title;
    updateBookFormUI();
}

function updateBookFormUI() {
    const form = html.form.book;
    const action = form.dataset.action;
    form.querySelector('h3').textContent =
        (action === 'create' ? '' : 'Edit ') + 'Form';
    form.querySelector('button').textContent =
        action === 'create' ? 'Submit' : 'Save';
}

function deleteBook() {
    const row = this.closest('tr');
    fetch(url + `/${row.dataset.id}`, {
        method: 'delete',
    }).catch((err) =>
        console.error('Error occursed when deleting book: ' + err)
    );
    row.remove();
}

function createElement(tag, properties, parent) {
    const el = document.createElement(tag);
    Object.keys(properties).forEach((k) => {
        if (typeof properties[k] === 'object') {
            Object.assign(el[k], properties[k]);
        } else {
            el[k] = properties[k];
        }
    });
    if (parent) parent.append(el);
    return el;
}
