import { edit } from '../../../book.js';
import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import renderAddBookComponent from './add-form.js';
import renderBookListComponent from './books-list.js';

const baseUrl = (id) => `http://localhost:3030/jsonstore/collections/books/${id}`;
const actionSection = document.querySelector('.action');

export default async function editBookComponent(id) {
    const book = await getBook(id);
    render(editBookTemplate(id, book), actionSection);
}

export function editBookTemplate(id, { author, title }) {
    return html`
        <form id="edit-form" @submit=${(e) => onSubmit(e)}>
            <input type="hidden" name="_id" value="${id}" />
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" .value="${title}" placeholder="Title..." />
            <label>AUTHOR</label>
            <input type="text" name="author" .value="${author}" placeholder="Author..." />
            <input type="submit" value="Save" />
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
    await edit(bookData, bookData._id);
    form.reset();
    await renderBookListComponent();
    renderAddBookComponent();
}

async function getBook(id) {
    const res = await fetch(baseUrl(id));
    return await res.json();
}
