import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const form = document.querySelector('.content');
const townsInput = document.getElementById('towns');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const townsData = townsInput.value;
    if (!townsData) {
        return;
    }
    const towns = townsData.split(', ');
    render(townsTemplate(towns), root);
}

function townsTemplate(towns) {
    return html`
        <ul>
            ${towns.filter(t => t).map(singleTownTemplate)}
        </ul>
    `;
}

function singleTownTemplate(town) {
    return html`<li>${town}</li>`;
}
