import { html, render } from './node_modules/lit-html/lit-html.js';
import { classMap } from './node_modules/lit-html/directives/class-map.js';

const baseUrl = 'http://localhost:3030/jsonstore/advanced/table';
const tableBody = document.querySelector('table tbody');
const searchInput = document.getElementById('searchField');

solve();
loadPersons();

function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        const searchQuery = searchInput.value.toLocaleLowerCase();
        if (searchQuery === '') return;
        const searchResults = [...tableBody.querySelectorAll('tr')]
            .filter((r) => r.textContent.toLocaleLowerCase().includes(searchQuery))
            .map((r) => r.id);
        loadPersons(searchResults);
        searchInput.value = '';
    }
}

async function getPersons() {
    const res = await fetch(baseUrl);
    return await res.json();
}

async function loadPersons(searchResults = []) {
    const persons = await getPersons();
    render(personsTemplate(Object.values(persons), searchResults), tableBody);
}

function matched(person, searchResults) {
    return searchResults.includes(person._id);
}

function personsTemplate(persons, searchResults) {
    return html` ${persons.map((p) => singlePersonTemplate(p, matched(p, searchResults)))} `;
}

function singlePersonTemplate({ _id, firstName, lastName, email, course }, isMatched) {
    const classes = { select: isMatched };
    return html`
        <tr id="${_id}" class="${classMap(classes)}">
            <td>${firstName} ${lastName}</td>
            <td>${email}</td>
            <td>${course}</td>
        </tr>
    `;
}
