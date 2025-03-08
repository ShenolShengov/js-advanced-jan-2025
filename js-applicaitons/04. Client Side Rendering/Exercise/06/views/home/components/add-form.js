import { create } from '../../../book.js';
import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import renderBookListComponent from './books-list.js';

const actionSection = document.querySelector('.action');

export default function renderAddBookComponent() {
    render(addBookTemplate(), actionSection);
}

export function addBookTemplate() {
    return html`
        <form id="add-form" @submit=${(e) => onSubmit(e)}>
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." />
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." />
            <input type="submit" value="Submit" />
        </form>
    `;
}

async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const bookData = Object.fromEntries(new FormData(form));

    if (Object.values(bookData).some((v) => v === '')) {
        alert('Invalid book data');
        return;
    }
    await create(bookData);
    form.reset();
    await renderBookListComponent();
}
