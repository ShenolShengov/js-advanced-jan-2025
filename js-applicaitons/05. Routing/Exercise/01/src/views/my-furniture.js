import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { id } from '../user.js';
import { furnitureTemplate } from './home.js';

const main = document.querySelector('.main-section');
const baseUrl = id => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`;

export default async function myFurniturePage() {
    const furnitures = await getLoggedUserFurnitures(id());
    render(myFurnitureTemplate(furnitures), main);
}

async function getLoggedUserFurnitures(userId) {
    const res = await fetch(baseUrl(userId));
    return await res.json();
}

function myFurnitureTemplate(furnitures) {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>My Furniture</h1>
                    <p>This is a list of your publications.</p>
                </div>
            </div>
            <div class="row space-top">${furnitures.map(furnitureTemplate)}</div>
        </div>
    `;
}
