import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { id } from '../user.js';

const main = document.querySelector('.main-section');
const baseUrl = (id) => `http://localhost:3030/data/catalog/${id}`;

export default async function furnitureDetailsPage(ctx) {
    const id = ctx.params.id;
    const furniture = await getFurniture(id);
    render(furnitureDetailsTemplate(furniture, isOwner(furniture._ownerId)), main);
}

async function getFurniture(id) {
    const res = await fetch(baseUrl(id));
    return await res.json();
}

function isOwner(ownerId) {
    return id() === ownerId;
}

function furnitureDetailsTemplate({ make, model, description, img, year, price, material, _id}, isOwner) {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Furniture Details</h1>
                </div>
            </div>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src="${img}" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <p>Make: <span>${make}</span></p>
                    <p>Model: <span>${model}</span></p>
                    <p>Year: <span>${year}</span></p>
                    <p>Description: <span>${description}</span></p>
                    <p>Price: <span>${price}</span></p>
                    <p>Material: <span>${material}</span></p>
                    ${isOwner
                        ? html`<div>
                              <a href="/edit/${_id}" class="btn btn-info">Edit</a>
                              <a href="/delete/${_id}" class="btn btn-red">Delete</a>
                          </div>`
                        : ''}
                </div>
            </div>
        </div>
    `;
}