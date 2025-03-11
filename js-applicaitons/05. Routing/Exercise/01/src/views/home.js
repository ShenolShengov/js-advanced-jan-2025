import { html, render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('.main-section');
const baseUrl = 'http://localhost:3030/data/catalog';

export default async function homePage() {
    const furnitures = await getFurnitures();
    render(homePageTemplate(furnitures), main);
}

async function getFurnitures() {
    const res = await fetch(baseUrl);
    return await res.json();
}

function homePageTemplate(furnitures) {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Welcome to Furniture System</h1>
                    <p>Select furniture from the catalog to view details.</p>
                </div>
            </div>
            <div class="row space-top">
                ${furnitures.map(furnitureTemplate)}
            </div>
        </div>
    `;
}

export function furnitureTemplate({ description, img, price, _id}) {
    return html`
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${img}" />
                    <p>${description}</p>
                    <footer>
                        <p>Price: <span>${price} $</span></p>
                    </footer>
                    <div>
                        <a href="/details/${_id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}
