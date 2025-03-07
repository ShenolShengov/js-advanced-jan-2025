import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const allCatsSection = document.getElementById('allCats');
render(allCatsTemplate(cats), allCatsSection);

function allCatsTemplate(cats) {
    return html`
        <ul>
            ${cats.map(catTemplate)}
        </ul>
    `;
}

function catTemplate({ id, statusCode, statusMessage, imageLocation }) {
    return html`
        <li>
            <img src="images/${imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
            <div class="info">
                <button @click=${(e) => toggleStatusCode(e, id)} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${id}">
                    <h4>Status Code: ${statusCode}</h4>
                    <p>${statusMessage}</p>
                </div>
            </div>
        </li>
    `;
}

function toggleStatusCode(e, id) {
    const statusSection = document.getElementById(id);
    const currentDislpay = statusSection.style.display;
    e.target.textContent = `${currentDislpay === 'none' ? 'Hide' : 'Show'} status code`;
    statusSection.style.display = currentDislpay === 'none' ? 'block' : 'none';
}