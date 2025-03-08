import { deleteBook } from '../../../book.js';
import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import editBookComponent from './edit-form.js';

const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
const booksSection = document.querySelector('.books');

async function getBooks() {
    const res = await fetch(baseUrl);
    return await res.json();
}

export default async function renderBookListComponent(initialRender = false) {
    const books = Object.entries(await getBooks());
    render(bookListTemplate(books, initialRender), booksSection);
}

export function bookListTemplate(books, initialRender) {
    return html`
        <button @click=${() => renderBookListComponent()} id="loadBooks">LOAD ALL BOOKS</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${!initialRender ? books.map(singleBookTemplate) : ''}
            </tbody>
        </table>
    `;
}

function singleBookTemplate([id, { author, title }]) {
    return html`
        <tr>
            <td>${author}</td>
            <td>${title}</td>
            <td>
                <button @click=${() => editBookComponent(id)}>Edit</button>
                <button @click=${() => onDeleteBook(id)}>Delete</button>
            </td>
        </tr>
    `;
}

async function onDeleteBook(id) {
    await deleteBook(id);
    renderBookListComponent();
}
