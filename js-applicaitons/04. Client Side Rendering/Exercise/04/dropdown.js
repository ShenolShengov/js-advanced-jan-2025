import { html, render } from './node_modules/lit-html/lit-html.js';

const baseUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';
const menuDrowdown = document.getElementById('menu');
const addItemForm = document.querySelector('form');

addItemForm.addEventListener('submit', onSubmit);
loadItems();

async function onSubmit(e) {
    e.preventDefault();
    const itemData = Object.fromEntries(new FormData(this));
    if (itemData.text === '') {
        return;
    }
    await addItem(itemData);
    this.reset();
}

async function addItem(itemData) {
    await fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify(itemData),
    });
    loadItems();
}

async function loadItems() {
    const items = await getItems();
    render(itemsTemplate(Object.values(items)), menuDrowdown);
}

function itemsTemplate(items) {
    return html` ${items.map(singleItemTemplate)} `;
}

function singleItemTemplate({ _id, text }) {
    return html`<option value="${_id}">${text}</option>`;
}

async function getItems() {
    const res = await fetch(baseUrl);
    return await res.json();
}
