import { html, render } from './node_modules/lit-html/lit-html.js';
import {classMap} from './node_modules/lit-html/directives/class-map.js';
import { towns } from './towns.js';


const townsList = document.getElementById('towns');
const searchInput = document.getElementById('searchText');
const searchBtn = document.querySelector('button');
const resultEl = document.getElementById('result');

searchBtn.addEventListener('click', search);

render(townsTemplate(towns, []), townsList);

function search() {
    const searchQuery = searchInput.value;
    if (searchQuery === '') {
        return;
    }
    const searchResults = towns.filter((t) => t.includes(searchQuery));
    render(townsTemplate(towns, searchResults), townsList);
    resultEl.textContent = `${searchResults.length} matches found`;
}

function matched(town, searchResults) {
   return searchResults.includes(town);
}

function townsTemplate(towns, searchResults) {
    return html`
        <ul>
            ${towns.map((t) => singleTownTemplate(t, matched(t, searchResults)))}
        </ul>
    `;
}

function singleTownTemplate(name, isMatched) {
   const classes = {active: isMatched};
    return html`<li class="${classMap(classes)}">${name}</li>`;
}
